import { useCallback, useEffect, useRef, useState } from 'react';

import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Home, Replay } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const GAME_WIDTH = 700;
const GAME_HEIGHT = 220;

const DINO_WIDTH = 40;
const DINO_HEIGHT = 40;

const GROUND_Y = 25;
const DINO_X = 80;

const CACTUS_WIDTH = 18;
const CACTUS_HEIGHT = 40;

// Jump physics
const GRAVITY = 0.0018;
const JUMP_VELOCITY = 0.85;

// Game speed
const STARTING_SPEED = 0.35;
const MAX_SPEED = 0.9;
const SPEED_INCREASE = 0.05;
const SCORE_FOR_SPEED_INCREASE = 100;

// Score
const SCORE_RATE = 0.01;

// Cactus spacing
const MIN_CACTUS_GAP = 250;
const MAX_CACTUS_GAP = 450;

function getNextCactusX() {
  return (
    GAME_WIDTH +
    MIN_CACTUS_GAP +
    Math.random() * (MAX_CACTUS_GAP - MIN_CACTUS_GAP)
  );
}

function NotFoundPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [dinoY, setDinoY] = useState(0);
  const [cactusX, setCactusX] = useState(getNextCactusX);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showSpeedIncrease, setShowSpeedIncrease] = useState(false);

  const dinoYRef = useRef(0);
  const dinoVelocityRef = useRef(0);

  const cactusXRef = useRef(cactusX);

  const scoreRef = useRef(0);

  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const speedLevelRef = useRef(0);

  const speedMessageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  /*
   * Jump / start game
   */
  const jump = useCallback(() => {
    if (gameOver) {
      return;
    }

    // First Space press/click starts the game.
    if (!gameStarted) {
      setGameStarted(true);
      dinoVelocityRef.current = JUMP_VELOCITY;
      return;
    }

    // Prevent double jumping.
    if (dinoYRef.current > 0) {
      return;
    }

    dinoVelocityRef.current = JUMP_VELOCITY;
  }, [gameOver, gameStarted]);

  /*
   * Restart
   */
  const restart = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (speedMessageTimeoutRef.current !== null) {
      clearTimeout(speedMessageTimeoutRef.current);
    }

    const startingCactusX = getNextCactusX();

    dinoYRef.current = 0;
    dinoVelocityRef.current = 0;

    cactusXRef.current = startingCactusX;

    scoreRef.current = 0;

    speedLevelRef.current = 0;

    lastTimeRef.current = null;

    setGameStarted(false);
    setDinoY(0);
    setCactusX(startingCactusX);
    setScore(0);
    setGameOver(false);
    setShowSpeedIncrease(false);
  }, []);

  /*
   * Keyboard controls
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      if (speedMessageTimeoutRef.current !== null) {
        clearTimeout(speedMessageTimeoutRef.current);
      }
    };
  }, [jump]);

  /*
   * Main game loop
   */
  useEffect(() => {
    if (!gameStarted || gameOver) {
      return;
    }

    const gameLoop = (currentTime: number) => {
      /*
       * Calculate elapsed time since
       * the previous frame.
       */
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;

      lastTimeRef.current = currentTime;

      /*
       * -------------------------
       * SCORE
       * -------------------------
       *
       * Score increases continuously
       * while the game is running.
       */
      scoreRef.current += SCORE_RATE * deltaTime;

      const currentScore = Math.floor(scoreRef.current);

      setScore(currentScore);

      /*
       * -------------------------
       * DIFFICULTY
       * -------------------------
       *
       * Every 100 points, the game
       * gets slightly faster.
       */
      const speedLevel = Math.floor(currentScore / SCORE_FOR_SPEED_INCREASE);

      const speed = Math.min(
        STARTING_SPEED + speedLevel * SPEED_INCREASE,
        MAX_SPEED
      );

      /*
       * Show "Speed Increase" whenever
       * we enter a new speed level.
       */
      if (speedLevel > speedLevelRef.current && speed < MAX_SPEED) {
        speedLevelRef.current = speedLevel;

        setShowSpeedIncrease(true);

        if (speedMessageTimeoutRef.current !== null) {
          clearTimeout(speedMessageTimeoutRef.current);
        }

        speedMessageTimeoutRef.current = setTimeout(() => {
          setShowSpeedIncrease(false);
        }, 3000);
      }

      /*
       * Keep track of the level even
       * after reaching max speed.
       */
      if (speedLevel > speedLevelRef.current) {
        speedLevelRef.current = speedLevel;
      }

      /*
       * -------------------------
       * DINO PHYSICS
       * -------------------------
       */
      let newDinoY = dinoYRef.current;
      let newDinoVelocity = dinoVelocityRef.current;

      if (newDinoY > 0 || newDinoVelocity > 0) {
        newDinoVelocity -= GRAVITY * deltaTime;

        newDinoY += newDinoVelocity * deltaTime;

        // Dino has landed.
        if (newDinoY <= 0) {
          newDinoY = 0;
          newDinoVelocity = 0;
        }
      }

      dinoYRef.current = newDinoY;
      dinoVelocityRef.current = newDinoVelocity;

      setDinoY(newDinoY);

      /*
       * -------------------------
       * CACTUS MOVEMENT
       * -------------------------
       */
      let newCactusX = cactusXRef.current - speed * deltaTime;

      /*
       * Cactus has completely left
       * the screen.
       */
      if (newCactusX < -CACTUS_WIDTH) {
        newCactusX = getNextCactusX();
      }

      cactusXRef.current = newCactusX;

      setCactusX(newCactusX);

      /*
       * -------------------------
       * COLLISION DETECTION
       * -------------------------
       */
      const dinoLeft = DINO_X;
      const dinoRight = DINO_X + DINO_WIDTH;

      const cactusLeft = newCactusX;
      const cactusRight = newCactusX + CACTUS_WIDTH;

      const horizontalCollision =
        dinoRight > cactusLeft && dinoLeft < cactusRight;

      const dinoBottom = GROUND_Y + newDinoY;
      const dinoTop = dinoBottom + DINO_HEIGHT;

      const cactusBottom = GROUND_Y;
      const cactusTop = cactusBottom + CACTUS_HEIGHT;

      const verticalCollision =
        dinoBottom < cactusTop && dinoTop > cactusBottom;

      if (horizontalCollision && verticalCollision) {
        setGameOver(true);
        return;
      }

      /*
       * Continue the game.
       */
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, gameOver]);

  return (
    <Stack
      sx={{
        maxHeight: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        pb: 2,
        overflowY: 'scroll',
      }}
    >
      <Stack
        spacing={3}
        sx={{
          width: '100%',
          maxWidth: 800,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* 404 */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: {
              xs: '5rem',
              sm: '7rem',
            },
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Stack spacing={1}>
          <Typography variant="h4">
            Looks like you wandered off the path.
          </Typography>

          <Typography variant="body1" color="text.secondary">
            While you're here, see how far you can run.
          </Typography>
        </Stack>

        {/* Speed increase message */}
        <Box
          sx={{
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {showSpeedIncrease && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Speed Increase
            </Typography>
          )}
        </Box>

        {/* GAME */}
        <Paper
          elevation={8}
          onClick={jump}
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: GAME_WIDTH,
            height: GAME_HEIGHT,
            overflow: 'hidden',
            cursor: 'pointer',
            userSelect: 'none',
            bgcolor: 'background.paper',
          }}
        >
          {/* Score */}
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              top: 12,
              right: 16,
              fontFamily: 'monospace',
              zIndex: 5,
            }}
          >
            {String(score).padStart(5, '0')}
          </Typography>

          {/* Start message */}
          {!gameStarted && !gameOver && (
            <Stack
              spacing={0.5}
              sx={{
                position: 'absolute',
                inset: 0,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                pointerEvents: 'none',
              }}
            >
              <Typography variant="h6">Press SPACE to start</Typography>

              <Typography variant="body2" color="text.secondary">
                Or click the game
              </Typography>
            </Stack>
          )}

          {/* Game area */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
            }}
          >
            {/* ===================== */}
            {/* DINO */}
            {/* ===================== */}

            <Box
              sx={{
                position: 'absolute',
                left: DINO_X,
                bottom: GROUND_Y + dinoY,
                width: DINO_WIDTH,
                height: DINO_HEIGHT,
                zIndex: 2,
              }}
            >
              {/* Head */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 28,
                  height: 24,
                  bgcolor: 'secondary.main',
                  borderRadius: '3px 8px 3px 3px',
                }}
              />

              {/* Body */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 5,
                  width: 25,
                  height: 25,
                  bgcolor: 'secondary.main',
                  borderRadius: '4px 4px 2px 2px',
                }}
              />

              {/* Eye */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 4,
                  height: 4,
                  bgcolor: 'background.paper',
                  borderRadius: '50%',
                }}
              />

              {/* Leg */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  left: 10,
                  width: 6,
                  height: 8,
                  bgcolor: 'secondary.main',
                }}
              />

              {/* Tail */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: 0,
                  width: 14,
                  height: 6,
                  bgcolor: 'secondary.main',
                  transform: 'rotate(-25deg)',
                  transformOrigin: 'right',
                }}
              />
            </Box>

            {/* ===================== */}
            {/* CACTUS */}
            {/* ===================== */}

            <Box
              sx={{
                position: 'absolute',
                left: cactusX,
                bottom: GROUND_Y,
                width: CACTUS_WIDTH,
                height: CACTUS_HEIGHT,
                bgcolor: 'secondary.main',
                borderRadius: 1,
                zIndex: 1,
              }}
            >
              {/* Left arm */}
              <Box
                sx={{
                  position: 'absolute',
                  left: -10,
                  top: 15,
                  width: 12,
                  height: 6,
                  bgcolor: 'secondary.main',
                }}
              />

              {/* Right arm */}
              <Box
                sx={{
                  position: 'absolute',
                  right: -8,
                  top: 8,
                  width: 10,
                  height: 6,
                  bgcolor: 'secondary.main',
                }}
              />
            </Box>

            {/* ===================== */}
            {/* GROUND */}
            {/* ===================== */}

            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: GROUND_Y,
                height: 2,
                bgcolor: 'text.primary',
              }}
            />

            {/* Ground details */}
            <Box
              sx={{
                position: 'absolute',
                left: '10%',
                bottom: 14,
                width: 45,
                height: 2,
                bgcolor: 'text.secondary',
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                left: '40%',
                bottom: 18,
                width: 25,
                height: 2,
                bgcolor: 'text.secondary',
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                right: '25%',
                bottom: 12,
                width: 55,
                height: 2,
                bgcolor: 'text.secondary',
              }}
            />

            {/* ===================== */}
            {/* GAME OVER */}
            {/* ===================== */}

            {gameOver && (
              <Stack
                spacing={1}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'background.paper',
                  opacity: 0.95,
                  zIndex: 10,
                }}
              >
                <Typography variant="h5">Game Over</Typography>

                <Typography variant="body2" color="text.secondary">
                  Score: {score}
                </Typography>
              </Stack>
            )}
          </Box>
        </Paper>

        <Typography variant="body2" color="text.secondary">
          Press <strong>SPACE</strong> or click the game to jump
        </Typography>

        {/* Buttons */}
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<Replay />} onClick={restart}>
            Restart
          </Button>

          <Button
            variant="contained"
            startIcon={<Home />}
            component={Link}
            to="/"
          >
            Go Home
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default NotFoundPage;

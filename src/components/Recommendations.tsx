import { useEffect, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import {
  Info as InfoIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import {
  Box,
  Stack,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ErrorFetching,
  RecommendationDialog,
  RecommendationsSkeleton,
} from '@components';
import type { Recommendation, SelectedRecommendation } from '@types';
import { primaryColorGlowSx } from '@utils/styles';
import { fetchRecommendations } from '@utils';

function Recommendations() {
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<SelectedRecommendation | null>(null);
  const [recommendations, setRecommendations] = useState<
    Record<string, Recommendation>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    // Fetch all recommendation rows when this section first appears.
    fetchRecommendations()
      .then((data) => setRecommendations(data))
      .catch((fetchError: Error) => setError(fetchError.message))
      .finally(() => setIsLoading(false));
  }, []);

  const recommendationEntries = Object.entries(recommendations);
  const itemsPerPage = isSmallScreen
    ? 1
    : isMediumScreen
      ? 2
      : isLargeScreen
        ? 3
        : 4;
  const slideCount = Math.max(
    recommendationEntries.length - itemsPerPage + 1,
    1
  );
  const activeSlide = Math.min(currentSlide, slideCount - 1);

  return (
    <Box aria-labelledby="recommendations-heading" sx={{ px: 2, pb: 6 }}>
      {isLoading ? (
        // Show only the skeleton while recommendations are loading.
        <RecommendationsSkeleton />
      ) : error ? (
        // Show only the error state when the request fails.
        <ErrorFetching message="Unable to load recommendations." />
      ) : (
        // Show the loaded recommendation cards after a successful request.
        <>
          {/* Recommendations + Subtitle */}
          <>
            <Typography
              id="recommendations-heading"
              variant="h3"
              gutterBottom
              sx={{
                textAlign: 'center',
              }}
            >
              Recommendations
            </Typography>

            <Stack
              spacing={1}
              direction="row"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton disabled size="small">
                <InfoIcon sx={{ color: 'text.secondary' }} />
              </IconButton>
              <Typography
                id="recommendations-subtitle"
                variant="subtitle1"
                gutterBottom
                sx={{
                  textAlign: 'center',
                }}
              >
                Click on a card to view the full original recommendation.
              </Typography>
            </Stack>
          </>

          {/* Carousel of Recommendations */}
          <>
            <Box sx={{ position: 'relative', px: slideCount > 1 ? 5 : 0 }}>
              {slideCount > 1 && (
                <IconButton
                  aria-label="Previous recommendations"
                  disabled={activeSlide === 0}
                  onClick={() => setCurrentSlide(activeSlide - 1)}
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
              )}

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  overflow: 'hidden',
                  py: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent:
                      recommendationEntries.length <= itemsPerPage
                        ? 'center'
                        : 'flex-start',
                    transform: `translateX(calc(-${activeSlide} * (100% / ${itemsPerPage} + 16px)))`,
                    transition: 'transform 400ms ease',
                    width: 'fit-content',
                    minWidth: '100%',
                  }}
                >
                  {recommendationEntries.map(([name, recommendation]) => (
                    <Paper
                      key={name}
                      onClick={(event) => {
                        event.currentTarget.blur();
                        setSelectedRecommendation({ name, recommendation });
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setSelectedRecommendation({ name, recommendation });
                        }
                      }}
                      aria-label={`View original recommendation from ${name}`}
                      elevation={8}
                      sx={{
                        p: 2,
                        maxHeight: 360,
                        display: 'flex',
                        flexDirection: 'column',
                        flex: `0 0 calc((100% - ${(itemsPerPage - 1) * 16}px) / ${itemsPerPage})`,
                        minWidth: 'min(19rem, 100%)',
                        border: 0,
                        textAlign: { xs: 'center', sm: 'inherit' },
                        font: 'inherit',
                        color: 'inherit',
                        cursor: 'pointer',
                        '&:hover': {
                          ...primaryColorGlowSx,
                        },
                      }}
                    >
                      {/* Reviewer name and optional LinkedIn link */}
                      <Stack
                        spacing={0.5}
                        direction={'row'}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Tooltip
                          title="See Recommender LinkedIn"
                          placement="top"
                          arrow
                        >
                          <span>
                            <IconButton
                              aria-label="See Recommender LinkedIn"
                              onClick={(event: MouseEvent<HTMLElement>) => {
                                event.stopPropagation();
                                window.open(
                                  recommendation.contactURL || '',
                                  '_blank',
                                  'noopener,noreferrer'
                                );
                              }}
                              onKeyDown={(
                                event: KeyboardEvent<HTMLElement>
                              ) => {
                                event.stopPropagation();
                              }}
                              sx={{
                                '&:hover': {
                                  color: 'secondary.main',
                                },
                              }}
                            >
                              <LinkedInIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Typography variant="h6">{name}</Typography>
                      </Stack>

                      {/* Company link and reviewer title */}

                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        {recommendation.company}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ textAlign: 'center' }}
                      >
                        {recommendation.title}
                      </Typography>
                      {/* </Paper> */}

                      <Divider sx={{ mt: 1, mb: 1 }} />

                      {/* Public recommendation quote */}
                      <Box
                        sx={{
                          display: 'flex',
                          // alignItems: 'center',
                          height: '100%',
                          overflow: 'scroll',
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            textAlign: 'center',
                            maxWidth: '100%',
                            overflowY: 'auto',
                          }}
                        >
                          {recommendation.quote}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Box>

              {slideCount > 1 && (
                <IconButton
                  aria-label="Next recommendations"
                  disabled={activeSlide === slideCount - 1}
                  onClick={() => setCurrentSlide(activeSlide + 1)}
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              )}
            </Box>

            {slideCount > 1 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1,
                  mt: 2,
                }}
              >
                {Array.from({ length: slideCount }, (_, index) => (
                  <Box
                    key={index}
                    component="button"
                    type="button"
                    aria-label={`Go to recommendation ${index + 1}`}
                    onClick={() => setCurrentSlide(index)}
                    sx={{
                      width: 8,
                      height: 8,
                      border: 0,
                      borderRadius: '50%',
                      bgcolor:
                        index === activeSlide
                          ? 'primary.main'
                          : 'action.disabled',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            )}
          </>
        </>
      )}

      {/* Full original recommendation shown when a card is selected. */}
      <RecommendationDialog
        selectedRecommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
    </Box>
  );
}

export default Recommendations;

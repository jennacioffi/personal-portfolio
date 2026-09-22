import { useEffect, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
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
    <Box
      component="section"
      aria-labelledby="recommendations-heading"
      sx={{ px: 2, pb: 6 }}
    >
      {isLoading ? (
        // Show only the skeleton while recommendations are loading.
        <RecommendationsSkeleton />
      ) : error ? (
        // Show only the error state when the request fails.
        <ErrorFetching message="Unable to load recommendations." />
      ) : (
        // Show the loaded recommendation cards after a successful request.
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
                  width: 'max-content',
                  minWidth: '100%',
                }}
              >
                {recommendationEntries.map(([name, recommendation]) => (
                  <Paper
                    key={name}
                    component="button"
                    type="button"
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
                    <Tooltip
                      title="See Contact"
                      placement="top"
                      arrow
                      disableHoverListener={!recommendation.contactURL}
                      disableFocusListener={!recommendation.contactURL}
                      disableTouchListener={!recommendation.contactURL}
                    >
                      <Typography
                        component={recommendation.contactURL ? 'a' : 'h6'}
                        href={recommendation.contactURL || undefined}
                        target={
                          recommendation.contactURL ? '_blank' : undefined
                        }
                        rel={
                          recommendation.contactURL
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        onClick={(event: MouseEvent<HTMLElement>) =>
                          event.stopPropagation()
                        }
                        onKeyDown={(event: KeyboardEvent<HTMLElement>) =>
                          event.stopPropagation()
                        }
                        variant="h6"
                        sx={{
                          textAlign: 'center',
                          display: 'block',
                          color: 'inherit',
                          textDecoration: 'none',
                          cursor: recommendation.contactURL
                            ? 'pointer'
                            : 'inherit',
                          '&:visited': {
                            color: 'inherit',
                          },
                          '&:hover, &:focus': {
                            color: 'inherit',
                            textDecoration: 'none',
                          },
                        }}
                      >
                        {name}
                      </Typography>
                    </Tooltip>

                    {/* Company link and reviewer title */}
                    <Tooltip
                      title="See Company"
                      placement="top"
                      arrow
                      disableHoverListener={!recommendation.CompanySocialsURL}
                      disableFocusListener={!recommendation.CompanySocialsURL}
                      disableTouchListener={!recommendation.CompanySocialsURL}
                    >
                      <Typography
                        component={recommendation.CompanySocialsURL ? 'a' : 'p'}
                        href={recommendation.CompanySocialsURL || undefined}
                        target={
                          recommendation.CompanySocialsURL
                            ? '_blank'
                            : undefined
                        }
                        rel={
                          recommendation.CompanySocialsURL
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        onClick={(event: MouseEvent<HTMLElement>) =>
                          event.stopPropagation()
                        }
                        onKeyDown={(event: KeyboardEvent<HTMLElement>) =>
                          event.stopPropagation()
                        }
                        variant="subtitle1"
                        sx={{
                          textAlign: 'center',
                          display: 'block',
                          color: 'text.secondary',
                          textDecoration: 'none',
                          cursor: recommendation.CompanySocialsURL
                            ? 'pointer'
                            : 'inherit',
                          '&:visited': {
                            color: 'text.secondary',
                          },
                          '&:hover, &:focus': {
                            color: 'text.secondary',
                            textDecoration: 'none',
                          },
                        }}
                      >
                        {recommendation.company}
                      </Typography>
                    </Tooltip>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ textAlign: 'center' }}
                    >
                      {recommendation.title}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    {/* Public recommendation quote */}
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
              sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}
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

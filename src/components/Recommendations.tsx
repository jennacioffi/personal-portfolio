import { useEffect, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import {
  Alert,
  Box,
  Divider,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { RecommendationDialog } from '@components';
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

  useEffect(() => {
    fetchRecommendations()
      .then((data) => setRecommendations(data))
      .catch((fetchError: Error) => setError(fetchError.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Box
      component="section"
      aria-labelledby="recommendations-heading"
      sx={{ px: 2, pb: 6 }}
    >
      <Typography id="recommendations-heading" variant="h4" gutterBottom>
        Recommendations
      </Typography>

      {isLoading && (
        <LinearProgress
          aria-label="Loading recommendations"
          sx={{ width: '100%' }}
        />
      )}
      {error && <Alert severity="error">Unable to load recommendations.</Alert>}

      {!isLoading && !error && (
        <>
          <Divider sx={{ mb: 2 }} />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'left',
            }}
          >
            {Object.entries(recommendations).map(([name, recommendation]) => (
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
                  height: 'fit-content',
                  width: '100%',
                  border: 0,
                  textAlign: 'inherit',
                  font: 'inherit',
                  color: 'inherit',
                  cursor: 'pointer',
                  '&:hover': {
                    ...primaryColorGlowSx,
                  },
                }}
              >
                {/* Recommendation - NAME */}
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
                    target={recommendation.contactURL ? '_blank' : undefined}
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
                      cursor: recommendation.contactURL ? 'pointer' : 'inherit',
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

                {/* Recommendation - COMPANY AND TITLE */}
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
                      recommendation.CompanySocialsURL ? '_blank' : undefined
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
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  {recommendation.title}
                </Typography>

                <Divider sx={{ my: 1 }} />

                {/* Recommendation - QUOTE */}
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                  {recommendation.quote}
                </Typography>
              </Paper>
            ))}
          </Box>
        </>
      )}

      <RecommendationDialog
        selectedRecommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
    </Box>
  );
}

export default Recommendations;

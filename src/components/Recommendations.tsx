import { useState } from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { recommendations } from '@data';
import { RecommendationDialog, type SelectedRecommendation } from '@components';
import { primaryColorGlowSx } from '@utils/styles';

function Recommendations() {
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<SelectedRecommendation | null>(null);

  return (
    <Box
      component="section"
      aria-labelledby="recommendations-heading"
      sx={{ px: 2, pb: 6 }}
    >
      <Typography id="recommendations-heading" variant="h4" gutterBottom>
        Recommendations
      </Typography>

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
            onClick={() => setSelectedRecommendation({ name, recommendation })}
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
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
              }}
            >
              {name}
            </Typography>

            {/* Recommendation - COMPANY AND TITLE */}
            <Typography
              component="a"
              href={recommendation.CompanySocialsURL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
              variant="subtitle1"
              sx={{
                textAlign: 'center',
                display: 'block',
                color: 'text.secondary',
                textDecoration: 'none',
                cursor: 'pointer',
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

      <RecommendationDialog
        selectedRecommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
    </Box>
  );
}

export default Recommendations;

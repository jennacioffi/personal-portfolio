import { Box, Paper, Typography } from '@mui/material';
import { recommendations } from '@data';

function Recommendations() {
  return (
    <Box
      component="section"
      aria-labelledby="recommendations-heading"
      sx={{ px: 2, pb: 6 }}
    >
      <Typography id="recommendations-heading" component="h2">
        Recommendations
      </Typography>

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
            elevation={8}
            sx={{
              p: 2,
              height: 'fit-content',
              '&:hover': {
                boxShadow: (theme) =>
                  `0 8px 24px ${theme.palette.primary.main}`,
              },
            }}
          >
            <Typography component="h3">{name}</Typography>
            <Typography color="text.secondary">
              {recommendation.company} | {recommendation.title}
            </Typography>
            <Typography component="blockquote" sx={{ m: 0 }}>
              {recommendation.quote}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default Recommendations;

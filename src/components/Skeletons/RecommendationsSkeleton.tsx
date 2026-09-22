import { Box, Divider, Paper, Skeleton } from '@mui/material';

function RecommendationsSkeleton() {
  return (
    <Box
      aria-label="Loading recommendations"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: 2,
        textAlign: 'center',
      }}
    >
      {/* Show three placeholders to match the loaded recommendation cards. */}
      {[0, 1, 2].map((card) => (
        <Paper
          key={card}
          elevation={8}
          sx={{ p: 2, minWidth: 0, textAlign: 'center' }}
        >
          <Skeleton variant="text" width="65%" sx={{ mx: 'auto' }} />
          <Skeleton variant="text" width="75%" sx={{ mx: 'auto' }} />
          <Skeleton variant="text" width="55%" sx={{ mx: 'auto' }} />
          <Divider sx={{ my: 1 }} />
          <Skeleton variant="text" width="100%" sx={{ mx: 'auto' }} />
          <Skeleton variant="text" width="95%" sx={{ mx: 'auto' }} />
          <Skeleton variant="text" width="80%" sx={{ mx: 'auto' }} />
        </Paper>
      ))}
    </Box>
  );
}

export default RecommendationsSkeleton;

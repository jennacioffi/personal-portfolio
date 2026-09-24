import { Stack, Typography, IconButton } from '@mui/material';
import { Info } from '@mui/icons-material';
import { CareerTimeline } from '@components';

function PortfolioPage() {
  return (
    <>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Header W/ Info Icon */}
        <Stack
          spacing={2}
          direction="row"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <IconButton
            size="small"
            sx={{
              p: 1,
              '&:hover': {
                color: 'secondary.main',
              },
            }}
          >
            <Info />
          </IconButton>
          <Typography variant="h4" component="h1">
            Seamless UI Designs
          </Typography>
        </Stack>

        {/* Timeline */}
        <CareerTimeline />
      </Stack>
    </>
  );
}

export default PortfolioPage;

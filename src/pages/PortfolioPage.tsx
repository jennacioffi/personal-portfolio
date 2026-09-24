import { Stack, Typography, IconButton } from '@mui/material';
import { Info } from '@mui/icons-material';
import { Timeline } from '@components';

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
            }}
          >
            <Info />
          </IconButton>
          <Typography variant="h4" component="h1">
            Seamless UI Designs
          </Typography>
        </Stack>

        {/* Timeline */}
        <Timeline />
      </Stack>
    </>
  );
}

export default PortfolioPage;

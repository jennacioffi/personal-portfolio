import { Container, Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

function Portfolio() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          gap: 2,
          py: 6,
        }}
      >
        <ConstructionIcon
          sx={{ fontSize: 48, color: (theme) => theme.palette.warning.main }}
        />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          UNDER CONSTRUCTION
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          This page is under construction. Come back later!
        </Typography>
      </Box>
    </Container>
  );
}

export default Portfolio;

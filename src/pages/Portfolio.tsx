import { Container, Box } from '@mui/material';

function Portfolio() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <h1>Portfolio</h1>
        <p>
          Showcase your work and projects here. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </p>
      </Box>
    </Container>
  );
}

export default Portfolio;

import { Box, Paper } from '@mui/material';
import { profile } from '@data';

function HomePage() {
  const { name, profileImage } = profile;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {/* Profile Picture */}
        <Box
          component={Paper}
          elevation={6}
          sx={{
            borderRadius: 2,
            padding: 0.75,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            backgroundColor: (theme) => theme.palette.secondary.main,
          }}
        >
          <img
            src={profileImage}
            alt={name}
            style={{
              maxHeight: 400,
            }}
          />
        </Box>

        {/* Profile Information */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Box>
    </>
  );
}

export default HomePage;

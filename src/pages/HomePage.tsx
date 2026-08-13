import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { profile } from '@data';

function HomePage() {
  const { name, title, bio, profileImage, socials } = profile;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        gap: 4,
        py: 4,
        px: 2,
      }}
    >
      {/* Profile Picture */}
      <Box
        component={Paper}
        elevation={6}
        sx={{
          borderRadius: 2,
          padding: 1,
          backgroundColor: (theme) => theme.palette.secondary.main,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <img
          src={profileImage}
          alt={name}
          style={{
            maxHeight: 350,
            maxWidth: 350,
          }}
        />
      </Box>

      {/* Info Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
        }}
      >
        {/* Name */}
        <Typography variant="h2" component="h1">
          {name}
        </Typography>

        {/* Title */}
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: (theme) => theme.palette.secondary.main,
            textTransform: 'uppercase',
            letterSpacing: 2,
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>

        {/* Bio */}
        <Typography
          variant="body1"
          sx={{
            maxWidth: 450,
            textAlign: 'center',
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {bio}
        </Typography>

        {/* Socials */}
        <Stack
          spacing={2}
          direction="row"
          sx={{ mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Button
            component="a"
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<GitHubIcon />}
            sx={{
              borderColor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.secondary.main,
              '&:hover': {
                borderColor: (theme) => theme.palette.secondary.main,
                backgroundColor: (theme) => `${theme.palette.secondary.main}20`,
              },
              px: 4,
              py: 1.5,
            }}
          >
            GITHUB
          </Button>
          <Button
            component="a"
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<LinkedInIcon />}
            sx={{
              borderColor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.secondary.main,
              '&:hover': {
                borderColor: (theme) => theme.palette.secondary.main,
                backgroundColor: (theme) => `${theme.palette.secondary.main}20`,
              },
              px: 4,
              py: 1.5,
            }}
          >
            LINKEDIN
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default HomePage;

import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ConstructionIcon from '@mui/icons-material/Construction';
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
            maxHeight: 300,
            maxWidth: 300,
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

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
          mb: 2,
          textAlign: 'center',
          gap: 1,
        }}
      >
        <ConstructionIcon
          sx={{ fontSize: 40, color: (theme) => theme.palette.warning.main }}
        />
        <Typography variant="h4" component="h3" sx={{ fontWeight: 700 }}>
          UNDER CONSTRUCTION
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          This page is under construction. Come back later!
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;

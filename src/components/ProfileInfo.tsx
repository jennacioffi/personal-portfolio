import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import type { Profile } from '@types';
import { fetchProfile } from '@utils';
import { buttonSx } from '@utils/styles';
import { RickRoll } from '@components';

function ProfileInfo() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    fetchProfile()
      .then((data) => setProfile(data))
      .catch((fetchError: Error) => setError(fetchError.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LinearProgress aria-label="Loading profile" />;
  }

  if (error || !profile) {
    return <Alert severity="error">Unable to load profile.</Alert>;
  }

  const { bio, name, profile_image, socials, title } = profile;

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
        <Box
          component="button"
          type="button"
          onClick={(event) => {
            event.currentTarget.blur();
            setIsVideoOpen(true);
          }}
          aria-label="Open video"
          sx={{
            border: 0,
            padding: 0,
            background: 'none',
            cursor: 'pointer',
          }}
        >
          <img
            src={profile_image}
            alt={name}
            style={{
              maxHeight: 350,
              maxWidth: 350,
            }}
          />
        </Box>
      </Box>

      <RickRoll open={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

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
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            component="a"
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            startIcon={<GitHubIcon />}
            sx={buttonSx}
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
            sx={buttonSx}
          >
            LINKEDIN
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default ProfileInfo;

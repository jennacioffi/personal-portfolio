import { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import type { Profile } from '@types';
import { fetchProfile } from '@utils';
import { buttonSx } from '@utils/styles';
import { ErrorFetching, ProfileSkeleton, RickRoll } from '@components';

function ProfileInfo() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    // Fetch the profile row when this component first appears.
    fetchProfile()
      .then((data) => setProfile(data))
      .catch((fetchError: Error) => setError(fetchError.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    // Show the approximate profile layout while the database request is pending.
    return <ProfileSkeleton />;
  }

  if (error || !profile) {
    // Show a friendly fallback if the profile cannot be loaded.
    return <ErrorFetching message="Unable to load profile." />;
  }

  const { bio, name, profile_image, socials, title } = profile;

  return (
    // Display the loaded profile information and interactive controls.
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
      {/* Profile image; clicking it opens the video dialog. */}
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

      {/* Text and social links loaded from the profile table. */}
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
        {/* Profile name */}
        <Typography variant="h2" component="h1">
          {name}
        </Typography>

        {/* Professional title */}
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

        {/* Short professional biography */}
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

        {/* External social profile links */}
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

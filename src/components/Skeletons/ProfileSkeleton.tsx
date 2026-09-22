import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Button, Skeleton, Stack } from '@mui/material';

function ProfileSkeleton() {
  return (
    <Box
      aria-label="Loading profile"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 4,
        py: 4,
        px: 2,
      }}
    >
      {/* Placeholder for the profile image. */}
      <Skeleton variant="rectangular" width={350} height={350} />

      {/* Placeholders for the name, title, bio, and social buttons. */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: 'min(100%, 450px)',
        }}
      >
        <Skeleton variant="text" width="65%" height={64} />
        <Skeleton variant="text" width="45%" height={36} />
        <Skeleton variant="text" width="100%" height={72} />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button disabled variant="outlined" startIcon={<GitHubIcon />}>
            GITHUB
          </Button>
          <Button disabled variant="outlined" startIcon={<LinkedInIcon />}>
            LINKEDIN
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default ProfileSkeleton;

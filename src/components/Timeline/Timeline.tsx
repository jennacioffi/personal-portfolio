import {
  Stack,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';

function Timeline() {
  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Search Bar */}
      {/* TODO: Implement search functionality */}
      <TextField
        label="Search Timeline..."
        placeholder="Search Timeline..."
        variant="outlined"
        fullWidth
        color="secondary"
        sx={{
          width: '50%',
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* TimeLine */}
      <Box>
        <Typography variant="body1">temp filler</Typography>
      </Box>
    </Stack>
  );
}

export default Timeline;

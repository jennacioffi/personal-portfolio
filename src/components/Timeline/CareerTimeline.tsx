import { useEffect, useState } from 'react';
// Local Imports
import type { Career } from '@types';
import { TimelineCard } from '@components';
// MUI Imports
import {
  Stack,
  Box,
  TextField,
  InputAdornment,
  LinearProgress,
} from '@mui/material';
import { Search, Work } from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import { fetchCareers } from '@utils/services';
import { ErrorFetching } from '@components';

function CareerTimeline() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the profile row when this component first appears.
    fetchCareers()
      .then((data) => setCareers(data))
      .catch((fetchError: Error) => setError(fetchError.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (error) {
    // Show a friendly fallback if the profile cannot be loaded.
    return <ErrorFetching message="Unable to load careers timeline." />;
  }

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
        disabled={isLoading}
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

      {isLoading ? (
        <>
          {/* Loading Indicator */}
          {/* TODO: Add Skeleton Loading */}
          <Box sx={{ width: '100%' }}>
            <LinearProgress aria-label="Loading…" />
          </Box>
        </>
      ) : (
        <>
          {/* TimeLine */}
          <Timeline position="alternate" sx={{ width: '100%' }}>
            {careers.map((career) => (
              <TimelineItem key={career.id}>
                {/* Middle Content */}
                <TimelineSeparator
                  sx={{
                    color: 'secondary.main',
                  }}
                >
                  <TimelineDot color="secondary">
                    <Work />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>

                {/* Timeline Card */}
                <TimelineContent key={career.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <TimelineCard career={career} />
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </>
      )}
    </Stack>
  );
}

export default CareerTimeline;

import { useEffect, useMemo, useState } from 'react';

import type { Career, Project, CareerTimeLine } from '@types';

import {
  Stack,
  TextField,
  InputAdornment,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Search } from '@mui/icons-material';

import Timeline from '@mui/lab/Timeline';

import {
  ErrorFetching,
  CareerTimelineGroup,
  MobileCareerTimeline,
} from '@components';

import { fetchCareers, fetchProjects } from '@utils/services';

const TIMELINE_MOBILE_BREAKPOINT = 'md';

function CareerTimeline() {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down(TIMELINE_MOBILE_BREAKPOINT)
  );

  const [careers, setCareers] = useState<Career[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchCareers(), fetchProjects()])
      .then(([careerData, projectData]) => {
        setCareers(careerData);
        setProjects(projectData);
        console.log('Careers', careerData);
        console.log('Projects', projectData);
      })
      .catch((fetchError: Error) => {
        setError(fetchError.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const timelineData = useMemo<CareerTimeLine[]>(
    () =>
      [...careers]
        .sort(
          (a, b) =>
            new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        )
        .map((career) => ({
          career,
          projects: projects
            .filter((project) => project.career_id === career.id)
            .sort(
              (a, b) =>
                new Date(b.start_date).getTime() -
                new Date(a.start_date).getTime()
            ),
        })),
    [careers, projects]
  );

  if (error) {
    return <ErrorFetching message="Unable to load careers timeline." />;
  }

  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        pb: 2,
      }}
    >
      <TextField
        label="Search Timeline..."
        placeholder="Search Timeline..."
        variant="outlined"
        fullWidth
        color="secondary"
        disabled={isLoading}
        sx={{
          width: {
            xs: '90%',
            md: '50%',
          },
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
        <CircularProgress aria-label="Loading…" />
      ) : isMobile ? (
        <MobileCareerTimeline timelineData={timelineData} />
      ) : (
        <Timeline
          position="alternate"
          sx={{
            width: '100%',
            px: 0,
          }}
        >
          {timelineData.map(({ career, projects }, index) => (
            <CareerTimelineGroup
              key={career.id}
              career={career}
              projects={projects}
              isLastCareer={index === timelineData.length - 1}
            />
          ))}
        </Timeline>
      )}
    </Stack>
  );
}

export default CareerTimeline;

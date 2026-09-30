import { useEffect, useMemo, useState } from 'react';

import type { Career, Project, CareerTimeLine } from '@types';

import { TimelineCard, ErrorFetching } from '@components';

import {
  Stack,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  useTheme,
} from '@mui/material';

import { Search, Work, Assignment } from '@mui/icons-material';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';

import { fetchCareers, fetchProjects } from '@utils/services';

function CareerTimeline() {
  const theme = useTheme();
  const mobileBreakpoint = theme.breakpoints.down('md');

  const [careers, setCareers] = useState<Career[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCareers()
      .then((data) => setCareers(data))
      .catch((fetchError: Error) => setError(fetchError.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data))
      .catch((fetchError: Error) => setError(fetchError.message))
      .finally(() => setIsLoading(false));
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
      ) : (
        <Timeline
          position="alternate"
          sx={{
            width: '100%',
            px: {
              xs: 0,
              md: 2,
            },

            [`${mobileBreakpoint}`]: {
              '& .MuiTimelineItem-root': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 'auto',
                py: 1.5,
              },

              '& .MuiTimelineSeparator-root': {
                height: 'auto',
              },

              '& .MuiTimelineConnector-root': {
                display: 'none',
              },

              '& .MuiTimelineContent-root': {
                width: '100%',
                padding: 0,
                marginTop: 1,
                textAlign: 'center',
              },
            },

            '& .MuiTimelineContent-root': {
              px: {
                xs: 0,
                md: 1,
              },
            },
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

type CareerTimelineGroupProps = {
  career: Career;
  projects: Project[];
  isLastCareer: boolean;
};

function CareerTimelineGroup({
  career,
  projects,
  isLastCareer,
}: CareerTimelineGroupProps) {
  const hasProjects = projects.length > 0;

  const isFinalCareerItem = isLastCareer && !hasProjects;

  return (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <Work />
          </TimelineDot>

          {!isFinalCareerItem && <TimelineConnector />}
        </TimelineSeparator>

        <TimelineContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <TimelineCard type="career" data={career} />
          </Box>
        </TimelineContent>
      </TimelineItem>

      {projects.map((project, index) => {
        const isFinalTimelineItem =
          isLastCareer && index === projects.length - 1;

        return (
          <TimelineItem key={`project-${project.id}`}>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <Assignment />
              </TimelineDot>

              {!isFinalTimelineItem && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <TimelineCard type="project" data={project} />
              </Box>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </>
  );
}

export default CareerTimeline;

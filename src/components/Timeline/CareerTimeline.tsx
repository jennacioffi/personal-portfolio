import { useEffect, useMemo, useState } from 'react';

import type { Career, Project, CareerTimeLine } from '@types';

import {
  Stack,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
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
const SEARCH_DEBOUNCE_MS = 500;

function CareerTimeline() {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down(TIMELINE_MOBILE_BREAKPOINT)
  );

  const [careers, setCareers] = useState<Career[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchCareers(), fetchProjects()])
      .then(([careerData, projectData]) => {
        setCareers(careerData);
        setProjects(projectData);
      })
      .catch((fetchError: Error) => {
        setError(fetchError.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSearching(true);
      setDebouncedSearch(search.trim().toLowerCase());
      setIsSearching(false);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

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
                new Date(b.start_date ?? 0).getTime() -
                new Date(a.start_date ?? 0).getTime()
            ),
        })),
    [careers, projects]
  );

  const filteredTimelineData = useMemo(() => {
    if (!debouncedSearch) {
      return timelineData;
    }

    return timelineData.reduce<CareerTimeLine[]>((results, timeline) => {
      const { career, projects } = timeline;

      const careerMatches = [
        career.company,
        career.title,
        career.description,
        ...(Array.isArray(career.skills) ? career.skills : []),
      ].some((value) =>
        String(value ?? '')
          .toLowerCase()
          .includes(debouncedSearch)
      );

      const matchingProjects = projects.filter((project) =>
        [
          project.name,
          project.description,
          ...(Array.isArray(project.skills) ? project.skills : []),
        ].some((value) =>
          String(value ?? '')
            .toLowerCase()
            .includes(debouncedSearch)
        )
      );

      if (careerMatches || matchingProjects.length > 0) {
        results.push({
          career,
          projects: matchingProjects,
        });
      }

      return results;
    }, []);
  }, [timelineData, debouncedSearch]);

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
        label="Search by company, title, project, skill, or description"
        variant="outlined"
        fullWidth
        color="secondary"
        disabled={isLoading}
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
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
            endAdornment: isSearching ? (
              <InputAdornment position="end">
                <CircularProgress
                  size={20}
                  sx={{
                    color: 'secondary.main',
                  }}
                />
              </InputAdornment>
            ) : null,
          },
        }}
      />

      {isLoading ? (
        <CircularProgress aria-label="Loading…" />
      ) : filteredTimelineData.length === 0 ? (
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          No Results
        </Typography>
      ) : isMobile ? (
        <MobileCareerTimeline timelineData={filteredTimelineData} />
      ) : (
        <Timeline
          position="alternate"
          sx={{
            width: '100%',
            px: 0,
          }}
        >
          {filteredTimelineData.map(({ career, projects }, index) => (
            <CareerTimelineGroup
              key={career.id}
              career={career}
              projects={projects}
              isLastCareer={index === filteredTimelineData.length - 1}
            />
          ))}
        </Timeline>
      )}
    </Stack>
  );
}

export default CareerTimeline;

import { Stack } from '@mui/material';

import { Work, Assignment } from '@mui/icons-material';

import type { CareerTimeLine } from '@types';

import { TimelineCard } from '@components';

type MobileCareerTimelineProps = {
  timelineData: CareerTimeLine[];
};

function MobileCareerTimeline({ timelineData }: MobileCareerTimelineProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      {timelineData.map(({ career, projects }) => (
        <Stack
          key={career.id}
          spacing={1.5}
          sx={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Work color="secondary" />

          <TimelineCard type="career" data={career} />

          {projects.map((project) => (
            <Stack
              key={`project-${project.id}`}
              spacing={1.5}
              sx={{
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Assignment color="secondary" />

              <TimelineCard type="project" data={project} />
            </Stack>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}

export default MobileCareerTimeline;

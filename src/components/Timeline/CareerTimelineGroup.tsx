import { Box } from '@mui/material';

import { Work, Assignment } from '@mui/icons-material';

import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';

import type { Career, Project } from '@types';

import { TimelineCard } from '@components';

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

export default CareerTimelineGroup;

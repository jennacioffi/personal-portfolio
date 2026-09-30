import { Paper, Card, Typography, Divider, Stack, Chip } from '@mui/material';

import { Event } from '@mui/icons-material';

import type { CareerTimeLine, Project } from '@types';

import { primaryColorGlowSx } from '@utils';

type TimelineCardProps =
  | {
      type: 'career';
      data: CareerTimeLine['career'];
    }
  | {
      type: 'project';
      data: Project;
    };

function formatDate(date: string | null) {
  if (!date) {
    return '';
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateRange(startDate: string | null, endDate: string | null) {
  const formatStart = formatDate(startDate);
  const formatEnd = formatDate(endDate);

  if (!formatStart && !formatEnd) {
    return null;
  }

  if (!formatStart) {
    return formatEnd;
  }

  if (!formatEnd) {
    return formatStart;
  }

  return `${formatStart} - ${formatEnd}`;
}

function TimelineCard({ type, data }: TimelineCardProps) {
  const isCareer = type === 'career';

  const dateRange = formatDateRange(data.start_date, data.end_date);

  const skills = Array.isArray(data.skills) ? data.skills : [];

  const subtitle = isCareer ? 'Career' : 'Project';

  return (
    <Paper
      elevation={10}
      sx={{
        display: 'flex',
        maxWidth: isCareer ? 450 : 400,
        width: 'fit-content',
        borderRadius: 2,
        '&:hover': {
          ...primaryColorGlowSx,
        },
      }}
    >
      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          width: '100%',
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
          }}
        >
          {isCareer ? data.company : data.name}
        </Typography>

        {/* Career / Project label */}
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          {subtitle}
        </Typography>

        {/* Description - Projects only */}
        {!isCareer && (
          <>
            <Divider sx={{ mb: 1, mt: 1 }} />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: 'center',
              }}
            >
              {data.description}
            </Typography>
          </>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              sx={{
                justifyContent: 'center',
                flexWrap: 'wrap',
                width: '100%',
                maxHeight: 75,
                overflowY: 'scroll',
              }}
            >
              {skills.map((skill) => (
                <Chip key={skill} label={skill} size="small" color="primary" />
              ))}
            </Stack>
          </>
        )}

        {/* Dates */}
        {dateRange && (
          <>
            <Divider sx={{ my: 2 }} />

            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Event />

              <Typography variant="body2">{dateRange}</Typography>
            </Stack>
          </>
        )}
      </Card>
    </Paper>
  );
}

export default TimelineCard;

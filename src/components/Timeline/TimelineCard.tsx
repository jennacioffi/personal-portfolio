import { Stack, Paper, Card, Typography, Divider } from '@mui/material';
import { Event } from '@mui/icons-material';
import type { Career } from '@types';
import { primaryColorGlowSx } from '@utils';

function TimelineCard({ career }: { career: Career }) {
  const {
    company,
    title,
    // start_date, end_date, description, link, skills
  } = career;

  return (
    <Paper
      elevation={10}
      sx={{
        display: 'flex',
        maxWidth: 450,
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
        }}
      >
        {/* Company & Link */}
        <>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: 'center',
            }}
          >
            {company}
          </Typography>
        </>

        {/* Title */}
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ textAlign: 'center' }}
        >
          {title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Start - End Dates */}
        <Stack
          direction="row"
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {/* Icon */}
          <Event />

          {/* Start Date */}

          {/* End Date */}
        </Stack>
      </Card>
    </Paper>
  );
}

export default TimelineCard;

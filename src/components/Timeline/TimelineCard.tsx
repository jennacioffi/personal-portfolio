import { Paper, Card, Typography } from '@mui/material';
import type { Career } from '@types';
import { primaryColorGlowSx } from '@utils';

function TimelineCard({ career }: { career: Career }) {
  const { company, title, start_date, end_date, description, link, skills } =
    career;

  return (
    <Paper
      elevation={10}
      sx={{
        display: 'flex',
        maxWidth: 400,
        width: 'fit-content',
        borderRadius: 2,
        '&:hover': {
          ...primaryColorGlowSx,
        },
      }}
    >
      <Card
        sx={{
          p: 1,
          borderRadius: 2,
        }}
      >
        <Typography variant="body1">
          {company} - {title} - {start_date} - {end_date} - {description} -{' '}
          {link} - {skills.join(', ')}
        </Typography>
      </Card>
    </Paper>
  );
}

export default TimelineCard;

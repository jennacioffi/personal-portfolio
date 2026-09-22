import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { recommendations } from '@data';
import { primaryColorGlowSx } from '@utils/styles';

export type Recommendation =
  (typeof recommendations)[keyof typeof recommendations];
export type SelectedRecommendation = {
  name: string;
  recommendation: Recommendation;
};

const sensitiveDataPattern =
  /(?:\+?\d[\d\s().-]{7,}\d|[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,})/g;
const addressPattern =
  /^\s*\d+\s+.*\b(?:street|st\.?|road|rd\.?|avenue|ave\.?|boulevard|blvd\.?|drive|dr\.?|lane|ln\.?|way)\b/i;

function RedactedLine({ line }: { line: string }) {
  if (addressPattern.test(line)) {
    return (
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          width: 'min(100%, 20rem)',
          height: '1em',
          bgcolor: 'common.black',
          verticalAlign: 'middle',
        }}
      />
    );
  }

  const parts = [];
  let lastIndex = 0;

  for (const match of line.matchAll(sensitiveDataPattern)) {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      parts.push(line.slice(lastIndex, matchIndex));
    }

    parts.push(
      <Box
        component="span"
        key={`${matchIndex}-${match[0]}`}
        aria-label="Sensitive information redacted"
        sx={{
          display: 'inline-block',
          width: `${Math.max(match[0].length, 6)}ch`,
          height: '1em',
          bgcolor: 'common.black',
          verticalAlign: 'middle',
        }}
      />
    );
    lastIndex = matchIndex + match[0].length;
  }

  parts.push(line.slice(lastIndex));
  return parts;
}

type RecommendationDialogProps = {
  selectedRecommendation: SelectedRecommendation | null;
  onClose: () => void;
};

function RecommendationDialog({
  selectedRecommendation,
  onClose,
}: RecommendationDialogProps) {
  return (
    <Dialog
      open={selectedRecommendation !== null}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: primaryColorGlowSx,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        {selectedRecommendation?.name}'s Recommendation
        <IconButton
          aria-label="Close original recommendation"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {selectedRecommendation?.recommendation.originalData.map(
          (line, index) =>
            line ? (
              <Typography key={`${line}-${index}`} component="p" sx={{ mb: 2 }}>
                <RedactedLine line={line} />
              </Typography>
            ) : (
              <Box key={`blank-${index}`} sx={{ height: 1 }} />
            )
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RecommendationDialog;

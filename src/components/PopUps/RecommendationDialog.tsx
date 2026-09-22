import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import type { SelectedRecommendation } from '@types';
import { primaryColorGlowSx } from '@utils/styles';

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
                {line}
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

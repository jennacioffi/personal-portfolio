import { LinkedIn } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
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
  const handleViewLinkedIn = () => {
    if (!selectedRecommendation?.recommendation?.contactURL) {
      return null;
    }
    window.open(selectedRecommendation?.recommendation?.contactURL, '_blank');
  };
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
      <DialogTitle sx={{ textAlign: 'center', width: '95%' }}>
        {selectedRecommendation?.name}'s Recommendation
        <IconButton
          aria-label="Close original recommendation"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
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
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          py: 1,
        }}
      >
        <Button
          autoFocus
          variant="contained"
          onClick={handleViewLinkedIn}
          startIcon={<LinkedIn />}
          sx={{
            width: 'fit-content',
          }}
        >
          Contact via LinkedIn
        </Button>
      </Box>

      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default RecommendationDialog;

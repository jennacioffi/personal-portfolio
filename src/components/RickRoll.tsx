import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type RickRollProps = {
  open: boolean;
  onClose: () => void;
};

function RickRoll({ open, onClose }: RickRollProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton
        aria-label="Close video"
        onClick={onClose}
        sx={{ alignSelf: 'flex-end' }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: 0 }}>
        <Box
          component="iframe"
          title="YouTube video"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          sx={{
            width: '100%',
            aspectRatio: '16 / 9',
            border: 0,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
}

export default RickRoll;

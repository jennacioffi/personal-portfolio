import { Alert, Box } from '@mui/material';
import type { AlertColor } from '@mui/material';

type ErrorFetchingProps = {
  message?: string;
  severity?: AlertColor;
};

function ErrorFetching({
  message = 'Failed to Load',
  severity = 'error',
}: ErrorFetchingProps) {
  return (
    <Box
      role="alert"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 120,
        textAlign: 'center',
      }}
    >
      <Alert severity={severity} variant="outlined">
        {message}
      </Alert>
    </Box>
  );
}

export default ErrorFetching;

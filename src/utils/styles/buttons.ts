import type { SxProps, Theme } from '@mui/material/styles';

export const buttonSx: SxProps<Theme> = {
  borderColor: (theme) => theme.palette.secondary.main,
  color: (theme) => theme.palette.secondary.main,
  '&:hover': {
    borderColor: (theme) => theme.palette.secondary.main,
    backgroundColor: (theme) => `${theme.palette.secondary.main}20`,
  },
  px: 4,
  py: 1.5,
};

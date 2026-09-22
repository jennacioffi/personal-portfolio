import type { Theme } from '@mui/material/styles';
import type { SystemStyleObject } from '@mui/system';

export const primaryColorGlowSx: SystemStyleObject<Theme> = {
  boxShadow: (theme) => `0 0 24px 4px ${theme.palette.primary.main}`,
};

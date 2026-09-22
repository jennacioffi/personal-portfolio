import { AppBar, Toolbar, Button, Stack } from '@mui/material';
import { FolderSpecial, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function TopNav() {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction="row" spacing={2}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit" startIcon={<Home />}>
              Home
            </Button>
          </Link>
          <Link
            to="/portfolio"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button color="inherit" startIcon={<FolderSpecial />}>
              Portfolio
            </Button>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;

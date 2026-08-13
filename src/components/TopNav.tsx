import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function TopNav() {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link
          to="/portfolio"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Button color="inherit">Portfolio</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;

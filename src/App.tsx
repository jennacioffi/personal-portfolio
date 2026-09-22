import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { TopNav } from '@components';
import { HomePage, Portfolio } from '@pages';

function App() {
  return (
    <HashRouter>
      <TopNav />
      <Container maxWidth="lg" sx={{ textAlign: 'center', paddingTop: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;

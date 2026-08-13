import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { TopNav } from '@components';
import { HomePage, Portfolio } from '@pages';

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Container maxWidth="lg" sx={{ textAlign: 'center', paddingTop: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

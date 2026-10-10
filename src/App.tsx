import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LandingPage } from './pages/LandingPage';
import { TradingTerminal } from './pages/TradingTerminal';

function AppRoutes() {
  const navigate = useNavigate();
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPage onEnter={() => navigate('/terminal/command')} />} />
        <Route path="/terminal" element={<Navigate to="/terminal/command" replace />} />
        <Route path="/terminal/:tab" element={<TradingTerminal />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

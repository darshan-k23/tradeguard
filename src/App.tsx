import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LandingPage } from './pages/LandingPage';
import { TradingTerminal } from './pages/TradingTerminal';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage onEnter={() => { window.location.href = '/terminal/command' }} />} />
          <Route path="/terminal" element={<Navigate to="/terminal/command" replace />} />
          <Route path="/terminal/:tab" element={<TradingTerminal />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;

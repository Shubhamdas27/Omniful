import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppRouter from './components/AppRouter';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <AppRouter />
          </AnimatePresence>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
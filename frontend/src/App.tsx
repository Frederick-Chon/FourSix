import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Coffee from './pages/Coffee';
import Settings from './pages/Settings';
import WelcomeScreen from './components/welcome-screen/welcome-screen';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const dismissWelcome = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcome(false);
  };

  return (
    <Router>
      {showWelcome ? (
        <WelcomeScreen onDismiss={dismissWelcome} />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="notes" element={<Notes />} />
            <Route path="coffee" element={<Coffee />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
};

export default App;

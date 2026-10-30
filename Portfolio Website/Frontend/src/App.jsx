import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicPortfolio from './components/PublicPortfolio';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hitesh_portfolio_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hitesh_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Routes>
      {/* Pure Public Portfolio */}
      <Route
        path="/"
        element={<PublicPortfolio theme={theme} onToggleTheme={toggleTheme} />}
      />

      {/* Fallback redirects all other paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

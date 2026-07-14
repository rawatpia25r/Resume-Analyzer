import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

export const ThemeContext = createContext();

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeProvider = ({ children }) => {
  const [themePref, setThemePref] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Resolved theme (what actually applies)
  const resolvedTheme = themePref === 'system' ? getSystemTheme() : themePref;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem('theme', themePref);
  }, [themePref, resolvedTheme]);

  // Listen for system theme changes when pref is 'system'
  useEffect(() => {
    if (themePref !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      document.documentElement.setAttribute('data-theme', getSystemTheme());
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [themePref]);

  const toggleTheme = useCallback(() => {
    setThemePref(prev => {
      if (prev === 'system') return 'light';
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, []);

  const setTheme = useCallback((value) => {
    setThemePref(value);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, themePref, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

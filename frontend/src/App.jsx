import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import PageTransitionWrapper from './components/PageTransitionWrapper';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeDetail from './pages/ResumeDetail';
import CoverLetterPage from './pages/CoverLetterPage';
import JobMatch from './pages/JobMatch';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';

// Public layout wrapper (home, login, register)
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Navbar />
      <div className="flex-grow">{children}</div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageTransitionWrapper><PublicLayout><Home /></PublicLayout></PageTransitionWrapper>} />
        <Route path="/login" element={<PageTransitionWrapper><PublicLayout><Login /></PublicLayout></PageTransitionWrapper>} />
        <Route path="/register" element={<PageTransitionWrapper><PublicLayout><Register /></PublicLayout></PageTransitionWrapper>} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <PageTransitionWrapper><Layout><Dashboard /></Layout></PageTransitionWrapper>
          </ProtectedRoute>
        } />
        <Route path="/resume/:id" element={
          <ProtectedRoute>
            <PageTransitionWrapper><Layout><ResumeDetail /></Layout></PageTransitionWrapper>
          </ProtectedRoute>
        } />
        <Route path="/cover-letter" element={
          <ProtectedRoute>
            <PageTransitionWrapper><Layout><CoverLetterPage /></Layout></PageTransitionWrapper>
          </ProtectedRoute>
        } />
        <Route path="/resume-builder" element={
          <ProtectedRoute>
            <PageTransitionWrapper><Layout><ResumeBuilderPage /></Layout></PageTransitionWrapper>
          </ProtectedRoute>
        } />
        <Route path="/job-match" element={
          <ProtectedRoute>
            <PageTransitionWrapper><Layout><JobMatch /></Layout></PageTransitionWrapper>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <PageTransitionWrapper><Layout><ProfilePage /></Layout></PageTransitionWrapper>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <PageTransitionWrapper><Layout><SettingsPage /></Layout></PageTransitionWrapper>
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--bg-card-solid)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              backdropFilter: 'blur(16px)',
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: '14px',
            },
          }}
        />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeDetail from './pages/ResumeDetail';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Footer from './components/Footer';

// Public layout with old navbar/footer
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#06090F] text-[#E2E8F0]">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        
        {/* Protected Routes (Dashboard Layout) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/resume/:id" element={
          <ProtectedRoute>
            <Layout>
              <ResumeDetail />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/resume-builder" element={
          <ProtectedRoute>
            <Layout>
              <ResumeBuilderPage />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" toastOptions={{
        style: { background: '#0E131F', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }
      }} />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
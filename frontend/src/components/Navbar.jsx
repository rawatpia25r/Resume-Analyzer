import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import BrandLogo from './BrandLogo';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy Logic
      const sections = ['home', 'features', 'how-it-works', 'why-choose-us', 'faq'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const NavItem = ({ id, label }) => {
    const isActive = activeSection === id && location.pathname === '/';
    return (
      <button 
        onClick={() => scrollTo(id)}
        className="relative px-2 py-1 text-[13px] font-bold uppercase tracking-wider transition-colors duration-300"
        style={{ color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)' }}
      >
        <span className="relative z-10 hover:text-[var(--color-primary)] transition-colors">{label}</span>
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, #60A5FA, #2563EB)' }}
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </button>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}
      style={{
        background: scrolled ? 'var(--bg-card)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className="flex items-center group transition-transform hover:scale-[1.02]">
          <BrandLogo size="lg" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem id="home" label="Home" />
          <NavItem id="features" label="Features" />
          <NavItem id="how-it-works" label="How it works" />
          <NavItem id="why-choose-us" label="Why Us" />
          <NavItem id="faq" label="FAQ" />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(96,165,250,0.1), rgba(37,99,235,0.05))',
                  color: 'var(--color-primary)',
                  border: '1px solid rgba(96,165,250,0.3)',
                }}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl transition-all"
                style={{ color: 'var(--text-secondary)', background: 'var(--bg-hover)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide rounded-xl transition-all hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="btn-primary text-[13px] uppercase tracking-wide px-7 py-3 flex items-center gap-2"
              >
                <Sparkles size={16} />
                Start for Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

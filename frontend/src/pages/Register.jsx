import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
        <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[20%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md my-8">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-premium p-8 sm:p-10 rounded-[2rem] shadow-2xl relative"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-white/50 text-sm">Join to save your analysis history and use the AI Builder</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-premium w-full pl-11 pr-4 py-3.5"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-premium w-full pl-11 pr-4 py-3.5"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-premium w-full pl-11 pr-4 py-3.5"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full py-4 mt-4 flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-white/50">
            Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

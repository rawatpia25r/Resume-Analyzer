import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import ResultDashboard from '../components/ResultDashboard';

const ResumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const { data } = await api.get(`/resume/${id}`);
      setResume(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load resume details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white/50">
          <Loader2 className="animate-spin text-purple-500" size={40} />
          <p className="font-medium tracking-wide">Loading analysis details...</p>
        </div>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl text-sm font-medium mb-4"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <ResultDashboard 
          result={resume.analysisData} 
          onReset={() => navigate('/dashboard')}
          resumeText={resume.resumeText}
        />
      </div>
    </div>
  );
};

export default ResumeDetail;

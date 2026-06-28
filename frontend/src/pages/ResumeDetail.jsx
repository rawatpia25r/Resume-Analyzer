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
      toast.error('Failed to load resume details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4" style={{ color: 'var(--text-muted)' }}>
          <Loader2 className="animate-spin" size={36} style={{ color: 'var(--color-primary)' }} />
          <p className="text-sm font-medium">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div>
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl mb-4 transition-all"
        style={{
          background: 'var(--bg-hover)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-secondary)',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <ArrowLeft size={15} />
        Back to Dashboard
      </button>

      <ResultDashboard
        result={resume.analysisData}
        onReset={() => navigate('/dashboard')}
        resumeText={resume.resumeText}
      />
    </div>
  );
};

export default ResumeDetail;

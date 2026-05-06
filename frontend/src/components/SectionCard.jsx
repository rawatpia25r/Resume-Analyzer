import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SectionCard({ title, data, index }) {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'good':
        return <CheckCircle2 className="text-success" size={24} />;
      case 'warning':
        return <AlertTriangle className="text-warning" size={24} />;
      case 'missing':
        return <XCircle className="text-danger" size={24} />;
      default:
        return null;
    }
  };

  const getBorderColor = (status) => {
    switch(status) {
      case 'good': return 'border-success/30';
      case 'warning': return 'border-warning/30';
      case 'missing': return 'border-danger/30';
      default: return 'border-white/10';
    }
  };

  const formattedTitle = title.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`bg-white/5 border ${getBorderColor(data.status)} rounded-xl p-5 hover:bg-white/10 transition-colors shadow-lg`}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-lg">{formattedTitle}</h4>
        {getStatusIcon(data.status)}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium">Score: {data.score}/10</span>
      </div>
      <p className="text-text/80 text-sm leading-relaxed">
        {data.feedback}
      </p>
    </motion.div>
  );
}

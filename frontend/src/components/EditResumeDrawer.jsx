import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, FileText } from 'lucide-react';

export default function EditResumeDrawer({ isOpen, onClose, data, onSave }) {
  // Use local state to handle edits before saving
  const [formData, setFormData] = React.useState(null);

  React.useEffect(() => {
    if (isOpen && data) {
      setFormData(JSON.parse(JSON.stringify(data))); // Deep copy
    }
  }, [isOpen, data]);

  if (!formData) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, subField, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index][subField] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const handleStringArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[110] w-full max-w-xl shadow-2xl flex flex-col"
            style={{ background: 'var(--bg-card-solid)', borderLeft: '1px solid var(--border-color)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.1)', color: '#60A5FA' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-heading" style={{ color: 'var(--text-primary)' }}>Edit Resume Content</h2>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Make manual adjustments before downloading</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {/* Personal Info */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#60A5FA' }}>Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                    <input type="text" value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} className="w-full input-premium py-2 px-3 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Email</label>
                      <input type="text" value={formData.email || ''} onChange={e => handleChange('email', e.target.value)} className="w-full input-premium py-2 px-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Phone</label>
                      <input type="text" value={formData.phone || ''} onChange={e => handleChange('phone', e.target.value)} className="w-full input-premium py-2 px-3 text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Location</label>
                      <input type="text" value={formData.location || ''} onChange={e => handleChange('location', e.target.value)} className="w-full input-premium py-2 px-3 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>LinkedIn</label>
                      <input type="text" value={formData.linkedin || ''} onChange={e => handleChange('linkedin', e.target.value)} className="w-full input-premium py-2 px-3 text-sm" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Summary */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#60A5FA' }}>Professional Summary</h3>
                <textarea
                  value={formData.summary || ''}
                  onChange={e => handleChange('summary', e.target.value)}
                  className="w-full input-premium py-3 px-3 text-sm resize-none h-32 leading-relaxed"
                />
              </section>

              {/* Experience */}
              {formData.experience?.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#60A5FA' }}>Experience</h3>
                  {formData.experience.map((exp, i) => (
                    <div key={i} className="p-4 rounded-xl space-y-3" style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-color)' }}>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Job Title</label>
                          <input type="text" value={exp.title || ''} onChange={e => handleArrayChange('experience', i, 'title', e.target.value)} className="w-full input-premium py-1.5 px-3 text-xs" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Company</label>
                          <input type="text" value={exp.company || ''} onChange={e => handleArrayChange('experience', i, 'company', e.target.value)} className="w-full input-premium py-1.5 px-3 text-xs" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Duration</label>
                        <input type="text" value={exp.duration || ''} onChange={e => handleArrayChange('experience', i, 'duration', e.target.value)} className="w-full input-premium py-1.5 px-3 text-xs" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Bullets (one per line)</label>
                        <textarea
                          value={exp.bullets?.join('\n') || ''}
                          onChange={e => handleArrayChange('experience', i, 'bullets', e.target.value.split('\n'))}
                          className="w-full input-premium py-2 px-3 text-xs resize-none h-24 leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Education */}
              {formData.education?.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#60A5FA' }}>Education</h3>
                  {formData.education.map((edu, i) => (
                    <div key={i} className="grid grid-cols-3 gap-2">
                      <input type="text" value={edu.degree || ''} onChange={e => handleArrayChange('education', i, 'degree', e.target.value)} className="col-span-3 input-premium py-1.5 px-3 text-xs" placeholder="Degree" />
                      <input type="text" value={edu.school || ''} onChange={e => handleArrayChange('education', i, 'school', e.target.value)} className="col-span-2 input-premium py-1.5 px-3 text-xs" placeholder="School" />
                      <input type="text" value={edu.year || ''} onChange={e => handleArrayChange('education', i, 'year', e.target.value)} className="col-span-1 input-premium py-1.5 px-3 text-xs" placeholder="Year" />
                    </div>
                  ))}
                </section>
              )}

              {/* Skills */}
              {formData.skills && (
                <section className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#60A5FA' }}>Skills (comma separated)</h3>
                  <div>
                    <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Technical Skills</label>
                    <textarea
                      value={formData.skills.technical?.join(', ') || ''}
                      onChange={e => setFormData(prev => ({ ...prev, skills: { ...prev.skills, technical: e.target.value.split(',').map(s => s.trim()) } }))}
                      className="w-full input-premium py-2 px-3 text-xs resize-none h-16"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1 block" style={{ color: 'var(--text-secondary)' }}>Soft Skills</label>
                    <textarea
                      value={formData.skills.soft?.join(', ') || ''}
                      onChange={e => setFormData(prev => ({ ...prev, skills: { ...prev.skills, soft: e.target.value.split(',').map(s => s.trim()) } }))}
                      className="w-full input-premium py-2 px-3 text-xs resize-none h-16"
                    />
                  </div>
                </section>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex justify-end gap-3" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)' }}>
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold rounded-xl" style={{ color: 'var(--text-secondary)' }}>
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

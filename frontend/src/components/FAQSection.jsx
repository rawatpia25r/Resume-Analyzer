import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b" style={{ borderColor: 'var(--border-color)' }}>
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className="text-base md:text-lg font-bold transition-colors group-hover:text-[var(--color-primary)]" style={{ color: isOpen ? 'var(--color-primary)' : 'var(--text-primary)' }}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: isOpen ? 'var(--color-primary)' : 'var(--bg-hover)', color: isOpen ? 'white' : 'var(--text-muted)' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm md:text-base leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does the ATS scoring work?",
      answer: "Our system analyzes your resume against industry-standard Applicant Tracking System (ATS) parsers. We evaluate keyword match rates, formatting compatibility, section detection, and readability to generate a score out of 100, exactly how a real recruiter's software would."
    },
    {
      question: "Are the generated cover letters unique?",
      answer: "Yes. Every cover letter is generated uniquely based on the specific combination of your uploaded resume and the target job description. We use advanced LLMs fine-tuned on successful executive communications to ensure the tone is professional, confident, and tailored."
    },
    {
      question: "Can I export my resume to Word (DOCX)?",
      answer: "Absolutely. Unlike many platforms that trap you in PDF-only exports, Resume Intelligence allows you to export perfectly formatted, ATS-compliant DOCX and PDF files that you can further edit locally."
    },
    {
      question: "Is my data secure?",
      answer: "We take privacy seriously. Your resumes and personal data are encrypted at rest and in transit. We never sell your data to third-party recruiters without your explicit consent, and you can permanently delete your account and all associated data at any time."
    },
    {
      question: "Do I need a premium account to use the basic features?",
      answer: "No! You can create an account and perform basic ATS scans and resume building completely for free. Our premium tier is designed for power users who need unlimited scans, advanced AI insights, and unlimited cover letter generations."
    }
  ];

  return (
    <section id="faq" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
            <MessageCircleQuestion size={14} style={{ color: '#60A5FA' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#60A5FA' }}>Support</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-base md:text-lg text-center" style={{ color: 'var(--text-secondary)' }}>
            Everything you need to know about Resume Intelligence and how it helps you land more interviews.
          </p>
        </div>

        <div className="glass-premium p-6 md:p-10 rounded-[2rem] shadow-xl">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

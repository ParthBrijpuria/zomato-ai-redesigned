import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, X, ChevronRight } from 'lucide-react';

export default function JudgeMode() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '80px',
          right: '0',
          background: 'var(--text-primary)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px 0 0 20px',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          zIndex: 2000,
          boxShadow: 'var(--shadow-md)',
          fontWeight: '500'
        }}
      >
        <Lightbulb size={16} color="#FFD700" />
        Judge Mode
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '350px',
          background: 'white',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 2001,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lightbulb color="#FFD700" /> Innovation Highlights
            </h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X />
            </button>
          </div>

          <p style={{ fontSize: '0.9rem', marginBottom: '24px' }}>
            Quickly navigate to the core GenAI innovations built for this competition.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
            <HighlightLink to="/twin" title="Food Twin" desc="Persistent AI profile & memory" onClick={() => setIsOpen(false)} />
            <HighlightLink to="/agent" title="Auto-Reorder Agent" desc="Automated scheduled ordering" onClick={() => setIsOpen(false)} />
            <HighlightLink to="/overview" title="Project Overview" desc="How this AI redesign works" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function HighlightLink({ to, title, desc, onClick }) {
  return (
    <Link to={to} onClick={onClick} style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '12px', 
      border: '1px solid var(--border-light)', 
      borderRadius: '8px',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--ai-purple)'}
    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
    >
      <div>
        <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{desc}</div>
      </div>
      <ChevronRight size={16} color="var(--text-tertiary)" />
    </Link>
  );
}

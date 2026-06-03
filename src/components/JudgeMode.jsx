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

          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: 'var(--text-primary)' }}>What is this project?</h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              This is a GenAI-powered redesign of Zomato's core experience. It replaces manual scrolling with conversational intelligence.
              
              <div style={{ marginTop: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Live Working Features:</div>
              <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>AI Concierge:</strong> Tap the floating Zomato AI button to chat and get personalized meal cards.</li>
                <li><strong>Group Ordering:</strong> Auto-generates a balanced group cart from varied dietary inputs under a single budget.</li>
                <li><strong>Auto-Reorder Agent:</strong> Setup rules (e.g., "Post-Gym") to automatically generate carts at specific times.</li>
                <li><strong>Food Twin:</strong> A persistent memory profile that learns your taste over time.</li>
                <li><strong>Smart Cart:</strong> Seamlessly add AI recommendations and group carts together with live calculation.</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
            <HighlightLink to="/twin" title="Food Twin" desc="Persistent AI profile & memory" onClick={() => setIsOpen(false)} />
            <HighlightLink to="/agent" title="Auto-Reorder Agent" desc="Automated scheduled ordering" onClick={() => setIsOpen(false)} />
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

import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function ConsentFlow({ onConsent }) {
  const [hasConsented, setHasConsented] = useState(
    localStorage.getItem('zomato_ai_consent') === 'true'
  );

  if (hasConsented) return null;

  const handleAllow = () => {
    localStorage.setItem('zomato_ai_consent', 'true');
    setHasConsented(true);
    if (onConsent) onConsent();
  };

  const handleNotNow = () => {
    // For demo purposes, we still let them in, but we could restrict it
    setHasConsented(true);
    if (onConsent) onConsent();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000
    }}>
      <div className="card" style={{ maxWidth: '400px', width: '90%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ background: 'var(--ai-purple-light)', padding: '16px', borderRadius: '50%' }}>
            <ShieldCheck size={32} color="var(--ai-purple)" />
          </div>
        </div>
        
        <h2 style={{ marginBottom: '16px' }}>Personalized Experience</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Allow AI Concierge to remember your preferences to give you the best meal recommendations.
        </p>

        <div style={{ textAlign: 'left', marginBottom: '24px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ color: 'var(--success-green)' }}>✓</span> Order History
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ color: 'var(--success-green)' }}>✓</span> Cuisine Preferences
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--success-green)' }}>✓</span> Dietary Restrictions
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={handleNotNow}>Not Now</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleAllow}>Allow</button>
        </div>
      </div>
    </div>
  );
}

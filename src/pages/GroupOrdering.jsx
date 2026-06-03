import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Leaf, Drumstick, ArrowDown } from 'lucide-react';

export default function GroupOrdering() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const startAIGeneration = () => {
    navigate('/ai?demo=group');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 0', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '16px' }}>Smart Group Ordering</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '48px' }}>
        Visualize how the AI untangles complex group preferences to generate a single, optimized cart.
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#E8F5E9', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Leaf color="var(--success-green)" size={32} />
          </div>
          <div style={{ fontWeight: 'bold' }}>2 Veg</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ background: 'var(--bg-secondary)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Leaf color="var(--text-secondary)" size={32} />
          </div>
          <div style={{ fontWeight: 'bold' }}>1 Vegan</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#FFEBEE', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Drumstick color="var(--zomato-red)" size={32} />
          </div>
          <div style={{ fontWeight: 'bold' }}>2 Non-Veg</div>
        </div>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <ArrowDown size={32} color="var(--text-tertiary)" />
      </div>

      <div className="card" style={{ background: 'var(--ai-purple-light)', border: '2px dashed var(--ai-purple)', marginBottom: '32px' }}>
        <h3 style={{ color: 'var(--ai-purple)', marginBottom: '8px' }}>AI Constraint Solver</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Budget: ₹1500 • Group Size: 5 • 3 Dietary Restrictions</p>
      </div>

      <button className="btn btn-ai" style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }} onClick={startAIGeneration}>
        Generate Group Cart
      </button>
    </div>
  );
}

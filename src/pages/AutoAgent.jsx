import { useState } from 'react';
import { Clock, Calendar, Check, Play, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { aiService } from '../services/aiService';
import { RecommendationCard, GroupCartCard } from './Concierge';

export default function AutoAgent() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [days, setDays] = useState('Mon, Wed, Fri');
  const [mealLogic, setMealLogic] = useState('Order a high-protein meal under ₹300 from EatFit or Subway');
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const handleSimulate = async () => {
    setIsSimulating(true);
    setSimulationResult(null);
    try {
      const response = await aiService.generateResponse(mealLogic);
      setSimulationResult(response);
    } catch (err) {
      setSimulationResult({ error: "Failed to simulate agent trigger. Please try again." });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 0' }}>
      <h1 style={{ marginBottom: '16px' }}>Auto-Reorder Agent</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Set rules and let the AI automatically generate carts for you when the time is right.
      </p>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>Post-Gym Dinner Agent</h3>
          <div 
            onClick={() => setActive(!active)}
            style={{ 
              width: '48px', height: '24px', 
              background: active ? 'var(--success-green)' : 'var(--border-light)', 
              borderRadius: '12px', 
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ 
              width: '20px', height: '20px', 
              background: 'white', 
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: active ? '26px' : '2px',
              transition: 'all 0.2s',
              boxShadow: 'var(--shadow-sm)'
            }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1, background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="var(--text-secondary)" />
            <select 
              value={days}
              onChange={(e) => setDays(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', width: '100%', cursor: 'pointer', color: 'inherit' }}
            >
              <option value="Mon, Wed, Fri">Mon, Wed, Fri</option>
              <option value="Everyday">Everyday</option>
              <option value="Weekends">Weekends</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div style={{ flex: 1, background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="var(--text-secondary)" />
            <input 
              type="time" 
              defaultValue="20:00" 
              style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', width: '100%', cursor: 'pointer', color: 'inherit' }} 
            />
          </div>
        </div>

        <h4 style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>Agent Logic</h4>
        <textarea 
          value={mealLogic}
          onChange={(e) => setMealLogic(e.target.value)}
          placeholder="E.g., Order a high-protein meal under ₹300 from EatFit or Subway..."
          style={{ 
            width: '100%', 
            padding: '16px', 
            borderRadius: '8px', 
            border: '1px solid var(--border-light)', 
            outline: 'none', 
            fontSize: '0.95rem', 
            minHeight: '100px', 
            marginBottom: '24px', 
            resize: 'vertical',
            fontFamily: 'inherit',
            lineHeight: '1.5'
          }}
        />

        <button 
          className="btn btn-primary" 
          style={{ width: '100%' }}
          onClick={handleSimulate}
          disabled={isSimulating}
        >
          {isSimulating ? <Loader2 size={16} className="animate-spin" style={{ marginRight: '8px' }} /> : <Play size={16} style={{ marginRight: '8px' }} />}
          {isSimulating ? 'Simulating Agent...' : 'Simulate Trigger Now'}
        </button>
      </div>

      {simulationResult && (
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Live Trigger Output</h3>
          
          {simulationResult.type === 'recommendations' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(simulationResult.items || []).map((item, idx) => (
                <RecommendationCard key={idx} data={item} source="agent" />
              ))}
            </div>
          )}
          
          {simulationResult.type === 'group_cart' && (
             <GroupCartCard data={simulationResult} source="agent" />
          )}
          
          {simulationResult.error && (
            <div className="card" style={{ maxWidth: '600px', background: '#FFF3E0', border: '1px solid #FFB74D' }}>
              <p style={{ margin: 0, color: '#E65100' }}>{simulationResult.error}</p>
            </div>
          )}
          
          {!simulationResult.type && !simulationResult.error && (
            <div className="card" style={{ maxWidth: '600px' }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>{JSON.stringify(simulationResult, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

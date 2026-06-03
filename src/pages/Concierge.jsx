import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Send, Sparkles, CheckCircle2, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import ConsentFlow from '../components/ConsentFlow';
import { aiService } from '../services/aiService';
import { useCart } from '../contexts/CartContext';

export default function Concierge() {
  const [searchParams] = useSearchParams();
  const demoMode = searchParams.get('demo');
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [timelinePhase, setTimelinePhase] = useState(0);

  const scenarios = [
    "💪 Muscle Gain", 
    "🥗 Weight Loss", 
    "📚 Study Snack"
  ];

  useEffect(() => {
    if (demoMode) {
      if (demoMode === 'group') handleSend("👨‍👩‍👧‍👦 Group Order");
      else if (demoMode === 'mood') handleSend("😊 Mood-Based Meal");
      else handleSend(demoMode);
    }
  }, [demoMode]);

  const handleSend = async (text) => {
    const query = text || input;
    if (!query) return;

    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInput('');
    setIsTyping(true);
    setTimelinePhase(1);

    // Timeline Animation
    const phases = 5;
    for (let i = 1; i <= phases; i++) {
      setTimelinePhase(i);
      await new Promise(r => setTimeout(r, 600)); // 600ms per phase
    }

    try {
      const response = await aiService.generateResponse(query);
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: { error: "Sorry, I couldn't process that right now." } }]);
    } finally {
      setIsTyping(false);
      setTimelinePhase(0);
    }
  };

  const handleOrder = (meal) => {
    // Navigate to checkout with meal data
    navigate('/checkout', { state: { meal, cartType: 'ai_single' } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 72px)', maxWidth: '800px', margin: '0 auto' }}>
      <ConsentFlow />
      
      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--ai-purple-light)', borderRadius: '50%', marginBottom: '16px' }}>
              <Sparkles size={40} color="var(--ai-purple)" />
            </div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>👋 Hi Parth</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px' }}>What would you like today?</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '600px', margin: '0 auto' }}>
              {scenarios.map(s => (
                <button key={s} className="chip" onClick={() => handleSend(s)} style={{ fontSize: '1rem', padding: '10px 16px' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.role === 'user' ? (
              <div style={{ background: 'var(--bg-secondary)', padding: '12px 20px', borderRadius: '20px 20px 0 20px', maxWidth: '80%' }}>
                {msg.content}
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                {msg.content.type === 'recommendations' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {(msg.content.items || []).map((item, idx) => (
                      <RecommendationCard key={idx} data={item} onOrder={() => handleOrder(item)} />
                    ))}
                  </div>
                )}
                {msg.content.type === 'group_cart' && (
                  <GroupCartCard data={msg.content} onOrder={() => navigate('/checkout', { state: { cart: msg.content, cartType: 'ai_group' } })} />
                )}
                {msg.content.error && (
                  <div className="card" style={{ maxWidth: '600px', background: '#FFF3E0', border: '1px solid #FFB74D' }}>
                    <p style={{ margin: 0, color: '#E65100' }}>{msg.content.error}</p>
                  </div>
                )}
                {!msg.content.type && !msg.content.error && (
                  <div className="card" style={{ maxWidth: '600px' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>{JSON.stringify(msg.content, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)', width: '100%', maxWidth: '400px' }}>
              <TimelineItem active={timelinePhase >= 1} text="Understanding Goal" />
              <TimelineItem active={timelinePhase >= 2} text="Checking Budget & History" />
              <TimelineItem active={timelinePhase >= 3} text="Finding Available Meals" />
              <TimelineItem active={timelinePhase >= 4} text="Ranking Options" />
              <TimelineItem active={timelinePhase >= 5} text="Generating Cart" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{ padding: '16px 0', borderTop: '1px solid var(--border-light)', background: 'white' }}>
        <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="E.g., I have ₹250, want high-protein food..." 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            style={{ 
              flex: 1, 
              padding: '16px 20px', 
              borderRadius: '24px', 
              border: '1px solid var(--border-light)',
              fontSize: '1rem',
              boxShadow: 'var(--shadow-sm)',
              outline: 'none'
            }}
          />
          <button 
            className="btn-ai"
            onClick={() => handleSend()}
            style={{ 
              width: '54px', height: '54px', 
              borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer'
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ active, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', opacity: active ? 1 : 0.4, transition: 'opacity 0.3s' }}>
      {active ? <CheckCircle2 size={16} color="var(--success-green)" /> : <Loader2 size={16} className="animate-spin" />}
      <span style={{ fontSize: '0.9rem' }}>{text}</span>
    </div>
  );
}

export function RecommendationCard({ data, source = 'concierge' }) {
  const [explainOpen, setExplainOpen] = useState(false);
  const { addToCart, removeFromCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAdd = () => {
    const id = addToCart(data, source);
    setAddedId(id);
  };

  const handleUndo = () => {
    removeFromCart(addedId);
    setAddedId(null);
  };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', maxWidth: '600px' }}>
      <img src={data.img} alt={data.mealName} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <h2 style={{ margin: 0 }}>{data.mealName}</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>from {data.restaurant}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{data.price}</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>{data.deliveryTime}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', marginTop: '12px' }}>
          <span style={{ background: '#E8F5E9', color: 'var(--success-green)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
            {data.protein} Protein
          </span>
          <span style={{ background: '#FFF3E0', color: '#E65100', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
            {data.calories}
          </span>
          <span style={{ background: '#E3F2FD', color: '#1565C0', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
            {data.rating} ★
          </span>
        </div>

        <div className="ai-reasoning">
          <h4><Sparkles size={16} /> Why Recommended</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{data.reason}</p>
        </div>

        <button 
          onClick={() => setExplainOpen(!explainOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '0.9rem', marginBottom: explainOpen ? '12px' : '20px' }}
        >
          Explain Recommendation {explainOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {explainOpen && (
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Goal Match:</span> <strong>95%</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Budget Match:</span> <strong>100%</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Delivery Match:</span> <strong>90%</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Preference Match:</span> <strong>88%</strong></div>
          </div>
        )}

        {addedId ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--success-green)', color: 'white', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
              <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={20} /> Added to Cart</span>
              <button onClick={handleUndo} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>Undo</button>
            </div>
            
            <div style={{ border: '1px dashed var(--ai-purple)', borderRadius: '8px', padding: '12px', background: 'var(--ai-purple-light)' }}>
              <h5 style={{ margin: '0 0 8px 0', color: 'var(--ai-purple)', display: 'flex', alignItems: 'center', gap: '4px' }}><Sparkles size={14} /> AI Suggested Add-ons</h5>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                <button className="chip" style={{ fontSize: '0.8rem', padding: '6px 12px', flexShrink: 0 }}>+ Protein Shake (₹120)</button>
                <button className="chip" style={{ fontSize: '0.8rem', padding: '6px 12px', flexShrink: 0 }}>+ Greek Yogurt (₹80)</button>
              </div>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1.1rem' }} onClick={handleAdd}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export function GroupCartCard({ data, source = 'concierge' }) {
  const { addToCart, removeFromCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAdd = () => {
    const id = addToCart(data, source);
    setAddedId(id);
  };

  const handleUndo = () => {
    removeFromCart(addedId);
    setAddedId(null);
  };

  return (
    <div className="card" style={{ maxWidth: '600px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Sparkles color="var(--ai-purple)" />
        <h2 style={{ margin: 0 }}>AI Generated Group Cart</h2>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
        Optimized for 5 people (2 Veg, 1 Vegan, 2 Non-Veg) under ₹1500.
      </p>

      <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
        {(data.items || []).map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: idx !== (data.items?.length || 0) -1 ? '1px solid var(--border-light)' : 'none' }}>
            <div>
              <div style={{ fontWeight: '600' }}>{item.quantity}x {item.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>For: {item.for}</div>
            </div>
            <div style={{ fontWeight: '500' }}>{item.price}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 8px' }}>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{data.totalCost}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Per Person: {data.perPerson}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: '500' }}>{data.deliveryTime}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--success-green)' }}>From {data.restaurant}</div>
        </div>
      </div>

      {addedId ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--success-green)', color: 'white', padding: '14px', borderRadius: '8px' }}>
          <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={20} /> Added to Cart</span>
          <button onClick={handleUndo} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}>Undo</button>
        </div>
      ) : (
        <button className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1.1rem' }} onClick={handleAdd}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

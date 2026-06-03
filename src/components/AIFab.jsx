import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function AIFab() {
  const navigate = useNavigate();

  return (
    <button className="fab-ai" onClick={() => navigate('/ai')} aria-label="Ask AI Concierge">
      <div style={{ position: 'relative' }}>
        <MessageSquare size={28} />
        <Sparkles size={16} style={{ position: 'absolute', top: -8, right: -8, color: '#FFE5B4' }} />
      </div>
    </button>
  );
}

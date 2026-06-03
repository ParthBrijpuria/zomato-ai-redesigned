import { Database, Brain, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Architecture() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 0' }}>
      <h1 style={{ marginBottom: '16px' }}>AI Architecture</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', fontSize: '1.1rem' }}>
        How the Zomato AI Concierge processes natural language into a highly-optimized cart.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        
        <ArchNode icon={<ShoppingBag />} title="1. User Query" desc='"I have ₹250, want high-protein food"' color="#333" />
        <ArrowDown />
        <ArchNode icon={<Brain />} title="2. Intent Understanding (Gemini API)" desc="Extracts budget, nutrition goals, constraints" color="var(--ai-purple)" />
        <ArrowDown />
        <ArchNode icon={<Database />} title="3. Preference Memory Layer" desc="Fetches Food Twin (allergies, recent orders)" color="#1565C0" />
        <ArrowDown />
        <ArchNode icon={<Database />} title="4. Restaurant/Menu Retrieval" desc="Queries Zomato DB for matching items" color="var(--zomato-red)" />
        <ArrowDown />
        <ArchNode icon={<Brain />} title="5. Recommendation Ranking" desc="Scores by match % (Protein, Budget, Speed)" color="var(--ai-purple)" />
        <ArrowDown />
        <ArchNode icon={<Sparkles />} title="6. AI Explanation Layer" desc="Generates 'Why Recommended' reasoning" color="#FF7E5F" />
        <ArrowDown />
        <ArchNode icon={<ShoppingBag />} title="7. Checkout" desc="One-tap cart creation" color="var(--success-green)" />

      </div>
    </div>
  );
}

function ArchNode({ icon, title, desc, color }) {
  return (
    <div className="card" style={{ width: '100%', maxWidth: '500px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: `4px solid ${color}` }}>
      <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '50%', color: color }}>
        {icon}
      </div>
      <div>
        <h3 style={{ margin: '0 0 4px 0' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{desc}</p>
      </div>
    </div>
  );
}

function ArrowDown() {
  return <div style={{ height: '32px', width: '2px', background: 'var(--border-light)' }}></div>;
}

function Sparkles() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3v4M12 9l3-3M2 13h4M16 17l3 3M19 13h2M12 21v-4M8 17l-3 3M20 7l-3 3"/>
    </svg>
  );
}

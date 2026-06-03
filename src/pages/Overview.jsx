import { Sparkles, MessageSquare, Users, Settings, ShoppingBag, BrainCircuit } from 'lucide-react';

export default function Overview() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--ai-purple-light)', borderRadius: '50%', marginBottom: '16px' }}>
          <Sparkles size={40} color="var(--ai-purple)" />
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Zomato AI Redesign</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          This is a GenAI-powered redesign of Zomato's core experience. It replaces manual restaurant scrolling with a highly personalized conversational intelligence layer.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ borderBottom: '2px solid var(--border-light)', paddingBottom: '12px', marginBottom: '24px' }}>Live Working Features</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          <FeatureCard 
            icon={<MessageSquare size={24} color="var(--zomato-red)" />}
            title="1. AI Concierge (Chat)"
            desc="Tap the floating Zomato AI button to chat directly with our LLM. It resolves your cravings, hits your protein macros, and balances your budget, returning instantly clickable meal cards."
          />
          <FeatureCard 
            icon={<Users size={24} color="#1565C0" />}
            title="2. Group Ordering Optimizer"
            desc="Input complex constraints for multiple people (e.g., '2 veg, 1 vegan, under ₹1500'). The AI mathematically balances a single restaurant cart that satisfies everyone's dietary needs within the budget."
          />
          <FeatureCard 
            icon={<Settings size={24} color="var(--success-green)" />}
            title="3. Auto-Reorder Agent"
            desc="Set up behavioral rules (like 'Post-Gym Dinner') where the AI automatically generates a hyper-personalized cart at a scheduled time without you needing to manually search."
          />
          <FeatureCard 
            icon={<BrainCircuit size={24} color="#E65100" />}
            title="4. Food Twin (Memory Profile)"
            desc="A persistent AI memory profile that learns your taste preferences over time. It continuously updates based on your chat history and feedback to make future recommendations better."
          />
          <FeatureCard 
            icon={<ShoppingBag size={24} color="var(--text-primary)" />}
            title="5. Universal Smart Cart"
            desc="Seamlessly mix and match AI recommendations and group blocks together in a global cart. Features live calculation of taxes, delivery, and provides dynamic AI cart summaries at checkout."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
        {icon}
      </div>
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>{title}</h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  );
}

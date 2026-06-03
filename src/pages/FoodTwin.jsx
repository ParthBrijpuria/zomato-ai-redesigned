import { User, Activity, DollarSign, Utensils, History, Sparkles } from 'lucide-react';

export default function FoodTwin() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <User size={32} color="var(--zomato-red)" />
        <h1 style={{ margin: 0 }}>Your Food Twin</h1>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px' }}>
        A persistent AI profile that learns your preferences, constraints, and habits to make perfect meal decisions for you.
      </p>

      <div className="grid grid-cols-2">
        <TwinCard icon={<Activity color="var(--ai-purple)" />} title="Primary Goal" value="Muscle Gain" />
        <TwinCard icon={<DollarSign color="var(--success-green)" />} title="Average Budget" value="₹280 / meal" />
        <TwinCard icon={<Utensils color="#FF7E5F" />} title="Favorite Cuisine" value="North Indian, High Protein" />
        <TwinCard icon={<History color="#1565C0" />} title="Ordering Pattern" value="Weekday Dinner (~8:00 PM)" />
      </div>

      <div className="card" style={{ marginTop: '24px', background: 'var(--bg-secondary)', borderLeft: '4px solid var(--ai-purple)' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ai-purple)' }}>
          <Sparkles size={20} /> Current AI Insights
        </h3>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Recently Ordered:</span>
            <strong style={{ color: 'var(--text-primary)' }}>Chicken Biryani (2x this week)</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Dietary Restriction:</span>
            <strong style={{ color: 'var(--zomato-red)' }}>Avoid Peanuts</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Current Suggestion:</span>
            <strong style={{ color: 'var(--success-green)' }}>Lighter High Protein Meals</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function TwinCard({ icon, title, value }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
      <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '50%' }}>
        {icon}
      </div>
      <div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{value}</div>
      </div>
    </div>
  );
}

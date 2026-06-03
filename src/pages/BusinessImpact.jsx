import { TrendingUp, Clock, Users, ShoppingCart, RefreshCw } from 'lucide-react';

export default function BusinessImpact() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 0' }}>
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '8px' }}>Expected Business Impact</h1>
        <p style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)', display: 'inline-block', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem' }}>
          Projected Impact Hypotheses For Evaluation Purposes
        </p>
      </div>

      <div className="grid grid-cols-3">
        <MetricCard icon={<ShoppingCart />} value="+15%" label="Conversion Rate" desc="AI reduces decision fatigue, driving more cart completions." color="var(--success-green)" />
        <MetricCard icon={<RefreshCw />} value="+20%" label="Order Frequency" desc="Auto-reorder agents and easy mood-based ordering increase usage." color="#1565C0" />
        <MetricCard icon={<TrendingUp />} value="+18%" label="Average Order Value" desc="Smart group cart generation expands basket sizes." color="var(--ai-purple)" />
        <MetricCard icon={<Clock />} value="-40%" label="Search Time" desc="Users find the perfect meal in seconds instead of scrolling for minutes." color="#E65100" />
        <MetricCard icon={<Users />} value="+10%" label="Retention" desc="The Food Twin builds a highly personalized moat." color="var(--zomato-red)" />
      </div>
    </div>
  );
}

function MetricCard({ icon, value, label, desc, color }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ color: color, marginBottom: '16px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '50%' }}>
        {icon}
      </div>
      <div style={{ fontSize: '2.5rem', fontWeight: '800', color: color, marginBottom: '4px' }}>{value}</div>
      <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{desc}</div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Receipt, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '32px', textAlign: 'center' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: '50%', display: 'inline-block', marginBottom: '24px' }}>
          <ShoppingBag size={48} color="var(--text-tertiary)" />
        </div>
        <h2 style={{ marginBottom: '12px' }}>Your cart is empty.</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Ask AI for personalized recommendations or group meals!</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px', margin: '0 auto' }}>
          <button className="btn" style={{ background: 'var(--ai-purple-light)', color: 'var(--ai-purple)', border: 'none', padding: '16px' }} onClick={() => navigate('/ai?demo=muscle')}>
            <Sparkles size={18} style={{ marginRight: '8px' }} /> Muscle Gain
          </button>
          <button className="btn" style={{ background: 'var(--ai-purple-light)', color: 'var(--ai-purple)', border: 'none', padding: '16px' }} onClick={() => navigate('/ai')}>
            <Sparkles size={18} style={{ marginRight: '8px' }} /> Healthy Breakfast
          </button>
          <button className="btn" style={{ background: 'var(--ai-purple-light)', color: 'var(--ai-purple)', border: 'none', padding: '16px' }} onClick={() => navigate('/ai?demo=group')}>
            <Sparkles size={18} style={{ marginRight: '8px' }} /> Group Order
          </button>
        </div>
      </div>
    );
  }

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const match = priceStr.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const itemTotal = cart.reduce((acc, item) => acc + parsePrice(item.price), 0);
  const deliveryFee = 30;
  const taxes = 25;
  const grandTotal = itemTotal + deliveryFee + taxes;

  const handlePlaceOrder = () => {
    alert('Order Placed Successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 0' }}>
      <h2 style={{ marginBottom: '24px' }}>Checkout</h2>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
          <MapPin size={20} />
          <span>Home - 17th Cross, HSR Layout, Bangalore</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
          <Receipt size={20} />
          <span>Delivery in ~25 mins</span>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Your Items</h3>
        
        {cart.map((item) => (
          <div key={item.id} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
            {item.type === 'group' ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600' }}>AI Group Cart ({item.restaurant})</span>
                  <span style={{ fontWeight: '600' }}>₹{parsePrice(item.price)}</span>
                </div>
                <div style={{ paddingLeft: '12px', borderLeft: '2px solid var(--border-light)' }}>
                  {item.metadata.items?.map((sub, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      <span>{sub.quantity}x {sub.name} <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>({sub.for})</span></span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600' }}>{item.quantity}x {item.title}</span>
                <span style={{ fontWeight: '600' }}>₹{parsePrice(item.price)}</span>
              </div>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
          <span>Item Total</span>
          <span>₹{itemTotal}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
          <span>Delivery Fee</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
          <span>Taxes</span>
          <span>₹{taxes}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span>Grand Total</span>
          <span>₹{grandTotal}</span>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--ai-purple-light)', borderLeft: '4px solid var(--ai-purple)', marginBottom: '32px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ai-purple)', marginBottom: '12px' }}>
          <Sparkles size={16} /> AI Summary
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {cart.some(i => i.type === 'group') && <li>Successfully balanced multiple preferences within budget.</li>}
          {cart.some(i => i.type === 'meal') && <li>Optimized for your protein goals while staying under budget.</li>}
          <li>Estimated combined delivery: 25 mins</li>
        </ul>
      </div>

      <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }} onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}

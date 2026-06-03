import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Sparkles, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function CartDrawer() {
  const { cart, isDrawerOpen, setIsDrawerOpen, totalQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const match = priceStr.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const itemTotal = cart.reduce((acc, item) => acc + parsePrice(item.price), 0);

  const handleCheckout = () => {
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  const handleNavigate = (path) => {
    setIsDrawerOpen(false);
    navigate(path);
  };

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 3000 }}
        onClick={() => setIsDrawerOpen(false)}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '380px',
        maxWidth: '100vw',
        height: '100vh',
        background: 'white',
        zIndex: 3001,
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid var(--border-light)' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} /> Your Cart ({totalQuantity})
          </h2>
          <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '50%', display: 'inline-block', marginBottom: '16px' }}>
                <ShoppingBag size={40} color="var(--text-tertiary)" />
              </div>
              <h3 style={{ marginBottom: '8px' }}>Your cart is empty.</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Ask AI for recommendations!</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="btn" style={{ background: 'var(--ai-purple-light)', color: 'var(--ai-purple)', border: 'none' }} onClick={() => handleNavigate('/ai?demo=muscle')}>
                  <Sparkles size={16} /> Muscle Gain
                </button>
                <button className="btn" style={{ background: 'var(--ai-purple-light)', color: 'var(--ai-purple)', border: 'none' }} onClick={() => handleNavigate('/ai')}>
                  <Sparkles size={16} /> Healthy Breakfast
                </button>
                <button className="btn" style={{ background: 'var(--ai-purple-light)', color: 'var(--ai-purple)', border: 'none' }} onClick={() => handleNavigate('/ai?demo=group')}>
                  <Sparkles size={16} /> Group Order
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0' }}>{item.quantity}x {item.title}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>from {item.restaurant}</span>
                    {item.type === 'group' && (
                      <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-tertiary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {item.metadata.items?.map((sub, i) => (
                          <span key={i}>• {sub.quantity}x {sub.name}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>₹{parsePrice(item.price)}</div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--zomato-red)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 'bold' }}>
              <span>Item Total</span>
              <span>₹{itemTotal}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

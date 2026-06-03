import { Link } from 'react-router-dom';
import { Search, MapPin, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { totalQuantity, toggleDrawer } = useCart();

  return (
    <header style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: 'white' }}>
      <div className="app-header">
        <Link to="/" className="header-logo">
          zomato
        </Link>
        <div className="search-bar">
          <MapPin size={20} color="var(--zomato-red)" />
          <input type="text" placeholder="Bangalore" style={{ width: '120px', borderRight: '1px solid var(--border-light)', marginRight: '16px' }} />
          <Search size={20} color="var(--text-tertiary)" />
          <input type="text" placeholder="Search for restaurant, cuisine or a dish" />
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          <span style={{ cursor: 'pointer' }}>Log in</span>
          <span style={{ cursor: 'pointer' }}>Sign up</span>
          <div onClick={toggleDrawer} style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <ShoppingBag size={24} color="var(--text-primary)" />
            {totalQuantity > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-8px',
                background: 'var(--zomato-red)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: '2px 6px',
                borderRadius: '10px',
                minWidth: '18px',
                textAlign: 'center'
              }}>
                {totalQuantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

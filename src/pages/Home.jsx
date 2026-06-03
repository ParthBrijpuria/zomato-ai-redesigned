import AIFab from '../components/AIFab';

export default function Home() {
  const restaurants = [
    { id: 1, name: "McDonald's", cuisine: "Burger, Fast Food", rating: 4.2, time: "25 min", price: "₹200 for one", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80" },
    { id: 2, name: "Domino's Pizza", cuisine: "Pizza, Fast Food", rating: 4.1, time: "30 min", price: "₹250 for one", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80" },
    { id: 3, name: "EatFit", cuisine: "Healthy Food, Salads", rating: 4.5, time: "20 min", price: "₹300 for one", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" },
    { id: 4, name: "Haldiram's", cuisine: "North Indian, Mithai", rating: 4.3, time: "35 min", price: "₹150 for one", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80" },
    { id: 5, name: "Subway", cuisine: "Healthy Food, Wraps", rating: 4.0, time: "15 min", price: "₹200 for one", img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&q=80" },
    { id: 6, name: "Faasos", cuisine: "Rolls, Wraps", rating: 4.2, time: "28 min", price: "₹180 for one", img: "https://images.unsplash.com/photo-1626804475297-41609ea0ea4eb?w=500&q=80" },
  ];

  return (
    <div style={{ padding: '24px 0' }}>
      <div className="nav-tabs">
        <div className="nav-tab active">Delivery</div>
        <div className="nav-tab">Dining Out</div>
        <div className="nav-tab">Nightlife</div>
      </div>

      <h2 style={{ marginBottom: '24px' }}>Delivery Restaurants in Bangalore</h2>

      <div className="grid grid-cols-3">
        {restaurants.map(r => (
          <div key={r.id} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
            <img src={r.img} alt={r.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{r.name}</h3>
                <div style={{ background: 'var(--success-green)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {r.rating} ★
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span>{r.cuisine}</span>
                <span>{r.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '8px' }}>
                {r.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AIFab />
    </div>
  );
}

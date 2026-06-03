import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Concierge from './pages/Concierge';
import FoodTwin from './pages/FoodTwin';
import GroupOrdering from './pages/GroupOrdering';
import AutoAgent from './pages/AutoAgent';
import Checkout from './pages/Checkout';
import Architecture from './pages/Architecture';
import BusinessImpact from './pages/BusinessImpact';
import Overview from './pages/Overview';
import Header from './components/Header';
import JudgeMode from './components/JudgeMode';
import { CartProvider } from './contexts/CartContext';
import CartDrawer from './components/CartDrawer';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-container">
          <JudgeMode />
          <Header />
          <CartDrawer />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai" element={<Concierge />} />
              <Route path="/twin" element={<FoodTwin />} />
              <Route path="/group" element={<GroupOrdering />} />
              <Route path="/agent" element={<AutoAgent />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/architecture" element={<Architecture />} />
              <Route path="/impact" element={<BusinessImpact />} />
              <Route path="/overview" element={<Overview />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

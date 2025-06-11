import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CategoryList from './components/CategoryList';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import Guide from './components/Guide';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const products = [
  { 
    id: 1, 
    name: 'Вязаная шапка', 
    category: 'одежда', 
    price: 1500, 
    description: 'Теплая ручная вязка',
    image: '/images/hat.jpg'
  },
  { 
    id: 2, 
    name: 'Керамическая кружка', 
    category: 'посуда', 
    price: 800, 
    description: 'Уникальный дизайн',
    image: '/images/mug.jpg'
  },
  { 
    id: 3, 
    name: 'Деревянная ложка', 
    category: 'посуда', 
    price: 500, 
    description: 'Экологичный материал',
    image: '/images/spoon.jpg'
  },
  { 
    id: 4, 
    name: 'Шерстяной шарф', 
    category: 'одежда', 
    price: 1200, 
    description: 'Мягкий и теплый',
    image: '/images/scarf.jpg'
  },
  { 
    id: 5, 
    name: 'Свеча ручной работы', 
    category: 'декор', 
    price: 600, 
    description: 'Натуральный воск',
    image: '/images/candle.jpg'
  },
];

  const categories = [...new Set(products.map(product => product.category))];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Ваша корзина пуста!');
      return;
    }
    
    if (!user) {
      setAuthMode('login');
      setShowAuthModal(true);
    } else {
      setActiveSection('checkout');
    }
  };

  return (
    <div className="app">
      <Header 
        user={user} 
        setUser={setUser} 
        cartCount={cart.length} 
        setShowAuthModal={setShowAuthModal} 
        setAuthMode={setAuthMode}
        setActiveSection={setActiveSection}
      />
      
      <Navigation 
        setActiveSection={setActiveSection} 
        handleCheckout={handleCheckout}
      />
      
      <main className="main-content">
        {activeSection === 'home' && (
          <CategoryList 
            categories={categories} 
            products={products} 
            addToCart={addToCart} 
          />
        )}
        
        {activeSection === 'guide' && <Guide />}
        
        {activeSection === 'cart' && (
          <Cart 
            cart={cart} 
            removeFromCart={removeFromCart} 
            setActiveSection={setActiveSection} 
          />
        )}
        
        {activeSection === 'checkout' && (
          <CheckoutModal 
            cart={cart} 
            setShowCheckout={setShowCheckout} 
            setCart={setCart} 
            setActiveSection={setActiveSection}
          />
        )}
      </main>
      
      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          setMode={setAuthMode} 
          setShowModal={setShowAuthModal} 
          setUser={setUser} 
        />
      )}
    </div>
  );
}

export default App;
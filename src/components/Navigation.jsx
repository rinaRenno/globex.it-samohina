const Navigation = ({ setActiveSection, cartCount, handleCheckout }) => {
  return (
    <nav className="navigation">
      <button onClick={() => setActiveSection('home')}>Главная</button>
      <button onClick={() => setActiveSection('guide')}>Путеводитель</button>
      
      <div 
        className="cart-nav-button"
        onClick={() => cartCount > 0 ? handleCheckout() : setActiveSection('cart')}
      >
        <span className="cart-icon">🛒</span>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        <span className="cart-text">
          {cartCount > 0 ? 'Оформить заказ' : 'Корзина'}
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
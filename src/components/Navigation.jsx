const Navigation = ({ setActiveSection, handleCheckout }) => {
  return (
    <nav className="navigation">
      <button onClick={() => setActiveSection('home')}>Главная</button>
      <button onClick={() => setActiveSection('guide')}>Путеводитель</button>
      <button onClick={() => setActiveSection('cart')}>Корзина</button>
      <button onClick={handleCheckout}>Оформить заказ</button>
    </nav>
  );
};

export default Navigation;

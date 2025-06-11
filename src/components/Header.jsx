const Header = ({ user, setUser, cartCount, setShowAuthModal, setAuthMode, setActiveSection }) => {
  return (
    <header className="header">
      <h1>Мастерская ручной работы</h1>
      <div className="user-controls">
        {user ? (
          <>
            <span>Привет, {user.name}</span>
            <button onClick={() => setUser(null)}>Выйти</button>
          </>
        ) : (
          <>
            <button onClick={() => {
              setAuthMode('login');
              setShowAuthModal(true);
            }}>Войти</button>
            <button onClick={() => {
              setAuthMode('register');
              setShowAuthModal(true);
            }}>Регистрация</button>
          </>
        )}
        <div 
          className="cart" 
          onClick={() => setActiveSection('cart')}
          style={{ cursor: 'pointer' }}
        >
          Корзина: {cartCount}
        </div>
      </div>
    </header>
  );
};

export default Header;
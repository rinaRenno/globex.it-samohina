const Cart = ({ cart, removeFromCart, setActiveSection }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <h2>Ваша корзина</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Ваша корзина пуста</p>
          <button onClick={() => setActiveSection('home')}>Вернуться к покупкам</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-image">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="price">{item.price} руб.</div>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="total">Итого: {total} руб.</div>
            <button 
              className="checkout-btn"
              onClick={() => setActiveSection('checkout')}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

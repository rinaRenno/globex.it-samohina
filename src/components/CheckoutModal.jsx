const CheckoutModal = ({ cart, setCart, setActiveSection }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    alert('Оплата прошла успешно! Спасибо за заказ!');
    setCart([]);
    setActiveSection('home');
  };

  return (
    <div className="modal-overlay">
      <div className="modal checkout-modal">
        <h2>Оформление заказа</h2>
        <button 
          className="close-btn" 
          onClick={() => setActiveSection('cart')}
        >
          ×
        </button>
        
        <div className="order-summary">
          <h3>Ваш заказ:</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price} руб.
              </li>
            ))}
          </ul>
          <div className="total">Итого: {total} руб.</div>
        </div>
        
        <div className="payment-form">
          <h3>Данные для оплаты</h3>
          <div className="form-group">
            <label>Номер карты:</label>
            <input type="text" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="form-group">
            <label>Срок действия:</label>
            <input type="text" placeholder="MM/ГГ" />
          </div>
          <div className="form-group">
            <label>CVV:</label>
            <input type="text" placeholder="123" />
          </div>
          
          <button className="pay-btn" onClick={handlePayment}>Оплатить</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;

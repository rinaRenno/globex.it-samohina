import React, { useState } from "react";

export default function Cart({ cartItems, onRemoveFromCart, onOrder }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [paymentError, setPaymentError] = useState("");

  const handleInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const validatePayment = () => {
    if (
      !paymentData.name.trim() ||
      !paymentData.cardNumber.trim() ||
      !paymentData.expiry.trim() ||
      !paymentData.cvv.trim()
    ) {
      setPaymentError("Пожалуйста, заполните все поля");
      return false;
    }
    // Простая проверка длины полей (можно расширить)
    if (paymentData.cardNumber.length < 16) {
      setPaymentError("Неверный номер карты");
      return false;
    }
    if (paymentData.cvv.length < 3) {
      setPaymentError("Неверный CVV");
      return false;
    }
    setPaymentError("");
    return true;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!validatePayment()) return;
    // Здесь могла бы быть интеграция с платежным шлюзом
    alert("Оплата прошла успешно! Спасибо за покупку.");
    setShowPayment(false);
    onOrder();
    setPaymentData({ name: "", cardNumber: "", expiry: "", cvv: "" });
  };

  return (
    <div style={styles.cart}>
      <h2>Корзина</h2>
      {cartItems.length === 0 && <p>Корзина пуста</p>}
      {cartItems.map((item) => (
        <div key={item.id} style={styles.cartItem}>
          <span>
            {item.name} x {item.quantity}
          </span>
          <span>{item.price * item.quantity} ₽</span>
          <button
            onClick={() => onRemoveFromCart(item.id)}
            style={styles.removeBtn}
            aria-label={`Удалить ${item.name} из корзины`}
          >
            &times;
          </button>
        </div>
      ))}
      {cartItems.length > 0 && (
        <>
          <hr />
          <p>
            <b>Итого: {total} ₽</b>
          </p>
          <button
            style={styles.checkoutBtn}
            onClick={() => setShowPayment(true)}
          >
            Оформить заказ
          </button>
        </>
      )}

      {showPayment && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Оплата заказа</h3>
            <form onSubmit={handlePaymentSubmit} style={styles.paymentForm}>
              <label>
                Имя владельца карты:
                <input
                  type="text"
                  name="name"
                  value={paymentData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </label>
              <label>
                Номер карты:
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  style={styles.input}
                  maxLength={16}
                  required
                />
              </label>
              <label>
                Срок действия (MM/YY):
                <input
                  type="text"
                  name="expiry"
                  value={paymentData.expiry}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="MM/YY"
                  required
                />
              </label>
              <label>
                CVV:
                <input
                  type="password"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  style={styles.input}
                  maxLength={4}
                  required
                />
              </label>
              {paymentError && (
                <p style={{ color: "red", marginBottom: 10 }}>{paymentError}</p>
              )}
              <div style={styles.modalButtons}>
                <button type="submit" style={styles.payBtn}>
                  Оплатить
                </button>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => {
                    setShowPayment(false);
                    setPaymentError("");
                  }}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  cart: {
    fontSize: 16,
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  removeBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ff4d4f",
    cursor: "pointer",
    fontSize: 18,
    lineHeight: 1,
  },
  checkoutBtn: {
    width: "100%",
    padding: 10,
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 320,
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  paymentForm: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    width: "100%",
    padding: 8,
    fontSize: 14,
    borderRadius: 4,
    border: "1px solid #ccc",
    boxSizing: "border-box",
    marginTop: 4,
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
  },
  payBtn: {
    backgroundColor: "#28a745",
    border: "none",
    color: "#fff",
    padding: "8px 15px",
    borderRadius: 5,
    cursor: "pointer",
    flex: 1,
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: "#ccc",
    border: "none",
    color: "#333",
    padding: "8px 15px",
    borderRadius: 5,
    cursor: "pointer",
    flex: 1,
  },
};

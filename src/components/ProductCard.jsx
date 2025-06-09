import React from "react";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <b>{product.price} ₽</b>
      </p>
      <button style={styles.button} onClick={() => onAddToCart(product)}>
        Добавить в корзину
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 15,
    textAlign: "center",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: 5,
    cursor: "pointer",
  },
};

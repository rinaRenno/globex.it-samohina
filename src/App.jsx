import React, { useState } from "react";
import Auth from "./components/Auth";
import CategorySelector from "./components/CategorySelector";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Guide from "./components/Guide";
import onOrder from "./components/Cart"

// Данные пользователей (демо)
const initialUsers = [
  { id: 1, username: "user1", password: "pass1" },
];

// Категории и товары
const categories = [
  { id: "all", name: "Все товары" },
  { id: "decor", name: "Декор" },
  { id: "accessories", name: "Аксессуары" },
  { id: "clothing", name: "Одежда" },
];

const products = [
  {
    id: 1,
    category: "decor",
    name: "Деревянная шкатулка",
    description: "Изысканная шкатулка из натурального дерева.",
    price: 2500,
    image: "https://via.placeholder.com/200?text=Деревянная+шкатулка",
  },
  {
    id: 2,
    category: "accessories",
    name: "Вязаная шапка",
    description: "Тёплая и уютная шапка ручной работы.",
    price: 1200,
    image: "https://via.placeholder.com/200?text=Вязаная+шапка",
  },
  {
    id: 3,
    category: "clothing",
    name: "Шарф из шерсти",
    description: "Нежный шарф ручной вязки.",
    price: 1800,
    image: "https://via.placeholder.com/200?text=Шарф+из+шерсти",
  },
  {
    id: 4,
    category: "accessories",
    name: "Браслет из бисера",
    description: "Красивый браслет ручной работы.",
    price: 900,
    image: "https://via.placeholder.com/200?text=Браслет+из+бисера",
  },
];

//оплата
const handleOrderComplete = () => {
  setCartItems([]);
};

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleLogin = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setAuthError("");
    } else {
      setAuthError("Неверное имя пользователя или пароль");
    }
  };

  const handleRegister = (username, password) => {
    if (users.find((u) => u.username === username)) {
      setAuthError("Пользователь с таким именем уже существует");
      return;
    }
    const newUser = { id: Date.now(), username, password };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setAuthError("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Artisan's Nook — Магазин изделий ручной работы</h1>
        {currentUser ? (
          <div style={styles.userInfo}>
            <span>Привет, {currentUser.username}!</span>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Выйти
            </button>
          </div>
        ) : null}
      </header>

      {!currentUser ? (
        <Auth
          onLogin={handleLogin}
          onRegister={handleRegister}
          authError={authError}
        />
      ) : (
        <>
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <main style={styles.main}>
            <section style={styles.products}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))
              ) : (
                <p>Товары не найдены в этой категории.</p>
              )}
            </section>
            <aside style={styles.sidebar}>
              <Cart
                cartItems={cartItems}
                onRemoveFromCart={removeFromCart}
                onOrder={handleOrderComplete}/>
              <Guide />
            </aside>
          </main>
        </>
      )}

      <footer style={styles.footer}>
        <p>© 2025 Artisan's Nook. Все права защищены.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: 1200,
    margin: "0 auto",
    padding: 20,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    position: "relative",
  },
  userInfo: {
    position: "absolute",
    right: 20,
    top: 20,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 16,
  },
  logoutBtn: {
    padding: "5px 10px",
    border: "none",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    borderRadius: 5,
    cursor: "pointer",
  },
  main: {
    display: "flex",
    gap: 20,
  },
  products: {
    flex: 3,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: 20,
  },
  sidebar: {
    flex: 1,
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 8,
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  footer: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
  },
};

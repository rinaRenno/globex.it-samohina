import React, { useState } from "react";

export default function Auth({ onLogin, onRegister, authError }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(username.trim(), password.trim());
    } else {
      onRegister(username.trim(), password.trim());
    }
  };

  return (
    <div style={styles.authContainer}>
      <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
      <form onSubmit={handleSubmit} style={styles.authForm}>
        <input
          style={styles.input}
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete={isLogin ? "current-password" : "new-password"}
        />
        {authError && <p style={styles.error}>{authError}</p>}
        <button type="submit" style={styles.authButton}>
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
      <p style={{ marginTop: 10 }}>
        {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
        <button
          style={styles.toggleBtn}
          onClick={() => {
            setIsLogin(!isLogin);
            setUsername("");
            setPassword("");
          }}
        >
          {isLogin ? "Зарегистрироваться" : "Войти"}
        </button>
      </p>
    </div>
  );
}

const styles = {
  authContainer: {
    maxWidth: 400,
    margin: "40px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 8,
    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  authForm: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  authButton: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  toggleBtn: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: 16,
  },
  error: {
    color: "#ff4d4f",
    fontWeight: "bold",
  },
};

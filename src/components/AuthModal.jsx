import { useState } from 'react';

const AuthModal = ({ mode, setMode, setShowModal, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь должна быть реальная аутентификация
    if (mode === 'login') {
      setUser({ name: formData.email.split('@')[0], email: formData.email });
    } else {
      setUser({ name: formData.name, email: formData.email });
    }
    setShowModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>
        <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
        
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label>Имя:</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Пароль:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              minLength="6"
            />
          </div>
          
          <button type="submit">{mode === 'login' ? 'Войти' : 'Зарегистрироваться'}</button>
        </form>
        
        <div className="auth-switch">
          {mode === 'login' ? (
            <p>Нет аккаунта? <button onClick={() => setMode('register')}>Зарегистрироваться</button></p>
          ) : (
            <p>Уже есть аккаунт? <button onClick={() => setMode('login')}>Войти</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

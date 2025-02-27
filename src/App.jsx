import  { useState } from 'react';
import './App.css';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        { const formattedPhone = value.replace(/\D/g, '').slice(0, 11);
        let maskedPhone = '';
        if (formattedPhone.length > 0) {
          maskedPhone = ' (' + formattedPhone.substring(0, 3);
        }
        if (formattedPhone.length > 3) {
          maskedPhone += ') ' + formattedPhone.substring(3, 6);
        }
        if (formattedPhone.length > 6) {
          maskedPhone += '-' + formattedPhone.substring(6, 10);
        }
       setPhone(maskedPhone);
        break; }
      case 'email':
        setEmail(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        break;
    }
  };

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }
    if (!email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const escapedName = escapeHtml(name);
    const escapedPhone = escapeHtml('+7' + phone);
    const escapedEmail = escapeHtml(email);
    const escapedMessage = escapeHtml(message);

    alert(
      `Имя: ${escapedName}\nТелефон: ${escapedPhone}\nEmail: ${escapedEmail}\nСообщение: ${escapedMessage}`
    );

    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

    return (
      <div className="container">
        <h2>Получить консультацию</h2>
        <p>Заполните форму и мы свяжемся с вами в ближайшее время</p>
        <form onSubmit={handleSubmit} className='fooorm'>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder='Имя'
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          <div className="form-group">
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              placeholder='Телефон'
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder='Email'
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="form-group">
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleInputChange}
              placeholder='Текст сообщения'
            />
            {errors.message && <div className="error-message">{errors.message}</div>}
          </div>
          <button type="submit">Отправить</button>
          <p>Нажимая «Продолжить», вы принимаете пользовательское соглашение и политику конфиденциальности</p>
        </form>
      </div>
    );
  };
  
export default RegistrationForm;
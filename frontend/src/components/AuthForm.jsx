import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ setToken }) => {
  const [isRegister, setIsRegister] = useState(false); // Переключение между регистрацией и входом
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/register' : '/login';
    const url = `http://localhost:3000${endpoint}`;
    
    try {
      const response = await axios.post(url, { username, password });
      
      if (!isRegister) {
        const { token } = response.data;
        setToken(token); // Сохраняем токен в состояние родителя (App.jsx)
        setMessage('Успешный вход');
      } else {
        setMessage('Регистрация прошла успешно');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Ошибка');
    }
  };

  return (
    <div className="auth-container">
  <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
  <form className="auth-form" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Имя пользователя"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Пароль"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button type="submit">
      {isRegister ? 'Зарегистрироваться' : 'Войти'}
    </button>
  </form>
  <button 
    className="toggle-auth-btn" 
    onClick={() => setIsRegister(!isRegister)}
  >
    {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
  </button>
  {message && (
    <p className={`auth-message ${message.includes('успеш') ? 'success' : 'error'}`}>
      {message}
    </p>
  )}
</div>
  );
};

export default AuthForm;
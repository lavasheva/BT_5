import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState(null); // Храним токен здесь
  const [protectedData, setProtectedData] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Состояние для загрузки

  const getProtected = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProtectedData(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setProtectedData(error.response?.data?.message || 'Ошибка при получении данных');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>JWT Аутентификация</h1>
      
      <AuthForm setToken={setToken} />
      
      {token && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Токен:</h3>
          <code style={{ 
            display: 'block', 
            wordBreak: 'break-all', 
            padding: '1rem', 
            background: '#f0f0f0',
            marginBottom: '1rem'
          }}>
            {token}
          </code>
          
          <button 
            onClick={getProtected}
            disabled={isLoading}
            style={{
              padding: '0.5rem 1rem',
              background: isLoading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isLoading ? 'Загрузка...' : 'Получить защищённые данные'}
          </button>
          
          {protectedData && (
            <pre style={{ 
              background: '#f4f4f4', 
              padding: '1rem',
              borderRadius: '4px',
              marginTop: '1rem',
              overflowX: 'auto'
            }}>
              {protectedData}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
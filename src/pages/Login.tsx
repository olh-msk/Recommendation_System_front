// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentById } from '../api/studentApi';

export default function Login() {
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const student = await getStudentById(Number(id));
      if (student) {
        localStorage.setItem('studentId', id);
        navigate('/profile');
      } else {
        setError('Користувача не знайдено');
      }
    } catch {
      setError('Помилка входу');
    }
  };

  return (
    <div>
      <h1>Вхід</h1>
      <input
        type="number"
        placeholder="Введіть ID студента"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleLogin}>Увійти</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

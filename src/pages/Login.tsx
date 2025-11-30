// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/authApi';
import { useAuth } from '../auth/AuthContext';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await apiLogin({ email, password });

      const anyRes = res as any;
      const token = (anyRes && (anyRes.token ?? anyRes.accessToken)) ?? null;
      let student = anyRes?.student ?? anyRes?.user ?? null;

      if (
        !student &&
        anyRes &&
        typeof anyRes === 'object' &&
        ('id' in anyRes || 'fullName' in anyRes || 'email' in anyRes)
      ) {
        student = anyRes as any;
      }

      if (student) {
        login(student, token ?? null);
        if ((student as any).role === 'Teacher') navigate('/courses');
        else navigate('/');
        return;
      }

      if (token) {
        // Best-effort fallback: save token and proceed
        login(null as any, token);
        navigate('/');
        return;
      }

      setError(
        'Невірні облікові дані або невідомий формат відповіді від сервера.'
      );
    } catch (e) {
      console.error('Login error', e);
      const msg =
        (e as any)?.response?.data?.message ??
        (e as any)?.message ??
        'Помилка входу';
      setError(msg);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Вхід
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: 'grid', gap: 2 }}
        >
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" onClick={handleLogin}>
              Увійти
            </Button>
            <Button variant="outlined" onClick={() => navigate('/register')}>
              Зареєструватись
            </Button>
          </Box>

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

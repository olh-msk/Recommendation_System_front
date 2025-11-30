import { Link as RouterLink, useNavigate } from 'react-router-dom';
import './Layout.css';
import { useAuth } from '../auth/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              Recommendation
            </Typography>
            <Button color="inherit" component={RouterLink} to="/">
              Головна
            </Button>
            <Button color="inherit" component={RouterLink} to="/courses">
              Курси
            </Button>
            {user?.role === 'Teacher' && (
              <Button color="inherit" component={RouterLink} to="/enrollments">
                Записи
              </Button>
            )}
            {user?.role === 'Teacher' && (
              <Button color="inherit" component={RouterLink} to="/students">
                Студенти
              </Button>
            )}
          </Box>

          <Box>
            {user ? (
              <>
                <Button color="inherit" component={RouterLink} to="/profile">
                  Профіль
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Увійти
                </Button>
                <Button color="inherit" component={RouterLink} to="/register">
                  Реєстрація
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <main className="content">{children}</main>
    </div>
  );
}

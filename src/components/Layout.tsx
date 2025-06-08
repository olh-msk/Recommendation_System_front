import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const studentId = localStorage.getItem('studentId');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('studentId');
    navigate('/login');
  };

  return (
    <div>
      <header className="main-header">
        <nav>
          <Link to="/">Рекомендації</Link>
          <Link to="/courses">Курси</Link>
          <Link to="/students">Студенти</Link>
          <Link to="/enrollments">Записи</Link>
          {studentId ? (
            <>
              <Link to="/profile">Профіль</Link>
              <button onClick={logout}>Вийти</button>
            </>
          ) : (
            <>
              <Link to="/login">Увійти</Link>
              <Link to="/register">Реєстрація</Link>
            </>
          )}
        </nav>
      </header>
      <main className="content">{children}</main>
    </div>
  );
}

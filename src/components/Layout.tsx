// src/components/Layout.tsx
import { Link } from 'react-router-dom';
import './Layout.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="main-header">
        <nav>
          <Link to="/">Рекомендації</Link>
          <Link to="/courses">Курси</Link>
          <Link to="/students">Студенти</Link>
          <Link to="/enrollments">Записи</Link>
        </nav>
      </header>
      <main className="content">{children}</main>
    </div>
  );
}

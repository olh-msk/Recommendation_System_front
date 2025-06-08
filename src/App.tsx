// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recommendations from './pages/Recommendations';
import AllCourses from './pages/AllCourses';
import Students from './pages/Students';
import Enrollments from './pages/Enrollments';
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Recommendations />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/students" element={<Students />} />
          <Route path="/enrollments" element={<Enrollments />} />
        </Routes>
      </Layout>
    </Router>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recommendations from './pages/Recommendations';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Recommendations />} />
        {/* інші сторінки тут */}
      </Routes>
    </Router>
  );
}

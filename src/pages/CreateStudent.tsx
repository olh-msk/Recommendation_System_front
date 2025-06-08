import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

export default function CreateStudent() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Нова реєстрація</h1>
      <StudentForm onSubmit={() => navigate('/')} />
    </div>
  );
}

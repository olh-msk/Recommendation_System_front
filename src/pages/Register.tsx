import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Register() {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Реєстрація студента
      </Typography>
      <StudentForm onSubmit={() => navigate('/login')} />
    </Container>
  );
}

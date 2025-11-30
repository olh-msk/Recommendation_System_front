import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function CreateStudent() {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Нова реєстрація
      </Typography>
      <StudentForm onSubmit={() => navigate('/')} />
    </Container>
  );
}

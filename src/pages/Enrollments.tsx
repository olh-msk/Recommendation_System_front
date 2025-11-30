import { useEffect, useState } from 'react';
import { getAllEnrollments, deleteEnrollment } from '../api/enrollmentApi';
import type { EnrollmentDto } from '../types/Enrollment';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../auth/AuthContext';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState<EnrollmentDto[]>([]);

  const refresh = async () => {
    try {
      const data =
        user?.role === 'Student'
          ? await (await import('../api/enrollmentApi')).getMyEnrollments()
          : await getAllEnrollments();
      setEnrollments(data);
    } catch (err) {
      console.error('Failed to fetch enrollments', err);
      setEnrollments([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await refresh();
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteEnrollment(id);
    refresh(); // можна без await, щоб не блокувало інтерфейс
  };

  const { user } = useAuth();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Записи студентів
      </Typography>

      <List>
        {enrollments.map((e) => (
          <ListItem key={e.id}>
            {(user?.role === 'Teacher' || user?.role === 'Student') && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(e.id)}
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            )}
            <ListItemText
              primary={`${e.studentName} записаний на ${e.courseTitle} — ${e.semester}`}
              secondary={`Оцінка: ${e.grade ?? 'N/A'}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

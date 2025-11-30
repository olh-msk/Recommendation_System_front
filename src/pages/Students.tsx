// src/pages/Students.tsx
import { useEffect, useState } from 'react';
import { getAllStudents } from '../api/studentApi';
import type { StudentDto } from '../types/Student';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useAuth } from '../auth/AuthContext';

export default function Students() {
  const [students, setStudents] = useState<StudentDto[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getAllStudents().then((all) =>
      setStudents(all.filter((s) => s.role !== 'Teacher'))
    );
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Студенти</Typography>
        <Stack direction="row" spacing={1}>
          {user?.role === 'Teacher' && (
            <Button
              variant="contained"
              onClick={() => alert('Додати студента')}
            >
              ➕ Додати студента
            </Button>
          )}
        </Stack>
      </Stack>

      <List>
        {students.map((s) => (
          <ListItem key={s.id} alignItems="flex-start">
            <ListItemText
              primary={`${s.fullName} — GPA: ${s.gpa}`}
              secondary={
                <span>
                  {s.interestNames.map((n, i) => (
                    <Chip key={i} label={n} size="small" sx={{ mr: 0.5 }} />
                  ))}
                </span>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

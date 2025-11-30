// src/pages/Profile.tsx
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { updateStudent } from '../api/studentApi';
import type { UpdateStudentDto } from '../types/Student';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Profile() {
  const { user, login } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? '');
  const [gpa, setGpa] = useState(user?.gpa?.toString() ?? '');

  if (!user) return <Typography>Будь ласка, увійдіть</Typography>;

  const handleSave = async () => {
    const dto: UpdateStudentDto = {
      id: user.id,
      fullName,
      gpa: parseFloat(gpa),
      interestIds: [],
    };
    try {
      await updateStudent(dto);
      // update local context user copy
      login({ ...user, fullName, gpa: parseFloat(gpa) }, null);
      alert('Збережено');
    } catch (err) {
      console.error(err);
      alert('Не вдалося зберегти');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Профіль
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Повне імʼя"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
          />

          <TextField
            label="GPA"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            fullWidth
          />

          <Button variant="contained" onClick={handleSave}>
            Зберегти
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

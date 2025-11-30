// src/pages/AllCourses.tsx
import { useEffect, useState } from 'react';
import { getAllCourses, createCourse } from '../api/courseApi';
import type { CourseDto, CreateCourseDto } from '../types/Course';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../auth/AuthContext';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function AllCourses() {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creditHours, setCreditHours] = useState<number>(3);
  const [tagInput, setTagInput] = useState(''); // comma separated tag ids
  const { user } = useAuth();

  useEffect(() => {
    getAllCourses().then(setCourses);
  }, []);

  const refresh = () => getAllCourses().then(setCourses);

  const handleCreate = async () => {
    const dto: CreateCourseDto = {
      title,
      description,
      creditHours,
      tagIds: tagInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => Number(s)),
    };
    try {
      await createCourse(dto);
      setShowForm(false);
      setTitle('');
      setDescription('');
      setTagInput('');
      refresh();
    } catch (err) {
      console.error('Failed to create course', err);
      alert('Не вдалося створити курс');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Всі курси</Typography>
        {user?.role === 'Teacher' && (
          <Button variant="contained" onClick={() => setShowForm((s) => !s)}>
            ➕ Додати курс
          </Button>
        )}
      </Stack>

      {showForm && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="Назва"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Опис"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Кредити"
              type="number"
              value={creditHours}
              onChange={(e) => setCreditHours(Number(e.target.value))}
            />
            <TextField
              label="ID тегів (через кому)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Наприклад: 1,2,3"
            />

            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={handleCreate}>
                Створити
              </Button>
              <Button variant="outlined" onClick={() => setShowForm(false)}>
                Скасувати
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}

      {courses.map((course) => (
        <CourseCard key={course.id} course={course} onEnrolled={refresh} />
      ))}
    </Container>
  );
}

import React from 'react';
import type { CourseDto } from '../types/Course';
import { useAuth } from '../auth/AuthContext';
import { createEnrollment } from '../api/enrollmentApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface Props {
  course: CourseDto;
  onEnrolled?: () => void;
}

const CourseCard: React.FC<Props> = ({ course, onEnrolled }) => {
  const { user } = useAuth();

  const handleEnroll = async () => {
    if (!user) {
      alert('Будь ласка, увійдіть');
      return;
    }
    try {
      await createEnrollment({
        studentId: user.id,
        courseId: course.id,
        semester: '2025S1',
      });
      alert('Записано на курс');
      onEnrolled?.();
    } catch (err) {
      console.error(err);
      alert('Не вдалося записатися');
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {course.description}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Кредити:
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {course.creditHours}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {course.tags.map((tag, i) => (
            <Chip key={i} label={tag} color="primary" size="small" />
          ))}
        </Stack>
      </CardContent>
      {user?.role === 'Student' && (
        <CardActions>
          <Button size="small" variant="contained" onClick={handleEnroll}>
            Записатися
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CourseCard;

import { useEffect, useState } from 'react';
import { getRecommendations } from '../api/recommendationApi';
import type { CourseDto, RecommendationDto } from '../types/Course';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../auth/AuthContext';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Recommendations = () => {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [reasons, setReasons] = useState<
    Record<number, { score?: number; reason?: string }>
  >({});

  const { user } = useAuth();

  useEffect(() => {
    const studentId = user?.id ?? 1; // fallback for local testing
    getRecommendations(studentId)
      .then((res) => {
        // API may return RecommendationDto[] (with score/reason) or CourseDto[] (fallback)
        if (Array.isArray(res) && res.length > 0 && 'courseId' in res[0]) {
          const recs = res as RecommendationDto[];
          // map to CourseDto for card rendering and collect reasons
          const mapped: CourseDto[] = recs.map((r) => ({
            id: r.courseId,
            title: r.title,
            description: r.description ?? r.shortDescription ?? '',
            creditHours: r.creditHours ?? 0,
            tags: r.tags ?? [],
          }));
          const rs: Record<number, { score?: number; reason?: string }> = {};
          recs.forEach((r) => {
            rs[r.courseId] = { score: r.score, reason: r.reason };
          });
          setReasons(rs);
          setCourses(mapped);
        } else {
          setCourses(res as CourseDto[]);
        }
      })
      .catch((err) => {
        console.error('Failed to load recommendations', err);
        setCourses([]);
      });
  }, [user]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Рекомендовані курси
      </Typography>

      {courses.length > 0 ? (
        courses.map((course) => (
          <Box key={course.id} sx={{ mb: 2 }}>
            <CourseCard course={course} />
            {reasons[course.id] && (
              <Paper sx={{ p: 1, mt: -1, mb: 2 }} elevation={0}>
                {reasons[course.id].score !== undefined && (
                  <Typography variant="body2">
                    Оцінка: {reasons[course.id].score?.toFixed(2)}
                  </Typography>
                )}
                {reasons[course.id].reason && (
                  <Typography variant="body2">
                    Причина: {reasons[course.id].reason}
                  </Typography>
                )}
              </Paper>
            )}
          </Box>
        ))
      ) : (
        <Typography>Немає доступних курсів</Typography>
      )}
    </Container>
  );
};

export default Recommendations;

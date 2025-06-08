import { useEffect, useState } from 'react';
import { getRecommendations } from '../api/recommendationApi';
import type { CourseDto } from '../types/Course';
import { CourseCard } from '../components/CourseCard';

export default function Recommendations() {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentId] = useState(1); // тимчасово статично

  useEffect(() => {
    getRecommendations(studentId)
      .then(setCourses)
      .finally(() => setLoading(false));
  }, [studentId]);

  return (
    <div>
      <h1>Рекомендовані курси</h1>
      {loading ? (
        <p>Завантаження...</p>
      ) : (
        courses.map((course) => <CourseCard key={course.id} course={course} />)
      )}
    </div>
  );
}

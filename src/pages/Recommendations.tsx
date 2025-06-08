import { useEffect, useState } from 'react';
import { getRecommendations } from '../api/recommendationApi';
import type { CourseDto } from '../types/Course';
import CourseCard from '../components/CourseCard';

const Recommendations = () => {
  const [courses, setCourses] = useState<CourseDto[]>([]);

  useEffect(() => {
    getRecommendations(1).then(setCourses).catch(console.error);
  }, []);

  return (
    <div className="page-container">
      <h1>Рекомендовані курси</h1>
      {courses.length > 0 ? (
        courses.map((course) => <CourseCard key={course.id} course={course} />)
      ) : (
        <p>Немає доступних курсів</p>
      )}
    </div>
  );
};

export default Recommendations;

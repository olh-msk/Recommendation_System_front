// src/pages/AllCourses.tsx
import { useEffect, useState } from 'react';
import { getAllCourses } from '../api/courseApi';
import type { CourseDto } from '../types/Course';
import CourseCard from '../components/CourseCard';

export default function AllCourses() {
  const [courses, setCourses] = useState<CourseDto[]>([]);

  useEffect(() => {
    getAllCourses().then(setCourses);
  }, []);

  return (
    <div>
      <h1>Всі курси</h1>
      <button onClick={() => alert('Додати курс')}>➕ Додати курс</button>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

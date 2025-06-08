// src/pages/Enrollments.tsx
import { useEffect, useState } from 'react';
import { getAllEnrollments } from '../api/enrollmentApi';
import type { EnrollmentDto } from '../types/Enrollment';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState<EnrollmentDto[]>([]);

  useEffect(() => {
    getAllEnrollments().then(setEnrollments);
  }, []);

  return (
    <div>
      <h1>Записи студентів</h1>
      <button onClick={() => alert('Записати студента')}>➕ Новий запис</button>
      <ul>
        {enrollments.map((e) => (
          <li key={e.id}>
            {e.studentName} записаний на {e.courseTitle} — {e.semester} (оцінка:{' '}
            {e.grade ?? 'N/A'})
          </li>
        ))}
      </ul>
    </div>
  );
}

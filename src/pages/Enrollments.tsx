import { useEffect, useState } from 'react';
import { getAllEnrollments, deleteEnrollment } from '../api/enrollmentApi';
import type { EnrollmentDto } from '../types/Enrollment';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState<EnrollmentDto[]>([]);

  const refresh = async () => {
    const data = await getAllEnrollments();
    setEnrollments(data);
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

  return (
    <div>
      <h1>Записи студентів</h1>
      <ul>
        {enrollments.map((e) => (
          <li key={e.id}>
            {e.studentName} записаний на {e.courseTitle} — {e.semester} (оцінка:{' '}
            {e.grade ?? 'N/A'})
            <button onClick={() => handleDelete(e.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

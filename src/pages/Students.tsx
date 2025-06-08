// src/pages/Students.tsx
import { useEffect, useState } from 'react';
import { getAllStudents } from '../api/studentApi';
import type { StudentDto } from '../types/Student';

export default function Students() {
  const [students, setStudents] = useState<StudentDto[]>([]);

  useEffect(() => {
    getAllStudents().then(setStudents);
  }, []);

  return (
    <div>
      <h1>Студенти</h1>
      <button onClick={() => alert('Додати студента')}>
        ➕ Додати студента
      </button>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.fullName} — GPA: {s.gpa} — Інтереси: {s.interestNames.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

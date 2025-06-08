// src/pages/Profile.tsx
import { useEffect, useState } from 'react';
import { getStudentById, updateStudent } from '../api/studentApi';
import type { StudentDto } from '../types/Student';

export default function Profile() {
  const studentId = Number(localStorage.getItem('studentId'));
  const [student, setStudent] = useState<StudentDto | null>(null);
  const [gpa, setGpa] = useState('');

  useEffect(() => {
    getStudentById(studentId).then((s) => {
      setStudent(s);
      setGpa(s.gpa.toString());
    });
  }, [studentId]);

  const handleSave = async () => {
    if (!student) return;
    await updateStudent({
      ...student,
      gpa: parseFloat(gpa),
    });
    alert('Збережено');
  };

  return student ? (
    <div>
      <h1>Профіль студента</h1>
      <p>Імʼя: {student.fullName}</p>
      <label>
        GPA: <input value={gpa} onChange={(e) => setGpa(e.target.value)} />
      </label>
      <button onClick={handleSave}>Зберегти</button>
    </div>
  ) : (
    <p>Завантаження...</p>
  );
}

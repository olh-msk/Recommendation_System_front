import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerStudent } from '../api/studentApi';
import type { CreateStudentDto } from '../types/Student';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [gpa, setGpa] = useState('');
  const [interests, setInterests] = useState<string>(''); // input like: "1,3"

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dto: CreateStudentDto = {
      fullName,
      gpa: parseFloat(gpa),
      interestTagIds: interests.split(',').map((id) => parseInt(id.trim())),
    };

    try {
      const newStudentId = await registerStudent(dto);
      localStorage.setItem('studentId', newStudentId.toString());
      navigate('/profile');
    } catch (err) {
      alert('Не вдалося зареєструватися');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Реєстрація студента</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Повне ім’я:</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>GPA:</label>
          <input
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
            required
            type="number"
            step="0.01"
          />
        </div>
        <div>
          <label>ID інтересів (через кому):</label>
          <input
            placeholder="Наприклад: 1,2,3"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            required
          />
        </div>
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
}

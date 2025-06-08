import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import type { CreateStudentDto } from '../types/Student';

export default function StudentForm({ onSubmit }: { onSubmit: () => void }) {
  const [fullName, setFullName] = useState('');
  const [gpa, setGpa] = useState(0);
  const [interests, setInterests] = useState<number[]>([]);
  const [availableTags, setAvailableTags] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    axiosClient.get('/InterestTag').then((res) => setAvailableTags(res.data));
  }, []);

  const handleSubmit = () => {
    const dto: CreateStudentDto = {
      fullName,
      gpa,
      interestTagIds: interests,
    };
    axiosClient.post('/Student', dto).then(onSubmit);
  };

  return (
    <div>
      <h2>Реєстрація студента</h2>
      <input
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="ПІБ"
      />
      <input
        type="number"
        value={gpa}
        onChange={(e) => setGpa(parseFloat(e.target.value))}
        placeholder="GPA"
      />

      <fieldset>
        <legend>Інтереси:</legend>
        {availableTags.map((tag) => (
          <label key={tag.id}>
            <input
              type="checkbox"
              checked={interests.includes(tag.id)}
              onChange={() => {
                setInterests((prev) =>
                  prev.includes(tag.id)
                    ? prev.filter((id) => id !== tag.id)
                    : [...prev, tag.id]
                );
              }}
            />
            {tag.name}
          </label>
        ))}
      </fieldset>

      <button onClick={handleSubmit}>Створити</button>
    </div>
  );
}

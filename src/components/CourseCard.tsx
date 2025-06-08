import React from 'react';
import type { CourseDto } from '../types/Course';

interface Props {
  course: CourseDto;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '1rem 1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
      }}
    >
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
        }}
      >
        {course.title}
      </h3>
      <p style={{ marginBottom: '0.5rem', color: '#4b5563' }}>
        {course.description}
      </p>
      <p>
        <strong>Кредити:</strong> {course.creditHours}
      </p>
      <p>
        <strong>Теги:</strong>{' '}
        {course.tags.map((tag, i) => (
          <span
            key={i}
            style={{
              background: '#e0f2fe',
              color: '#0284c7',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              marginRight: '0.4rem',
              fontSize: '0.9rem',
            }}
          >
            {tag}
          </span>
        ))}
      </p>
    </div>
  );
};

export default CourseCard;

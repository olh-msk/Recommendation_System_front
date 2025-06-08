import type { CourseDto } from '../types/Course';

export const CourseCard = ({ course }: { course: CourseDto }) => (
  <div className="card">
    <h3>{course.title}</h3>
    <p>{course.description}</p>
    <small>{course.creditHours} кредитів</small>
    <div>
      {course.tags.map((tag) => (
        <span className="tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export interface CourseDto {
  id: number;
  title: string;
  description: string;
  creditHours: number;
  tags: string[];
}

export interface CreateCourseDto {
  title: string;
  description: string;
  creditHours: number;
  tagIds: number[]; // це і є interestTagIds
}

export interface EnrollmentDto {
  id: number;
  studentName: string;
  courseTitle: string;
  grade: number | null;
  semester: string;
}

export interface CreateEnrollmentDto {
  studentId: number;
  courseId: number;
  grade?: number;
  semester: string;
}

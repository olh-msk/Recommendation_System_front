export interface StudentDto {
  id: number;
  fullName: string;
  email?: string;
  gpa: number;
  interestNames: string[];
  role?: string;
}

export interface CreateStudentDto {
  fullName: string;
  gpa: number;
  interestTagIds: number[];
  role?: string;
}

export interface UpdateStudentDto {
  id: number;
  fullName: string;
  gpa: number;
  interestIds: number[];
}

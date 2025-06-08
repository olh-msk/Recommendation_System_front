export interface StudentDto {
  id: number;
  fullName: string;
  gpa: number;
  interestNames: string[];
}

export interface CreateStudentDto {
  fullName: string;
  gpa: number;
  interestTagIds: number[];
}

export interface UpdateStudentDto {
  id: number;
  fullName: string;
  gpa: number;
  interestIds: number[];
}

// src/api/authApi.ts
import axiosClient from './axiosClient';
import type { StudentDto } from '../types/Student';

export const loginStudent = async (fullName: string): Promise<StudentDto> => {
  const response = await axiosClient.get(
    `/Student/login/${encodeURIComponent(fullName)}`
  );
  return response.data;
};

export const registerStudent = async (student: {
  fullName: string;
  gpa: number;
  interestTagIds: number[];
}): Promise<StudentDto> => {
  const response = await axiosClient.post('/Student', student);
  return response.data;
};

import axiosClient from './axiosClient';
import type { StudentDto, CreateStudentDto } from '../types/Student';

export const getAllStudents = async (): Promise<StudentDto[]> => {
  const response = await axiosClient.get('/Student');
  return response.data;
};

export const createStudent = async (
  student: CreateStudentDto
): Promise<void> => {
  await axiosClient.post('/Student', student);
};

// src/api/studentApi.ts
import axiosClient from './axiosClient';
import type {
  StudentDto,
  CreateStudentDto,
  UpdateStudentDto,
} from '../types/Student';

export const getAllStudents = async (): Promise<StudentDto[]> => {
  const response = await axiosClient.get('/Student');
  return response.data;
};

export const registerStudent = async (
  dto: CreateStudentDto
): Promise<number> => {
  const response = await axiosClient.post('/Student', dto);
  // Припускаємо, що бек повертає весь об’єкт або хоча б id
  return response.data.id ?? 1;
};

export const getStudentById = async (id: number): Promise<StudentDto> => {
  const response = await axiosClient.get(`/Student/${id}`);
  return response.data;
};

export const updateStudent = async (dto: UpdateStudentDto): Promise<void> => {
  await axiosClient.put(`/Student/${dto.id}`, dto);
};

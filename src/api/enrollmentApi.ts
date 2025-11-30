import axiosClient from './axiosClient';
import type { EnrollmentDto } from '../types/Enrollment';

// Get all enrollments (for teachers/admin) or for debugging
export const getAllEnrollments = async (): Promise<EnrollmentDto[]> => {
  const res = await axiosClient.get('/Enrollments');
  return res.data;
};

// Get enrollments for current student
export const getMyEnrollments = async (): Promise<EnrollmentDto[]> => {
  const res = await axiosClient.get('/Enrollments/me');
  return res.data;
};

export const deleteEnrollment = async (id: number) => {
  await axiosClient.delete(`/Enrollments/${id}`);
};

export const createEnrollment = async (payload: {
  studentId: number;
  courseId: number;
  semester?: string;
  grade?: number | null;
}) => {
  await axiosClient.post('/Enrollments', payload);
};

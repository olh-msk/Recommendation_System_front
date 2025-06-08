import axiosClient from './axiosClient';
import type { EnrollmentDto } from '../types/Enrollment';

export const getAllEnrollments = async (): Promise<EnrollmentDto[]> => {
  const res = await axiosClient.get('/Enrollment');
  return res.data;
};

export const deleteEnrollment = async (id: number) => {
  await axiosClient.delete(`/Enrollment/${id}`);
};

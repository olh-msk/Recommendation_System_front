import axiosClient from './axiosClient';
import type { EnrollmentDto, CreateEnrollmentDto } from '../types/Enrollment';

export const getAllEnrollments = async (): Promise<EnrollmentDto[]> => {
  const response = await axiosClient.get('/Enrollment');
  return response.data;
};

export const createEnrollment = async (
  data: CreateEnrollmentDto
): Promise<void> => {
  await axiosClient.post('/Enrollment', data);
};

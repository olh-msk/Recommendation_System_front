import axiosClient from './axiosClient';
import type { CourseDto, CreateCourseDto } from '../types/Course';

export const getAllCourses = async (): Promise<CourseDto[]> => {
  const response = await axiosClient.get('/Course');
  return response.data;
};

export const getCourseById = async (id: number): Promise<CourseDto> => {
  const response = await axiosClient.get(`/Course/${id}`);
  return response.data;
};

export const createCourse = async (course: CreateCourseDto): Promise<void> => {
  await axiosClient.post('/Course', course);
};

export const deleteCourse = async (id: number): Promise<void> => {
  await axiosClient.delete(`/Course/${id}`);
};

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

// Backend expects 'interestTagIds' (OpenAPI). Transform tagIds -> interestTagIds here.
export const createCourse = async (course: CreateCourseDto): Promise<void> => {
  const payload: any = {
    title: course.title,
    description: course.description,
    creditHours: course.creditHours,
    interestTagIds: course.tagIds ?? [],
  };
  if ((course as any).createdById)
    payload.createdById = (course as any).createdById;
  await axiosClient.post('/Course', payload);
};

export const deleteCourse = async (id: number): Promise<void> => {
  await axiosClient.delete(`/Course/${id}`);
};

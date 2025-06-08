import axios from 'axios';
import type { CourseDto } from '../types/Course';


const BASE_URL = 'https://localhost:7137/api';

export const getRecommendations = async (
  studentId: number
): Promise<CourseDto[]> => {
  const response = await axios.get(`${BASE_URL}/Recommendation/${studentId}`);
  return response.data;
};

export const getAllCourses = async () => {
  const response = await axios.get(`${BASE_URL}/Course`);
  return response.data;
};

// ...інші запити при потребі

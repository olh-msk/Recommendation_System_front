import axiosClient from './axiosClient';
import { getAllCourses } from './courseApi';
import type { CourseDto, RecommendationDto } from '../types/Course';

// Use the app's axios client (baseURL = /api). Keep path consistent with backend controllers.
// If the backend is not available, fall back to returning all courses so the UI remains usable.
export const getRecommendations = async (
  studentId: number
): Promise<RecommendationDto[] | CourseDto[]> => {
  try {
    const response = await axiosClient.get(`/Recommendation/${studentId}`);
    return response.data;
  } catch (err) {
    console.warn('Recommendation API failed, falling back to all courses', err);
    // fallback: return all courses (no scores/reasons), frontend will show course cards
    return getAllCourses();
  }
};

// ...інші запити при потребі

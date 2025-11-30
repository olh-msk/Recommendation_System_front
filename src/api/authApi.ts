// src/api/authApi.ts
import axiosClient from './axiosClient';
import type { LoginDto, RegisterDto, AuthResponse } from '../types/Auth';

// Auth endpoints according to provided OpenAPI
export const login = async (credentials: LoginDto): Promise<AuthResponse> => {
  const response = await axiosClient.post('/Auth/login', credentials);
  return response.data;
};

export const register = async (payload: RegisterDto): Promise<AuthResponse> => {
  const response = await axiosClient.post('/Auth/register', payload);
  return response.data;
};

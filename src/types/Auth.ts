export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  gpa: number;
  interestTagIds?: number[];
}

export interface AuthResponse {
  // generic shape — backend may return token and/or StudentDto
  token?: string;
  student?: any;
}

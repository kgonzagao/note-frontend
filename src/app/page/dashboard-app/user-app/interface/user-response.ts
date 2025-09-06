export interface UserResponse {
  content: User[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface User {
  id: number;
  fullName: string;
  dni: string;
  username: string;
  enabled: boolean;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

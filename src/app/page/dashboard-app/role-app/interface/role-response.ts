export interface RoleResponse {
  content: Role[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateRequest {
  fullName: string;
  dni: string;
  username: string;
  password: string;
  roleIds: number[];
}

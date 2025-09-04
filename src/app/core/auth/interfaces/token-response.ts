export interface TokenResponse {
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
}

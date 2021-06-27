export interface DecodedJwt {
  exp: number;
  iat: number;
  id: string;
  name: string;
  email: string;
}
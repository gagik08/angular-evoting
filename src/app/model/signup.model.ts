export interface SignupRequest {
  username: string;
  password: string;
  age: number;
}

export interface SignupResponse {
  accessToken: string;
  refreshToken: string;
}

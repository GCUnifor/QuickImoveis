export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'COMPRADOR' | 'CORRETOR';
  is_active?: boolean;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  user: User;
}

export interface SignInPayload {
  email: string;
  password?: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password?: string;
  role: 'COMPRADOR' | 'CORRETOR';
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  email: string;
}

export type inputKey = keyof LoginCredentials & keyof SignupCredentials;

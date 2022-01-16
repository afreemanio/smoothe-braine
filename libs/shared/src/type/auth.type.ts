export interface LoginValues {
  username: string;
  password: string;
}

export interface CreateAccountValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponseValues {
  userId: string;
  email: string;
  password: string;
  username: string;
  created: Date;
  updated: Date;
  roles: string[];
  session: {
    sessionId: string;
    expires: Date;
    created: Date;
  };
}

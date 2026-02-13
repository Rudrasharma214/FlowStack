export interface registerCredentials {
  name: string;
  email: string;
  password: string;
}

export interface loginCredentials {
  email: string;
  password: string;
}

export interface verifyLoginOtpData {
  userId: number;
  otp: string;
}

export interface resetPasswordData {
  token: string;
  password: string;
}

export interface changePasswordData {
  oldPassword: string;
  newPassword: string;
}

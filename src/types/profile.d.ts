export interface ProfileResponse {
  id: number;
  userName: string;
  email: string;
  imageUrl: string;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangeProfileRequest {
  name: string;
}

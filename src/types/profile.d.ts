export interface ProfileResponse {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangeProfileRequest {
  name: string;
}

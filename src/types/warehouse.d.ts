export interface WarehouseResponse {
  id: number;
  name: string;
  admins: Admin[];
}

export interface WarehouseFullResponse {
  id: number;
  name: string;
  contactName: string;
  contactNumber: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;
  latitude: number;
  longitude: number;
  areaId: string;
  admins: Admin[];
}

export interface Admin {
  id: number;
  email: string;
  userName: string;
  imageUrl: string;
  roles: AdminRole[];
}

export interface AdminRole {
  id: number;
  name: string;
}

export interface AdminOption extends Admin {
  readonly value: string;
  readonly label: string;
}

export interface UserAddressResponse {
  id: number;
  userId: number;
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
  isDefault: boolean;
}

import { AdminOption } from "./warehouse";

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

export interface AddressFormValues {
  contactName: string;
  contactNumber: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  biteshipArea: AreaOption | null;
}

export interface WarehouseFormValues extends AddressFormValues {
  name: string;
  admins: AdminOption[] | null;
}

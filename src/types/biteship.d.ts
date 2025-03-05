export interface BiteshipArea {
  id: string;
  name: string;
  country_name: string;
  country_code: string;
  administrative_division_level_1_name: string;
  administrative_division_level_1_type: string;
  administrative_division_level_2_name: string;
  administrative_division_level_2_type: string;
  administrative_division_level_3_name: string;
  administrative_division_level_3_type: string;
  postal_code: number;
}

export interface AreaOption extends BiteshipArea {
  readonly value: string;
  readonly label: string;
}

export interface CourierResponse {
  success: boolean;
  object: string;
  message: string;
  code: number;
  origin: Origin;
  destination: Destination;
  pricing: Pricing[];
}

export interface Origin {
  location_id: number;
  latitude: number;
  longitude: number;
  postal_code: number;
  country_name: string;
  country_code: string;
  administrative_division_level_1_name: string;
  administrative_division_level_1_type: string;
  administrative_division_level_2_name: string;
  administrative_division_level_2_type: string;
  administrative_division_level_3_name: string;
  administrative_division_level_3_type: string;
  administrative_division_level_4_name: string;
  administrative_division_level_4_type: string;
  address: string;
}

export interface Destination {
  location_id: number;
  latitude: number;
  longitude: number;
  postal_code: number;
  country_name: string;
  country_code: string;
  administrative_division_level_1_name: string;
  administrative_division_level_1_type: string;
  administrative_division_level_2_name: string;
  administrative_division_level_2_type: string;
  administrative_division_level_3_name: string;
  administrative_division_level_3_type: string;
  administrative_division_level_4_name: string;
  administrative_division_level_4_type: string;
  address: string;
}

export interface Pricing {
  available_collection_method: string[];
  available_for_cash_on_delivery: boolean;
  available_for_proof_of_delivery: boolean;
  available_for_instant_waybill_id: boolean;
  available_for_insurance: boolean;
  company: string;
  courier_name: string;
  courier_code: string;
  courier_service_name: string;
  courier_service_code: string;
  description: string;
  duration: string;
  shipment_duration_range: string;
  shipment_duration_unit: string;
  service_type: string;
  shipping_type: string;
  price: number;
  type: string;
}

export interface CourierRequest {
  origin_area_id: string;
  destination_area_id: string;
  origin_latitude: number | null;
  origin_longitude: number | null;
  destination_latitude: number | null;
  destination_longitude: number | null;
  couriers: string;
  items: Item[];
}

export interface Item {
  name: string;
  description: string;
  value: number;
  length: number | null;
  width: number | null;
  height: number | null;
  weight: number;
  quantity: number;
}

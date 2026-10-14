import { Product } from './product';

export interface TrayItem {
  product: Product;
  quantity: number;
}

export interface OrderCustomerDetails {
  customerName: string;
  phoneNumber: string;
  deliveryArea: string;
  deliveryAddress: string;
  deliveryDate: string;
  specialInstructions?: string;
}

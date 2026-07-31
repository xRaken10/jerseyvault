import type { Product } from './product';
import type { Talla } from '../config/app.config';

export interface CartItem {
  product: Product;
  talla: Talla;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

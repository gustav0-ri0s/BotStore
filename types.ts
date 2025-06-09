
// ProductCategory will now be a string, managed dynamically in app state.
// export enum ProductCategory {
//   KITS = "Kits",
//   CONTROLLERS = "Controllers",
//   SENSORS = "Sensors",
//   MOTORS = "Motors",
//   CHASSIS = "Chassis",
//   ACCESSORIES = "Accessories",
// }

export type ProductType = string; // Was: 'kit' | 'part', now dynamic

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; // Was ProductCategory
  imageUrl: string; // Can be a URL or a base64 data URI
  type: ProductType;
}

export interface CartItem extends Product {
  quantity: number;
}

export type AdminSectionType = 'products' | 'categories' | 'types';

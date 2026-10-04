export type ProductCategory =
  | "Jersey"
  | "Training Kit"
  | "Shorts"
  | "Tracksuit"
  | "Footwear"
  | "Accessories"
  | "Other";

export type ProductStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock";

export type PaymentMethod =
  | "Card"
  | "Bank Transfer"
  | "USSD";

export type ShopOrderStatus =
  | "Processing"
  | "Ready for Pickup"
  | "Shipped"
  | "Completed"
  | "Cancelled";

export interface ShopProduct {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image?: string;
  sizes: string[];
  stockQuantity: number;
  status: ProductStatus;
  featured: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
}

export interface ShopOrderItem {
  productId: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface ShopOrder {
  id: string;
  orderNumber: string;
  buyerName: string;
  email: string;
  phone: string;
  fulfilment: "Pickup" | "Delivery";
  deliveryAddress?: string;
  items: ShopOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "Paid";
  status: ShopOrderStatus;
  createdAt: string;
}


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  productCount: number;
}

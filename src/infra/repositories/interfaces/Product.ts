export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
}

export type CreateProductDto = Omit<Product, "id">;

export type UpdateProductDto = Product;

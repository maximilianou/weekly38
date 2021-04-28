import { Injectable } from "@nestjs/common";
import { Product } from './product.model';
@Injectable()
export class ProductsService {
  products: Product[] = [];
  insert(title: string, description: string, price: number): string{
    const prodId = new Date().toISOString();
    const newProd = new Product(
      prodId, 
      title, description, price);
      this.products.push(newProd);
      return prodId;
  }
}
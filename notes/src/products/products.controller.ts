import { Controller, Post, Body, Get } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService){}

  @Post()
  addProducts( 
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number
    ) {
    const generatedId = this.productsService.insert(prodTitle, prodDesc, prodPrice);
    return { id: generatedId };
  }
  @Get()
  listProducts(){
    return this.productsService.get();
  }
}
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/products.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
constructor(
  @InjectModel(Product.name) private productModel : Model<ProductDocument>
) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto)
  }

  findAll() {
    return this.productModel.find()
  }

  findOne(id: string) {
     return this.productModel.findById(id)
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto)
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id)
  }
}

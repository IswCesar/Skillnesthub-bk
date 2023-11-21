import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const created = await this.productModel.create(createProductDto);
    return created;
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove({ _id: id }).exec();
  }
}

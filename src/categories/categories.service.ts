import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const created = await this.categoryModel.create(createCategoryDto);
    return created;
  }

  findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const obj = await this.findOne(id);

    await obj.updateOne(updateCategoryDto, { new: true });
    return { ...obj.toJSON(), ...updateCategoryDto };
  }

  remove(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndRemove({ _id: id }).exec();
  }
}

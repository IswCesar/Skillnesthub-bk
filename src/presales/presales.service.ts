import { Injectable } from '@nestjs/common';
import { CreatePresaleDto } from './dto/create-presale.dto';
import { UpdatePresaleDto } from './dto/update-presale.dto';
import { Presale } from './schemas/presale.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PresalesService {
  constructor(
    @InjectModel(Presale.name) private readonly presaleModel: Model<Presale>,
  ) {}

  async create(createPresaleDto: CreatePresaleDto) {
    const objCreated = await this.presaleModel.create(createPresaleDto);
    return objCreated;
  }

  findAll() {
    return this.presaleModel.find().exec();
  }

  findOne(id: string) {
    return this.presaleModel.findById(id).exec();
  }

  update(id: number, updatePresaleDto: UpdatePresaleDto) {
    return `This action updates a #${id} presale`;
  }

  remove(id: string) {
    return this.presaleModel.findByIdAndRemove({ _id: id }).exec();
  }
}

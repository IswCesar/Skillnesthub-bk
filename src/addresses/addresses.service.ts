import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './schemas/address.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const created = await this.addressModel.create(createAddressDto);
    return created;
  }

  findAll(): Promise<Address[]> {
    return this.addressModel.find().exec();
  }

  findOne(id: string): Promise<Address> {
    return this.addressModel.findById(id).exec();
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: string): Promise<Address> {
    return this.addressModel.findByIdAndRemove({ _id: id }).exec();
  }
}

import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from './schemas/shipment.schema';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectModel(Shipment.name) private readonly shipmentModel: Model<Shipment>,
  ) {}

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const created = await this.shipmentModel.create(createShipmentDto);
    return created;
  }

  findAll(): Promise<Shipment[]> {
    return this.shipmentModel.find().exec();
  }

  findOne(id: string) {
    return this.shipmentModel.findById(id).exec();
  }

  async update(id: string, updateShipmentDto: UpdateShipmentDto) {
    const obj = await this.findOne(id);

    await obj.updateOne(updateShipmentDto, { new: true });
    return { ...obj.toJSON(), ...updateShipmentDto };
  }

  remove(id: string) {
    return this.shipmentModel.findByIdAndRemove({ _id: id }).exec();
  }
}

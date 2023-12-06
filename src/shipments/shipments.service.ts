import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from './schemas/shipment.schema';
import { AddMessageShipmentDto } from './dto/add-message-shipment';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectModel(Shipment.name) private readonly shipmentModel: Model<Shipment>,
  ) {}

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const created = await this.shipmentModel.create(createShipmentDto);

    const fecha = new Date();
    const fechaN = new Date(fecha.setMonth(fecha.getMonth() + 1));

    const message = await this.shipmentModel.findByIdAndUpdate(
      created._id,
      {
        deadline: fechaN,
        $push: {
          messages: {
            title: 'Creado',
            message: 'Registro creado en el sistema',
            createdAt: new Date(),
          },
        },
      },
      { new: true },
    );

    return message;
  }

  findAll(): Promise<Shipment[]> {
    return this.shipmentModel.find().populate('address').exec();
  }

  async addMessage(
    addMessageShipment: AddMessageShipmentDto,
  ): Promise<Shipment> {
    const message = await this.shipmentModel.findByIdAndUpdate(
      addMessageShipment.shipment,
      {
        status: addMessageShipment.title,
        $push: {
          messages: {
            title: addMessageShipment.title,
            message: addMessageShipment.message,
            createdAt: new Date(),
          },
        },
      },
      { new: true },
    );
    return message;
  }

  findOne(id: string) {
    return this.shipmentModel.findById(id).populate('address').exec();
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

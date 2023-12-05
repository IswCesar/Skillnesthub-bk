import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  makeid(l) {
    let text = '';
    const char_list =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < l; i++) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const created = await this.orderModel.create(createOrderDto);
    let newObj;
    if (createOrderDto.folio == '') {
      newObj = await this.orderModel
        .findByIdAndUpdate(
          created._id,
          {
            folio: this.makeid(8),
          },
          { new: true },
        )
        .exec();
    } else {
      newObj = created;
    }
    if (createOrderDto.createdAt == '') {
      newObj = await this.orderModel
        .findByIdAndUpdate(
          created._id,
          {
            createdAt: new Date().toLocaleDateString('es-MX'),
          },
          { new: true },
        )
        .exec();
    } else {
      newObj = created;
    }

    return newObj;
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  findByUser(id: string): Promise<Order[]> {
    return this.orderModel.find({ user: id }).exec();
  }

  findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const obj = await this.findOne(id);

    await obj.updateOne(updateOrderDto, { new: true });
    return { ...obj.toJSON(), ...updateOrderDto };
  }

  remove(id: string): Promise<Order> {
    return this.orderModel.findByIdAndRemove({ _id: id }).exec();
  }
}

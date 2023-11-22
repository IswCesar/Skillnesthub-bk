import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IntentOrderDto } from './dto/intent-order';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const created = await this.orderModel.create(createOrderDto);
    return created;
  }

  createIntent(intentOrderDto: IntentOrderDto) {
    return 'This action adds a new order';
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  findOne(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string): Promise<Order> {
    return this.orderModel.findByIdAndRemove({ _id: id }).exec();
  }
}

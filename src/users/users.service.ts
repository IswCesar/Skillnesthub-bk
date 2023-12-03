import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signin-user.dto';
import { AddOrderDto } from './dto/add-order.dto';
import { Order } from 'src/orders/schemas/order.schema';
import { AddAddressDto } from './dto/add-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash;
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async addOrder(addOrder: AddOrderDto): Promise<User> {
    const order = await this.orderModel.findById(addOrder.order).exec();
    const user = await this.findOne(addOrder.user);
    // user.orders.push(order.id);
    const user2 = (await this.userModel.findById(addOrder.user)).populate(
      'orders',
    );
    return user2;
  }

  async addAddress(addAddress: AddAddressDto): Promise<User> {
    // const user = await this.findOne(addAddress.user);
    // user
    // return user2;
    const user = await this.userModel.findByIdAndUpdate(addAddress.user, {
      $push: { addresses: addAddress.address },
    });
    console.log(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).populate('orders').exec();
  }

  async signin(signinUserDto: SigninUserDto) {
    const x: User = await this.userModel
      .findOne({ username: signinUserDto.username })
      .exec();
    if (x !== null) {
      // return x;
      const isMatch = await bcrypt.compare(signinUserDto.password, x.password);
      if (isMatch) {
        return x;
      } else {
        return 'Pwd not match!';
      }
    }
    return 'User not found';
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const obj = await this.findOne(id);

    await obj.updateOne(updateUserDto, { new: true });
    return { ...obj.toJSON(), ...updateUserDto };
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove({ _id: id }).exec();
  }
}

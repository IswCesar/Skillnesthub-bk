import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signin-user.dto';
import { AddOrderDto } from './dto/add-order.dto';
import { AddAddressDto } from './dto/add-address.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ChangePwdDto } from './dto/change-pwd.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Create user
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const otp = this.generateOTP(6);
    createUserDto.password = hash;
    createUserDto.otp = otp;
    const createdUser = await this.userModel.create(createUserDto);

    // Send email welcome
    this.eventEmitter.emit('user.welcome', {
      name: createUserDto.firstname,
      email: createUserDto.email,
    });

    // Send verification code

    this.eventEmitter.emit('user.verify-email', {
      id: createdUser._id,
      name: createUserDto.firstname,
      email: createUserDto.email,
      otp,
    });

    return createdUser;
  }

  async changePwd(changePwdDto: ChangePwdDto): Promise<User> {
    // Create user
    const saltOrRounds = 10;
    const password = changePwdDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const newObj = await this.userModel
      .findByIdAndUpdate(
        changePwdDto.user,
        {
          password: hash,
        },
        { new: true },
      )
      .exec();

    this.eventEmitter.emit('user.resetted', {
      name: newObj.firstname,
      email: newObj.email,
    });
    // this.eventEmitter.emit('user.verify-email', {
    //   id: createdUser._id,
    //   name: createUserDto.firstname,
    //   email: createUserDto.email,
    //   otp,
    // });

    return newObj;
  }

  async addOrder(addOrder: AddOrderDto): Promise<User> {
    const order = await this.userModel.findByIdAndUpdate(addOrder.user, {
      $push: { orders: addOrder.order },
    });
    return order;
  }

  async addAddress(addAddress: AddAddressDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(addAddress.user, {
      $push: { addresses: addAddress.address },
    });
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).populate('orders').exec();
  }

  async reset(email: string) {
    const user = await this.userModel.findOne({ email });
    // link: 'https://www.skillnesthub.com/reset',
    if (user != null) {
      this.eventEmitter.emit('user.reset-password', {
        name: user.firstname,
        email: user.email,
        link: `http://localhost:3000/reset?id=${user._id}`,
      });
      return user;
    } else {
      return `Accound with email ${email} not found`;
    }

    console.log(user);
  }

  async verify(id: string) {
    // Verificar
    const newObj = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          verified: true,
        },
        { new: true },
      )
      .exec();

    // Email de verificacion
    this.eventEmitter.emit('user.verified', {
      name: newObj.firstname,
      email: newObj.email,
    });

    return newObj;
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

  generateOTP(limit: number): string {
    // Declare a digits variable
    // which stores all digits
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
}

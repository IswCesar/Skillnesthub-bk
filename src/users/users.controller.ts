import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { AddOrderDto } from './dto/add-order.dto';
import { AddAddressDto } from './dto/add-address.dto';
import { ChangePwdDto } from './dto/change-pwd.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('changePwd')
  changePassword(@Body() changePwdDto: ChangePwdDto) {
    return this.usersService.changePwd(changePwdDto);
  }

  @Post('addOrder')
  addOrder(@Body() addOrder: AddOrderDto) {
    return this.usersService.addOrder(addOrder);
  }

  @Post('addAddress')
  addAddress(@Body() addAddress: AddAddressDto) {
    return this.usersService.addAddress(addAddress);
  }

  @Post('sigin')
  sigin(@Body() signinUserDto: SigninUserDto) {
    return this.usersService.signin(signinUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('verify/:id')
  verify(@Param('id') id: string) {
    return this.usersService.verify(id);
  }

  @Get('reset/:id')
  reset(@Param('id') id: string) {
    return this.usersService.reset(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

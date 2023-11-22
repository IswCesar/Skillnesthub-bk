import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import { CreateStripeIntentDto } from './dto/create-intent-stripe.dto';
import { CreateChargeStripeDto } from './dto/create-charge-stripe.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('intent')
  create(@Body() createStripeIntentDto: CreateStripeIntentDto) {
    return this.stripeService.createIntent(createStripeIntentDto);
  }

  @Post('charge')
  charge(@Body() createChargeStripeDto: CreateChargeStripeDto) {
    return this.stripeService.makeCharge(createChargeStripeDto);
  }

  @Get()
  findAll() {
    return this.stripeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeDto: UpdateStripeDto) {
    return this.stripeService.update(+id, updateStripeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeService.remove(+id);
  }
}

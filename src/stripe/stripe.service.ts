import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { CreateStripeIntentDto } from './dto/create-intent-stripe.dto';
import * as util from 'util';

@Injectable()
export class StripeService {
  readonly stripe: Stripe;

  constructor(readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'));
  }

  async createIntent(createStripeIntentDto: CreateStripeIntentDto) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: createStripeIntentDto.price,
        currency: this.configService.get<string>('STRIPE_CURRENCY'),
        automatic_payment_methods: { enabled: true },
      });
      return paymentIntent;
    } catch (error) {
      Logger.error(
        '[stripeService] Error creating a payment intent',
        util.inspect(error),
      );
      throw new UnprocessableEntityException(
        'The payment intent could not be created',
      );
    }
  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}

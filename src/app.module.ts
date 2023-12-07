import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PresalesModule } from './presales/presales.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { StripeModule } from './stripe/stripe.module';
import { AddressesModule } from './addresses/addresses.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    PresalesModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    StripeModule,
    AddressesModule,
    ShipmentsModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

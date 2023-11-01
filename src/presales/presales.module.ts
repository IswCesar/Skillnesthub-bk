import { Module } from '@nestjs/common';
import { PresalesService } from './presales.service';
import { PresalesController } from './presales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Presale, PresaleSchema } from './schemas/presale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Presale.name, schema: PresaleSchema }]),
  ],
  controllers: [PresalesController],
  providers: [PresalesService],
  exports: [MongooseModule],
})
export class PresalesModule {}

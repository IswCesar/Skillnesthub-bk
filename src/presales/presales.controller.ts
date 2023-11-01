import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PresalesService } from './presales.service';
import { CreatePresaleDto } from './dto/create-presale.dto';
import { UpdatePresaleDto } from './dto/update-presale.dto';

@Controller('presales')
export class PresalesController {
  constructor(private readonly presalesService: PresalesService) {}

  @Post()
  create(@Body() createPresaleDto: CreatePresaleDto) {
    return this.presalesService.create(createPresaleDto);
  }

  @Get()
  findAll() {
    return this.presalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presalesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresaleDto: UpdatePresaleDto) {
    return this.presalesService.update(+id, updatePresaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presalesService.remove(id);
  }
}

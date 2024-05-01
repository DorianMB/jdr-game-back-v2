import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BagService } from './bag.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { Bag } from '../entities/Bag';
import { AuthGuard } from '@nestjs/passport';

@Controller('bags')
export class BagController {
  constructor(private readonly bagService: BagService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createBagDto: CreateBagDto): Promise<Bag> {
    return await this.bagService.create(createBagDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Bag[]> {
    return await this.bagService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<Bag> {
    return await this.bagService.findOne(+id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() updateBagDto: UpdateBagDto): Promise<Bag> {
    return await this.bagService.update(updateBagDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<void> {
    return await this.bagService.remove(+id);
  }
}

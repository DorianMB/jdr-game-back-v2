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
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { Item } from '../entities/Items';
import { SendItemDto } from './dto/send-item.dto';
import { EquipDto } from './dto/equip.dto';
import { SellDto } from './dto/sell.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  //Others methods

  @Get('/generate/:lootTableId')
  @UseGuards(AuthGuard('jwt'))
  async generateItemFromLootTable(
    @Param('lootTableId') lootTableId: string,
  ): Promise<Item> {
    return await this.itemsService.generateItemFromLootTable(+lootTableId);
  }

  @Patch('/equip')
  @UseGuards(AuthGuard('jwt'))
  async equipItem(@Body() info: EquipDto): Promise<boolean> {
    return await this.itemsService.equipItem(info);
  }

  @Patch('/putInBag')
  @UseGuards(AuthGuard('jwt'))
  async putInBag(@Body() info: EquipDto): Promise<boolean> {
    return await this.itemsService.putInBag(info);
  }

  @Patch('/sell')
  @UseGuards(AuthGuard('jwt'))
  async sellItem(@Body() info: SellDto): Promise<boolean> {
    return await this.itemsService.sellItem(info);
  }

  //CRUD

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<SendItemDto[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<SendItemDto> {
    return await this.itemsService.findOne(+id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() updateItemDto: UpdateItemDto): Promise<Item> {
    return await this.itemsService.update(updateItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<void> {
    return await this.itemsService.remove(+id);
  }
}

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
import { LootTablesService } from './loot-tables.service';
import { CreateLootTableDto } from './dto/create-loot-table.dto';
import { UpdateLootTableDto } from './dto/update-loot-table.dto';
import { AuthGuard } from '@nestjs/passport';
import { LootTable } from '../entities/LootTable';

@Controller('loot-tables')
export class LootTablesController {
  constructor(private readonly lootTablesService: LootTablesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createLootTableDto: CreateLootTableDto,
  ): Promise<LootTable> {
    return await this.lootTablesService.create(createLootTableDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<LootTable[]> {
    return await this.lootTablesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<LootTable> {
    return await this.lootTablesService.findOne(+id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Body() updateLootTableDto: UpdateLootTableDto,
  ): Promise<LootTable> {
    return await this.lootTablesService.update(updateLootTableDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<void> {
    return await this.lootTablesService.remove(+id);
  }
}

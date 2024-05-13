import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from '../entities/Items';
import { SendItemDto } from './dto/send-item.dto';
import { EquipDto } from './dto/equip.dto';
import { SellDto } from './dto/sell.dto';
import { BuyDto } from './dto/buy.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    generateItemFromLootTable(lootTableId: string): Promise<Item>;
    equipItem(info: EquipDto): Promise<boolean>;
    putInBag(info: EquipDto): Promise<boolean>;
    sellItem(info: SellDto): Promise<boolean>;
    buyItem(info: BuyDto): Promise<boolean>;
    shopList(id: string): Promise<Item[]>;
    testProbability(): Promise<any>;
    create(createItemDto: CreateItemDto): Promise<Item>;
    findAll(): Promise<SendItemDto[]>;
    findOne(id: string): Promise<SendItemDto>;
    update(updateItemDto: UpdateItemDto): Promise<Item>;
    remove(id: string): Promise<void>;
}

import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { Bag } from '../entities/Bag';
import { Repository } from 'typeorm';
import { ItemsService } from '../items/items.service';
import { SendItemDto } from '../items/dto/send-item.dto';
export declare class BagService {
    private bagRepository;
    private itemsService;
    constructor(bagRepository: Repository<Bag>, itemsService: ItemsService);
    create(createBagDto: CreateBagDto): Promise<Bag>;
    findAll(): Promise<Bag[]>;
    findOne(id: number): Promise<Bag>;
    findItemsByBagId(id: number): Promise<SendItemDto[]>;
    update(updateBagDto: UpdateBagDto): Promise<Bag>;
    remove(id: number): Promise<void>;
    findIfBagIsFull(id: number): Promise<boolean>;
}

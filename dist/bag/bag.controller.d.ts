import { BagService } from './bag.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { Bag } from '../entities/Bag';
import { SendItemDto } from '../items/dto/send-item.dto';
export declare class BagController {
    private readonly bagService;
    constructor(bagService: BagService);
    findItemsByBagId(id: string): Promise<SendItemDto[]>;
    findIfBagIsFull(id: string): Promise<boolean>;
    create(createBagDto: CreateBagDto): Promise<Bag>;
    findAll(): Promise<Bag[]>;
    findOne(id: string): Promise<Bag>;
    update(updateBagDto: UpdateBagDto): Promise<Bag>;
    remove(id: string): Promise<void>;
}

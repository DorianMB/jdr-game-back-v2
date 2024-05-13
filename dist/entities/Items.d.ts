import { Relation } from 'typeorm';
import { LootTable } from './LootTable';
import { Bag } from './Bag';
import { Character } from './Character';
export declare class Item {
    item_id: number;
    loot_id: Relation<LootTable>;
    bag_id: Relation<Bag>;
    owned: boolean;
    in_shop: Character;
    level: number;
    price: number;
    rarity: string;
    strength: number;
    intelligence: number;
    speed: number;
    charisma: number;
    health: number;
    luck: number;
    charm: boolean;
    charm_type: string;
    charm_value: number;
    created_at: Date;
    updated_at: Date;
}

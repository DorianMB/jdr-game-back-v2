import { Relation } from 'typeorm';
import { Item } from './Items';
export declare class Equipment {
    equipment_id: number;
    helmet_id: Relation<Item>;
    chestplate_id: Relation<Item>;
    gloves_id: Relation<Item>;
    boots_id: Relation<Item>;
    primary_weapon_id: Relation<Item>;
    secondary_weapon_id: Relation<Item>;
    primary_magic_item_id: Relation<Item>;
    secondary_magic_item_id: Relation<Item>;
    created_at: Date;
    updated_at: Date;
}

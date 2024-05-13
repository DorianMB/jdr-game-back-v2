import { Item } from '../../entities/Items';
export declare class SendEquipmentDto {
    equipment_id: number;
    helmet_id: number | Item;
    chestplate_id: number | Item;
    gloves_id: number | Item;
    boots_id: number | Item;
    primary_weapon_id: number | Item;
    secondary_weapon_id: number | Item;
    primary_magic_item_id: number | Item;
    secondary_magic_item_id: number | Item;
    created_at: Date;
    updated_at: Date;
}

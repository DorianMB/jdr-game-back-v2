import { Bag } from '../../entities/Bag';
import { Stat } from '../../entities/Stat';
import { Equipment } from '../../entities/Equipment';
import { User } from '../../entities/User';
export interface CharacterSendDto {
    character_id?: number;
    name?: string;
    user_id?: number | User;
    equipment_id?: number | Equipment;
    stat_id?: number | Stat;
    bag_id?: number | Bag;
    picture?: string;
    level?: number;
    experience?: number;
    money?: number;
    created_at?: Date;
    updated_at?: Date;
}

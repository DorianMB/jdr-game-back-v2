import { Relation } from 'typeorm';
import { Equipment } from './Equipment';
import { User } from './User';
import { Stat } from './Stat';
import { Bag } from './Bag';
export declare class Character {
    character_id: number;
    user_id: Relation<User>;
    equipment_id: Relation<Equipment>;
    stat_id: Relation<Stat>;
    bag_id: Relation<Bag>;
    picture: string;
    level: number;
    experience: number;
    experience_points: number;
    money: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

import { Item } from '../../entities/Items';
import { Stat } from '../../entities/Stat';
export declare class FightDto {
    enemy: Enemy;
    rounds: any[];
    isVictory: boolean;
    treasure: Item;
}
export declare class Enemy {
    name: string;
    level: number;
    stat: Stat;
    picture: string;
    fight_picture: string;
}

import { Enemy } from '../characters/dto/fight.dto';
import { Character } from '../entities/Character';
import { Equipment } from '../entities/Equipment';
export declare const convertEmptyStringToNull: (obj: any) => any;
export declare const lootTableStatMinMax: () => [number | null, number | null];
export declare const randomRarity: (maxRarity: any) => string;
export declare const randomBetween: (min: number, max: number) => number;
export declare const randomEnemy: (character: Character) => Enemy;
export declare const simulateRounds: (character: Character, enemy: Enemy) => any[];
export declare const isVictory: (rounds: any[]) => boolean;
export declare const getCumulativeStatFromEquipment: (equipment: Equipment, stat: string) => number;
export declare const getLevelByExperience: (experience: number) => number;

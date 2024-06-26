import { Bag } from '../../entities/Bag';
import { LootTable } from '../../entities/LootTable';
import { Character } from '../../entities/Character';

export class UpdateItemDto {
  item_id: number;
  loot_id: Partial<LootTable>;
  bag_id: Partial<Bag>;
  owned: boolean;
  in_shop: Partial<Character>;
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

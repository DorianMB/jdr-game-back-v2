import { LootTable } from '../../entities/LootTable';
import { Bag } from '../../entities/Bag';

export class SendItemDto {
  item_id: number;
  loot_id: number | LootTable;
  bag_id: number | Bag;
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

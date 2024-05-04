import { User } from '../../entities/User';

export interface CharacterSendDto {
  character_id: number;
  user_id: number | User;
  equipment_id: number;
  stat_id: number;
  bag_id: number;
  picture: string;
  experience: number;
  money: number;
  created_at: Date;
  updated_at: Date;
}

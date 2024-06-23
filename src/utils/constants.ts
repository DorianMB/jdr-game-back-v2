export const LOOT_BASE_PICTURE =
  'https://cdn.midjourney.com/c6dc1852-6979-4ff5-a033-64ca40a9d87b/0_0.png';

export const HAND_PICTURE =
  'https://png.pngtree.com/png-clipart/20230219/original/pngtree-fight-hand-png-image_8958805.png';

export const RARITY_LIST = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

export const RARITY_WEIGHTS = [0.5, 0.25, 0.15, 0.07, 0.03];

export const LOOT_TYPE_LIST = [
  'helmet',
  'chestplate',
  'gloves',
  'boots',
  'sword',
  'shield',
  'bow',
  'arrow',
  'magic_wand',
  'magic_book',
  'magic_item',
];

export const CHARM_TYPE_LIST = [
  'xp_boost',
  'gold_boost',
  'looting_boost',
  'first_attack_boost',
];

export const PRIMARY_WEAPON_TYPE_LIST = ['sword', 'bow', 'magic_wand'];

export const SECONDARY_WEAPON_TYPE_LIST = ['shield', 'arrow', 'magic_book'];

export const ARMOR_TYPE_LIST = ['helmet', 'chestplate', 'gloves', 'boots'];

export const STATS_TYPE_LIST = [
  'strength',
  'intelligence',
  'speed',
  'charisma',
  'health',
  'luck',
];

export const ARMOR_STATS_TYPE_LIST = [...STATS_TYPE_LIST, 'armor'];

export const WEAPON_STATS_TYPE_LIST = [...STATS_TYPE_LIST, 'damage'];

export const ENEMIES_LIST = [
  {
    name: 'Goblin',
    picture:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2cb0661f-8c29-46dd-a2e0-5aeecd98dc3c/dfegd7k-d4f7678e-461d-4228-97d1-3e6345424c90.jpg/v1/fill/w_1280,h_1473,q_75,strp/dnd_enemy__beloguts_by_jordankerbow_dfegd7k-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ3MyIsInBhdGgiOiJcL2ZcLzJjYjA2NjFmLThjMjktNDZkZC1hMmUwLTVhZWVjZDk4ZGMzY1wvZGZlZ2Q3ay1kNGY3Njc4ZS00NjFkLTQyMjgtOTdkMS0zZTYzNDU0MjRjOTAuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5mwNjufNB2D-cqOxRgvM5KS9S4DtxQp_-bZuuoyZKgU',
    fight_picture:
      'https://www.belloflostsouls.net/wp-content/uploads/2021/10/oE6atKJ.png',
  },
  {
    name: 'Orc',
    picture:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2cb0661f-8c29-46dd-a2e0-5aeecd98dc3c/dfegd7k-d4f7678e-461d-4228-97d1-3e6345424c90.jpg/v1/fill/w_1280,h_1473,q_75,strp/dnd_enemy__beloguts_by_jordankerbow_dfegd7k-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ3MyIsInBhdGgiOiJcL2ZcLzJjYjA2NjFmLThjMjktNDZkZC1hMmUwLTVhZWVjZDk4ZGMzY1wvZGZlZ2Q3ay1kNGY3Njc4ZS00NjFkLTQyMjgtOTdkMS0zZTYzNDU0MjRjOTAuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5mwNjufNB2D-cqOxRgvM5KS9S4DtxQp_-bZuuoyZKgU',
    fight_picture:
      'https://www.belloflostsouls.net/wp-content/uploads/2021/10/oE6atKJ.png',
  },
  {
    name: 'Troll',
    picture:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2cb0661f-8c29-46dd-a2e0-5aeecd98dc3c/dfegd7k-d4f7678e-461d-4228-97d1-3e6345424c90.jpg/v1/fill/w_1280,h_1473,q_75,strp/dnd_enemy__beloguts_by_jordankerbow_dfegd7k-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ3MyIsInBhdGgiOiJcL2ZcLzJjYjA2NjFmLThjMjktNDZkZC1hMmUwLTVhZWVjZDk4ZGMzY1wvZGZlZ2Q3ay1kNGY3Njc4ZS00NjFkLTQyMjgtOTdkMS0zZTYzNDU0MjRjOTAuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5mwNjufNB2D-cqOxRgvM5KS9S4DtxQp_-bZuuoyZKgU',
    fight_picture:
      'https://www.belloflostsouls.net/wp-content/uploads/2021/10/oE6atKJ.png',
  },
  {
    name: 'Skeleton',
    picture:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2cb0661f-8c29-46dd-a2e0-5aeecd98dc3c/dfegd7k-d4f7678e-461d-4228-97d1-3e6345424c90.jpg/v1/fill/w_1280,h_1473,q_75,strp/dnd_enemy__beloguts_by_jordankerbow_dfegd7k-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ3MyIsInBhdGgiOiJcL2ZcLzJjYjA2NjFmLThjMjktNDZkZC1hMmUwLTVhZWVjZDk4ZGMzY1wvZGZlZ2Q3ay1kNGY3Njc4ZS00NjFkLTQyMjgtOTdkMS0zZTYzNDU0MjRjOTAuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5mwNjufNB2D-cqOxRgvM5KS9S4DtxQp_-bZuuoyZKgU',
    fight_picture:
      'https://www.belloflostsouls.net/wp-content/uploads/2021/10/oE6atKJ.png',
  },
];

export const BASE_EXPERIENCE_BY_LEVEL = 10;

export const BASE_STAT_BY_RARIY = {
  Common: 10,
  Uncommon: 20,
  Rare: 50,
  Epic: 100,
  Legendary: 200,
};

export const ITEM_IN_SHOP = 4;

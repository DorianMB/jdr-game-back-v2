import { RARITY_LIST } from './constants';

export const lootTableStatMinMax = (): [number | null, number | null] => {
  const tirage = Math.floor(Math.random() * 5);
  console.log('tirage', tirage);
  switch (tirage) {
    case 0:
      const num = Math.floor(Math.random() * 100);
      console.log('case0', [num, num]);
      return [num, num];
    case 1:
      const max1 = Math.floor(Math.random() * 100);
      console.log('case1', [null, max1]);
      return [null, max1];
    case 2:
      const min2 = Math.floor(Math.random() * 100);
      console.log('case2', [min2, null]);
      return [min2, null];
    case 3:
      const min3 = Math.floor(Math.random() * 100);
      const max3 = Math.floor(min3 + Math.random() * 100);
      console.log('case3', [min3, max3]);
      return [min3, max3];
    case 4:
      console.log('case4', [null, null]);
      return [null, null];
    default:
      console.log('case default', [null, null]);
      return [null, null];
  }
};

export const randomRarity = (maxRarity): string => {
  const index = RARITY_LIST.findIndex((rarity) => rarity === maxRarity);
  const newRarityArray = RARITY_LIST.slice(0, index + 1);
  return newRarityArray[Math.floor(Math.random() * newRarityArray.length)];
};

export const randomBetween = (min: number, max: number): number => {
  return Math.floor(min + Math.random() * (max - min));
};

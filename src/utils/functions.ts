import { RARITY_LIST } from './constants';

export const convertEmptyStringToNull = (obj: any): any => {
  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] === '') {
        result[key] = null;
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = convertEmptyStringToNull(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
};

export const lootTableStatMinMax = (): [number | null, number | null] => {
  const tirage = Math.floor(Math.random() * 5);
  switch (tirage) {
    case 0:
      const num = Math.floor(Math.random() * 100);
      return [num, num];
    case 1:
      const max1 = Math.floor(Math.random() * 100);
      return [null, max1];
    case 2:
      const min2 = Math.floor(Math.random() * 100);
      return [min2, null];
    case 3:
      const min3 = Math.floor(Math.random() * 100);
      const max3 = Math.floor(min3 + Math.random() * 100);
      return [min3, max3];
    case 4:
      return [null, null];
    default:
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

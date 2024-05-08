import { ENEMIES_LIST, RARITY_LIST } from './constants';
import { Enemy } from '../characters/dto/fight.dto';
import { Stat } from '../entities/Stat';
import { Character } from '../entities/Character';

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

export const randomEnemy = (character: Character): Enemy => {
  const pickEnemy =
    ENEMIES_LIST[Math.floor(Math.random() * ENEMIES_LIST.length)];
  const newEnemy = new Enemy();
  newEnemy.name = pickEnemy.name;
  newEnemy.picture = pickEnemy.picture;
  newEnemy.fight_picture = pickEnemy.fight_picture;
  newEnemy.level = randomBetween(character.level - 5, character.level + 5);
  newEnemy.stat = new Stat();
  newEnemy.stat.strength = randomBetween(newEnemy.level, newEnemy.level * 10);
  newEnemy.stat.intelligence = randomBetween(
    newEnemy.level,
    newEnemy.level * 10,
  );
  newEnemy.stat.speed = randomBetween(newEnemy.level, newEnemy.level * 10);
  newEnemy.stat.charisma = randomBetween(newEnemy.level, newEnemy.level * 10);
  newEnemy.stat.health = randomBetween(newEnemy.level, newEnemy.level * 10);
  newEnemy.stat.luck = randomBetween(newEnemy.level, newEnemy.level * 10);
  return newEnemy;
};

export const simulateRounds = (character: Character, enemy: Enemy): any[] => {
  let characterHealth = character.stat_id.health;
  let enemyHealth = enemy.stat.health;
  const characterDamage = character.stat_id.strength;
  const enemyDamage = enemy.stat.strength;
  const rounds = [];
  const characterFirst = character.stat_id.speed >= enemy.stat.speed;
  while (characterHealth > 0 && enemyHealth > 0) {
    if (characterFirst) {
      if (rounds.length % 2 === 0) {
        enemyHealth = enemyHealth - characterDamage;
        rounds.push({
          attacker: 'character',
          characterHealth: characterHealth,
          enemyHealth: enemyHealth,
          characterDamage: characterDamage,
          enemyDamage: enemyDamage,
        });
      } else {
        characterHealth = characterHealth - enemyDamage;
        rounds.push({
          attacker: 'enemy',
          characterHealth: characterHealth,
          enemyHealth: enemyHealth,
          characterDamage: characterDamage,
          enemyDamage: enemyDamage,
        });
      }
    } else {
      if (rounds.length % 2 !== 0) {
        enemyHealth = enemyHealth - characterDamage;
        rounds.push({
          attacker: 'character',
          characterHealth: characterHealth,
          enemyHealth: enemyHealth,
          characterDamage: characterDamage,
          enemyDamage: enemyDamage,
        });
      } else {
        characterHealth = characterHealth - enemyDamage;
        rounds.push({
          attacker: 'enemy',
          characterHealth: characterHealth,
          enemyHealth: enemyHealth,
          characterDamage: characterDamage,
          enemyDamage: enemyDamage,
        });
      }
    }
  }
  return rounds;
};

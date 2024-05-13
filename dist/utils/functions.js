"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevelByExperience = exports.getCumulativeStatFromEquipment = exports.isVictory = exports.simulateRounds = exports.randomEnemy = exports.randomBetween = exports.randomRarity = exports.lootTableStatMinMax = exports.convertEmptyStringToNull = void 0;
const constants_1 = require("./constants");
const fight_dto_1 = require("../characters/dto/fight.dto");
const Stat_1 = require("../entities/Stat");
const convertEmptyStringToNull = (obj) => {
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (obj[key] === '') {
                result[key] = null;
            }
            else if (typeof obj[key] === 'object' &&
                obj[key] !== null &&
                key !== 'created_at' &&
                key !== 'updated_at') {
                result[key] = (0, exports.convertEmptyStringToNull)(obj[key]);
            }
            else {
                result[key] = obj[key];
            }
        }
    }
    return result;
};
exports.convertEmptyStringToNull = convertEmptyStringToNull;
const lootTableStatMinMax = () => {
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
exports.lootTableStatMinMax = lootTableStatMinMax;
const randomRarity = (maxRarity) => {
    const index = constants_1.RARITY_LIST.findIndex((rarity) => rarity === maxRarity);
    const newRarityArray = constants_1.RARITY_LIST.slice(0, index + 1);
    const newWeightsArray = constants_1.RARITY_WEIGHTS.slice(0, index + 1);
    const randomNum = Math.random();
    let total = 0;
    for (let i = 0; i < newWeightsArray.length; i++) {
        total += newWeightsArray[i];
        if (randomNum <= total) {
            return newRarityArray[i];
        }
    }
    return newRarityArray[0];
};
exports.randomRarity = randomRarity;
const randomBetween = (min, max) => {
    if (min < 0) {
        min = 0;
    }
    return Math.floor(min + Math.random() * (max - min));
};
exports.randomBetween = randomBetween;
const randomEnemy = (character) => {
    const pickEnemy = constants_1.ENEMIES_LIST[Math.floor(Math.random() * constants_1.ENEMIES_LIST.length)];
    const newEnemy = new fight_dto_1.Enemy();
    newEnemy.name = pickEnemy.name;
    newEnemy.picture = pickEnemy.picture;
    newEnemy.fight_picture = pickEnemy.fight_picture;
    newEnemy.level = (0, exports.randomBetween)(character.level - 2, character.level + 2);
    newEnemy.stat = new Stat_1.Stat();
    newEnemy.stat.strength = (0, exports.randomBetween)(character.stat_id.strength - newEnemy.level, character.stat_id.strength + newEnemy.level);
    newEnemy.stat.intelligence = (0, exports.randomBetween)(character.stat_id.intelligence - newEnemy.level, character.stat_id.intelligence + newEnemy.level);
    newEnemy.stat.speed = (0, exports.randomBetween)(character.stat_id.speed - newEnemy.level, character.stat_id.speed + newEnemy.level);
    newEnemy.stat.charisma = (0, exports.randomBetween)(character.stat_id.charisma - newEnemy.level, character.stat_id.charisma + newEnemy.level);
    newEnemy.stat.health = (0, exports.randomBetween)(character.stat_id.health - newEnemy.level, character.stat_id.health + newEnemy.level);
    newEnemy.stat.luck = (0, exports.randomBetween)(character.stat_id.luck - newEnemy.level, character.stat_id.luck + newEnemy.level);
    return newEnemy;
};
exports.randomEnemy = randomEnemy;
const simulateRounds = (character, enemy) => {
    let characterHealth = character.stat_id.health +
        (0, exports.getCumulativeStatFromEquipment)(character.equipment_id, 'health');
    let enemyHealth = enemy.stat.health;
    const characterDamage = character.stat_id.strength +
        (0, exports.getCumulativeStatFromEquipment)(character.equipment_id, 'strength');
    const enemyDamage = enemy.stat.strength;
    const rounds = [];
    const characterFirst = character.stat_id.speed +
        (0, exports.getCumulativeStatFromEquipment)(character.equipment_id, 'speed') >=
        enemy.stat.speed;
    while (characterHealth > 0 && enemyHealth > 0) {
        if (characterFirst) {
            if (rounds.length % 2 === 0) {
                enemyHealth = Math.floor(enemyHealth - characterDamage);
                rounds.push({
                    attacker: 'character',
                    characterHealth: characterHealth,
                    enemyHealth: enemyHealth,
                    characterDamage: characterDamage,
                    enemyDamage: enemyDamage,
                });
            }
            else {
                characterHealth = Math.floor(characterHealth - enemyDamage);
                rounds.push({
                    attacker: 'enemy',
                    characterHealth: characterHealth,
                    enemyHealth: enemyHealth,
                    characterDamage: characterDamage,
                    enemyDamage: enemyDamage,
                });
            }
        }
        else {
            if (rounds.length % 2 !== 0) {
                enemyHealth = Math.floor(enemyHealth - characterDamage);
                rounds.push({
                    attacker: 'character',
                    characterHealth: characterHealth,
                    enemyHealth: enemyHealth,
                    characterDamage: characterDamage,
                    enemyDamage: enemyDamage,
                });
            }
            else {
                characterHealth = Math.floor(characterHealth - enemyDamage);
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
exports.simulateRounds = simulateRounds;
const isVictory = (rounds) => {
    return rounds[rounds.length - 1].characterHealth > 0;
};
exports.isVictory = isVictory;
const getCumulativeStatFromEquipment = (equipment, stat) => {
    let cumulative = 0;
    if (equipment.helmet_id && equipment.helmet_id[stat]) {
        cumulative += equipment.helmet_id[stat];
    }
    if (equipment.chestplate_id && equipment.chestplate_id[stat]) {
        cumulative += equipment.chestplate_id[stat];
    }
    if (equipment.gloves_id && equipment.gloves_id[stat]) {
        cumulative += equipment.gloves_id[stat];
    }
    if (equipment.boots_id && equipment.boots_id[stat]) {
        cumulative += equipment.boots_id[stat];
    }
    if (equipment.primary_weapon_id && equipment.primary_weapon_id[stat]) {
        cumulative += equipment.primary_weapon_id[stat];
    }
    if (equipment.secondary_weapon_id && equipment.secondary_weapon_id[stat]) {
        cumulative += equipment.secondary_weapon_id[stat];
    }
    if (equipment.primary_magic_item_id &&
        equipment.primary_magic_item_id[stat]) {
        cumulative += equipment.primary_magic_item_id[stat];
    }
    if (equipment.secondary_magic_item_id &&
        equipment.secondary_magic_item_id[stat]) {
        cumulative += equipment.secondary_magic_item_id[stat];
    }
    return stat === 'health'
        ? Math.floor(cumulative / 2)
        : Math.floor(cumulative / 10);
};
exports.getCumulativeStatFromEquipment = getCumulativeStatFromEquipment;
const getLevelByExperience = (experience) => {
    let level = 0;
    let experienceRequired = constants_1.BASE_EXPERIENCE_BY_LEVEL;
    while (experience >= experienceRequired) {
        level++;
        experienceRequired += Math.floor(experienceRequired * 1.1);
    }
    return level;
};
exports.getLevelByExperience = getLevelByExperience;
//# sourceMappingURL=functions.js.map
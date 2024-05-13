"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const typeorm_1 = require("typeorm");
const Equipment_1 = require("./Equipment");
const User_1 = require("./User");
const Stat_1 = require("./Stat");
const Bag_1 = require("./Bag");
let Character = class Character {
};
exports.Character = Character;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Character.prototype, "character_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.user_id),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Object)
], Character.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Equipment_1.Equipment, (equipment) => equipment.equipment_id),
    (0, typeorm_1.JoinColumn)({ name: 'equipment_id' }),
    __metadata("design:type", Object)
], Character.prototype, "equipment_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Stat_1.Stat, (stat) => stat.stat_id),
    (0, typeorm_1.JoinColumn)({ name: 'stat_id' }),
    __metadata("design:type", Object)
], Character.prototype, "stat_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Bag_1.Bag, (bag) => bag.bag_id),
    (0, typeorm_1.JoinColumn)({ name: 'bag_id' }),
    __metadata("design:type", Object)
], Character.prototype, "bag_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Character.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Character.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Character.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Character.prototype, "experience_points", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Character.prototype, "money", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Character.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Character.prototype, "updated_at", void 0);
exports.Character = Character = __decorate([
    (0, typeorm_1.Entity)('character')
], Character);
//# sourceMappingURL=Character.js.map
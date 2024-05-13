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
exports.Equipment = void 0;
const typeorm_1 = require("typeorm");
const Items_1 = require("./Items");
let Equipment = class Equipment {
};
exports.Equipment = Equipment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Equipment.prototype, "equipment_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Items_1.Item, (item) => item.item_id),
    (0, typeorm_1.JoinColumn)({ name: 'helmet_id' }),
    __metadata("design:type", Object)
], Equipment.prototype, "helmet_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Items_1.Item, (item) => item.item_id),
    (0, typeorm_1.JoinColumn)({ name: 'chestplate_id' }),
    __metadata("design:type", Object)
], Equipment.prototype, "chestplate_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Items_1.Item, (item) => item.item_id),
    (0, typeorm_1.JoinColumn)({ name: 'gloves_id' }),
    __metadata("design:type", Object)
], Equipment.prototype, "gloves_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Items_1.Item, (item) => item.item_id),
    (0, typeorm_1.JoinColumn)({ name: 'boots_id' }),
    __metadata("design:type", Object)
], Equipment.prototype, "boots_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Items_1.Item, (item) => item.item_id),
    (0, typeorm_1.JoinColumn)({ name: 'primary_weapon_id' }),
    __metadata("design:type", Object)
], Equipment.prototype, "primary_weapon_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Items_1.Item, (item) => item.item_id),
    (0, typeorm_1.JoinColumn)({ name: 'secondary_weapon_id' }),
    __metadata("design:type", Object)
], Equipment.prototype, "secondary_weapon_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Items_1.Item, (item) => item.item_id),
    (0, typeorm_1.JoinColumn)({ name: 'primary_magic_item_id' }),
    __metadata("design:type", Object)
], Equipment.prototype, "primary_magic_item_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Items_1.Item, (item) => item.item_id),
    (0, typeorm_1.JoinColumn)({ name: 'secondary_magic_item_id' }),
    __metadata("design:type", Object)
], Equipment.prototype, "secondary_magic_item_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Equipment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Equipment.prototype, "updated_at", void 0);
exports.Equipment = Equipment = __decorate([
    (0, typeorm_1.Entity)('equipment')
], Equipment);
//# sourceMappingURL=Equipment.js.map
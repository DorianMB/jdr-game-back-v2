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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("./items.service");
const create_item_dto_1 = require("./dto/create-item.dto");
const update_item_dto_1 = require("./dto/update-item.dto");
const passport_1 = require("@nestjs/passport");
const equip_dto_1 = require("./dto/equip.dto");
const sell_dto_1 = require("./dto/sell.dto");
const buy_dto_1 = require("./dto/buy.dto");
let ItemsController = class ItemsController {
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    async generateItemFromLootTable(lootTableId) {
        return await this.itemsService.generateItemFromLootTable(+lootTableId);
    }
    async equipItem(info) {
        return await this.itemsService.equipItem(info);
    }
    async putInBag(info) {
        return await this.itemsService.putInBag(info);
    }
    async sellItem(info) {
        return await this.itemsService.sellItem(info);
    }
    async buyItem(info) {
        return await this.itemsService.buyItem(info);
    }
    async shopList(id) {
        return await this.itemsService.shopList(+id);
    }
    async testProbability() {
        return await this.itemsService.testProbability();
    }
    async create(createItemDto) {
        return await this.itemsService.create(createItemDto);
    }
    async findAll() {
        return await this.itemsService.findAll();
    }
    async findOne(id) {
        return await this.itemsService.findOne(+id);
    }
    async update(updateItemDto) {
        return await this.itemsService.update(updateItemDto);
    }
    async remove(id) {
        return await this.itemsService.remove(+id);
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Get)('/generate/:lootTableId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('lootTableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "generateItemFromLootTable", null);
__decorate([
    (0, common_1.Patch)('/equip'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [equip_dto_1.EquipDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "equipItem", null);
__decorate([
    (0, common_1.Patch)('/putInBag'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [equip_dto_1.EquipDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "putInBag", null);
__decorate([
    (0, common_1.Patch)('/sell'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sell_dto_1.SellDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "sellItem", null);
__decorate([
    (0, common_1.Patch)('/buy'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buy_dto_1.BuyDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "buyItem", null);
__decorate([
    (0, common_1.Get)('/shop/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "shopList", null);
__decorate([
    (0, common_1.Get)('/testProbability'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "testProbability", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_dto_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "remove", null);
exports.ItemsController = ItemsController = __decorate([
    (0, common_1.Controller)('items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
//# sourceMappingURL=items.controller.js.map
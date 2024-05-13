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
exports.LootTablesController = void 0;
const common_1 = require("@nestjs/common");
const loot_tables_service_1 = require("./loot-tables.service");
const create_loot_table_dto_1 = require("./dto/create-loot-table.dto");
const update_loot_table_dto_1 = require("./dto/update-loot-table.dto");
const passport_1 = require("@nestjs/passport");
let LootTablesController = class LootTablesController {
    constructor(lootTablesService) {
        this.lootTablesService = lootTablesService;
    }
    async getRandomLootTable() {
        return await this.lootTablesService.getRandomLootTable();
    }
    async create(createLootTableDto) {
        return await this.lootTablesService.create(createLootTableDto);
    }
    async findAll() {
        return await this.lootTablesService.findAll();
    }
    async findOne(id) {
        return await this.lootTablesService.findOne(+id);
    }
    async update(updateLootTableDto) {
        return await this.lootTablesService.update(updateLootTableDto);
    }
    async remove(id) {
        return await this.lootTablesService.remove(+id);
    }
};
exports.LootTablesController = LootTablesController;
__decorate([
    (0, common_1.Get)('random'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LootTablesController.prototype, "getRandomLootTable", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_loot_table_dto_1.CreateLootTableDto]),
    __metadata("design:returntype", Promise)
], LootTablesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LootTablesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LootTablesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_loot_table_dto_1.UpdateLootTableDto]),
    __metadata("design:returntype", Promise)
], LootTablesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LootTablesController.prototype, "remove", null);
exports.LootTablesController = LootTablesController = __decorate([
    (0, common_1.Controller)('loot-tables'),
    __metadata("design:paramtypes", [loot_tables_service_1.LootTablesService])
], LootTablesController);
//# sourceMappingURL=loot-tables.controller.js.map
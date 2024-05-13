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
exports.BagController = void 0;
const common_1 = require("@nestjs/common");
const bag_service_1 = require("./bag.service");
const create_bag_dto_1 = require("./dto/create-bag.dto");
const update_bag_dto_1 = require("./dto/update-bag.dto");
const passport_1 = require("@nestjs/passport");
let BagController = class BagController {
    constructor(bagService) {
        this.bagService = bagService;
    }
    async findItemsByBagId(id) {
        return await this.bagService.findItemsByBagId(+id);
    }
    async findIfBagIsFull(id) {
        return await this.bagService.findIfBagIsFull(+id);
    }
    async create(createBagDto) {
        return await this.bagService.create(createBagDto);
    }
    async findAll() {
        return await this.bagService.findAll();
    }
    async findOne(id) {
        return await this.bagService.findOne(+id);
    }
    async update(updateBagDto) {
        return await this.bagService.update(updateBagDto);
    }
    async remove(id) {
        return await this.bagService.remove(+id);
    }
};
exports.BagController = BagController;
__decorate([
    (0, common_1.Get)('/items/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BagController.prototype, "findItemsByBagId", null);
__decorate([
    (0, common_1.Get)('/isBagFull/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BagController.prototype, "findIfBagIsFull", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bag_dto_1.CreateBagDto]),
    __metadata("design:returntype", Promise)
], BagController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BagController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BagController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_bag_dto_1.UpdateBagDto]),
    __metadata("design:returntype", Promise)
], BagController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BagController.prototype, "remove", null);
exports.BagController = BagController = __decorate([
    (0, common_1.Controller)('bags'),
    __metadata("design:paramtypes", [bag_service_1.BagService])
], BagController);
//# sourceMappingURL=bag.controller.js.map
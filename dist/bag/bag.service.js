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
exports.BagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Bag_1 = require("../entities/Bag");
const typeorm_2 = require("typeorm");
const functions_1 = require("../utils/functions");
const items_service_1 = require("../items/items.service");
let BagService = class BagService {
    constructor(bagRepository, itemsService) {
        this.bagRepository = bagRepository;
        this.itemsService = itemsService;
    }
    async create(createBagDto) {
        createBagDto = (0, functions_1.convertEmptyStringToNull)(createBagDto);
        createBagDto.created_at = new Date();
        createBagDto.updated_at = new Date();
        return await this.bagRepository.save(createBagDto);
    }
    async findAll() {
        return await this.bagRepository.find();
    }
    async findOne(id) {
        return await this.bagRepository.findOne({
            where: {
                bag_id: id,
            },
        });
    }
    async findItemsByBagId(id) {
        return await this.itemsService.findAllCascade({
            bag_id: id,
        });
    }
    async update(updateBagDto) {
        updateBagDto = (0, functions_1.convertEmptyStringToNull)(updateBagDto);
        updateBagDto.updated_at = new Date();
        return await this.bagRepository.save(updateBagDto);
    }
    async remove(id) {
        await this.bagRepository.delete(id);
    }
    async findIfBagIsFull(id) {
        const itemsInBag = await this.findItemsByBagId(id);
        const bag = await this.findOne(id);
        return itemsInBag.length >= bag.size;
    }
};
exports.BagService = BagService;
exports.BagService = BagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Bag_1.Bag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        items_service_1.ItemsService])
], BagService);
//# sourceMappingURL=bag.service.js.map
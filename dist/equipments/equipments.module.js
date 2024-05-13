"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentsModule = void 0;
const common_1 = require("@nestjs/common");
const equipments_service_1 = require("./equipments.service");
const equipments_controller_1 = require("./equipments.controller");
const module_constants_1 = require("../utils/module.constants");
let EquipmentsModule = class EquipmentsModule {
};
exports.EquipmentsModule = EquipmentsModule;
exports.EquipmentsModule = EquipmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [module_constants_1.ENTITIES],
        controllers: [equipments_controller_1.EquipmentsController],
        providers: [...module_constants_1.PROVIDERS],
        exports: [equipments_service_1.EquipmentsService],
    })
], EquipmentsModule);
//# sourceMappingURL=equipments.module.js.map
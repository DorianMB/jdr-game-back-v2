"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BagModule = void 0;
const common_1 = require("@nestjs/common");
const bag_service_1 = require("./bag.service");
const bag_controller_1 = require("./bag.controller");
const module_constants_1 = require("../utils/module.constants");
let BagModule = class BagModule {
};
exports.BagModule = BagModule;
exports.BagModule = BagModule = __decorate([
    (0, common_1.Module)({
        imports: [module_constants_1.ENTITIES],
        controllers: [bag_controller_1.BagController],
        providers: [...module_constants_1.PROVIDERS],
        exports: [bag_service_1.BagService],
    })
], BagModule);
//# sourceMappingURL=bag.module.js.map
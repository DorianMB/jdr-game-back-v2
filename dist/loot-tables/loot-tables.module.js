"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LootTablesModule = void 0;
const common_1 = require("@nestjs/common");
const loot_tables_service_1 = require("./loot-tables.service");
const loot_tables_controller_1 = require("./loot-tables.controller");
const module_constants_1 = require("../utils/module.constants");
let LootTablesModule = class LootTablesModule {
};
exports.LootTablesModule = LootTablesModule;
exports.LootTablesModule = LootTablesModule = __decorate([
    (0, common_1.Module)({
        imports: [module_constants_1.ENTITIES],
        controllers: [loot_tables_controller_1.LootTablesController],
        providers: [...module_constants_1.PROVIDERS],
        exports: [loot_tables_service_1.LootTablesService],
    })
], LootTablesModule);
//# sourceMappingURL=loot-tables.module.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLootTableDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_loot_table_dto_1 = require("./create-loot-table.dto");
class UpdateLootTableDto extends (0, mapped_types_1.PartialType)(create_loot_table_dto_1.CreateLootTableDto) {
}
exports.UpdateLootTableDto = UpdateLootTableDto;
//# sourceMappingURL=update-loot-table.dto.js.map
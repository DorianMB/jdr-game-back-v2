"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEquipmentDto = void 0;
const Equipment_1 = require("../../entities/Equipment");
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateEquipmentDto extends (0, mapped_types_1.PartialType)(Equipment_1.Equipment) {
}
exports.CreateEquipmentDto = CreateEquipmentDto;
//# sourceMappingURL=create-equipment.dto.js.map
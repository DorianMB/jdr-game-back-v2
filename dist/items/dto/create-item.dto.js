"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateItemDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const Items_1 = require("../../entities/Items");
class CreateItemDto extends (0, mapped_types_1.PartialType)(Items_1.Item) {
}
exports.CreateItemDto = CreateItemDto;
//# sourceMappingURL=create-item.dto.js.map
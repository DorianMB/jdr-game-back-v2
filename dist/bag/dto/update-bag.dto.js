"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBagDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bag_dto_1 = require("./create-bag.dto");
class UpdateBagDto extends (0, mapped_types_1.PartialType)(create_bag_dto_1.CreateBagDto) {
}
exports.UpdateBagDto = UpdateBagDto;
//# sourceMappingURL=update-bag.dto.js.map
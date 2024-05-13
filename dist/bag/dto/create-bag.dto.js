"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBagDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const Bag_1 = require("../../entities/Bag");
class CreateBagDto extends (0, mapped_types_1.PartialType)(Bag_1.Bag) {
}
exports.CreateBagDto = CreateBagDto;
//# sourceMappingURL=create-bag.dto.js.map
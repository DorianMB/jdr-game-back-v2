"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStatDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const Stat_1 = require("../../entities/Stat");
class CreateStatDto extends (0, mapped_types_1.PartialType)(Stat_1.Stat) {
}
exports.CreateStatDto = CreateStatDto;
//# sourceMappingURL=create-stat.dto.js.map
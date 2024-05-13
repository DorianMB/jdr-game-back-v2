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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const User_1 = require("./entities/User");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Character_1 = require("./entities/Character");
let AppService = class AppService {
    constructor(usersRepository, characterRepository) {
        this.usersRepository = usersRepository;
        this.characterRepository = characterRepository;
    }
    getHello() {
        return 'Hello World! from back';
    }
    async postTest(user) {
        try {
            const newUser = await this.usersRepository.save(user);
            this.postCharacter({
                user_id: newUser,
                experience: 0,
                money: 0,
                character_id: 0,
                picture: '',
                created_at: new Date(),
                updated_at: new Date(),
            });
            return 'User has been saved';
        }
        catch (error) {
            return 'Error while saving user';
        }
    }
    async postCharacter(caracter) {
        try {
            const newCharacter = await this.characterRepository.save(caracter);
            return 'Character has been saved';
        }
        catch (error) {
            return 'Error while saving character';
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Character_1.Character)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map
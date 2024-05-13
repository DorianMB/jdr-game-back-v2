import { CharactersService } from './characters.service';
import { Character } from '../entities/Character';
import { CharacterSendDto } from './dto/character.send.dto';
import { FightDto } from './dto/fight.dto';
export declare class CharactersController {
    private readonly charactersService;
    constructor(charactersService: CharactersService);
    findAllCharacterByUserId(id: string): Promise<CharacterSendDto[]>;
    simulateFight(id: string): Promise<FightDto>;
    findAllCharacters(): Promise<CharacterSendDto[]>;
    findCharacterById(id: string): Promise<Character>;
    createCharacter(character: Partial<Character>): Promise<CharacterSendDto>;
    patchCharacter(character: Partial<Character>): Promise<CharacterSendDto>;
    deleteCharacter(id: string): Promise<void>;
}

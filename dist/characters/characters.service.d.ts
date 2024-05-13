import { Character } from '../entities/Character';
import { Repository } from 'typeorm';
import { CharacterSendDto } from './dto/character.send.dto';
import { BagService } from '../bag/bag.service';
import { EquipmentsService } from '../equipments/equipments.service';
import { LootTablesService } from '../loot-tables/loot-tables.service';
import { StatsService } from '../stats/stats.service';
import { FightDto } from './dto/fight.dto';
import { ItemsService } from '../items/items.service';
export declare class CharactersService {
    private charactersRepository;
    private bagService;
    private equipmentsService;
    private statsService;
    private lootTablesService;
    private itemsService;
    constructor(charactersRepository: Repository<Character>, bagService: BagService, equipmentsService: EquipmentsService, statsService: StatsService, lootTablesService: LootTablesService, itemsService: ItemsService);
    findAllCharacters(): Promise<CharacterSendDto[]>;
    findAllCharacterByUserId(user_id: number): Promise<CharacterSendDto[]>;
    findCharacterById(id: number): Promise<Character>;
    createCharacter(character: Partial<Character>): Promise<CharacterSendDto>;
    patchCharacter(character: Partial<Character>): Promise<CharacterSendDto>;
    deleteCharacter(id: number): Promise<void>;
    simulateFight(id: number): Promise<FightDto>;
}

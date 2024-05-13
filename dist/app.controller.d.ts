import { AppService } from './app.service';
import { User } from './entities/User';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    postTest(user: User): Promise<string>;
}

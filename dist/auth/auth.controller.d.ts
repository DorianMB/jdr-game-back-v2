import { AuthService } from './auth.service';
import { User } from '../entities/User';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(user: SignupDto): Promise<User>;
    signin(user: SigninDto): Promise<string>;
}

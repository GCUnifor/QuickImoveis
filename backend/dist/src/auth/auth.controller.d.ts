import { AuthService, AuthResponse } from './auth.service';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(dto: SignInDto): Promise<AuthResponse>;
    signInWithGoogle(dto: GoogleAuthDto): Promise<AuthResponse>;
    signUp(dto: SignUpDto): Promise<AuthResponse>;
    logout(user: {
        id: string;
    }): Promise<{
        message: string;
    }>;
}

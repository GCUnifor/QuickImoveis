import { AuthService } from './auth.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
export declare class AuthEmailController {
    private readonly authService;
    constructor(authService: AuthService);
    requestEmailVerification(user: {
        id: string;
    }): Promise<{
        message: string;
    }>;
    verifyEmail(dto: VerifyEmailDto): Promise<{
        message: string;
    }>;
}

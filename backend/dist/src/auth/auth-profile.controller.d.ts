import { AuthService } from './auth.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class AuthProfileController {
    private readonly authService;
    constructor(authService: AuthService);
    profile(user: {
        id: string;
    }): Promise<{
        id: string;
        name: string | null;
        email: string;
        role: import("@prisma/client").$Enums.UserRole | null;
        creci: string | null;
        phone: string | null;
        whatsapp: string | null;
        is_active: boolean;
        is_email_verified: boolean;
        avatar: string | null;
        renda_mensal: number | null;
        valor_entrada: number | null;
        created_at: Date;
        last_login: Date | null;
        needs_role: boolean;
        address: {
            street: string | null;
            number: string | null;
            neighborhood: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            postal_code: string | null;
            lat: number | null;
            lng: number | null;
        } | null;
    }>;
    updateProfile(user: {
        id: string;
    }, dto: UpdateProfileDto, avatar?: {
        buffer: Buffer;
        mimetype: string;
        size: number;
    }): Promise<{
        id: string;
        name: string | null;
        email: string;
        role: import("@prisma/client").$Enums.UserRole | null;
        creci: string | null;
        phone: string | null;
        whatsapp: string | null;
        is_active: boolean;
        is_email_verified: boolean;
        avatar: string | null;
        renda_mensal: number | null;
        valor_entrada: number | null;
        created_at: Date;
        last_login: Date | null;
        needs_role: boolean;
        address: {
            street: string | null;
            number: string | null;
            neighborhood: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            postal_code: string | null;
            lat: number | null;
            lng: number | null;
        } | null;
    }>;
    deactivateAccount(user: {
        id: string;
    }): Promise<{
        message: string;
    }>;
}

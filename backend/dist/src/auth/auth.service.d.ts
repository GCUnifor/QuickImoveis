import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { FirebaseService } from '../firebase/firebase.service';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export interface AuthResponse {
    access_token: string;
    expires_in: number;
    user: {
        id: string;
        name: string | null;
        email: string;
        role: string | null;
        is_active: boolean;
        is_email_verified: boolean;
    };
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly prisma;
    private readonly mailService;
    private readonly configService;
    private readonly firebaseService;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService, mailService: MailService, configService: ConfigService, firebaseService: FirebaseService);
    private buildUserResponse;
    issueToken(user: {
        id: string;
        email: string;
        name: string | null;
        role: string | null;
        is_active: boolean;
        is_email_verified: boolean;
    }): Promise<AuthResponse>;
    signIn(email: string, password: string): Promise<AuthResponse>;
    signInWithGoogle(dto: {
        id_token?: string;
        access_token?: string;
        role?: UserRole;
    }): Promise<AuthResponse>;
    signUp(dto: SignUpDto): Promise<AuthResponse>;
    profile(userId: string): Promise<{
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
    updateProfile(userId: string, dto: UpdateProfileDto, file?: {
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
    deactivateAccount(userId: string): Promise<{
        message: string;
    }>;
    logout(_userId: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(email: string, code: string, newPassword: string): Promise<{
        message: string;
    }>;
    requestEmailVerification(userId: string): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    private generateCode;
}

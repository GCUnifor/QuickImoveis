import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    name?: string;
    email: string;
    password: string;
    role?: UserRole;
    creci?: string;
    phone?: string;
    whatsapp?: string;
    is_active?: boolean;
    is_email_verified?: boolean;
    renda_mensal?: number;
    valor_entrada?: number;
}

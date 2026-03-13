import { UserRole } from '@prisma/client';
export declare class SignUpDto {
    name?: string;
    email: string;
    password: string;
    role?: UserRole;
    creci?: string;
    phone?: string;
    whatsapp?: string;
}

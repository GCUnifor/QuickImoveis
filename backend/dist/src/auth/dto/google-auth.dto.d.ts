import { UserRole } from '@prisma/client';
export declare class GoogleAuthDto {
    id_token?: string;
    access_token?: string;
    role?: UserRole;
}

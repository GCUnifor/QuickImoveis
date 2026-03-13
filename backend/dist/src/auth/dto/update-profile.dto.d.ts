import { UserRole } from '@prisma/client';
import { AddressDto } from '../../property/dto/address.dto';
export declare class UpdateProfileDto {
    role?: UserRole;
    name?: string;
    creci?: string;
    phone?: string;
    whatsapp?: string;
    renda_mensal?: number;
    valor_entrada?: number;
    address?: AddressDto;
}

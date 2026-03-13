import { PropertyStatus, PropertyType } from '@prisma/client';
import { AddressDto } from './address.dto';
export declare class CreatePropertyDto {
    title: string;
    description?: string;
    property_type?: PropertyType;
    price: number;
    area?: number;
    bedrooms?: number;
    status?: PropertyStatus;
    address: AddressDto;
}

import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseService } from '../firebase/firebase.service';
import { MailService } from '../mail/mail.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
export declare class PropertyService {
    private readonly prisma;
    private readonly firebaseService;
    private readonly mailService;
    private readonly configService;
    private readonly logger;
    constructor(prisma: PrismaService, firebaseService: FirebaseService, mailService: MailService, configService: ConfigService);
    create(ownerId: string, dto: CreatePropertyDto): Promise<{
        address: {
            number: string | null;
            id: string;
            street: string | null;
            neighborhood: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            postal_code: string | null;
            lat: number | null;
            lng: number | null;
            property_id: string;
        } | null;
    } & {
        description: string | null;
        title: string;
        id: string;
        created_at: Date;
        property_type: import("@prisma/client").$Enums.PropertyType | null;
        price: Prisma.Decimal;
        area: Prisma.Decimal;
        bedrooms: number;
        status: import("@prisma/client").$Enums.PropertyStatus;
        updated_at: Date;
        owner_id: string;
    }>;
    findAll(ownerId: string, page?: number, limit?: number): Promise<{
        data: {
            price: number;
            area: number;
            images: {
                id: string;
                filename: string | null;
                content_type: string | null;
                size_bytes: number | null;
                width: number | null;
                height: number | null;
                sort_order: number;
                created_at: Date;
                image_url: string;
            }[];
            address: {
                number: string | null;
                id: string;
                street: string | null;
                neighborhood: string | null;
                city: string | null;
                state: string | null;
                country: string | null;
                postal_code: string | null;
                lat: number | null;
                lng: number | null;
                property_id: string;
            } | null;
            description: string | null;
            title: string;
            id: string;
            created_at: Date;
            property_type: import("@prisma/client").$Enums.PropertyType | null;
            bedrooms: number;
            status: import("@prisma/client").$Enums.PropertyStatus;
            updated_at: Date;
            owner_id: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, ownerId: string): Promise<{
        price: number;
        area: number;
        images: {
            id: string;
            filename: string | null;
            content_type: string | null;
            size_bytes: number | null;
            width: number | null;
            height: number | null;
            sort_order: number;
            created_at: Date;
            image_url: string;
        }[];
        address: {
            number: string | null;
            id: string;
            street: string | null;
            neighborhood: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            postal_code: string | null;
            lat: number | null;
            lng: number | null;
            property_id: string;
        } | null;
        description: string | null;
        title: string;
        id: string;
        created_at: Date;
        property_type: import("@prisma/client").$Enums.PropertyType | null;
        bedrooms: number;
        status: import("@prisma/client").$Enums.PropertyStatus;
        updated_at: Date;
        owner_id: string;
    }>;
    addImage(propertyId: string, ownerId: string, file: {
        buffer: Buffer;
        mimetype: string;
        size: number;
    }): Promise<{
        id: string;
        created_at: Date;
        property_id: string;
        sort_order: number;
        filename: string | null;
        content_type: string | null;
        image_url: string;
        storage_path: string | null;
        size_bytes: number | null;
        width: number | null;
        height: number | null;
    }>;
    reorderImages(propertyId: string, ownerId: string, imageIds: string[]): Promise<{
        message: string;
    }>;
    removeImage(propertyId: string, imageId: string, ownerId: string): Promise<{
        message: string;
    }>;
    update(id: string, ownerId: string, dto: UpdatePropertyDto): Promise<{
        price: number;
        area: number;
        address: {
            number: string | null;
            id: string;
            street: string | null;
            neighborhood: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            postal_code: string | null;
            lat: number | null;
            lng: number | null;
            property_id: string;
        } | null;
        description: string | null;
        title: string;
        id: string;
        created_at: Date;
        property_type: import("@prisma/client").$Enums.PropertyType | null;
        bedrooms: number;
        status: import("@prisma/client").$Enums.PropertyStatus;
        updated_at: Date;
        owner_id: string;
    }>;
    remove(id: string, ownerId: string): Promise<{
        message: string;
    }>;
    private notifyMatchingBuyers;
    private assertOwnership;
}

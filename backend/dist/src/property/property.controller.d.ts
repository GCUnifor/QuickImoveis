import { CreatePropertyDto } from './dto/create-property.dto';
import { ReorderImagesDto } from './dto/reorder-images.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyService } from './property.service';
export declare class PropertyController {
    private readonly propertyService;
    constructor(propertyService: PropertyService);
    create(user: {
        id: string;
    }, dto: CreatePropertyDto): Promise<{
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
        price: import("@prisma/client-runtime-utils").Decimal;
        area: import("@prisma/client-runtime-utils").Decimal;
        bedrooms: number;
        status: import("@prisma/client").$Enums.PropertyStatus;
        updated_at: Date;
        owner_id: string;
    }>;
    findAll(user: {
        id: string;
    }, page?: string, limit?: string): Promise<{
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
    findOne(user: {
        id: string;
    }, id: string): Promise<{
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
    update(user: {
        id: string;
    }, id: string, dto: UpdatePropertyDto): Promise<{
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
    remove(user: {
        id: string;
    }, id: string): Promise<{
        message: string;
    }>;
    addImage(user: {
        id: string;
    }, propertyId: string, file: {
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
    reorderImages(user: {
        id: string;
    }, propertyId: string, dto: ReorderImagesDto): Promise<{
        message: string;
    }>;
    removeImage(user: {
        id: string;
    }, propertyId: string, imageId: string): Promise<{
        message: string;
    }>;
}

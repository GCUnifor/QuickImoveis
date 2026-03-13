import { PropertyStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class ListingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(params: {
        page?: number;
        limit?: number;
        min_price?: number;
        max_price?: number;
        city?: string;
        neighborhood?: string;
        status?: PropertyStatus[];
    }): Promise<{
        data: {
            id: string;
            title: string;
            description: string | null;
            property_type: string | null;
            price: number;
            area: number;
            bedrooms: number;
            status: string;
            created_at: Date;
            address: unknown;
            images: {
                id: string;
                content_type: string | null;
                sort_order: number;
                image_url: string;
            }[];
            owner: {
                id: string;
                name: string | null;
                email: string;
                creci: string | null;
                phone: string | null;
                whatsapp: string | null;
            };
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findByOwner(params: {
        ownerId: string;
        page?: number;
        limit?: number;
        status?: PropertyStatus[];
    }): Promise<{
        data: {
            id: string;
            title: string;
            description: string | null;
            property_type: string | null;
            price: number;
            area: number;
            bedrooms: number;
            status: string;
            created_at: Date;
            address: unknown;
            images: {
                id: string;
                content_type: string | null;
                sort_order: number;
                image_url: string;
            }[];
            owner: {
                id: string;
                name: string | null;
                email: string;
                creci: string | null;
                phone: string | null;
                whatsapp: string | null;
            };
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findRecommendations(userId: string, page?: number, limit?: number): Promise<{
        data: {
            id: string;
            title: string;
            description: string | null;
            property_type: string | null;
            price: number;
            area: number;
            bedrooms: number;
            status: string;
            created_at: Date;
            address: unknown;
            images: {
                id: string;
                content_type: string | null;
                sort_order: number;
                image_url: string;
            }[];
            owner: {
                id: string;
                name: string | null;
                email: string;
                creci: string | null;
                phone: string | null;
                whatsapp: string | null;
            };
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    private mapProperty;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        property_type: import("@prisma/client").$Enums.PropertyType | null;
        price: number;
        area: number;
        bedrooms: number;
        status: "DISPONIVEL" | "VENDIDO";
        created_at: Date;
        updated_at: Date;
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
        owner: {
            name: string | null;
            email: string;
            creci: string | null;
            phone: string | null;
            whatsapp: string | null;
            id: string;
        };
    }>;
}

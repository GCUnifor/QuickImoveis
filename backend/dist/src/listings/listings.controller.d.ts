import { ListingsService } from './listings.service';
export declare class ListingsController {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    findRecommendations(user: {
        id: string;
    }, page?: string, limit?: string): Promise<{
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
    findAll(page?: string, limit?: string, min_price?: string, max_price?: string, city?: string, neighborhood?: string, status?: string): Promise<{
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
    findByOwner(ownerId: string, page?: string, limit?: string, status?: string): Promise<{
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

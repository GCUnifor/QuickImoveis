import { PrismaService } from '../prisma/prisma.service';
export declare class FavoriteService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private asPrismaClient;
    private mapProperty;
    listFavorites(userId: string, page?: number, limit?: number): Promise<{
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
    addFavorite(userId: string, listingId: string): Promise<{
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
    }>;
    removeFavorite(userId: string, listingId: string): Promise<{
        message: string;
    }>;
}

import { FavoriteService } from './favorite.service';
export declare class FavoriteController {
    private readonly favoriteService;
    constructor(favoriteService: FavoriteService);
    listFavorites(user: {
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
    addFavorite(user: {
        id: string;
    }, listingId: string): Promise<{
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
    removeFavorite(user: {
        id: string;
    }, listingId: string): Promise<{
        message: string;
    }>;
}

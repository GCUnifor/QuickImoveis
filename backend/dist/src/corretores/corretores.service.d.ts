import { PrismaService } from '../prisma/prisma.service';
export interface CorretorRow {
    id: string;
    name: string | null;
    email: string;
    creci: string | null;
    phone: string | null;
    whatsapp: string | null;
    favoritesCount: number;
}
export declare class CorretoresService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(params: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<{
        data: CorretorRow[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    private findAllNoSearch;
    private findAllWithSearch;
}

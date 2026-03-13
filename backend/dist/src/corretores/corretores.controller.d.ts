import { CorretoresService } from './corretores.service';
export declare class CorretoresController {
    private readonly corretoresService;
    constructor(corretoresService: CorretoresService);
    findAll(search?: string, page?: string, limit?: string): Promise<{
        data: import("./corretores.service").CorretorRow[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}

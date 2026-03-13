import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    findPropertyComments(propertyId: string, page?: string, limit?: string): Promise<{
        data: ({
            author: {
                name: string | null;
                id: string;
                avatar_url: string | null;
            };
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            content: string;
            rating: number | null;
            property_id: string;
            author_id: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createPropertyComment(user: {
        id: string;
    }, propertyId: string, dto: CreateCommentDto): Promise<{
        author: {
            name: string | null;
            id: string;
            avatar_url: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        content: string;
        rating: number | null;
        property_id: string;
        author_id: string;
    }>;
    updatePropertyComment(user: {
        id: string;
    }, id: string, dto: UpdateCommentDto): Promise<{
        author: {
            name: string | null;
            id: string;
            avatar_url: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        content: string;
        rating: number | null;
        property_id: string;
        author_id: string;
    }>;
    deletePropertyComment(user: {
        id: string;
    }, id: string): Promise<{
        message: string;
    }>;
    findCorretorComments(corretorId: string, page?: string, limit?: string): Promise<{
        data: ({
            author: {
                name: string | null;
                id: string;
                avatar_url: string | null;
            };
        } & {
            id: string;
            created_at: Date;
            updated_at: Date;
            content: string;
            rating: number | null;
            author_id: string;
            corretor_id: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    createCorretorComment(user: {
        id: string;
    }, corretorId: string, dto: CreateCommentDto): Promise<{
        author: {
            name: string | null;
            id: string;
            avatar_url: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        content: string;
        rating: number | null;
        author_id: string;
        corretor_id: string;
    }>;
    updateCorretorComment(user: {
        id: string;
    }, id: string, dto: UpdateCommentDto): Promise<{
        author: {
            name: string | null;
            id: string;
            avatar_url: string | null;
        };
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        content: string;
        rating: number | null;
        author_id: string;
        corretor_id: string;
    }>;
    deleteCorretorComment(user: {
        id: string;
    }, id: string): Promise<{
        message: string;
    }>;
}

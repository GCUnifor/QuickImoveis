import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPropertyComment(authorId: string, propertyId: string, dto: CreateCommentDto): Promise<{
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
    findPropertyComments(propertyId: string, page: number, limit: number): Promise<{
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
    createCorretorComment(authorId: string, corretorId: string, dto: CreateCommentDto): Promise<{
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
    findCorretorComments(corretorId: string, page: number, limit: number): Promise<{
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
    updatePropertyComment(commentId: string, userId: string, dto: UpdateCommentDto): Promise<{
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
    deletePropertyComment(commentId: string, userId: string): Promise<{
        message: string;
    }>;
    updateCorretorComment(commentId: string, userId: string, dto: UpdateCommentDto): Promise<{
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
    deleteCorretorComment(commentId: string, userId: string): Promise<{
        message: string;
    }>;
}

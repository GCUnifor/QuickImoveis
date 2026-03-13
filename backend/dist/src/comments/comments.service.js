"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommentsService = class CommentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPropertyComment(authorId, propertyId, dto) {
        const property = await this.prisma.property.findUnique({
            where: { id: propertyId },
        });
        if (!property)
            throw new common_1.NotFoundException('Imóvel não encontrado');
        return this.prisma.propertyComment.create({
            data: {
                author_id: authorId,
                property_id: propertyId,
                content: dto.content,
                rating: dto.rating,
            },
            include: { author: { select: { id: true, name: true, avatar_url: true } } },
        });
    }
    async findPropertyComments(propertyId, page, limit) {
        const property = await this.prisma.property.findUnique({
            where: { id: propertyId },
        });
        if (!property)
            throw new common_1.NotFoundException('Imóvel não encontrado');
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.propertyComment.findMany({
                where: { property_id: propertyId },
                include: { author: { select: { id: true, name: true, avatar_url: true } } },
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.propertyComment.count({ where: { property_id: propertyId } }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async createCorretorComment(authorId, corretorId, dto) {
        const corretor = await this.prisma.user.findUnique({
            where: { id: corretorId },
        });
        if (!corretor || corretor.role !== 'CORRETOR')
            throw new common_1.NotFoundException('Corretor não encontrado');
        return this.prisma.corretorComment.create({
            data: {
                author_id: authorId,
                corretor_id: corretorId,
                content: dto.content,
                rating: dto.rating,
            },
            include: { author: { select: { id: true, name: true, avatar_url: true } } },
        });
    }
    async findCorretorComments(corretorId, page, limit) {
        const corretor = await this.prisma.user.findUnique({
            where: { id: corretorId },
        });
        if (!corretor || corretor.role !== 'CORRETOR')
            throw new common_1.NotFoundException('Corretor não encontrado');
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.corretorComment.findMany({
                where: { corretor_id: corretorId },
                include: { author: { select: { id: true, name: true, avatar_url: true } } },
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.corretorComment.count({ where: { corretor_id: corretorId } }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async updatePropertyComment(commentId, userId, dto) {
        const comment = await this.prisma.propertyComment.findUnique({
            where: { id: commentId },
        });
        if (!comment)
            throw new common_1.NotFoundException('Comentário não encontrado');
        if (comment.author_id !== userId)
            throw new common_1.ForbiddenException('Sem permissão para editar este comentário');
        return this.prisma.propertyComment.update({
            where: { id: commentId },
            data: { content: dto.content, rating: dto.rating },
            include: { author: { select: { id: true, name: true, avatar_url: true } } },
        });
    }
    async deletePropertyComment(commentId, userId) {
        const comment = await this.prisma.propertyComment.findUnique({
            where: { id: commentId },
        });
        if (!comment)
            throw new common_1.NotFoundException('Comentário não encontrado');
        if (comment.author_id !== userId)
            throw new common_1.ForbiddenException('Sem permissão para remover este comentário');
        await this.prisma.propertyComment.delete({ where: { id: commentId } });
        return { message: 'Comentário removido' };
    }
    async updateCorretorComment(commentId, userId, dto) {
        const comment = await this.prisma.corretorComment.findUnique({
            where: { id: commentId },
        });
        if (!comment)
            throw new common_1.NotFoundException('Comentário não encontrado');
        if (comment.author_id !== userId)
            throw new common_1.ForbiddenException('Sem permissão para editar este comentário');
        return this.prisma.corretorComment.update({
            where: { id: commentId },
            data: { content: dto.content, rating: dto.rating },
            include: { author: { select: { id: true, name: true, avatar_url: true } } },
        });
    }
    async deleteCorretorComment(commentId, userId) {
        const comment = await this.prisma.corretorComment.findUnique({
            where: { id: commentId },
        });
        if (!comment)
            throw new common_1.NotFoundException('Comentário não encontrado');
        if (comment.author_id !== userId)
            throw new common_1.ForbiddenException('Sem permissão para remover este comentário');
        await this.prisma.corretorComment.delete({ where: { id: commentId } });
        return { message: 'Comentário removido' };
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map
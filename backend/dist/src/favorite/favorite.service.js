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
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let FavoriteService = class FavoriteService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    asPrismaClient() {
        return this.prisma;
    }
    mapProperty(p) {
        return {
            id: p.id,
            title: p.title,
            description: p.description,
            property_type: p.property_type,
            price: Number(p.price),
            area: Number(p.area),
            bedrooms: p.bedrooms,
            status: p.status,
            created_at: p.created_at,
            address: p.address,
            images: p.images.map((img) => ({
                id: img.id,
                content_type: img.content_type,
                sort_order: img.sort_order,
                image_url: img.image_url,
            })),
            owner: p.owner,
        };
    }
    async listFavorites(userId, page = 1, limit = 10) {
        const prisma = this.asPrismaClient();
        const skip = (page - 1) * limit;
        const [rows, total] = await Promise.all([
            prisma.favorite.findMany({
                where: { user_id: userId },
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
                include: {
                    property: {
                        include: {
                            address: true,
                            images: { orderBy: { sort_order: 'asc' } },
                            owner: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    creci: true,
                                    phone: true,
                                    whatsapp: true,
                                },
                            },
                        },
                    },
                },
            }),
            prisma.favorite.count({ where: { user_id: userId } }),
        ]);
        return {
            data: rows
                .filter((f) => f.property)
                .map((f) => this.mapProperty(f.property)),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async addFavorite(userId, listingId) {
        const prisma = this.asPrismaClient();
        const property = await prisma.property.findUnique({
            where: { id: listingId },
            include: {
                address: true,
                images: { orderBy: { sort_order: 'asc' } },
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        creci: true,
                        phone: true,
                        whatsapp: true,
                    },
                },
            },
        });
        if (!property ||
            (property.status !== client_1.PropertyStatus.DISPONIVEL && property.status !== client_1.PropertyStatus.VENDIDO)) {
            throw new common_1.NotFoundException('Imóvel não encontrado');
        }
        await prisma.favorite.upsert({
            where: {
                user_id_listing_id: {
                    user_id: userId,
                    listing_id: listingId,
                },
            },
            create: {
                user_id: userId,
                listing_id: listingId,
            },
            update: {},
        });
        return this.mapProperty(property);
    }
    async removeFavorite(userId, listingId) {
        const prisma = this.asPrismaClient();
        try {
            await prisma.favorite.delete({
                where: {
                    user_id_listing_id: {
                        user_id: userId,
                        listing_id: listingId,
                    },
                },
            });
        }
        catch {
        }
        return { message: 'Favorito removido (se existia).' };
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map
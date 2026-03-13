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
exports.ListingsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const MAX_RECOMMENDED_FETCH = 500;
const VALID_STATUSES = [
    client_1.PropertyStatus.DISPONIVEL,
    client_1.PropertyStatus.VENDIDO,
];
let ListingsService = class ListingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const { page = 1, limit = 10 } = params;
        const skip = (page - 1) * limit;
        const statuses = params.status?.length
            ? params.status.filter((s) => VALID_STATUSES.includes(s))
            : [client_1.PropertyStatus.DISPONIVEL];
        const addressWhere = {};
        if (params.city) {
            addressWhere.city = { contains: params.city, mode: 'insensitive' };
        }
        if (params.neighborhood) {
            addressWhere.neighborhood = { contains: params.neighborhood, mode: 'insensitive' };
        }
        const priceFilter = (() => {
            const conditions = {};
            if (params.min_price != null && params.min_price >= 0)
                conditions.gte = params.min_price;
            if (params.max_price != null && params.max_price >= 0)
                conditions.lte = params.max_price;
            return Object.keys(conditions).length ? conditions : undefined;
        })();
        const baseWhere = {
            status: { in: statuses },
            ...(Object.keys(addressWhere).length && { address: addressWhere }),
            ...(priceFilter && { price: priceFilter }),
        };
        const include = {
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
        };
        const [data, total] = await Promise.all([
            this.prisma.property.findMany({
                where: baseWhere,
                skip,
                take: limit,
                orderBy: { updated_at: 'desc' },
                include,
            }),
            this.prisma.property.count({ where: baseWhere }),
        ]);
        return {
            data: data.map((p) => this.mapProperty(p)),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findByOwner(params) {
        const { ownerId, page = 1, limit = 10 } = params;
        const skip = (page - 1) * limit;
        const statuses = params.status?.length
            ? params.status.filter((s) => VALID_STATUSES.includes(s))
            : VALID_STATUSES;
        const include = {
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
        };
        const baseWhere = {
            owner_id: ownerId,
            status: { in: statuses },
        };
        const [data, total] = await Promise.all([
            this.prisma.property.findMany({
                where: baseWhere,
                skip,
                take: limit,
                orderBy: { updated_at: 'desc' },
                include,
            }),
            this.prisma.property.count({ where: baseWhere }),
        ]);
        return {
            data: data.map((p) => this.mapProperty(p)),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findRecommendations(userId, page = 1, limit = 10) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { address: true },
        });
        if (!user?.address) {
            throw new common_1.BadRequestException('Para ver recomendações, cadastre um endereço no seu perfil.');
        }
        const renda = user.renda_mensal != null ? Number(user.renda_mensal) : 0;
        const entrada = user.valor_entrada != null ? Number(user.valor_entrada) : 0;
        const hasFinancial = renda > 0 || entrada > 0;
        const hasState = !!user.address.state;
        const hasCity = !!user.address.city;
        if (!hasState && !hasCity && !hasFinancial) {
            throw new common_1.BadRequestException('Para ver recomendações, cadastre endereço (estado ou cidade) e/ou renda_mensal e valor_entrada no perfil.');
        }
        const baseWhere = {
            status: client_1.PropertyStatus.DISPONIVEL,
        };
        if (hasFinancial) {
            const byEntrada = entrada > 0 ? entrada / 0.2 : Infinity;
            const byRenda = renda > 0 ? entrada + renda * 120 : Infinity;
            const maxPrice = Math.min(byEntrada, byRenda);
            if (Number.isFinite(maxPrice) && maxPrice > 0) {
                baseWhere.price = { lte: maxPrice };
            }
        }
        const include = {
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
        };
        const userState = user.address.state?.toLowerCase().trim() ?? '';
        const userCity = user.address.city?.toLowerCase().trim() ?? '';
        const [allData, total] = await Promise.all([
            this.prisma.property.findMany({
                where: baseWhere,
                take: MAX_RECOMMENDED_FETCH,
                orderBy: { updated_at: 'desc' },
                include,
            }),
            this.prisma.property.count({ where: baseWhere }),
        ]);
        const sorted = [...allData].sort((a, b) => {
            const aState = a.address?.state?.toLowerCase().trim() ?? '';
            const bState = b.address?.state?.toLowerCase().trim() ?? '';
            const aStateMatch = userState && aState === userState ? 1 : 0;
            const bStateMatch = userState && bState === userState ? 1 : 0;
            if (bStateMatch !== aStateMatch)
                return bStateMatch - aStateMatch;
            const aCity = a.address?.city?.toLowerCase().trim() ?? '';
            const bCity = b.address?.city?.toLowerCase().trim() ?? '';
            const aCityMatch = userCity && aCity === userCity ? 1 : 0;
            const bCityMatch = userCity && bCity === userCity ? 1 : 0;
            if (bCityMatch !== aCityMatch)
                return bCityMatch - aCityMatch;
            return 0;
        });
        const skip = (page - 1) * limit;
        const paginated = sorted.slice(skip, skip + limit);
        return {
            data: paginated.map((p) => this.mapProperty(p)),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
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
    async findOne(id) {
        const property = await this.prisma.property.findUnique({
            where: { id },
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
        if (!property) {
            throw new common_1.NotFoundException('Imóvel não encontrado');
        }
        if (property.status !== client_1.PropertyStatus.DISPONIVEL && property.status !== client_1.PropertyStatus.VENDIDO) {
            throw new common_1.NotFoundException('Imóvel não encontrado');
        }
        const images = property.images.map((img) => ({
            id: img.id,
            filename: img.filename,
            content_type: img.content_type,
            size_bytes: img.size_bytes,
            width: img.width,
            height: img.height,
            sort_order: img.sort_order,
            created_at: img.created_at,
            image_url: img.image_url,
        }));
        return {
            id: property.id,
            title: property.title,
            description: property.description,
            property_type: property.property_type,
            price: Number(property.price),
            area: Number(property.area),
            bedrooms: property.bedrooms,
            status: property.status,
            created_at: property.created_at,
            updated_at: property.updated_at,
            address: property.address,
            images,
            owner: property.owner,
        };
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListingsService);
//# sourceMappingURL=listings.service.js.map
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
exports.CorretoresService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let CorretoresService = class CorretoresService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const page = Math.max(1, params.page ?? 1);
        const limit = Math.min(100, Math.max(1, params.limit ?? 10));
        const skip = (page - 1) * limit;
        const search = params.search?.trim();
        if (search) {
            return this.findAllWithSearch(search, page, limit, skip);
        }
        return this.findAllNoSearch(page, limit, skip);
    }
    async findAllNoSearch(page, limit, skip) {
        const rows = await this.prisma.$queryRaw `
      SELECT
        u.id,
        u.name,
        u.email,
        u.creci,
        u.phone,
        u.whatsapp,
        COUNT(f.id)::int AS "favoritesCount"
      FROM users u
      LEFT JOIN properties p ON p.owner_id = u.id
      LEFT JOIN favorites f ON f.listing_id = p.id
      WHERE u.role = ${client_1.UserRole.CORRETOR} AND u.is_active = true
      GROUP BY u.id, u.name, u.email, u.creci, u.phone, u.whatsapp
      ORDER BY "favoritesCount" DESC, u.name ASC NULLS LAST
      LIMIT ${limit} OFFSET ${skip}
    `;
        const [{ total }] = await this.prisma.$queryRaw `
      SELECT COUNT(*)::int AS total
      FROM users u
      WHERE u.role = ${client_1.UserRole.CORRETOR} AND u.is_active = true
    `;
        const totalNum = Number(total);
        return {
            data: rows,
            meta: {
                total: totalNum,
                page,
                limit,
                totalPages: Math.ceil(totalNum / limit),
            },
        };
    }
    async findAllWithSearch(search, page, limit, skip) {
        const pattern = `%${search}%`;
        const rows = await this.prisma.$queryRaw `
      SELECT
        u.id,
        u.name,
        u.email,
        u.creci,
        u.phone,
        u.whatsapp,
        COUNT(f.id)::int AS "favoritesCount"
      FROM users u
      LEFT JOIN properties p ON p.owner_id = u.id
      LEFT JOIN favorites f ON f.listing_id = p.id
      WHERE u.role = ${client_1.UserRole.CORRETOR}
        AND u.is_active = true
        AND (u.name ILIKE ${pattern} OR u.creci ILIKE ${pattern})
      GROUP BY u.id, u.name, u.email, u.creci, u.phone, u.whatsapp
      ORDER BY "favoritesCount" DESC, u.name ASC NULLS LAST
      LIMIT ${limit} OFFSET ${skip}
    `;
        const [{ total }] = await this.prisma.$queryRaw `
      SELECT COUNT(*)::int AS total
      FROM users u
      WHERE u.role = ${client_1.UserRole.CORRETOR}
        AND u.is_active = true
        AND (u.name ILIKE ${pattern} OR u.creci ILIKE ${pattern})
    `;
        const totalNum = Number(total);
        return {
            data: rows,
            meta: {
                total: totalNum,
                page,
                limit,
                totalPages: Math.ceil(totalNum / limit),
            },
        };
    }
};
exports.CorretoresService = CorretoresService;
exports.CorretoresService = CorretoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CorretoresService);
//# sourceMappingURL=corretores.service.js.map
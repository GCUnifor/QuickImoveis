"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    SALT_ROUNDS = 10;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async user(userWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async users(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createUser(data) {
        const email = data.email.toLowerCase();
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new common_1.ConflictException('Já existe um usuário com este e-mail');
        }
        const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);
        return this.prisma.user.create({
            data: {
                ...data,
                email,
                password: hashedPassword,
            },
        });
    }
    async updateUser(params) {
        const { where, data } = params;
        if (data.email) {
            const email = data.email.toLowerCase();
            const id = 'id' in where ? where.id : undefined;
            const existing = await this.prisma.user.findFirst({
                where: { email, ...(id && { NOT: { id } }) },
            });
            if (existing) {
                throw new common_1.ConflictException('Já existe um usuário com este e-mail');
            }
            data.email = email;
        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, this.SALT_ROUNDS);
        }
        return this.prisma.user.update({ data, where });
    }
    async deleteUser(where) {
        return this.prisma.user.delete({ where });
    }
    async findOne(id) {
        const user = await this.user({ id });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return user;
    }
    async findOneWithAddress(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { address: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return user;
    }
    async findByEmail(email) {
        return this.user({ email: email.toLowerCase() });
    }
    async createUserFromGoogle(data) {
        const email = data.email.toLowerCase();
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new common_1.ConflictException('Já existe um usuário com este e-mail');
        }
        const placeholderPassword = await bcrypt.hash(`google-oauth-${(0, crypto_1.randomBytes)(32).toString('hex')}`, this.SALT_ROUNDS);
        return this.prisma.user.create({
            data: {
                email,
                name: data.name ?? null,
                password: placeholderPassword,
                role: data.role,
                is_email_verified: true,
            },
        });
    }
    async create(dto) {
        return this.createUser({
            email: dto.email,
            password: dto.password,
            name: dto.name,
            role: dto.role,
            creci: dto.creci,
            phone: dto.phone,
            whatsapp: dto.whatsapp,
            is_active: dto.is_active,
            is_email_verified: dto.is_email_verified,
            renda_mensal: dto.renda_mensal,
            valor_entrada: dto.valor_entrada,
        });
    }
    async delete(id) {
        await this.findOne(id);
        await this.deleteUser({ id });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map
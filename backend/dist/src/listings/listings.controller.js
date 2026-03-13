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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const listings_service_1 = require("./listings.service");
let ListingsController = class ListingsController {
    listingsService;
    constructor(listingsService) {
        this.listingsService = listingsService;
    }
    findRecommendations(user, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.listingsService.findRecommendations(user.id, pageNum, limitNum);
    }
    findAll(page, limit, min_price, max_price, city, neighborhood, status) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        const minPrice = min_price != null ? parseFloat(min_price) : undefined;
        const maxPrice = max_price != null ? parseFloat(max_price) : undefined;
        const statuses = status
            ? status.split(',').map((s) => s.trim().toUpperCase()).filter((s) => ['DISPONIVEL', 'VENDIDO'].includes(s))
            : undefined;
        return this.listingsService.findAll({
            page: pageNum,
            limit: limitNum,
            min_price: minPrice,
            max_price: maxPrice,
            city,
            neighborhood,
            status: statuses?.length ? statuses : undefined,
        });
    }
    findByOwner(ownerId, page, limit, status) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        const statuses = status
            ? status.split(',').map((s) => s.trim().toUpperCase()).filter((s) => ['DISPONIVEL', 'VENDIDO'].includes(s))
            : undefined;
        return this.listingsService.findByOwner({
            ownerId,
            page: pageNum,
            limit: limitNum,
            status: statuses?.length ? statuses : undefined,
        });
    }
    findOne(id) {
        return this.listingsService.findOne(id);
    }
};
exports.ListingsController = ListingsController;
__decorate([
    (0, common_1.Get)('recommendations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Recomendações personalizadas',
        description: '**Autenticado.** Imóveis DISPONIVEL ordenados por proximidade e faixa de preço.\n\n' +
            '**Requisitos:** endereço no perfil + (state OU city OU renda_mensal OU valor_entrada).\n\n' +
            '**Cálculo preço máx:** min(valor_entrada/0.2, valor_entrada + renda_mensal×120). Entrada = 20% do valor; renda = parcelas em 120 meses.\n\n' +
            '**Ordenação:** 1) mesmo estado, 2) mesma cidade, 3) updated_at desc.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Página (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Itens por página (default: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de imóveis recomendados com data e meta' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Perfil incompleto: cadastre endereço e/ou renda e valor de entrada' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "findRecommendations", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar todos os imóveis',
        description: '**Público.** Sem token. Lista imóveis com filtros opcionais. Ordenação: updated_at desc.\n\n' +
            '**Status padrão:** DISPONIVEL. Use status=DISPONIVEL,VENDIDO para incluir vendidos.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Página (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Itens por página (default: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'min_price', required: false, description: 'Preço mínimo em reais' }),
    (0, swagger_1.ApiQuery)({ name: 'max_price', required: false, description: 'Preço máximo em reais' }),
    (0, swagger_1.ApiQuery)({ name: 'city', required: false, description: 'Cidade (contains, case insensitive)' }),
    (0, swagger_1.ApiQuery)({ name: 'neighborhood', required: false, description: 'Bairro (contains, case insensitive)' }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        description: 'DISPONIVEL, VENDIDO ou DISPONIVEL,VENDIDO. Padrão: DISPONIVEL',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '{ data: [...], meta: { total, page, limit, totalPages } }' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('min_price')),
    __param(3, (0, common_1.Query)('max_price')),
    __param(4, (0, common_1.Query)('city')),
    __param(5, (0, common_1.Query)('neighborhood')),
    __param(6, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('owner/:ownerId'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar imóveis de um corretor',
        description: '**Público.** Retorna imóveis de um corretor específico (portfolio). Por padrão inclui imóveis DISPONIVEL e VENDIDO, nunca RASCUNHO.',
    }),
    (0, swagger_1.ApiParam)({ name: 'ownerId', description: 'UUID do corretor (users.id)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Página (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Itens por página (default: 10)' }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        description: 'DISPONIVEL, VENDIDO ou DISPONIVEL,VENDIDO. Padrão: ambos (DISPONIVEL e VENDIDO).',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '{ data: [...], meta: { total, page, limit, totalPages } } – mesmo formato de GET /listings',
    }),
    __param(0, (0, common_1.Param)('ownerId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "findByOwner", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Detalhe do imóvel',
        description: '**Público.** Retorna detalhes do imóvel. Aceita status DISPONIVEL ou VENDIDO. Inclui endereço, imagens (image_url), dados do corretor.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do imóvel' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Imóvel encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Imóvel não encontrado ou status RASCUNHO' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListingsController.prototype, "findOne", null);
exports.ListingsController = ListingsController = __decorate([
    (0, swagger_1.ApiTags)('Listings'),
    (0, common_1.Controller)('listings'),
    __metadata("design:paramtypes", [listings_service_1.ListingsService])
], ListingsController);
//# sourceMappingURL=listings.controller.js.map
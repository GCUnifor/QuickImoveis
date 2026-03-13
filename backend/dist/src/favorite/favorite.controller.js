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
exports.FavoriteController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const favorite_service_1 = require("./favorite.service");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let FavoriteController = class FavoriteController {
    favoriteService;
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
    }
    listFavorites(user, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.favoriteService.listFavorites(user.id, pageNum, limitNum);
    }
    addFavorite(user, listingId) {
        return this.favoriteService.addFavorite(user.id, listingId);
    }
    removeFavorite(user, listingId) {
        return this.favoriteService.removeFavorite(user.id, listingId);
    }
};
exports.FavoriteController = FavoriteController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar imóveis favoritos',
        description: '**Autenticado.** Retorna imóveis marcados como favoritos pelo usuário atual, com paginação e mesmo formato de resposta de listings.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Página (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Itens por página (default: 10)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '{ data: [...properties], meta: { total, page, limit, totalPages } }',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], FavoriteController.prototype, "listFavorites", null);
__decorate([
    (0, common_1.Post)(':listingId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Adicionar imóvel aos favoritos',
        description: '**Autenticado.** Marca um imóvel como favorito para o usuário atual. Idempotente: se já for favorito, apenas retorna o imóvel.',
    }),
    (0, swagger_1.ApiParam)({ name: 'listingId', description: 'UUID do imóvel (properties.id)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Imóvel favorito retornado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Imóvel não encontrado ou não disponível/vendido' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('listingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FavoriteController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Delete)(':listingId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remover imóvel dos favoritos',
        description: '**Autenticado.** Remove um imóvel dos favoritos do usuário atual. Idempotente: se não estava favorito, responde sucesso mesmo assim.',
    }),
    (0, swagger_1.ApiParam)({ name: 'listingId', description: 'UUID do imóvel (properties.id)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Favorito removido (se existia)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('listingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FavoriteController.prototype, "removeFavorite", null);
exports.FavoriteController = FavoriteController = __decorate([
    (0, swagger_1.ApiTags)('Favorite'),
    (0, common_1.Controller)('favorite'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [favorite_service_1.FavoriteService])
], FavoriteController);
//# sourceMappingURL=favorite.controller.js.map
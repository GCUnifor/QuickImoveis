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
exports.CorretoresController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const corretores_service_1 = require("./corretores.service");
let CorretoresController = class CorretoresController {
    corretoresService;
    constructor(corretoresService) {
        this.corretoresService = corretoresService;
    }
    findAll(search, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.corretoresService.findAll({
            search: search?.trim() || undefined,
            page: pageNum,
            limit: limitNum,
        });
    }
};
exports.CorretoresController = CorretoresController;
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar corretores',
        description: '**Público.** Lista corretores ordenados pela quantidade de favoritos nos imóveis (quem mais tem imóveis favoritados primeiro). Permite buscar por nome ou CRECI.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Busca por nome do corretor ou CRECI (case insensitive)',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Página (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Itens por página (default: 10)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '{ data: [{ id, name, email, creci, phone, whatsapp, favoritesCount }], meta: { total, page, limit, totalPages } }',
    }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], CorretoresController.prototype, "findAll", null);
exports.CorretoresController = CorretoresController = __decorate([
    (0, swagger_1.ApiTags)('Corretores'),
    (0, common_1.Controller)('corretores'),
    __metadata("design:paramtypes", [corretores_service_1.CorretoresService])
], CorretoresController);
//# sourceMappingURL=corretores.controller.js.map
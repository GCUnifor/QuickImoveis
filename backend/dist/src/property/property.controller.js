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
exports.PropertyController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const create_property_dto_1 = require("./dto/create-property.dto");
const reorder_images_dto_1 = require("./dto/reorder-images.dto");
const update_property_dto_1 = require("./dto/update-property.dto");
const property_service_1 = require("./property.service");
let PropertyController = class PropertyController {
    propertyService;
    constructor(propertyService) {
        this.propertyService = propertyService;
    }
    create(user, dto) {
        return this.propertyService.create(user.id, dto);
    }
    findAll(user, page, limit) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.propertyService.findAll(user.id, pageNum, limitNum);
    }
    findOne(user, id) {
        return this.propertyService.findOne(id, user.id);
    }
    update(user, id, dto) {
        return this.propertyService.update(id, user.id, dto);
    }
    remove(user, id) {
        return this.propertyService.remove(id, user.id);
    }
    addImage(user, propertyId, file) {
        return this.propertyService.addImage(propertyId, user.id, file);
    }
    reorderImages(user, propertyId, dto) {
        return this.propertyService.reorderImages(propertyId, user.id, dto.image_ids);
    }
    removeImage(user, propertyId, imageId) {
        return this.propertyService.removeImage(propertyId, imageId, user.id);
    }
};
exports.PropertyController = PropertyController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar imóvel',
        description: '**CORRETOR.** Exige e-mail verificado e CRECI no perfil. Endereço obrigatório. Status: RASCUNHO (rascunho), DISPONIVEL (publicado em /listings) ou VENDIDO. ' +
            'Se criado com status DISPONIVEL, compradores cujo perfil (localização e faixa de preço) se encaixa recebem e-mail de recomendação automaticamente.',
    }),
    (0, swagger_1.ApiBody)({ type: create_property_dto_1.CreatePropertyDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Imóvel criado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'E-mail não verificado ou dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado. Apenas corretores.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_property_dto_1.CreatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar imóveis',
        description: '**CORRETOR.** Lista imóveis do corretor (inclui endereço e imagens com image_url). Ordenação por updated_at desc.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Página (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Itens por página (default: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de imóveis com meta de paginação' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar imóvel',
        description: '**CORRETOR.** Retorna detalhes do imóvel. Apenas se pertencer ao corretor autenticado.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do imóvel' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Imóvel encontrado (inclui endereço e imagens com image_url)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Imóvel não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar imóvel',
        description: '**CORRETOR.** Atualiza imóvel. Campos opcionais. status: DISPONIVEL = publicar em /listings; VENDIDO = marcar como vendido.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do imóvel' }),
    (0, swagger_1.ApiBody)({ type: update_property_dto_1.UpdatePropertyDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Imóvel atualizado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Imóvel não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_property_dto_1.UpdatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover imóvel', description: '**CORRETOR.** Remove imóvel e dados relacionados (endereço, imagens do Firebase Storage).' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do imóvel' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Imóvel removido', schema: { example: { message: 'Imóvel removido' } } }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Imóvel não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { limits: { fileSize: 5 * 1024 * 1024 } })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do imóvel' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['image'],
            properties: {
                image: { type: 'string', format: 'binary', description: 'Imagem (JPEG, PNG, WebP, GIF, máx. 5MB)' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Adicionar imagem',
        description: '**CORRETOR.** Upload máx. 5MB. Imagem principal = primeira por sort_order. Use PATCH images/reorder para alterar.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Imagem adicionada' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Arquivo inválido ou tipo não permitido' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Imóvel não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "addImage", null);
__decorate([
    (0, common_1.Patch)(':id/images/reorder'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reordenar imagens',
        description: '**CORRETOR.** Define ordem. Primeiro ID da lista = imagem principal exibida em /listings.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do imóvel' }),
    (0, swagger_1.ApiBody)({ type: reorder_images_dto_1.ReorderImagesDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ordem atualizada', schema: { example: { message: 'Ordem das imagens atualizada' } } }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'IDs inválidos ou não pertencem ao imóvel' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Imóvel não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, reorder_images_dto_1.ReorderImagesDto]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "reorderImages", null);
__decorate([
    (0, common_1.Delete)(':id/images/:imageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover imagem', description: '**CORRETOR.** Remove imagem do imóvel e do Firebase Storage.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do imóvel' }),
    (0, swagger_1.ApiParam)({ name: 'imageId', description: 'UUID da imagem' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Imagem removida', schema: { example: { message: 'Imagem removida com sucesso' } } }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Imagem não encontrada' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('imageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "removeImage", null);
exports.PropertyController = PropertyController = __decorate([
    (0, swagger_1.ApiTags)('Property'),
    (0, common_1.Controller)('property'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.CORRETOR),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [property_service_1.PropertyService])
], PropertyController);
//# sourceMappingURL=property.controller.js.map
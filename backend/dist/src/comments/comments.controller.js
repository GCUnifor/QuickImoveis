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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const comments_service_1 = require("./comments.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
let CommentsController = class CommentsController {
    commentsService;
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    findPropertyComments(propertyId, page, limit) {
        const p = page ? parseInt(page, 10) : 1;
        const l = limit ? parseInt(limit, 10) : 10;
        return this.commentsService.findPropertyComments(propertyId, p, l);
    }
    createPropertyComment(user, propertyId, dto) {
        return this.commentsService.createPropertyComment(user.id, propertyId, dto);
    }
    updatePropertyComment(user, id, dto) {
        return this.commentsService.updatePropertyComment(id, user.id, dto);
    }
    deletePropertyComment(user, id) {
        return this.commentsService.deletePropertyComment(id, user.id);
    }
    findCorretorComments(corretorId, page, limit) {
        const p = page ? parseInt(page, 10) : 1;
        const l = limit ? parseInt(limit, 10) : 10;
        return this.commentsService.findCorretorComments(corretorId, p, l);
    }
    createCorretorComment(user, corretorId, dto) {
        return this.commentsService.createCorretorComment(user.id, corretorId, dto);
    }
    updateCorretorComment(user, id, dto) {
        return this.commentsService.updateCorretorComment(id, user.id, dto);
    }
    deleteCorretorComment(user, id) {
        return this.commentsService.deleteCorretorComment(id, user.id);
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Get)('property/:propertyId'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar comentários de um imóvel',
        description: '**Público.** Lista comentários de um imóvel com paginação.',
    }),
    (0, swagger_1.ApiParam)({ name: 'propertyId', description: 'UUID do imóvel' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Página (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Itens por página (default: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de comentários com meta de paginação' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Imóvel não encontrado' }),
    __param(0, (0, common_1.Param)('propertyId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "findPropertyComments", null);
__decorate([
    (0, common_1.Post)('property/:propertyId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Comentar em um imóvel',
        description: '**Autenticado.** Adiciona comentário a um imóvel. Rating opcional (1-5).',
    }),
    (0, swagger_1.ApiParam)({ name: 'propertyId', description: 'UUID do imóvel' }),
    (0, swagger_1.ApiBody)({ type: create_comment_dto_1.CreateCommentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comentário criado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Imóvel não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('propertyId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "createPropertyComment", null);
__decorate([
    (0, common_1.Patch)('property/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Editar comentário de imóvel',
        description: '**Autenticado.** Apenas o autor pode editar.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do comentário' }),
    (0, swagger_1.ApiBody)({ type: update_comment_dto_1.UpdateCommentDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comentário atualizado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comentário não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "updatePropertyComment", null);
__decorate([
    (0, common_1.Delete)('property/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Remover comentário de imóvel',
        description: '**Autenticado.** Apenas o autor pode remover.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do comentário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comentário removido' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comentário não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "deletePropertyComment", null);
__decorate([
    (0, common_1.Get)('corretor/:corretorId'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar comentários de um corretor',
        description: '**Público.** Lista comentários/avaliações de um corretor com paginação.',
    }),
    (0, swagger_1.ApiParam)({ name: 'corretorId', description: 'UUID do corretor' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Página (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Itens por página (default: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de comentários com meta de paginação' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Corretor não encontrado' }),
    __param(0, (0, common_1.Param)('corretorId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "findCorretorComments", null);
__decorate([
    (0, common_1.Post)('corretor/:corretorId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Comentar sobre um corretor',
        description: '**Autenticado.** Adiciona comentário/avaliação a um corretor. Rating opcional (1-5).',
    }),
    (0, swagger_1.ApiParam)({ name: 'corretorId', description: 'UUID do corretor' }),
    (0, swagger_1.ApiBody)({ type: create_comment_dto_1.CreateCommentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comentário criado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Corretor não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('corretorId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "createCorretorComment", null);
__decorate([
    (0, common_1.Patch)('corretor/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Editar comentário de corretor',
        description: '**Autenticado.** Apenas o autor pode editar.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do comentário' }),
    (0, swagger_1.ApiBody)({ type: update_comment_dto_1.UpdateCommentDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comentário atualizado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comentário não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "updateCorretorComment", null);
__decorate([
    (0, common_1.Delete)('corretor/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Remover comentário de corretor',
        description: '**Autenticado.** Apenas o autor pode remover.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do comentário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comentário removido' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comentário não encontrado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "deleteCorretorComment", null);
exports.CommentsController = CommentsController = __decorate([
    (0, swagger_1.ApiTags)('Comments'),
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map
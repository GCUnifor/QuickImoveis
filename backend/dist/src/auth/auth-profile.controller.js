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
exports.AuthProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const auth_service_1 = require("./auth.service");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const profile_response_dto_1 = require("./dto/profile-response.dto");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let AuthProfileController = class AuthProfileController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    profile(user) {
        return this.authService.profile(user.id);
    }
    updateProfile(user, dto, avatar) {
        return this.authService.updateProfile(user.id, dto, avatar);
    }
    deactivateAccount(user) {
        return this.authService.deactivateAccount(user.id);
    }
};
exports.AuthProfileController = AuthProfileController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Perfil',
        description: '**Autenticado.** Retorna dados do usuário: avatar (URL), endereço, renda_mensal, valor_entrada. Usado em recomendações.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dados do perfil', type: profile_response_dto_1.ProfileResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthProfileController.prototype, "profile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', { limits: { fileSize: 2 * 1024 * 1024 } })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'João Silva',
                    description: 'Nome do usuário',
                },
                creci: {
                    type: 'string',
                    example: '12345-F',
                    description: 'CRECI (apenas CORRETOR)',
                },
                phone: {
                    type: 'string',
                    example: '11999998888',
                    description: 'Telefone',
                },
                whatsapp: {
                    type: 'string',
                    example: '5511999998888',
                    description: 'WhatsApp (com DDI)',
                },
                renda_mensal: {
                    type: 'number',
                    example: 5000,
                    description: 'Renda mensal em reais (para recomendações)',
                },
                valor_entrada: {
                    type: 'number',
                    example: 50000,
                    description: 'Valor da entrada em reais (para recomendações)',
                },
                address: {
                    type: 'object',
                    description: 'Endereço (usado para recomendações por proximidade)',
                    properties: {
                        street: { type: 'string', example: 'Rua das Flores' },
                        number: { type: 'string', example: '123' },
                        neighborhood: {
                            type: 'string',
                            example: 'Centro',
                        },
                        city: { type: 'string', example: 'São Paulo' },
                        state: { type: 'string', example: 'São Paulo' },
                        country: { type: 'string', example: 'Brasil' },
                        postal_code: {
                            type: 'string',
                            example: '01310-100',
                        },
                        lat: { type: 'number', example: -23.5505 },
                        lng: { type: 'number', example: -46.6333 },
                    },
                },
                avatar: {
                    type: 'string',
                    format: 'binary',
                    description: 'Foto de perfil (JPEG, PNG, WebP, GIF, máx. 2MB)',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar perfil',
        description: '**Autenticado.** Atualiza name, creci, phone, whatsapp, renda_mensal, valor_entrada, address, avatar. Multipart/form-data. Todos opcionais. CRECI obrigatório para criar imóveis.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Perfil atualizado com sucesso',
        type: profile_response_dto_1.ProfileResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", void 0)
], AuthProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)('account'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Desativar conta',
        description: '**Autenticado.** Desativa a conta do usuário (is_active = false). Qualquer token existente passa a retornar 401 nas próximas requisições.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Conta desativada com sucesso',
        schema: { example: { message: 'Conta desativada com sucesso' } },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthProfileController.prototype, "deactivateAccount", null);
exports.AuthProfileController = AuthProfileController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthProfileController);
//# sourceMappingURL=auth-profile.controller.js.map
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
exports.AuthEmailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const public_decorator_1 = require("./decorators/public.decorator");
const verify_email_dto_1 = require("./dto/verify-email.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let AuthEmailController = class AuthEmailController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    requestEmailVerification(user) {
        return this.authService.requestEmailVerification(user.id);
    }
    verifyEmail(dto) {
        return this.authService.verifyEmail(dto.token);
    }
};
exports.AuthEmailController = AuthEmailController;
__decorate([
    (0, common_1.Post)('request-email-verification'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Solicitar verificação de e-mail',
        description: '**Autenticado.** Envia link por e-mail. Link válido 5 min. Corretor precisa verificar para criar imóveis.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Código enviado com sucesso',
        schema: { example: { message: 'Código enviado por e-mail' } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'E-mail já verificado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthEmailController.prototype, "requestEmailVerification", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('verify-email'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verificar e-mail',
        description: '**Público.** Valida token do link enviado por e-mail. Marca conta como verificada.',
    }),
    (0, swagger_1.ApiBody)({ type: verify_email_dto_1.VerifyEmailDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'E-mail verificado com sucesso',
        schema: { example: { message: 'E-mail verificado com sucesso' } },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Link inválido ou expirado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailDto]),
    __metadata("design:returntype", void 0)
], AuthEmailController.prototype, "verifyEmail", null);
exports.AuthEmailController = AuthEmailController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthEmailController);
//# sourceMappingURL=auth-email.controller.js.map
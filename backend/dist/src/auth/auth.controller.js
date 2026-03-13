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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const public_decorator_1 = require("./decorators/public.decorator");
const auth_response_dto_1 = require("./dto/auth-response.dto");
const google_auth_dto_1 = require("./dto/google-auth.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(dto) {
        return this.authService.signIn(dto.email, dto.password);
    }
    async signInWithGoogle(dto) {
        return this.authService.signInWithGoogle(dto);
    }
    async signUp(dto) {
        return this.authService.signUp(dto);
    }
    logout(user) {
        return this.authService.logout(user.id);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('sign-in'),
    (0, swagger_1.ApiOperation)({
        summary: 'Login',
        description: '**Público.** Autentica com e-mail e senha. Retorna access_token e expires_in. Senha validada com bcrypt.',
    }),
    (0, swagger_1.ApiBody)({ type: sign_in_dto_1.SignInDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login realizado com sucesso', type: auth_response_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciais inválidas' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('google'),
    (0, swagger_1.ApiOperation)({
        summary: 'Login com Google',
        description: '**Público.** Autentica com id_token ou access_token do Google. Valida JWT com chaves públicas do Google. Cria usuário se não existir (role COMPRADOR, e-mail verificado). Retorna access_token e expires_in.',
    }),
    (0, swagger_1.ApiBody)({ type: google_auth_dto_1.GoogleAuthDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login realizado com sucesso', type: auth_response_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'id_token ou access_token obrigatório' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token do Google inválido ou expirado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [google_auth_dto_1.GoogleAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInWithGoogle", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('sign-up'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cadastro',
        description: '**Público.** Cria conta (COMPRADOR ou CORRETOR). Senha hasheada com bcrypt. Retorna access_token e expires_in.',
    }),
    (0, swagger_1.ApiBody)({ type: sign_up_dto_1.SignUpDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuário criado com sucesso', type: auth_response_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'E-mail já cadastrado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Logout',
        description: '**Autenticado.** O frontend deve descartar o access_token em memória/storage.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Logout realizado com sucesso',
        schema: { example: { message: 'Logout realizado com sucesso' } },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
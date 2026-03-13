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
exports.AuthResponseDto = exports.AuthUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AuthUserDto {
    id;
    name;
    email;
    role;
    is_active;
    is_email_verified;
}
exports.AuthUserDto = AuthUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-123', description: 'ID do usuário' }),
    __metadata("design:type", String)
], AuthUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João Silva', nullable: true, description: 'Nome' }),
    __metadata("design:type", Object)
], AuthUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'usuario@email.com', description: 'E-mail' }),
    __metadata("design:type", String)
], AuthUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'COMPRADOR',
        nullable: true,
        description: 'Papel: CORRETOR ou COMPRADOR',
    }),
    __metadata("design:type", Object)
], AuthUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Conta ativa' }),
    __metadata("design:type", Boolean)
], AuthUserDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'E-mail verificado' }),
    __metadata("design:type", Boolean)
], AuthUserDto.prototype, "is_email_verified", void 0);
class AuthResponseDto {
    access_token;
    expires_in;
    user;
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'Token JWT de acesso (Bearer). Curta duração. Use no header Authorization.',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 900,
        description: 'Validade do access_token em segundos (ex.: 900 = 15 min).',
    }),
    __metadata("design:type", Number)
], AuthResponseDto.prototype, "expires_in", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: AuthUserDto, description: 'Dados do usuário autenticado' }),
    __metadata("design:type", AuthUserDto)
], AuthResponseDto.prototype, "user", void 0);
//# sourceMappingURL=auth-response.dto.js.map
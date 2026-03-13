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
exports.GoogleAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class GoogleAuthDto {
    id_token;
    access_token;
    role;
}
exports.GoogleAuthDto = GoogleAuthDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'JWT do Google (validar com as chaves públicas do Google). Use id_token OU access_token.',
        example: 'eyJhbGciOiJSUzI1NiIs...',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GoogleAuthDto.prototype, "id_token", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Token OAuth do Google (alternativa ao id_token). Usado para buscar dados do usuário.',
        example: 'ya29.a0AfH6SMBx...',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GoogleAuthDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.UserRole,
        description: 'Papel desejado ao criar a conta com Google. Se omitido, assume COMPRADOR.',
        example: client_1.UserRole.COMPRADOR,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.UserRole),
    __metadata("design:type", String)
], GoogleAuthDto.prototype, "role", void 0);
//# sourceMappingURL=google-auth.dto.js.map
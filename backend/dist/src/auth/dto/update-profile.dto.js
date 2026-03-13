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
exports.UpdateProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const address_dto_1 = require("../../property/dto/address.dto");
const toNumber = (value) => {
    if (value === '' || value === undefined)
        return undefined;
    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
};
class UpdateProfileDto {
    role;
    name;
    creci;
    phone;
    whatsapp;
    renda_mensal;
    valor_entrada;
    address;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.UserRole,
        description: 'Tipo de conta: COMPRADOR ou CORRETOR',
        example: client_1.UserRole.COMPRADOR,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.UserRole),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'João Silva', description: 'Nome do usuário' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '12345-F',
        description: 'CRECI - Registro no Conselho Regional (apenas para CORRETOR)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "creci", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '11999998888', description: 'Telefone' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '5511999998888',
        description: 'WhatsApp (com DDI, ex: 5511999998888)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000, description: 'Renda mensal em reais' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Renda mensal deve ser maior ou igual a zero' }),
    __metadata("design:type", Number)
], UpdateProfileDto.prototype, "renda_mensal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50000, description: 'Valor da entrada em reais' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Valor da entrada deve ser maior ou igual a zero' }),
    __metadata("design:type", Number)
], UpdateProfileDto.prototype, "valor_entrada", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Endereço do usuário (usado para recomendações de imóveis)',
        type: () => address_dto_1.AddressDto,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => address_dto_1.AddressDto),
    __metadata("design:type", address_dto_1.AddressDto)
], UpdateProfileDto.prototype, "address", void 0);
//# sourceMappingURL=update-profile.dto.js.map
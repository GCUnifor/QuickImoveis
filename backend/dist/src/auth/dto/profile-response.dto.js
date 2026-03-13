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
exports.ProfileResponseDto = exports.ProfileAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProfileAddressDto {
    street;
    number;
    neighborhood;
    city;
    state;
    country;
    postal_code;
    lat;
    lng;
}
exports.ProfileAddressDto = ProfileAddressDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ProfileAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ProfileAddressDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ProfileAddressDto.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ProfileAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ProfileAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ProfileAddressDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ProfileAddressDto.prototype, "postal_code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], ProfileAddressDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], ProfileAddressDto.prototype, "lng", void 0);
class ProfileResponseDto {
    id;
    name;
    email;
    role;
    creci;
    phone;
    whatsapp;
    is_active;
    is_email_verified;
    needs_role;
    avatar;
    renda_mensal;
    valor_entrada;
    created_at;
    last_login;
    address;
}
exports.ProfileResponseDto = ProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], ProfileResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfileResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'CRECI - Registro no Conselho Regional (apenas para CORRETOR)',
    }),
    __metadata("design:type", Object)
], ProfileResponseDto.prototype, "creci", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'Telefone' }),
    __metadata("design:type", Object)
], ProfileResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'WhatsApp (com DDI)' }),
    __metadata("design:type", Object)
], ProfileResponseDto.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ProfileResponseDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ProfileResponseDto.prototype, "is_email_verified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica se o usuário ainda precisa escolher o tipo de conta (onboarding de role).',
        example: false,
    }),
    __metadata("design:type", Boolean)
], ProfileResponseDto.prototype, "needs_role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'URL do avatar no Firebase Storage',
    }),
    __metadata("design:type", Object)
], ProfileResponseDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'Renda mensal em reais' }),
    __metadata("design:type", Object)
], ProfileResponseDto.prototype, "renda_mensal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true, description: 'Valor da entrada em reais' }),
    __metadata("design:type", Object)
], ProfileResponseDto.prototype, "valor_entrada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ProfileResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], ProfileResponseDto.prototype, "last_login", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: ProfileAddressDto, nullable: true }),
    __metadata("design:type", Object)
], ProfileResponseDto.prototype, "address", void 0);
//# sourceMappingURL=profile-response.dto.js.map
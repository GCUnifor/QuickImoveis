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
exports.HealthErrorResponseDto = exports.HealthOkResponseDto = exports.HealthIndicatorStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class HealthIndicatorStatusDto {
    status;
    error;
}
exports.HealthIndicatorStatusDto = HealthIndicatorStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'up',
        enum: ['up', 'down'],
        description: 'Status do serviço: up (operacional) ou down (indisponível)',
    }),
    __metadata("design:type", String)
], HealthIndicatorStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Cloud Firestore API has not been enabled',
        required: false,
        description: 'Mensagem de erro quando o status é down',
    }),
    __metadata("design:type", String)
], HealthIndicatorStatusDto.prototype, "error", void 0);
class HealthOkResponseDto {
    status;
    info;
}
exports.HealthOkResponseDto = HealthOkResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ok',
        enum: ['ok'],
        description: 'Indica que todos os serviços estão saudáveis',
    }),
    __metadata("design:type", String)
], HealthOkResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status de cada serviço verificado',
        example: {
            firebase: { status: 'up' },
            mail: { status: 'up' },
            supabase: { status: 'up' },
        },
    }),
    __metadata("design:type", Object)
], HealthOkResponseDto.prototype, "info", void 0);
class HealthErrorResponseDto {
    status;
    info;
    error;
    details;
}
exports.HealthErrorResponseDto = HealthErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'error',
        enum: ['error'],
        description: 'Indica que um ou mais serviços estão indisponíveis',
    }),
    __metadata("design:type", String)
], HealthErrorResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Serviços que estão operacionais',
    }),
    __metadata("design:type", Object)
], HealthErrorResponseDto.prototype, "info", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Serviços que falharam na verificação',
    }),
    __metadata("design:type", Object)
], HealthErrorResponseDto.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detalhes consolidados de todos os indicadores',
    }),
    __metadata("design:type", Object)
], HealthErrorResponseDto.prototype, "details", void 0);
//# sourceMappingURL=health-response.dto.js.map
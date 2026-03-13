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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
const terminus_1 = require("@nestjs/terminus");
const health_response_dto_1 = require("./dto/health-response.dto");
const firebase_health_1 = require("./indicators/firebase.health");
const mail_health_1 = require("./indicators/mail.health");
const prisma_health_1 = require("./indicators/prisma.health");
let HealthController = class HealthController {
    health;
    firebase;
    mail;
    prisma;
    constructor(health, firebase, mail, prisma) {
        this.health = health;
        this.firebase = firebase;
        this.mail = mail;
        this.prisma = prisma;
    }
    check() {
        return this.health.check([
            () => this.firebase.isHealthy('firebase'),
            () => this.mail.isHealthy('mail'),
            () => this.prisma.isHealthy('supabase'),
        ]);
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Verificar saúde dos serviços',
        description: '**Público.** Verifica Firebase, Mail (SMTP) e Supabase (PostgreSQL). Retorna 200 (ok) ou 503 (erro). Ideal para probes de readiness/liveness.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Todos os serviços estão operacionais',
        type: health_response_dto_1.HealthOkResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 503,
        description: 'Serviço indisponível - um ou mais serviços (Firebase, Mail ou Supabase) falharam na verificação',
        type: health_response_dto_1.HealthErrorResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        firebase_health_1.FirebaseHealthIndicator,
        mail_health_1.MailHealthIndicator,
        prisma_health_1.PrismaHealthIndicator])
], HealthController);
//# sourceMappingURL=health.controller.js.map
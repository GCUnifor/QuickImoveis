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
exports.MailHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const mail_service_1 = require("../../mail/mail.service");
let MailHealthIndicator = class MailHealthIndicator extends terminus_1.HealthIndicator {
    mailService;
    constructor(mailService) {
        super();
        this.mailService = mailService;
    }
    async isHealthy(key) {
        try {
            const isConnected = await this.mailService.verifyConnection();
            if (!isConnected) {
                throw new Error('Conexão SMTP não verificada');
            }
            return this.getStatus(key, true);
        }
        catch (e) {
            throw new terminus_1.HealthCheckError('Mail (SMTP) check failed', this.getStatus(key, false, { error: e.message }));
        }
    }
};
exports.MailHealthIndicator = MailHealthIndicator;
exports.MailHealthIndicator = MailHealthIndicator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailHealthIndicator);
//# sourceMappingURL=mail.health.js.map
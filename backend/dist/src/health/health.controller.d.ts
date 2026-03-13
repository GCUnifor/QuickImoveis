import { HealthCheckService } from '@nestjs/terminus';
import { FirebaseHealthIndicator } from './indicators/firebase.health';
import { MailHealthIndicator } from './indicators/mail.health';
import { PrismaHealthIndicator } from './indicators/prisma.health';
export declare class HealthController {
    private health;
    private firebase;
    private mail;
    private prisma;
    constructor(health: HealthCheckService, firebase: FirebaseHealthIndicator, mail: MailHealthIndicator, prisma: PrismaHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult, Partial<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult> | undefined, Partial<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult> | undefined>>;
}

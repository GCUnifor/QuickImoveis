import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { MailService } from '../../mail/mail.service';
export declare class MailHealthIndicator extends HealthIndicator {
    private readonly mailService;
    constructor(mailService: MailService);
    isHealthy(key: string): Promise<HealthIndicatorResult>;
}

import { ConfigService } from '@nestjs/config';
import type { SendMailOptions } from './interfaces/send-mail-options.interface';
export declare class MailService {
    private readonly configService;
    private transporter;
    constructor(configService: ConfigService);
    sendMail(options: SendMailOptions): Promise<void>;
    verifyConnection(): Promise<boolean>;
}

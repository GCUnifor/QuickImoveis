import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { FirebaseService } from '../../firebase/firebase.service';
export declare class FirebaseHealthIndicator extends HealthIndicator {
    private readonly firebase;
    constructor(firebase: FirebaseService);
    isHealthy(key: string): Promise<HealthIndicatorResult>;
}

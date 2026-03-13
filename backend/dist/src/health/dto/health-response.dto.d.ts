export declare class HealthIndicatorStatusDto {
    status: 'up' | 'down';
    error?: string;
}
export declare class HealthOkResponseDto {
    status: 'ok';
    info: Record<string, HealthIndicatorStatusDto>;
}
export declare class HealthErrorResponseDto {
    status: 'error';
    info?: Record<string, HealthIndicatorStatusDto>;
    error?: Record<string, HealthIndicatorStatusDto>;
    details: Record<string, HealthIndicatorStatusDto>;
}

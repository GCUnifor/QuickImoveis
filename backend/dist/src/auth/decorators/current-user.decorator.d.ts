export interface CurrentUserPayload {
    id: string;
    name: string | null;
    email: string;
    role: string;
}
export declare const CurrentUser: (...dataOrPipes: (keyof CurrentUserPayload | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;

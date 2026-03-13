"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const ERROR_NAMES = {
    [common_1.HttpStatus.BAD_REQUEST]: 'Bad Request',
    [common_1.HttpStatus.UNAUTHORIZED]: 'Unauthorized',
    [common_1.HttpStatus.FORBIDDEN]: 'Forbidden',
    [common_1.HttpStatus.NOT_FOUND]: 'Not Found',
    [common_1.HttpStatus.CONFLICT]: 'Conflict',
    [common_1.HttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
    [common_1.HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    logger = new common_1.Logger(HttpExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let statusCode;
        let message;
        let error;
        if (exception instanceof common_1.HttpException) {
            statusCode = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const body = exceptionResponse;
                message = body['message'] ?? exception.message;
            }
            else {
                message = exception.message;
            }
            error = ERROR_NAMES[statusCode] ?? exception.name;
        }
        else {
            statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Erro interno do servidor';
            error = ERROR_NAMES[statusCode];
            this.logger.error(`${request.method} ${request.url} - ${exception instanceof Error ? exception.message : String(exception)}`, exception instanceof Error ? exception.stack : undefined);
        }
        const body = {
            statusCode,
            message,
            error,
        };
        response.status(statusCode).json(body);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map
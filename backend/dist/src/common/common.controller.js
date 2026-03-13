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
exports.CommonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const brazilian_state_enum_1 = require("./enums/brazilian-state.enum");
let CommonController = class CommonController {
    getBrazilianStates() {
        const states = Object.values(brazilian_state_enum_1.BrazilianState);
        return { states };
    }
};
exports.CommonController = CommonController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('brazilian-states'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar estados do Brasil',
        description: '**Público.** Retorna a lista de estados (nomes completos) para uso em selects de endereço. Use o valor retornado no campo `state` de endereços.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de estados',
        schema: {
            type: 'object',
            properties: {
                states: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['Acre', 'Alagoas', 'Amapá', 'São Paulo', 'Rio de Janeiro'],
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], CommonController.prototype, "getBrazilianStates", null);
exports.CommonController = CommonController = __decorate([
    (0, swagger_1.ApiTags)('Common'),
    (0, common_1.Controller)('common')
], CommonController);
//# sourceMappingURL=common.controller.js.map
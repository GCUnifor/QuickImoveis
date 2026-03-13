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
exports.ReorderImagesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ReorderImagesDto {
    image_ids;
}
exports.ReorderImagesDto = ReorderImagesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['uuid-1', 'uuid-2', 'uuid-3'],
        description: 'IDs das imagens na ordem desejada. O primeiro da lista será a imagem principal.',
        type: [String],
        minItems: 1,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Envie pelo menos um ID de imagem' }),
    __metadata("design:type", Array)
], ReorderImagesDto.prototype, "image_ids", void 0);
//# sourceMappingURL=reorder-images.dto.js.map
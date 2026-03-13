"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: process.env.CORS_ORIGIN?.split(',') ?? [process.env.CORS_ORIGIN],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Quick Imóveis API')
        .setDescription('API para plataforma de imóveis com **compradores** e **corretores**.\n\n' +
        '## Regras de acesso\n\n' +
        '- **Rotas públicas**: não exigem token (sign-in, sign-up, forgot/reset password, verify-email, GET /listings, GET /listings/:id, GET /health)\n' +
        '- **Rotas autenticadas**: exigem `Authorization: Bearer <token>`\n' +
        '- **Property**: apenas usuários com role **CORRETOR**\n' +
        '- **Listings/recommendations**: autenticado + perfil com endereço e/ou renda/entrada\n\n' +
        '## Módulos\n\n' +
        '- **Auth**: Login, cadastro, recuperação de senha (código 6 dígitos, 5 min), verificação de e-mail (link 5 min), perfil. JWT expira em 7 dias (configurável via JWT_EXPIRATION).\n' +
        '- **Property**: CRUD de imóveis. Status: RASCUNHO, DISPONIVEL, VENDIDO. Exige e-mail verificado e CRECI para criar. Imagem principal = primeira por sort_order.\n' +
        '- **Listings**: Listagem pública com filtros. Recomendações: preço máx = min(entrada/0.2, entrada+renda×120); ordenação por estado/cidade.\n' +
        '- **Comments**: Comentários e avaliações (1-5) em imóveis e corretores. Listagem pública; criar/editar/remover exigem autenticação (apenas o autor pode editar/remover).\n' +
        '- **Health**: Firebase, Mail, Supabase. Retorna 200 ou 503.')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
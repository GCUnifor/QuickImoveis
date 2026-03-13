"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const auth_email_controller_1 = require("./auth-email.controller");
const auth_password_controller_1 = require("./auth-password.controller");
const auth_profile_controller_1 = require("./auth-profile.controller");
const auth_service_1 = require("./auth.service");
const constants_1 = require("./constants");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const mail_module_1 = require("../mail/mail.module");
const prisma_module_1 = require("../prisma/prisma.module");
const users_module_1 = require("../users/users.module");
const firebase_module_1 = require("../firebase/firebase.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            users_module_1.UsersModule,
            prisma_module_1.PrismaModule,
            mail_module_1.MailModule,
            firebase_module_1.FirebaseModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => {
                    const expiresIn = config.get('JWT_EXPIRATION') ?? constants_1.JWT_EXPIRATION_DEFAULT;
                    return {
                        secret: config.get('JWT_SECRET') ??
                            'secret-key-change-in-production',
                        signOptions: { expiresIn },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        controllers: [
            auth_controller_1.AuthController,
            auth_password_controller_1.AuthPasswordController,
            auth_email_controller_1.AuthEmailController,
            auth_profile_controller_1.AuthProfileController,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
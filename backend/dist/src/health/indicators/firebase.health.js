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
exports.FirebaseHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const firebase_service_1 = require("../../firebase/firebase.service");
let FirebaseHealthIndicator = class FirebaseHealthIndicator extends terminus_1.HealthIndicator {
    firebase;
    constructor(firebase) {
        super();
        this.firebase = firebase;
    }
    async isHealthy(key) {
        try {
            const app = this.firebase.getApp();
            if (!app) {
                throw new Error('Firebase app não inicializado');
            }
            return this.getStatus(key, true);
        }
        catch (e) {
            throw new terminus_1.HealthCheckError('Firebase check failed', this.getStatus(key, false, { error: e.message }));
        }
    }
};
exports.FirebaseHealthIndicator = FirebaseHealthIndicator;
exports.FirebaseHealthIndicator = FirebaseHealthIndicator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], FirebaseHealthIndicator);
//# sourceMappingURL=firebase.health.js.map
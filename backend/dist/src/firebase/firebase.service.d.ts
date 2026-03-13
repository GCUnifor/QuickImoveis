import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
export declare class FirebaseService implements OnModuleInit {
    private readonly configService;
    private readonly logger;
    private app;
    private bucket;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    private loadCredentials;
    auth(): admin.auth.Auth;
    firestore(): admin.firestore.Firestore;
    storage(): admin.storage.Storage;
    getApp(): admin.app.App;
    uploadFile(filePath: string, buffer: Buffer, contentType: string): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
    deleteFiles(filePaths: string[]): Promise<void>;
    avatarPath(userId: string, mimetype: string): string;
    propertyImagePath(propertyId: string, mimetype: string): string;
}

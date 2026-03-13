import { User, Prisma, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly SALT_ROUNDS;
    constructor(prisma: PrismaService);
    user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
    deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>;
    findOne(id: string): Promise<User>;
    findOneWithAddress(id: string): Promise<{
        address: {
            number: string | null;
            id: string;
            user_id: string;
            street: string | null;
            neighborhood: string | null;
            city: string | null;
            state: string | null;
            country: string | null;
            postal_code: string | null;
            lat: number | null;
            lng: number | null;
        } | null;
    } & {
        name: string | null;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole | null;
        creci: string | null;
        phone: string | null;
        whatsapp: string | null;
        is_active: boolean;
        is_email_verified: boolean;
        renda_mensal: Prisma.Decimal | null;
        valor_entrada: Prisma.Decimal | null;
        id: string;
        created_at: Date;
        last_login: Date | null;
        avatar_url: string | null;
    }>;
    findByEmail(email: string): Promise<User | null>;
    createUserFromGoogle(data: {
        email: string;
        name?: string | null;
        role?: UserRole;
    }): Promise<User>;
    create(dto: CreateUserDto): Promise<User>;
    delete(id: string): Promise<void>;
}

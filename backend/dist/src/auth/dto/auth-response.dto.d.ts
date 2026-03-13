export declare class AuthUserDto {
    id: string;
    name: string | null;
    email: string;
    role: string | null;
    is_active: boolean;
    is_email_verified: boolean;
}
export declare class AuthResponseDto {
    access_token: string;
    expires_in: number;
    user: AuthUserDto;
}

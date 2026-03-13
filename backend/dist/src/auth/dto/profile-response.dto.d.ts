export declare class ProfileAddressDto {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    lat?: number;
    lng?: number;
}
export declare class ProfileResponseDto {
    id: string;
    name: string | null;
    email: string;
    role: string;
    creci: string | null;
    phone: string | null;
    whatsapp: string | null;
    is_active: boolean;
    is_email_verified: boolean;
    needs_role: boolean;
    avatar: string | null;
    renda_mensal: number | null;
    valor_entrada: number | null;
    created_at: Date;
    last_login: Date | null;
    address: ProfileAddressDto | null;
}

import { BrazilianState } from '../../common/enums/brazilian-state.enum';
export declare class AddressDto {
    id?: string;
    property_id?: string;
    user_id?: string;
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: BrazilianState;
    country?: string;
    postal_code?: string;
    lat?: number;
    lng?: number;
}

export type Provider = {
    id: string;
    owner_id: string;
    name: string;
    provider_type: string;
    service_json: Object;
    location_json: Object;
    average_rating: number;
    verified: boolean;
    active: boolean;
    contact_info_json: Object;
    created_at: string;
}
export type UserProfile = {
    id: string;
    user_id: string;
    user_role: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    preferences_json: string | null;
    notification_settings_json: string | null;
    active: boolean;
    avatar: string | null;
}
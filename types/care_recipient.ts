export type CareRecipient = {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    age: number;
    relationship: string;
    care_needs_json: Object;
    medical_conditions_json: Object;
    mobility_status: string;
    cognitive_status: string
    notes: string;
    created_at: string;
}
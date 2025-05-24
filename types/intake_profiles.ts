export type IntakeProfile = {
    id: string;
    created_at: string;
    session_id: string;
    user_id: string;
    care_type: string;
    preferred_region: string;
    budget_min: number;
    budget_max: number;
    move_in_timeline: string;
    special_needs: string;
    family_contact_name: string;
    family_contact_phone: string;
    is_ready_for_match: boolean;
    summary_completed: boolean;
    additional_notes: string;
}
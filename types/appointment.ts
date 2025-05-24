export type Appointment = {
    id: string;
    user_id: string;
    provider_id: string;
    scheduled_at: string;
    duration_minutes: number;
    appointment_type: string;
    status: string;
    notes: string;
    reminder_sent: boolean;
    created_at: string;
}
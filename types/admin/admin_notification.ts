export type AdminNotification = {
    id?: string;
    session_id: string;
    message: string;
    read: boolean;
    created_at: string;
}
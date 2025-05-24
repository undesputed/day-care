export type AuditLog = {
    id: string;
    user_id: string;
    action: string;
    module: string;
    ip_address: string;
    created_at: string;
}
export type ChatSession = {
    id: string;
    user_id: string;
    thread_id: string;
    session_token: string;
    ai_summary: any;
    status: "incomplete" | "completed";
    is_ready_for_match: boolean;
    created_at: string;
}

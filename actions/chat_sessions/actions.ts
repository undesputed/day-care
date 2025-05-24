"use server";

import { ChatSession } from '../../types/chat_sessions';
import { createClient } from "@/utils/supabase/server";

export const createChatSession = async (data: ChatSession) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "User not found" };
    }

    data.user_id = user.id;
    data.created_at = new Date().toISOString();

    const { data: insertedData, error } = await supabase.from("chat_sessions").insert(data);

    if (error) {
        console.error(error);
        return { error: error.message };
    }

    return { data: insertedData };
};

export const getChatSessionByUserId = async () => {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
        console.error('Auth Error:', authError);
        return { error: "Failed to authenticate user." };
    }

    if (!user) {
        return { error: "User not found" };
    }

    const { data: chatSession, error: queryError } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'incomplete')
        .order('created_at', { ascending: false })
        .limit(1);

        
    if (queryError) {
        console.error('Query Error:', queryError);
        return { error: queryError.message };
    }

    if (!chatSession || chatSession.length === 0) {
        console.warn("No chat session found for user.");
        return { data: null };
    }

    return { data: chatSession[0] };
};

export const updateChatSession = async (id: string, data: Partial<ChatSession>) => {
    const supabase = await createClient();
    const { data: updatedData, error } = await supabase.from("chat_sessions").update(data).eq("id", id);

    if (error) {
        console.error(error);
        return { error: error.message };
    }

    return { data: updatedData };
};

export const deleteChatSession = async (id: string) => {
    const supabase = await createClient();
    const { data: deletedData, error } = await supabase.from("chat_sessions").delete().eq("id", id);

    if (error) {
        console.error(error);
        return { error: error.message };
    }
}; 
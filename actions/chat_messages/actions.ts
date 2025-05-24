"use server";

import { ChatMessage } from '../../types/chat_messages';
import { createClient } from "@/utils/supabase/server";

export const createChatMessage = async (data: ChatMessage) => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user){
        return {error: "User not found"};
    }
    
    const {data: insertedData, error} = await supabase.from("chat_messages").insert({
        session_id: data.session_id,
        sender: data.sender,
        message: data.message,
    });
    
    if(error){
        console.error(error);
        return {error: error.message};
    }
    return {data: insertedData};
};

export const getChatMessages = async (session_id: string) => {
    const supabase = await createClient();
    const {data, error} = await supabase.from("chat_messages").select("*").eq("session_id", session_id);

    if(error){
        console.error(error);
        return {error: error.message};
    }
    return {data};
};

export const updateChatMessage = async (id: string, data: Partial<ChatMessage>) => {
    const supabase = await createClient();
    const {data: updatedData, error} = await supabase.from("chat_messages").update(data).eq("id", id);

    if(error){
        console.error(error);
        return {error: error.message};
    }
    return {data: updatedData};
};

export const deleteChatMessage = async (id: string) => {
    const supabase = await createClient();
    const {data: deletedData, error} = await supabase.from("chat_messages").delete().eq("id", id);

    if(error){
        console.error(error);
        return {error: error.message};
    }
}; 
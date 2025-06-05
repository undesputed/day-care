"use server";

import { createClient } from '@/utils/supabase/server';
import { AdminNotification } from '../../../types/admin/admin_notification';

export const createAdminNotification = async (data: AdminNotification) => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user){
        return {error: "User not found"};
    }

    if(!data.session_id){
        return {error: "Session ID is required"};
    }
    data.created_at = new Date().toISOString();

    const {data: insertedData, error} = await supabase.from("admin_notification").upsert(data, { onConflict: 'id' });

    if(error){
        console.error(error);
        return {error: error.message};
    }
    return {data: insertedData};
};

export const readAdminNotification = async (id: string) => {
    // Implementation for reading an AI call by id
};

export const updateAdminNotification = async (id: string, data: Partial<AdminNotification>) => {
    // Implementation for updating an AI call by id
};

export const deleteAdminNotification = async (id: string) => {
    // Implementation for deleting an AI call by id
}; 
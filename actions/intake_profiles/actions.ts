"use server";

import { IntakeProfile } from '../../types/intake_profiles';
import { createClient } from "@/utils/supabase/server";

export const createIntakeProfile = async (data: IntakeProfile) => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user){
        return {error: "User not found"};
    }

    const {data: insertedData, error} = await supabase.from("intake_profiles").insert(data);

    if(error){
        return {error: error.message};
    }
    return {data: insertedData};
};

export const getIntakeProfile = async (session_id: string) => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user){
        return {error: "User not found"};
    }

    const {data: intakeProfile, error} = await supabase.from("intake_profiles").select("*").eq("user_id", user.id).eq("session_id", session_id);

    if(error){
        return {error: error.message};
    }
    return {data: intakeProfile};
};

export const updateIntakeProfile = async (id: string, data: Partial<IntakeProfile>) => {
    const supabase = await createClient();
    const {data: updatedData, error} = await supabase.from("intake_profiles").update(data).eq("id", id);

    if(error){
        return {error: error.message};
    }
    return {data: updatedData};
};

export const deleteIntakeProfile = async (id: string) => {
    const supabase = await createClient();
    const {data: deletedData, error} = await supabase.from("intake_profiles").delete().eq("id", id);

    if(error){
        return {error: error.message};
    }
    return {data: deletedData};
}; 
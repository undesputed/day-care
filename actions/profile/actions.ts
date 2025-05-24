"use server";

import { UserProfile } from "@/types/user_profile";
import { createClient } from "@/utils/supabase/server";

export async function getProfile(){
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user){
        return {error: "User not found"};
    }

    const {data, error} = await supabase.from("user_profile").select("*").eq("user_id", user.id).single();

    if(error){
        console.error(error);
        return {error: error.message};
    }

    data.email = user.email;
    const userProfile = data as UserProfile;

    return userProfile;
}

export async function updateProfile(profile: UserProfile){
    const supabase = await createClient();

    const params = {
        user_role: profile.user_role,
        avatar: profile.avatar,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        zip_code: profile.zip_code,
        preferences_json: profile.preferences_json,
    }

    const {data, error} = await supabase.from("user_profile").update(params).eq("id", profile.id);
    
    if (error) {
        console.error(error);
        return { error: error.message };
    }
    return { data };
}

"use server";

import { createClient } from '@/utils/supabase/server';
import { UserProfile } from '@/types/user_profile';

export const createUser = async (data: UserProfile) => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user){
        return {error: "User not found"};
    }
}

export const getUserSummary = async () => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user){
        return {error: "User not found"};
    }
    const {data, error} = await supabase.from("user_profile").select("*").eq("user_role", "user");

    if(error){
        console.error(error);
        return {error: error.message};
    }

    const response = {
        total_users: data.length,
        total_active_users: data.filter((user: UserProfile) => user.active === true).length,
        total_providers: data.filter((user: UserProfile) => user.user_role === "provider").length,
        total_new_registrations: data.filter((user: UserProfile) => {
            const createdAt = new Date(user.created_at);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return user.user_role === "user" && createdAt >= thirtyDaysAgo;
        }).length,
    }
    return {data: response};
}

export const getUserList = async (content: string, page: number, limit: number, role: string) => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if(!user){
        return {error: "User not found"};
    }

    // First, get the total count
    const countQuery = supabase.from("user_profile").select("*", { count: 'exact', head: true });
    if (role && role !== "all") {
        countQuery.eq("user_role", role);
    }
    const { count } = await countQuery;

    // Then get the paginated data
    const query = supabase.from("user_profile").select("*");
    if (role && role !== "all") {
        query.eq("user_role", role);
    }
    
    // Only apply pagination if limit is specified
    if (limit > 0) {
        query.range((page - 1) * limit, page * limit - 1);
    }
    
    const {data, error} = await query;
    
    if(error){
        console.error(error);
        return {error: error.message};
    }

    const response = data.map((curr_user: UserProfile) => ({
        id: curr_user.user_id,
        name: curr_user.first_name + " " + curr_user.last_name,
        email: curr_user.email,
        role: curr_user.user_role,
        status: curr_user.active ? "Active" : "Inactive", 
        registrationDate: curr_user.created_at,
        lastLogin: null,
        avatar: curr_user.avatar,
    }));

    return {
        data: response,
        total: count || 0
    };
}

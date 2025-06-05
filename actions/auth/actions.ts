"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";


export async function signUp(formData: FormData){
    const supabase = await createClient();
    const firstName = formData.get("fName") as string;
    const lastName = formData.get("lName") as string;

    const credentials = {
        name: `${firstName} ${lastName}`,
        email: (formData.get("email") as string).trim(),
        password: formData.get("password") as string,
    }

    const {data, error} = await supabase.auth.signUp(credentials);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    if (!data.user) {
        console.error("User not returned after sign-up.");
        throw new Error("User not returned after sign-up.");
    }

    revalidatePath("/", "layout");
    redirect("/login");
}

export async function signIn(formData: FormData){
    const supabase = await createClient();    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);

    const data = {
        email: email,
        password: password,
    }

    const { data: signInData, error } = await supabase.auth.signInWithPassword(data);

    if(error){
        console.error(error);
        throw new Error(error.message);
    }

    // After successful login, check if user_profile exists
    const user = signInData.user;
    if (user) {
        const { data: profile, error: profileError } = await supabase
            .from("user_profile")
            .select("*")
            .eq("user_id", user.id)
            .single();
        if (profileError && profileError.code === 'PGRST116') {
            // No profile found, create one with default values
            const userProfile = {
                user_id: user.id,
                user_role: "user",
                avatar: null,
                first_name: "",
                last_name: "",
                phone_number: null,
                address: null,
                city: null,
                state: null,
                zip_code: null,
                preferences_json: null,
                notification_settings_json: null,
                active: true,
            };
            const { error: insertError } = await supabase.from("user_profile").insert(userProfile);
            if (insertError) {
                console.error(insertError);
                throw new Error(insertError.message);
            }
        }
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
}

export async function signOut(){
    const supabase = await createClient();

    const {error} = await supabase.auth.signOut();

    if(error){
        throw new Error(error.message);
    }

    redirect("/");
}

export async function passwordReset(formData: FormData){
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const {error} = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if(error){
        throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    redirect("/login");
}

export async function updatePassword(formData: FormData){
    const supabase = await createClient();
    const password = formData.get("password") as string;
    const {error} = await supabase.auth.updateUser({
        password: password,
    });

    if(error){
        throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    redirect("/login");
}


"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";


export async function signUp(formData: FormData){
    const supabase = createClient();
    const firstName = formData.get("fName") as string;
    const lastName = formData.get("lName") as string;

    const credentials = {
        name: `${firstName} ${lastName}`,
        email: (formData.get("email") as string).trim(),
        password: formData.get("password") as string,
    }

    const {data, error} = await (await supabase).auth.signUp(credentials);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    if (!data.user) {
        console.error("User not returned after sign-up.");
        throw new Error("User not returned after sign-up.");
    }

    const userProfile = {
        user_id: data.user.id,
        user_role: "user",
        avatar: null,
        first_name: firstName,
        last_name: lastName,
        phone_number: null,
        address: null,
        city: null,
        state: null,
        zip_code: null,
        preferences_json: null,
        notification_settings_json: null,
        active: true,
    };

    const { error: profileError } = await (await supabase).from("user_profile").insert(userProfile);

    if (profileError) {
        console.error(profileError);
        throw new Error(profileError.message);
    }

    revalidatePath("/", "layout");
    redirect("/login");
}

export async function signIn(formData: FormData){
    const supabase = createClient();    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);

    const data = {
        email: email,
        password: password,
    }

    const {error} = await (await supabase).auth.signInWithPassword(data);

    if(error){
        console.error(error);
        throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
}

export async function signOut(){
    const supabase = createClient();

    const {error} = await (await supabase).auth.signOut();

    if(error){
        throw new Error(error.message);
    }

    redirect("/");
}

export async function passwordReset(formData: FormData){
    const supabase = createClient();
    const email = formData.get("email") as string;
    const {error} = await (await supabase).auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if(error){
        throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    redirect("/login");
}

export async function updatePassword(formData: FormData){
    const supabase = createClient();
    const password = formData.get("password") as string;
    const {error} = await (await supabase).auth.updateUser({
        password: password,
    });

    if(error){
        throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    redirect("/login");
}


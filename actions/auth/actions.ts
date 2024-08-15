"user sever"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";


export async function signUp(formData: FormData){
    const supabase = createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const {error} = await (await supabase).auth.signUp(data);

    if(error){
        throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function signIn(formData: FormData){
    const supabase = createClient();    

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const {error} = await (await supabase).auth.signInWithPassword(data);

    if(error){
        throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function signOut(){
    const supabase = createClient();

    const {error} = await (await supabase).auth.signOut();

    if(error){
        throw new Error(error.message);
    }

    redirect("/sign-in");
}

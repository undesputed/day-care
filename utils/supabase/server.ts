import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;


export async function createClient() {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error("Missing Supabase environment variables");
    }
    
    const cookieStore = await cookies();
    return createServerClient(
        supabaseUrl,
        supabaseServiceRoleKey,
        {
            cookies: {
                get(name: string){
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions){
                    try {
                        cookieStore.set(name, value, options);
                    } catch (error) {
                        console.error("Error setting cookie", error);
                    }
                },
                remove(name: string, options: CookieOptions){
                    try {
                        cookieStore.set({name, value: "", ...options});
                    } catch (error) {
                        console.error("Error deleting cookie", error);
                    }
                }
            }
        }
    )
}
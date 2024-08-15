import {type NextRequest, type NextResponse} from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export default async function middleware(request: NextRequest){
    return await updateSession(request);
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};

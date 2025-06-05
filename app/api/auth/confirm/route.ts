import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") as string | null;

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next || "/login"; // maybe redirect to login after success?
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("next");

  if (token_hash && type) {
    const supabase = createClient();
    const { error } = await (await supabase).auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return NextResponse.redirect(redirectTo);
    }

    // 🔴 Failed to verify token — redirect with error message
    const errorRedirect = request.nextUrl.clone();
    errorRedirect.pathname = "/error";
    errorRedirect.searchParams.set("message", error.message);
    return NextResponse.redirect(errorRedirect);
  }

  // 🔴 Invalid request (missing token/type)
  const errorRedirect = request.nextUrl.clone();
  errorRedirect.pathname = "/error";
  errorRedirect.searchParams.set("message", "Missing token or type");
  return NextResponse.redirect(errorRedirect);
}

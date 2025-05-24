import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(request: Request) {
    try{
        const thread = await openai.beta.threads.create();

        return NextResponse.json(thread);
    }catch(error: any){
        console.error("Error retrieving thread:", error);
        return NextResponse.json({ error: "Failed to retrieve thread" }, { status: 500 });
    }
}

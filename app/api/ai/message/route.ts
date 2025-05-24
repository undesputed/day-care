import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(request: Request) {
    const {threadId, message, role} = await request.json();

    try{
        const threadMessage = await openai.beta.threads.messages.create(threadId, {
            role: role,
            content: message,
        });

        return NextResponse.json(threadMessage);
    }catch(error: any){
        console.error("Error retrieving thread:", error);
        return NextResponse.json({ error: "Failed to retrieve thread" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const {threadId, messageId} = await request.json();

    try{
        const message = await openai.beta.threads.messages.retrieve(threadId, messageId);
        return NextResponse.json(message);
    }catch(error: any){
        console.error("Error retrieving message:", error);
        return NextResponse.json({ error: "Failed to retrieve message" }, { status: 500 });
    }
}
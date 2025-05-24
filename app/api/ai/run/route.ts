import openai from '@/lib/openai';
import { NextResponse } from 'next/server';

function extractJsonBlocks(text: string): any[] {
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/g;
    const jsonBlocks: any[] = [];
    let match;
  
    while ((match = jsonRegex.exec(text)) !== null) {
      try {
        const parsed = JSON.parse(match[1]);
        jsonBlocks.push(parsed);
      } catch (err) {
        console.warn('❌ Failed to parse JSON block:', match[1]);
      }
    }
  
    return jsonBlocks;
  }

  export async function POST(request: Request) {
    const { threadId } = await request.json();
  
    try {
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID || '',
        temperature: 0.5,
        top_p: 1,
      });
  
      while (true) {
        const statusCheck = await openai.beta.threads.runs.retrieve(threadId, run.id);
  
        if (statusCheck.status === 'completed') break;
        if (['failed', 'cancelled', 'expired'].includes(statusCheck.status)) {
          throw new Error(`Run failed with status: ${statusCheck.status}`);
        }
  
        await new Promise((res) => setTimeout(res, 1000)); // wait 1s
      }
  
      const messages = await openai.beta.threads.messages.list(threadId);
      const assistantMsg = messages.data.find((m) => m.role === 'assistant');
  
      const content =
        assistantMsg?.content?.[0]?.type === 'text'
          ? (assistantMsg.content[0] as { text: { value: string } }).text.value
          : '';
  
      const [intakeProfile, providerData] = extractJsonBlocks(content);
  
      return NextResponse.json({
        reply: content,
        intakeProfile: intakeProfile || null,
        suggestedTags: providerData?.suggested_provider_tags || [],
      });
    } catch (error: any) {
      console.error('❌ Error during assistant run:', error);
      return NextResponse.json(
        { error: 'Failed to complete AI run or extract summary' },
        { status: 500 }
      );
    }
  }
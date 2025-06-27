// app/api/feedback/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // assumes you have a prisma client in lib/db.ts

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, rating } = body;

    const feedback = await db.feedback.create({
      data: { message, rating },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('[FEEDBACK_POST_ERROR]', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const feedbacks = await db.feedback.findMany();
    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    console.error('[FEEDBACK_GET_ERROR]', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
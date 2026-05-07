import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { prisma } from '@speakwise/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ClerkUserData {
  id: string;
  email_addresses?: Array<{ email_address: string }>;
  first_name?: string | null;
  last_name?: string | null;
}

interface ClerkEvent {
  type: 'user.created' | 'user.updated' | 'user.deleted';
  data: ClerkUserData;
}

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'no webhook secret' }, { status: 500 });

  const body = await req.text();
  const headers = {
    'svix-id': req.headers.get('svix-id') ?? '',
    'svix-timestamp': req.headers.get('svix-timestamp') ?? '',
    'svix-signature': req.headers.get('svix-signature') ?? '',
  };

  let evt: ClerkEvent;
  try {
    evt = new Webhook(secret).verify(body, headers) as ClerkEvent;
  } catch {
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  const data = evt.data;
  const email = data.email_addresses?.[0]?.email_address ?? `${data.id}@unknown.local`;
  const name = [data.first_name, data.last_name].filter(Boolean).join(' ') || 'Learner';

  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    await prisma.user.upsert({
      where: { clerkUserId: data.id },
      create: { clerkUserId: data.id, email, name, role: 'learner', nativeLanguage: 'en', targetLanguage: 'it' },
      update: { email, name },
    });
  } else if (evt.type === 'user.deleted') {
    await prisma.user.deleteMany({ where: { clerkUserId: data.id } });
  }

  return NextResponse.json({ ok: true });
}

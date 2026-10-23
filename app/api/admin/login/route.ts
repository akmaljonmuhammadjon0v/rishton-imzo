import { NextResponse } from 'next/server';
import { setAdminSession, verifyAdminPassword } from '@/lib/admin-auth';

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const current = attempts.get(forwarded);
    if (current && current.resetAt > now && current.count >= 10) {
      return NextResponse.json({ success: false, error: 'Urinishlar limiti tugadi. Keyinroq qayta urinib ko‘ring.' }, { status: 429 });
    }
    const nextAttempt = !current || current.resetAt <= now ? { count: 1, resetAt: now + 15 * 60 * 1000 } : { ...current, count: current.count + 1 };
    attempts.set(forwarded, nextAttempt);
    const { password } = await req.json();
    if (verifyAdminPassword(password)) {
      attempts.delete(forwarded);
      const response = NextResponse.json({ success: true });
      setAdminSession(response);
      return response;
    }
    return NextResponse.json({ success: false, error: 'Noto\'g\'ri parol' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

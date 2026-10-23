import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/db';
import { hasAdminSession, unauthorized } from '@/lib/admin-auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const settings = getSettings();
  if (searchParams.get('admin') !== 'true') return NextResponse.json({ prices: settings.prices });
  if (!hasAdminSession(req)) return unauthorized();
  return NextResponse.json({ prices: settings.prices, telegram: { enabled: settings.telegram.enabled, chatId: settings.telegram.chatId, tokenConfigured: Boolean(settings.telegram.botToken) } });
}

export async function POST(req: Request) {
  try {
    if (!hasAdminSession(req)) return unauthorized();
    const body = await req.json();
    const current = getSettings();
    const updated = { ...current };
    if (body.prices !== undefined) {
      const keys = ['thermo78', 'engelberg76', 'trio60', 'slidingBalcony'] as const;
      if (!body.prices || keys.some((key) => !Number.isFinite(body.prices[key]) || body.prices[key] <= 0 || body.prices[key] > 1_000_000_000)) {
        return NextResponse.json({ error: 'Narxlar noto‘g‘ri' }, { status: 400 });
      }
      updated.prices = Object.fromEntries(keys.map((key) => [key, body.prices[key]])) as typeof current.prices;
    }
    if (body.telegram !== undefined) {
      const telegram = body.telegram;
      if (typeof telegram.enabled !== 'boolean' || typeof telegram.chatId !== 'string' || (telegram.botToken !== undefined && typeof telegram.botToken !== 'string')) {
        return NextResponse.json({ error: 'Telegram sozlamalari noto‘g‘ri' }, { status: 400 });
      }
      updated.telegram = { enabled: telegram.enabled, chatId: telegram.chatId.trim().slice(0, 128), botToken: telegram.botToken?.trim() || current.telegram.botToken };
    }

    saveSettings(updated);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

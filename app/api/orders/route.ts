import { NextResponse } from 'next/server';
import { getOrders, saveOrders, Order } from '@/lib/db';
import { sendTelegramNotification } from '@/lib/telegram';
import { hasAdminSession, unauthorized } from '@/lib/admin-auth';
import { randomUUID } from 'crypto';

const recentSubmissions = new Map<string, number[]>();

export async function GET(req: Request) {
  if (!hasAdminSession(req)) return unauthorized();
  const orders = getOrders();
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const digits = phone.replace(/\D/g, '');
    if (name.length < 2 || name.length > 100 || digits.length < 9 || digits.length > 15) {
      return NextResponse.json({ error: 'Ism yoki telefon raqami noto‘g‘ri' }, { status: 400 });
    }
    const address = typeof body.address === 'string' ? body.address.trim().slice(0, 300) : '';
    const source = typeof body.source === 'string' ? body.source.trim().slice(0, 100) : 'Veb-sayt';
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    const timestamps = (recentSubmissions.get(ip) || []).filter((timestamp) => now - timestamp < 60 * 60 * 1000);
    if (timestamps.length >= 10) return NextResponse.json({ error: 'Juda ko‘p ariza yuborildi. Keyinroq qayta urinib ko‘ring.' }, { status: 429 });
    timestamps.push(now);
    recentSubmissions.set(ip, timestamps);

    const orders = getOrders();

    const newOrder: Order = {
      id: 'ORD-' + randomUUID(),
      date: new Date().toISOString(),
      name,
      phone,
      address,
      productDetails: body.productDetails && typeof body.productDetails === 'object' ? {
        type: typeof body.productDetails.type === 'string' ? body.productDetails.type.slice(0, 120) : undefined,
        profile: typeof body.productDetails.profile === 'string' ? body.productDetails.profile.slice(0, 120) : undefined,
        dimensions: typeof body.productDetails.dimensions === 'string' ? body.productDetails.dimensions.slice(0, 80) : undefined,
        color: typeof body.productDetails.color === 'string' ? body.productDetails.color.slice(0, 80) : undefined,
        estimatedPrice: Number.isFinite(body.productDetails.estimatedPrice) && body.productDetails.estimatedPrice >= 0 ? Math.min(body.productDetails.estimatedPrice, 1_000_000_000) : undefined,
      } : undefined,
      status: 'Yangi',
      source: source || 'Veb-sayt',
    };

    orders.unshift(newOrder);
    saveOrders(orders);

    // Wait for the notification so serverless hosts do not stop the work after returning.
    await sendTelegramNotification(newOrder);

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

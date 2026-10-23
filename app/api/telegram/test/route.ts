import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram';
import { Order } from '@/lib/db';
import { hasAdminSession, unauthorized } from '@/lib/admin-auth';

export async function POST(req: Request) {
  if (!hasAdminSession(req)) return unauthorized();
  const testOrder: Order = {
    id: 'TEST-' + Math.floor(100 + Math.random() * 900),
    date: new Date().toISOString(),
    name: 'Test Buyurtmachi (Admin Panel)',
    phone: '+998 (90) 123-45-67',
    address: 'Rishton filiali (Test)',
    productDetails: {
      type: '2-Taqali Rom',
      profile: 'thermo78',
      dimensions: '1400x1500 mm',
      color: 'Antratsit',
      estimatedPrice: 2450000,
    },
    status: 'Yangi',
    source: 'Telegram Bot Tekshiruvi',
  };

  const result = await sendTelegramNotification(testOrder);
  return NextResponse.json(result);
}

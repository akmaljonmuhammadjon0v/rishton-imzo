import { NextResponse } from 'next/server';
import { getOrders, saveOrders } from '@/lib/db';
import { hasAdminSession, unauthorized } from '@/lib/admin-auth';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!hasAdminSession(req)) return unauthorized();
    const { id } = params;
    const body = await req.json();
    const allowedStatuses = ['Yangi', 'Bog\'lanildi', 'O\'lchandi', 'Bajarildi', 'Bekor qilindi'];
    if (!body || Object.keys(body).length !== 1 || !allowedStatuses.includes(body.status)) {
      return NextResponse.json({ error: 'Holat noto‘g‘ri' }, { status: 400 });
    }
    const orders = getOrders();

    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Buyurtma topilmadi' }, { status: 404 });
    }

    orders[index] = { ...orders[index], status: body.status };
    saveOrders(orders);

    return NextResponse.json({ success: true, order: orders[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

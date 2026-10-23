import { Order, getSettings } from './db';

export async function sendTelegramNotification(order: Order) {
  const settings = getSettings();
  if (!settings.telegram?.enabled || !settings.telegram?.botToken || !settings.telegram?.chatId) {
    return { success: false, reason: 'Telegram faollashtirilmagan yoki sozlanmagan' };
  }

  const { botToken, chatId } = settings.telegram;
  const priceFormatted = order.productDetails?.estimatedPrice
    ? order.productDetails.estimatedPrice.toLocaleString('uz-UZ') + ' so\'m'
    : 'Kelishiladi';

  const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const text = `
🏢 <b>YANGI BUYURTMA / ARIZA - IMZO RISHTON</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Mijoz:</b> ${escapeHtml(order.name)}
📞 <b>Telefon:</b> ${escapeHtml(order.phone)}
📍 <b>Manzil:</b> ${escapeHtml(order.address || 'Kiritilmagan')}

🪟 <b>Mahsulot:</b> ${escapeHtml(order.productDetails?.type || 'Rom/Eshik')}
📐 <b>O'lchami:</b> ${escapeHtml(order.productDetails?.dimensions || '-')}
🎨 <b>Rangi:</b> ${escapeHtml(order.productDetails?.color || '-')}
💰 <b>Hisoblangan narx:</b> ${priceFormatted}

📌 <b>Manba:</b> ${escapeHtml(order.source || 'Veb-sayt')}
⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}
━━━━━━━━━━━━━━━━━━━━
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });
    const result = await response.json();
    return { success: response.ok && result.ok, result, error: response.ok ? undefined : 'Telegram API so‘rovni rad etdi' };
  } catch (error: any) {
    console.error('Telegram send error:', error);
    return { success: false, error: error.message };
  }
}

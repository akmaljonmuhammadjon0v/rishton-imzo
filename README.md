# IMZO Rishton

Rishton filialining Next.js sayti: mahsulot katalogi, kalkulyator, ariza qabul qilish va admin panel.

## Ishga tushirish

1. Node.js LTS va npm o‘rnating.
2. `.env.example` faylidan `.env.local` yarating. `ADMIN_PASSWORD` va kamida 32 belgili tasodifiy `ADMIN_SESSION_SECRET` qiymatlarini belgilang.
3. `npm install` va `npm run dev` buyrug‘ini bajaring.
4. Sayt `http://localhost:3000`, boshqaruv paneli `/admin` manzilida ochiladi.

Telegram xabarnomasi admin panelidagi Telegram bo‘limidan sozlanadi. Bot tokeni serverdagi sozlamada saqlanadi va API javoblarida qaytarilmaydi.

## Ishlab chiqarish muhiti

`npm run build` va `npm start` ishlating. `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` va `DATA_DIR` ni hosting muhitida sozlang. `DATA_DIR` doimiy saqlanadigan, ilovaga yozish mumkin bo‘lgan diskka yo‘naltirilishi shart; konteynerning vaqtinchalik fayl tizimidan foydalanmang. `data/orders.json` va `data/settings.json` mijoz ma’lumotlari va Telegram sirlarini saqlaydi: zaxira nusxasini himoyalangan joyda saqlang, repozitoriyga qo‘shmang.

JSON fayl saqlash bitta Node.js nusxasidagi kichik hajmli foydalanish uchun mo‘ljallangan. Bir nechta server nusxasi yoki yuqori trafik kerak bo‘lsa, `lib/db.ts` ni tranzaksiyali PostgreSQL kabi umumiy ma’lumotlar bazasiga almashtirish kerak.

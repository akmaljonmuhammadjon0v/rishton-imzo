import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'IMZO Rishton Filiali - Rom va Eshiklar Zavodi Rasmiy Dileri',
  description:
    'Rishtondagi rasmiy IMZO dilerlik filiali. Plastik va alyuminiy romlar, eshiklar, fasad vitrajlari. 10 yillik zavod kafolati, bepul o\'lchash va yetkazib berish.',
  keywords: 'Imzo Rishton, Rom va Eshiklar, Imzo Akfa, Thermo 78, Engelberg, Farg\'ona romlar, Plastik rom narxlari',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="scroll-smooth">
      <body className="bg-[#080d15] text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white">
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}

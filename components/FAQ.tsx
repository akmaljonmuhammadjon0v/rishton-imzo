'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
	{
		q: "Rishton bo'yicha o'lchash xizmati rostdan ham bepulmi?",
		a: "Ha, mutlaqo bepul! Siz saytdan yoki telefon orqali ariza qoldirasiz. Mutaxassisimiz belgilangan vaqtda Rishtondagi xonadoningizga borib, professional lazerli asboblar bilan o'lcham oladi, kataloglarni ko'rsatadi va smeta hisoblab beradi. Bu sizga hech qanday majburiyat yuklamaydi.",
	},
	{
		q: "Buyurtma necha kunda tayyor bo'ladi va yetkaziladi?",
		a: "Buyurtma qabul qilingach va tasdiqlangach, IMZO ning avtomatlashtirilgan nemis zavodida 5-7 ish kuni ichida tayyorlanadi. So'ng to'g'ridan-to'g'ri maxsus transportda uyingizga yetkazilib, professional brigada tomonidan 1 kunda o'rnatib beriladi.",
	},
	{
		q: "Muddatli to'lov (Nasiya / bo'lib to'lash) mavjudmi?",
		a: "Ha! &quot;Imzo&quot; shourum Rishton filialimizda qulay muddatli to'lov imkoniyati mavjud. Boshlang'ich to'lovsiz, pasport orqali 3 oydan 24 oygacha bo'lib to'lashga rasmiylashtirib beramiz. Oylik to'lovni kalkulyatorda hisoblab ko'rishingiz mumkin.",
	},
	{
		q: 'Rasmiy zavod kafolati necha yil?',
		a: "IMZO profillariga zavod tomonidan 10 yillik rasmiy kafolat sertifikati beriladi. Germaniyaning Maco va Roto furnituralari 100 000 martagacha ochilib-yopilish sinovidan o'tgan. Shuningdek, o'rnatish ishlariga ham filialimiz kafolati taqdim etiladi.",
	},
	{
		q: "Rishton tumanidan tashqariga (Bag'dod, Buvayda, Oltiariq) ham borasizlarmi?",
		a: "Albatta! Rishton tumani bilan birga unga yondosh Bag'dod, Buvayda, Oltiariq tumanlari hamda Farg'ona viloyatining istalgan hududiga o'lchovchilarimiz va yetkazib berish xizmatimiz yetib boradi.",
	},
	{
		q: "Profil original IMZO ekanligini qanday tekshirsa bo'ladi?",
		a: "Har bir profilimiz zavodning maxsus himoya plyonkasi, seriya raqami va shtrix-kodiga ega bo'ladi. O'rnatilgandan so'ng sizga zavod kafolat pasporti rasmiy muhr bilan topshiriladi.",
	},
];

export default function FAQ() {
	const [openIdx, setOpenIdx] = useState<number | null>(0);

	const toggle = (idx: number) => {
		setOpenIdx(openIdx === idx ? null : idx);
	};

	return (
		<section id='faq' className='py-20 bg-[#060a11] relative'>
			<div className='max-w-4xl mx-auto px-4'>
				{/* Header */}
				<div className='text-center mb-12 space-y-3'>
					<div className='inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest'>
						<HelpCircle className='w-4 h-4' />
						<span>Ko&apos;p Beriladigan Savollar</span>
					</div>
					<h2 className='font-outfit text-3xl sm:text-4xl font-extrabold text-white'>
						Eng Muhim{' '}
						<span className='bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
							Savollarga Javoblar
						</span>
					</h2>
					<p className='text-slate-400 text-xs sm:text-sm'>
						Mijozlarimiz tomonidan eng ko&apos;p beriladigan savollar va
						batafsil tushuntirishlar
					</p>
				</div>

				{/* Accordion List */}
				<div className='space-y-3.5'>
					{faqs.map((faq, idx) => {
						const isOpen = openIdx === idx;
						return (
							<div
								key={idx}
								className='bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 rounded-2xl overflow-hidden backdrop-blur-xl transition-all'
							>
								<button
									type='button'
									onClick={() => toggle(idx)}
									className='w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4'
								>
									<span className='font-outfit font-bold text-sm sm:text-base text-white'>
										{faq.q}
									</span>
									<div
										className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-cyan-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-cyan-500/10' : ''}`}
									>
										<ChevronDown className='w-4 h-4' />
									</div>
								</button>

								{isOpen && (
									<div className='px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-300'>
										{faq.a}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

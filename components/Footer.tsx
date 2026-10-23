'use client';

import React, { useEffect, useState } from 'react';

export default function Footer() {
	const [year, setYear] = useState<number | string>('2026');

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<footer className='bg-[#05080e] border-t border-white/10 pt-16 pb-8 text-xs text-slate-400'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10'>
					{/* Brand */}
					<div className='md:col-span-2 space-y-4'>
						<div className='flex items-center gap-3'>
							<div className='bg-linear-to-r from-blue-600 to-cyan-500 text-white font-black font-outfit text-lg px-2.5 py-1 rounded-lg'>
								IMZO
							</div>
							<div className='flex flex-col'>
								<span className='font-outfit font-extrabold text-base text-white tracking-wider'>
									RISHTON
								</span>
								<span className='text-[9px] font-bold text-amber-400 tracking-widest'>
									RASMIY DILER
								</span>
							</div>
						</div>
						<p className='text-slate-400 max-w-sm leading-relaxed'>
							&quot;Imzo&quot; shourum Rishton — rom va eshiklar zavodining
							rasmiy dilerlik filiali. 10 yillik rasmiy kafolat, nemis
							furniturasi va sifatli o&apos;rnatish.
						</p>
						<div className='text-xs text-slate-300 space-y-1 pt-1'>
							<div>
								📍 Manzil:{' '}
								<span className='text-cyan-400'>97H5+FM9, Rishton</span>
							</div>
							<div>
								📞 Tel:{' '}
								<a
									href='tel:+998903816666'
									className='text-white hover:text-cyan-400 font-bold'
								>
									+998 (90) 381-66-66
								</a>
							</div>
							<div>
								✈️ Telegram:{' '}
								<a
									href='https://t.me/imzorishton'
									target='_blank'
									rel='noreferrer'
									className='text-cyan-400 hover:underline'
								>
									@imzorishton
								</a>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div className='space-y-3'>
						<h4 className='font-outfit font-bold text-sm text-white'>
							Bo&apos;limlar
						</h4>
						<div className='flex flex-col space-y-2'>
							<a href='#hero' className='hover:text-cyan-400 transition-colors'>
								Bosh sahifa
							</a>
							<a
								href='#calculator'
								className='hover:text-cyan-400 transition-colors'
							>
								Kalkulyator
							</a>
							<a
								href='#catalog'
								className='hover:text-cyan-400 transition-colors'
							>
								Katalog
							</a>
							<a
								href='#advantages'
								className='hover:text-cyan-400 transition-colors'
							>
								Afzalliklar
							</a>
							<a
								href='#contact'
								className='hover:text-cyan-400 transition-colors'
							>
								Aloqa
							</a>
						</div>
					</div>

					{/* Profiles */}
					<div className='space-y-3'>
						<h4 className='font-outfit font-bold text-sm text-white'>
							Mahsulotlar
						</h4>
						<div className='flex flex-col space-y-2'>
							<a
								href='#calculator'
								className='hover:text-cyan-400 transition-colors'
							>
								IMZO Thermo 78
							</a>
							<a
								href='#calculator'
								className='hover:text-cyan-400 transition-colors'
							>
								Engelberg 76 PVX
							</a>
							<a
								href='#calculator'
								className='hover:text-cyan-400 transition-colors'
							>
								IMZO Trio 60
							</a>
							<a
								href='#calculator'
								className='hover:text-cyan-400 transition-colors'
							>
								Smart Sliding Vitraj
							</a>
							<a
								href='/admin'
								className='text-slate-600 hover:text-slate-400 transition-colors pt-2'
							>
								Admin Panel &rarr;
							</a>
						</div>
					</div>
				</div>

				{/* Bottom */}
				<div className='pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500'>
					<div>
						© {year} IMZO Rishton Filiali. Barcha huquqlar himoyalangan.
					</div>
					<div className='text-amber-400/80 font-medium'>
						IMZO Official Dealer System
					</div>
				</div>
			</div>
		</footer>
	);
}

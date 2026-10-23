'use client';

import React, { useState } from 'react';
import { MapPin, Clock, Phone, Send, Ruler, Menu, X } from 'lucide-react';

interface NavbarProps {
	onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			{/* Top Notification Bar */}
			<div className='bg-[#05080e] border-b border-white/5 py-2 text-xs text-slate-400'>
				<div className='max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2'>
					<div className='flex items-center gap-4 flex-wrap justify-center'>
						<span className='flex items-center gap-1.5'>
							<MapPin className='w-3.5 h-3.5 text-cyan-400' />
							97H5+FM9, Rishton, Farg&apos;ona Viloyati
						</span>
						<span className='hidden sm:inline text-slate-600'>|</span>
						<span className='flex items-center gap-1.5'>
							<Clock className='w-3.5 h-3.5 text-cyan-400' />
							Har kuni: 08:30 - 00:00 (Ochiq)
						</span>
					</div>
					<div className='flex items-center gap-4'>
						<a
							href='tel:+998903816666'
							className='flex items-center gap-1.5 text-white font-semibold hover:text-cyan-400 transition-colors'
						>
							<Phone className='w-3.5 h-3.5 text-cyan-400' />
							+998 (90) 381-66-66
						</a>
						<a
							href='https://t.me/imzorishton'
							target='_blank'
							rel='noreferrer'
							className='flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors'
						>
							<Send className='w-3.5 h-3.5' />
							Telegram (@imzorishton)
						</a>
					</div>
				</div>
			</div>

			{/* Main Sticky Navbar */}
			<header className='sticky top-0 z-50 bg-imzo-dark/90 backdrop-blur-xl border-b border-white/10'>
				<div className='max-w-7xl mx-auto px-4 h-20 flex items-center justify-between'>
					{/* Logo */}
					<a href='#' className='flex items-center gap-3 group'>
						<div className='bg-linear-to-r from-blue-600 to-cyan-500 text-white font-black font-outfit text-xl px-3 py-1.5 rounded-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform'>
							IMZO
						</div>
						<div className='flex flex-col'>
							<span className='font-outfit font-extrabold text-lg text-white tracking-wider leading-none'>
								RISHTON
							</span>
							<span className='text-[10px] font-bold text-amber-400 tracking-widest mt-1'>
								RASMIY DILER
							</span>
						</div>
					</a>

					{/* Desktop Nav Links */}
					<nav className='hidden md:flex items-center gap-8'>
						<a
							href='#hero'
							className='text-sm font-medium text-slate-300 hover:text-white transition-colors'
						>
							Bosh sahifa
						</a>
						<a
							href='#calculator'
							className='text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors'
						>
							Kalkulyator
						</a>
						<a
							href='#catalog'
							className='text-sm font-medium text-slate-300 hover:text-white transition-colors'
						>
							Katalog
						</a>
						<a
							href='#advantages'
							className='text-sm font-medium text-slate-300 hover:text-white transition-colors'
						>
							Afzalliklar
						</a>
						<a
							href='#gallery'
							className='text-sm font-medium text-slate-300 hover:text-white transition-colors'
						>
							Ishlarimiz
						</a>
						<a
							href='#reviews'
							className='text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1'
						>
							<span>Sharhlar</span>
							<span className='text-[10px] bg-amber-400/20 text-amber-400 px-1.5 py-0.5 rounded font-bold'>
								5.0★
							</span>
						</a>
						<a
							href='#faq'
							className='text-sm font-medium text-slate-300 hover:text-white transition-colors'
						>
							Savollar (FAQ)
						</a>
						<a
							href='#contact'
							className='text-sm font-medium text-slate-300 hover:text-white transition-colors'
						>
							Aloqa
						</a>
					</nav>

					{/* CTA & Mobile Toggle */}
					<div className='flex items-center gap-4'>
						<button
							onClick={onOpenModal}
							className='hidden sm:inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all'
						>
							<Ruler className='w-4 h-4' />
							<span>Bepul O&apos;lchov Olish</span>
						</button>

						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg'
							aria-label='Toggle Menu'
						>
							{mobileMenuOpen ? (
								<X className='w-6 h-6' />
							) : (
								<Menu className='w-6 h-6' />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Dropdown Menu */}
				{mobileMenuOpen && (
					<div className='md:hidden bg-[#0a101a] border-b border-white/10 px-6 py-6 space-y-4'>
						<a
							href='#hero'
							onClick={() => setMobileMenuOpen(false)}
							className='block text-slate-200 hover:text-cyan-400 font-medium py-1'
						>
							Bosh sahifa
						</a>
						<a
							href='#calculator'
							onClick={() => setMobileMenuOpen(false)}
							className='block text-slate-200 hover:text-cyan-400 font-medium py-1'
						>
							Kalkulyator & Nasiya
						</a>
						<a
							href='#catalog'
							onClick={() => setMobileMenuOpen(false)}
							className='block text-slate-200 hover:text-cyan-400 font-medium py-1'
						>
							Katalog
						</a>
						<a
							href='#advantages'
							onClick={() => setMobileMenuOpen(false)}
							className='block text-slate-200 hover:text-cyan-400 font-medium py-1'
						>
							Afzalliklar
						</a>
						<a
							href='#gallery'
							onClick={() => setMobileMenuOpen(false)}
							className='block text-slate-200 hover:text-cyan-400 font-medium py-1'
						>
							Ishlarimiz
						</a>
						<a
							href='#reviews'
							onClick={() => setMobileMenuOpen(false)}
							className='block text-amber-400 hover:text-amber-300 font-medium py-1'
						>
							Sharhlar (Google 5.0★)
						</a>
						<a
							href='#faq'
							onClick={() => setMobileMenuOpen(false)}
							className='block text-slate-200 hover:text-cyan-400 font-medium py-1'
						>
							Savollar (FAQ)
						</a>
						<a
							href='#contact'
							onClick={() => setMobileMenuOpen(false)}
							className='block text-slate-200 hover:text-cyan-400 font-medium py-1'
						>
							Aloqa
						</a>

						<div className='pt-2'>
							<button
								onClick={() => {
									setMobileMenuOpen(false);
									onOpenModal();
								}}
								className='w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/25'
							>
								<Ruler className='w-4 h-4' />
								<span>Bepul O&apos;lchov Olish</span>
							</button>
						</div>
					</div>
				)}
			</header>
		</>
	);
}

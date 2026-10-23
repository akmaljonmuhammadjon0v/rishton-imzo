'use client';

import React, { useState } from 'react';
import {
	Star,
	MessageSquareQuote,
	CheckCircle,
	ExternalLink,
	ThumbsUp,
	Plus,
} from 'lucide-react';

interface Review {
	id: string;
	name: string;
	avatar: string;
	rating: number;
	date: string;
	badge?: string;
	comment: string;
	source: string;
	likes: number;
}

const initialReviews: Review[] = [
	{
		id: '1',
		name: 'UzTelefon',
		avatar: 'UT',
		rating: 5,
		date: '4 oy oldin',
		badge: '11 ta sharh · 4 ta rasm',
		comment:
			"Juda ham ajoyib! Romlar juda sifatli va usta akalar o'rnatishni tez, saranjom qilib berishdi. Rishtonda bunday shou-rum borligi ancha qulay bo'ldi.",
		source: 'Google Xaritalar',
		likes: 8,
	},
	{
		id: '2',
		name: 'Salom (Mijoz)',
		avatar: 'S',
		rating: 5,
		date: '4 oy oldin',
		badge: 'Mahalliy xaridor',
		comment:
			"Imzo Thermo 78 vitraj romlarini buyurtma qilgandik. Issiqlikni saqlashi va shovqin to'sishi kutganimizdan ham a'lo darajada bo'ldi. Tavsiya qilaman!",
		source: 'Google Xaritalar',
		likes: 5,
	},
	{
		id: '3',
		name: 'Qodirali M.',
		avatar: 'QM',
		rating: 5,
		date: '2 oy oldin',
		badge: 'Rishton markaz, Hovli uy',
		comment:
			"O'lchovchi chaqirganimizdan keyin o'sha kuniyoq kelib o'lchab berishdi. Butun uyga Engelberg 76 qo'ydik, juda pishiq va chiroyli chiqdi.",
		source: 'Rasmiy filial arizasi',
		likes: 3,
	},
];

export default function Reviews() {
	const [reviews, setReviews] = useState<Review[]>(initialReviews);
	const [modalOpen, setModalOpen] = useState(false);
	const [name, setName] = useState('');
	const [comment, setComment] = useState('');
	const [rating, setRating] = useState(5);
	const [submitted, setSubmitted] = useState(false);

	const handleAddReview = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !comment) return;

		const newRev: Review = {
			id: Date.now().toString(),
			name,
			avatar: name.slice(0, 2).toUpperCase(),
			rating,
			date: 'Hozirgina',
			badge: 'Yangi sharh',
			comment,
			source: 'Sayt orqali',
			likes: 1,
		};

		setReviews([newRev, ...reviews]);
		setSubmitted(true);
		setTimeout(() => {
			setSubmitted(false);
			setModalOpen(false);
			setName('');
			setComment('');
		}, 1800);
	};

	return (
		<section
			id='reviews'
			className='py-20 bg-[#070b13] relative overflow-hidden'
		>
			<div className='max-w-7xl mx-auto px-4'>
				{/* Section Header */}
				<div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
					<div>
						<div className='inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3'>
							<MessageSquareQuote className='w-4 h-4' />
							<span>Haqiqiy Mijozlar Fikrlari</span>
						</div>
						<h2 className='font-outfit text-3xl sm:text-4xl font-extrabold text-white'>
							Google Xaritalar & Mijozlarimiz{' '}
							<span className='bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
								Bahosi: 5.0 ★
							</span>
						</h2>
						<p className='text-slate-400 text-sm mt-2 max-w-xl'>
							&quot;Imzo&quot; shourum Rishton filialining Google Xaritalardagi
							real reytingi va xonadonlariga rom o&apos;rnatgan mijozlar
							sharhlari.
						</p>
					</div>

					{/* Google Trust Rating Badge */}
					<div className='flex items-center gap-3 bg-slate-900/90 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-md'>
						<div className='w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex flex-col items-center justify-center'>
							<span className='font-outfit font-black text-amber-400 text-lg leading-none'>
								5.0
							</span>
							<div className='flex text-amber-400 text-[9px] mt-0.5'>
								{'★'.repeat(5)}
							</div>
						</div>
						<div className='text-xs'>
							<div className='font-bold text-white flex items-center gap-1.5'>
								Google Xaritalar
								<CheckCircle className='w-3.5 h-3.5 text-emerald-400' />
							</div>
							<div className='text-slate-400 text-[11px] mt-0.5'>
								100% ijobiy sharhlar (5.0 reyting)
							</div>
							<a
								href='https://www.google.com/maps/search/?api=1&query=97H5%2BFM9%2C+Rishton%2C+Farg%27ona+Viloyati%2C+O%CA%BBzbekiston'
								target='_blank'
								rel='noreferrer'
								className='text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 mt-1 text-[11px]'
							>
								<span>Xaritada ko&apos;rish</span>
								<ExternalLink className='w-3 h-3' />
							</a>
						</div>
					</div>
				</div>

				{/* Reviews Grid */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
					{reviews.map(rev => (
						<div
							key={rev.id}
							className='bg-slate-900/70 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1'
						>
							<div className='space-y-4'>
								{/* User Row */}
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 rounded-full bg-linear-to-tr from-blue-600 to-cyan-500 font-bold text-white text-xs flex items-center justify-center shadow-md'>
											{rev.avatar}
										</div>
										<div>
											<h4 className='font-outfit font-bold text-sm text-white'>
												{rev.name}
											</h4>
											<div className='text-[11px] text-slate-400'>
												{rev.date}
											</div>
										</div>
									</div>
									<span className='text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20'>
										{rev.source}
									</span>
								</div>

								{/* Stars */}
								<div className='flex items-center gap-1 text-amber-400'>
									{Array.from({ length: rev.rating }).map((_, i) => (
										<Star
											key={i}
											className='w-4 h-4 fill-amber-400 text-amber-400'
										/>
									))}
									{rev.badge && (
										<span className='ml-2 text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded'>
											{rev.badge}
										</span>
									)}
								</div>

								{/* Comment Text */}
								<p className='text-xs sm:text-sm text-slate-300 leading-relaxed italic'>
									&quot;{rev.comment}&quot;
								</p>
							</div>

							{/* Bottom Likes */}
							<div className='pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400'>
								<span className='flex items-center gap-1.5 text-emerald-400 font-medium'>
									<CheckCircle className='w-3.5 h-3.5' />
									Tasdiqlangan xaridor
								</span>
								<span className='flex items-center gap-1 text-slate-400'>
									<ThumbsUp className='w-3.5 h-3.5' />
									{rev.likes}
								</span>
							</div>
						</div>
					))}
				</div>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
					<button
						onClick={() => setModalOpen(true)}
						className='inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition'
					>
						<Plus className='w-4 h-4' />
						<span>Sharh Qoldirish</span>
					</button>

					<a
						href='https://www.google.com/maps/search/?api=1&query=97H5%2BFM9%2C+Rishton%2C+Farg%27ona+Viloyati%2C+O%CA%BBzbekiston'
						target='_blank'
						rel='noreferrer'
						className='inline-flex items-center gap-2 bg-slate-900 border border-white/10 hover:border-cyan-400/40 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition'
					>
						<ExternalLink className='w-4 h-4 text-cyan-400' />
						<span>Google Xaritalarda Barcha Sharhlarni Ko&apos;rish</span>
					</a>
				</div>
			</div>

			{/* Review Submission Modal */}
			{modalOpen && (
				<div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4'>
					<div className='w-full max-w-md bg-slate-900 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative'>
						<h3 className='font-outfit font-bold text-xl text-white mb-2'>
							Fikringizni Qoldiring
						</h3>
						<p className='text-xs text-slate-400 mb-5'>
							Rishton filiali xizmati haqidagi fikringiz boshqa xaridorlar uchun
							juda muhim!
						</p>

						{submitted ? (
							<div className='py-8 text-center space-y-2'>
								<CheckCircle className='w-12 h-12 text-emerald-400 mx-auto' />
								<h4 className='font-bold text-white text-lg'>Katta Rahmat!</h4>
								<p className='text-xs text-slate-300'>
									Sharhingiz muvaffaqiyatli qo&apos;shildi.
								</p>
							</div>
						) : (
							<form onSubmit={handleAddReview} className='space-y-4'>
								<div>
									<label className='block text-xs font-bold text-slate-300 mb-1'>
										Ismingiz:
									</label>
									<input
										type='text'
										required
										value={name}
										onChange={e => setName(e.target.value)}
										placeholder='Masalan: Sardorbek'
										className='w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400'
									/>
								</div>

								<div>
									<label className='block text-xs font-bold text-slate-300 mb-1'>
										Baho bering:
									</label>
									<div className='flex gap-2'>
										{[1, 2, 3, 4, 5].map(star => (
											<button
												key={star}
												type='button'
												onClick={() => setRating(star)}
												className='text-amber-400 p-1'
											>
												<Star
													className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-600'}`}
												/>
											</button>
										))}
									</div>
								</div>

								<div>
									<label className='block text-xs font-bold text-slate-300 mb-1'>
										Fikringiz:
									</label>
									<textarea
										required
										rows={3}
										value={comment}
										onChange={e => setComment(e.target.value)}
										placeholder="Romlar sifati va o'rnatish haqida fikringizni yozing..."
										className='w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-400'
									/>
								</div>

								<div className='flex gap-3 pt-2'>
									<button
										type='button'
										onClick={() => setModalOpen(false)}
										className='flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold py-2.5 rounded-xl'
									>
										Bekor qilish
									</button>
									<button
										type='submit'
										className='flex-1 bg-linear-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold py-2.5 rounded-xl shadow-lg'
									>
										Yuborish
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			)}
		</section>
	);
}

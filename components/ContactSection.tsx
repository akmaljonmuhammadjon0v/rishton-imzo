'use client';

import React, { useState } from 'react';
import {
	MessageSquare,
	Send,
	MapPin,
	PhoneCall,
	Clock,
	CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('+998 ');
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch('/api/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					phone,
					address,
					source: 'Aloqa formasi (Bosh sahifa)',
				}),
			});

			if (res.ok) {
				confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
				setSubmitted(true);
				setName('');
				setPhone('+998 ');
				setAddress('');
				setSubmitError('');
			} else {
				const data = await res.json().catch(() => ({}));
				setSubmitError(data.error || 'Arizani yuborib bo‘lmadi. Qayta urinib ko‘ring.');
			}
		} catch {
			setSubmitError('Server bilan bog‘lanib bo‘lmadi. Internetni tekshirib, qayta urinib ko‘ring.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<section id='contact' className='py-20 bg-[#060a11] relative'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='bg-slate-900/90 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-2xl'>
					<div className='grid grid-cols-1 lg:grid-cols-12'>
						{/* Form Side (7 cols) */}
						<div className='lg:col-span-7 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10'>
							<div className='inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3'>
								<MessageSquare className='w-4 h-4' />
								<span>Bepul Konsultatsiya</span>
							</div>
							<h2 className='font-outfit text-3xl sm:text-4xl font-extrabold text-white mb-3'>
								Savolingiz Bormi?{' '}
								<span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
									Biz Bilan Bog&apos;laning
								</span>
							</h2>
							<p className='text-slate-400 text-sm mb-8'>
								Raqamingizni qoldiring, Rishton filiali mutaxassisi 5 daqiqa
								ichida sizga qo&apos;ng&apos;iroq qiladi va maslahat beradi.
							</p>

							{submitted ? (
								<div className='bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2'>
									<CheckCircle2 className='w-10 h-10 text-emerald-400 mx-auto' />
									<h4 className='font-outfit font-bold text-lg text-white'>
										Arizangiz Qabul Qilindi!
									</h4>
									<p className='text-xs text-slate-300'>
										Mutaxassisimiz tez orada ko&apos;rsatilgan raqam bilan
										bog&apos;lanadi.
									</p>
									<button
										onClick={() => setSubmitted(false)}
										className='mt-3 text-xs text-cyan-400 font-bold underline'
									>
										Yangi ariza yuborish
									</button>
								</div>
							) : (
								<form onSubmit={handleSubmit} className='space-y-4'>
									{submitError && <p role='alert' className='text-sm text-rose-400'>{submitError}</p>}
									<div>
										<label className='block text-xs font-bold text-slate-300 mb-1.5'>
											Ismingiz:
										</label>
										<input
											type='text'
											required
											value={name}
											onChange={e => setName(e.target.value)}
											placeholder='Masalan: Sardorbek'
											className='w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition'
										/>
									</div>

									<div>
										<label className='block text-xs font-bold text-slate-300 mb-1.5'>
											Telefon Raqamingiz:
										</label>
										<input
											type='tel'
											required
											value={phone}
											onChange={e => setPhone(e.target.value)}
											className='w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition'
										/>
									</div>

									<div>
										<label className='block text-xs font-bold text-slate-300 mb-1.5'>
											Manzilingiz (Rishton hududida):
										</label>
										<input
											type='text'
											value={address}
											onChange={e => setAddress(e.target.value)}
											placeholder='Masalan: Rishton markaz, 12-maktab yonida'
											className='w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition'
										/>
									</div>

									<button
										type='submit'
										disabled={loading}
										className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all text-sm'
									>
										<Send className='w-4 h-4' />
										<span>
											{loading ? 'Yuborilmoqda...' : 'Ariza Yuborish'}
										</span>
									</button>
								</form>
							)}
						</div>

						{/* Info Side (5 cols) */}
						<div className='lg:col-span-5 p-8 sm:p-12 bg-black/30 flex flex-col justify-between space-y-8'>
							<div>
								<h3 className='font-outfit font-bold text-xl text-white mb-6'>
									&quot;Imzo&quot; shourum Rishton
								</h3>

								<div className='space-y-5 text-xs sm:text-sm'>
									<div className='flex items-start gap-3'>
										<div className='w-9 h-9 rounded-lg bg-blue-600/15 text-cyan-400 flex items-center justify-center flex-shrink-0'>
											<MapPin className='w-4 h-4' />
										</div>
										<div>
											<div className='font-bold text-white'>Aniq Manzil (Google Plus Code):</div>
											<div className='text-slate-300 mt-0.5 font-medium'>
												97H5+FM9, Rishton, Farg&apos;ona Viloyati, Oʻzbekiston
											</div>
											<a
												href='https://www.google.com/maps/search/?api=1&query=97H5%2BFM9%2C+Rishton%2C+Farg%27ona+Viloyati%2C+O%CA%BBzbekiston'
												target='_blank'
												rel='noreferrer'
												className='inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 mt-1 font-semibold underline'
											>
												Google Xaritalarda ochish &rarr;
											</a>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='w-9 h-9 rounded-lg bg-blue-600/15 text-cyan-400 flex items-center justify-center flex-shrink-0'>
											<PhoneCall className='w-4 h-4' />
										</div>
										<div>
											<div className='font-bold text-white'>
												Aloqa telefoni:
											</div>
											<div className='text-cyan-400 mt-0.5 font-bold text-base'>
												<a
													href='tel:+998903816666'
													className='block hover:underline'
												>
													+998 (90) 381-66-66
												</a>
											</div>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='w-9 h-9 rounded-lg bg-blue-600/15 text-cyan-400 flex items-center justify-center flex-shrink-0'>
											<Send className='w-4 h-4' />
										</div>
										<div>
											<div className='font-bold text-white'>Telegram kanal & bot:</div>
											<div className='mt-0.5'>
												<a
													href='https://t.me/imzorishton'
													target='_blank'
													rel='noreferrer'
													className='text-cyan-400 font-semibold hover:underline'
												>
													@imzorishton (t.me/imzorishton)
												</a>
											</div>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='w-9 h-9 rounded-lg bg-blue-600/15 text-cyan-400 flex items-center justify-center flex-shrink-0'>
											<Clock className='w-4 h-4' />
										</div>
										<div>
											<div className='font-bold text-white'>Ish tartibi:</div>
											<div className='text-slate-300 mt-0.5'>
												Har kuni dam olishsiz: 08:30 dan 00:00 gacha (Ochiq)
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Map Embed */}
							<div className='h-44 w-full rounded-xl overflow-hidden border border-white/10'>
								<iframe
									title='Imzo shourum Rishton Google Xarita'
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12178.583925760775!2d71.278912!3d40.358212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb9cfc9d2f3d1b%3A0x400b8c6670868f0!2sRishtan%2C%20Fergana%20Region!5e0!3m2!1sen!2suz!4v1700000000000!5m2!1sen!2suz'
									width='100%'
									height='100%'
									style={{ border: 0 }}
									loading='lazy'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

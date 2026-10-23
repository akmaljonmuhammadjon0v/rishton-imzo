'use client';

import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatPrice } from '@/lib/format';

interface MeasurementModalProps {
	isOpen: boolean;
	onClose: () => void;
	initialConfig?: any;
}

export default function MeasurementModal({
	isOpen,
	onClose,
	initialConfig,
}: MeasurementModalProps) {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('+998 ');
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [submitError, setSubmitError] = useState('');

	if (!isOpen) return null;

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
					productDetails: initialConfig,
					source: initialConfig
						? 'Kalkulyator Buyurtmasi'
						: "Bepul O'lchov Arizasi",
				}),
			});

			if (res.ok) {
				confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
				setSuccess(true);
			} else {
				const data = await res.json().catch(() => ({}));
				setSubmitError(
					data.error || 'Arizani yuborib bo‘lmadi. Qayta urinib ko‘ring.',
				);
			}
		} catch {
			setSubmitError(
				'Server bilan bog‘lanib bo‘lmadi. Internetni tekshirib, qayta urinib ko‘ring.',
			);
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setSuccess(false);
		onClose();
	};

	return (
		<div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4'>
			<div className='relative w-full max-w-md bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95'>
				{/* Close Button */}
				<button
					onClick={handleClose}
					className='absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg'
				>
					<X className='w-6 h-6' />
				</button>

				{success ? (
					<div className='py-8 text-center space-y-4'>
						<div className='w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center'>
							<CheckCircle2 className='w-8 h-8' />
						</div>
						<h3 className='font-outfit text-2xl font-bold text-white'>
							Arizangiz Qabul Qilindi!
						</h3>
						<p className='text-xs sm:text-sm text-slate-300 max-w-xs mx-auto'>
							Rishton filiali mutaxassisi tez orada siz bilan bog&apos;lanadi va
							uyingizga bepul o&apos;lchovchimiz tashrif buyuradi.
						</p>
						<button
							onClick={handleClose}
							className='mt-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg'
						>
							Yopish
						</button>
					</div>
				) : (
					<div className='space-y-5'>
						{/* Header */}
						<div className='text-center space-y-1.5'>
							<div className='w-10 h-10 mx-auto rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center mb-2'>
								<Ruler className='w-5 h-5' />
							</div>
							<h3 className='font-outfit text-xl font-extrabold text-white'>
								{initialConfig
									? 'Buyurtmani Tasdiqlash'
									: "Bepul O'lchovchiga Ariza"}
							</h3>
							<p className='text-xs text-slate-400'>
								Mutaxassisimiz Rishtondagi xonadoningizga borib aniq
								o&apos;lcham oladi
							</p>
						</div>

						{/* Selected Config Pill if any */}
						{initialConfig && (
							<div className='bg-black/40 border border-white/10 rounded-xl p-3 text-xs space-y-1'>
								<div className='flex justify-between text-slate-300'>
									<span>Profil:</span>
									<strong className='text-white'>
										{initialConfig.profile}
									</strong>
								</div>
								<div className='flex justify-between text-slate-300'>
									<span>O&apos;lchami:</span>
									<strong className='text-cyan-400 font-outfit'>
										{initialConfig.dimensions}
									</strong>
								</div>
								<div className='flex justify-between text-slate-300'>
									<span>Taxminiy narxi:</span>
									<strong
										suppressHydrationWarning
										className='text-amber-400 font-outfit'
									>
										{formatPrice(initialConfig.estimatedPrice)} so&apos;m
									</strong>
								</div>
							</div>
						)}

						{/* Form */}
						<form onSubmit={handleSubmit} className='space-y-4'>
							{submitError && (
								<p role='alert' className='text-sm text-rose-400'>
									{submitError}
								</p>
							)}
							<div>
								<label className='block text-xs font-bold text-slate-300 mb-1'>
									Ismingiz:
								</label>
								<input
									type='text'
									required
									value={name}
									onChange={e => setName(e.target.value)}
									placeholder='Ismingizni kiriting'
									className='w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none'
								/>
							</div>

							<div>
								<label className='block text-xs font-bold text-slate-300 mb-1'>
									Telefon raqam:
								</label>
								<input
									type='tel'
									required
									value={phone}
									onChange={e => setPhone(e.target.value)}
									className='w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none'
								/>
							</div>

							<div>
								<label className='block text-xs font-bold text-slate-300 mb-1'>
									Manzil yoki Mo&apos;ljal:
								</label>
								<input
									type='text'
									value={address}
									onChange={e => setAddress(e.target.value)}
									placeholder='Masalan: Rishton dehqon bozori orqasi'
									className='w-full bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none'
								/>
							</div>

							<button
								type='submit'
								disabled={loading}
								className='w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/40 transition text-sm'
							>
								<Send className='w-4 h-4' />
								<span>
									{loading ? 'Yuborilmoqda...' : 'Arizani Tasdiqlash'}
								</span>
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
}

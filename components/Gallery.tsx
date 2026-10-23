'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, MapPin, ZoomIn, X } from 'lucide-react';

const galleryItems = [
	{
		img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
		title: 'IMZO Thermo 78 Vitraj',
		location: 'Rishton tumani, Kottej',
	},
	{
		img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
		title: 'Engelberg 76 Antratsit Romlar',
		location: 'Rishton markazi, Hovli uy',
	},
	{
		img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
		title: 'Surma Tizimli Panorama Balcon',
		location: "Buvayda yo'li, 2 qavatli bino",
	},
	{
		img: 'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1200&q=80',
		title: 'Alyuminiy Kirish Eshiklari',
		location: 'Rishton, Savdo Majmuasi',
	},
];

export default function Gallery() {
	const [lightboxImg, setLightboxImg] = useState<string | null>(null);

	return (
		<section id='gallery' className='py-20 bg-imzo-dark relative'>
			<div className='max-w-7xl mx-auto px-4'>
				{/* Header */}
				<div className='text-center max-w-2xl mx-auto mb-12 space-y-3'>
					<div className='inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest'>
						<ImageIcon className='w-4 h-4' />
						<span>Fotogalereya</span>
					</div>
					<h2 className='font-outfit text-3xl sm:text-4xl font-extrabold text-white'>
						Rishtonda Bajarilgan{' '}
						<span className='bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
							Ishlarimiz
						</span>
					</h2>
					<p className='text-slate-400 text-sm sm:text-base'>
						Mijozlarimiz xonadonlari va korxonalari uchun tayyorlab
						o&apos;rnatilgan IMZO romlaridan namunalar
					</p>
				</div>

				{/* Gallery Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{galleryItems.map((item, idx) => (
						<div
							key={idx}
							onClick={() => setLightboxImg(item.img)}
							className='relative h-64 rounded-2xl overflow-hidden border border-white/10 cursor-pointer group shadow-xl'
						>
							<img
								src={item.img}
								alt={item.title}
								className='w-full h-full object-cover group-hover:scale-110 transition duration-500'
							/>
							<div className='absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5'>
								<span className='flex items-center gap-1 text-[11px] text-cyan-400 font-medium'>
									<MapPin className='w-3 h-3' />
									{item.location}
								</span>
								<span className='font-outfit font-bold text-sm text-white mt-0.5'>
									{item.title}
								</span>
								<ZoomIn className='absolute top-4 right-4 text-white w-5 h-5 bg-black/50 p-1 rounded-full' />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Lightbox Modal */}
			{lightboxImg && (
				<div
					onClick={() => setLightboxImg(null)}
					className='fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in'
				>
					<button
						onClick={() => setLightboxImg(null)}
						className='absolute top-6 right-6 text-white/80 hover:text-white p-2'
					>
						<X className='w-8 h-8' />
					</button>
					<img
						src={lightboxImg}
						alt='Kattalashtirilgan rasm'
						className='max-w-4xl max-h-[85vh] w-auto h-auto rounded-xl object-contain shadow-2xl'
					/>
				</div>
			)}
		</section>
	);
}

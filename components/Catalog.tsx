'use client';

import React, { useState } from 'react';
import { Layers, ShieldCheck, Thermometer, Volume2, Check } from 'lucide-react';

interface CatalogProps {
	onSelectProfile: (profileKey: string) => void;
}

const products = [
	{
		id: 'thermo78',
		category: 'thermo',
		tag: 'Premium Top',
		tagColor: 'bg-blue-600 text-white',
		title: 'IMZO Thermo 78',
		desc: 'Termomostli alyuminiy profil tizimi. Panoramik romlar va zamonaviy kottejlar uchun eng yuqori issiqlik izolyatsiyasi.',
		img: 'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&w=700&q=80',
		specs: [
			{ icon: ShieldCheck, text: 'Profil: Termo-Alyuminiy' },
			{ icon: Thermometer, text: 'Issiqlik saqlash: A++ Klass' },
			{ icon: Volume2, text: 'Shovqin bosilishi: 45 dB gacha' },
			{ icon: Check, text: 'Zavod kafolati: 10 Yil' },
		],
		price: "1 450 000 so'm/m²",
	},
	{
		id: 'engelberg76',
		category: 'engelberg',
		tag: 'Nemis Standarti',
		tagColor: 'bg-amber-400 text-black',
		title: 'Engelberg 76',
		desc: '6-kamerali premium PVX profil. Yevropa sifat mezonlariga mos, shovqin va sovuqni xonaga mutlaqo kiritmaydi.',
		img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80',
		specs: [
			{ icon: Layers, text: 'Kameralar: 6 ta kamerali PVX' },
			{ icon: Thermometer, text: 'Issiqlik saqlash: A+ Klass' },
			{ icon: Volume2, text: 'Shovqin bosilishi: 42 dB gacha' },
			{ icon: Check, text: 'Zavod kafolati: 10 Yil' },
		],
		price: "1 150 000 so'm/m²",
	},
	{
		id: 'trio60',
		category: 'trio',
		tag: "Eng Ko'p Sotilgan",
		tagColor: 'bg-emerald-500 text-white',
		title: 'IMZO Trio 60',
		desc: '3-kamerali sifatli PVX profil. Har bir oila uchun qulay narx, chidamlilik va uzoq muddatli zavod kafolati.',
		img: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=700&q=80',
		specs: [
			{ icon: Layers, text: 'Kameralar: 3 ta kamerali PVX' },
			{ icon: Thermometer, text: 'Issiqlik saqlash: Standart' },
			{ icon: Volume2, text: 'Shovqin bosilishi: 38 dB' },
			{ icon: Check, text: 'Zavod kafolati: 7 Yil' },
		],
		price: "850 000 so'm/m²",
	},
	{
		id: 'slidingBalcony',
		category: 'sliding',
		tag: 'Surma Tizim',
		tagColor: 'bg-cyan-500 text-black',
		title: 'IMZO Smart Sliding',
		desc: "Joyni maksimal tejovchi surma alyuminiy va PVX tizim. Balkon, terassa va hovli dahlizlari uchun eng zo'r yechim.",
		img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80',
		specs: [
			{ icon: Layers, text: 'Mexanizm: Surma (Sliding)' },
			{ icon: Thermometer, text: "Maksimal yorug'lik o'tkazishi" },
			{ icon: Volume2, text: 'Shovqin bosilishi: 40 dB' },
			{ icon: Check, text: 'Zavod kafolati: 10 Yil' },
		],
		price: "1 300 000 so'm/m²",
	},
];

export default function Catalog({ onSelectProfile }: CatalogProps) {
	const [activeFilter, setActiveFilter] = useState('all');

	const filtered =
		activeFilter === 'all'
			? products
			: products.filter(p => p.category === activeFilter);

	return (
		<section id='catalog' className='py-20 bg-imzo-dark relative'>
			<div className='max-w-7xl mx-auto px-4'>
				{/* Header */}
				<div className='text-center max-w-2xl mx-auto mb-12 space-y-3'>
					<div className='inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest'>
						<Layers className='w-4 h-4' />
						<span>Mahsulotlar Katalogi</span>
					</div>
					<h2 className='font-outfit text-3xl sm:text-4xl font-extrabold text-white'>
						IMZO Profil va{' '}
						<span className='bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
							Tizimlar Seriyasi
						</span>
					</h2>
					<p className='text-slate-400 text-sm sm:text-base'>
						Har qanday bino va xonadon uchun original zavod rom va eshik
						konstruksiyalari
					</p>
				</div>

				{/* Filter Tabs */}
				<div className='flex justify-center gap-2.5 mb-12 flex-wrap'>
					{[
						{ id: 'all', label: 'Barchasi' },
						{ id: 'thermo', label: 'Thermo Alyuminiy' },
						{ id: 'engelberg', label: 'Engelberg PVX' },
						{ id: 'trio', label: 'Trio Series' },
						{ id: 'sliding', label: 'Surma Tizimlar' },
					].map(tab => (
						<button
							key={tab.id}
							onClick={() => setActiveFilter(tab.id)}
							className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
								activeFilter === tab.id
									? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
									: 'bg-white/4 text-slate-300 hover:text-white hover:bg-white/8 border border-white/10'
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Product Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{filtered.map(item => (
						<div
							key={item.id}
							className='bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group shadow-xl'
						>
							<div>
								{/* Image Wrap */}
								<div className='relative h-48 overflow-hidden'>
									<span
										className={`absolute top-3 left-3 z-10 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${item.tagColor}`}
									>
										{item.tag}
									</span>
									<img
										src={item.img}
										alt={item.title}
										className='w-full h-full object-cover group-hover:scale-105 transition duration-500'
									/>
									<div className='absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent'></div>
								</div>

								{/* Content */}
								<div className='p-5 space-y-3'>
									<h3 className='font-outfit font-bold text-lg text-white group-hover:text-cyan-400 transition-colors'>
										{item.title}
									</h3>
									<p className='text-xs text-slate-400 line-clamp-2'>
										{item.desc}
									</p>

									{/* Specs List */}
									<div className='pt-2 space-y-1.5 text-xs text-slate-300'>
										{item.specs.map((spec, i) => {
											const Icon = spec.icon;
											return (
												<div key={i} className='flex items-center gap-2'>
													<Icon className='w-3.5 h-3.5 text-cyan-400 shrink-0' />
													<span>{spec.text}</span>
												</div>
											);
										})}
									</div>
								</div>
							</div>

							{/* Card Footer */}
							<div className='p-5 pt-3 border-t border-white/10 flex items-center justify-between'>
								<div>
									<div className='text-[10px] text-slate-400 uppercase tracking-wider'>
										Narxi:
									</div>
									<div className='text-xs font-extrabold text-amber-400 font-outfit'>
										{item.price}
									</div>
								</div>

								<button
									onClick={() => onSelectProfile(item.id)}
									className='bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 hover:border-transparent text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all'
								>
									Hisoblash
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

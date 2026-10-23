import React from 'react';
import {
	Award,
	Ruler,
	Factory,
	KeyRound,
	Sparkles,
	Truck,
	PhoneCall,
	Compass,
	Cog,
} from 'lucide-react';

export default function Advantages() {
	const advantages = [
		{
			icon: Ruler,
			title: "Bepul O'lchash Xizmati",
			desc: "Rishton tumani va yaqin hududlar (Bag'dod, Buvayda, Oltiariq) bo'yicha mutaxassisimiz bepul borib o'lchov oladi va katalog taqdim etadi.",
		},
		{
			icon: Factory,
			title: "To'g'ridan-to'g'ri Zavoddan",
			desc: 'IMZO ning zamonaviy robotlashtirilgan nemis dastgohlarida tayyorlangan 100% original sertifikatlangan profillar va oyna paketlari.',
		},
		{
			icon: KeyRound,
			title: 'Germaniya Furniturasi',
			desc: 'Rom va eshiklarimiz Germaniyaning mashhur Maco va Roto qulflash mexanizmlari bilan jihozlanadi (100 000 marta ochilish kafolati).',
		},
		{
			icon: Sparkles,
			title: 'Energiya Tejamkorlik',
			desc: "Xonalarda issiqlikni 45% gacha ko'proq saqlaydi, qishda sovuqni, yozda jazirama issiqni ichkariga kiritmaydi.",
		},
	];

	const steps = [
		{
			num: '01',
			icon: PhoneCall,
			title: 'Ariza Qoldirish',
			desc: 'Saytdan yoki telefon orqali bepul ariza qoldirasiz.',
		},
		{
			num: '02',
			icon: Compass,
			title: "Aniq O'lchash",
			desc: "Usta uyingizga borib o'lchaydi va shartnoma imzolanadi.",
		},
		{
			num: '03',
			icon: Cog,
			title: 'Zavodda Tayyorlash',
			desc: "Imzo zavodida buyurtmangiz millimetr aniqligida yig'iladi.",
		},
		{
			num: '04',
			icon: Truck,
			title: "O'rnatish & Kafolat",
			desc: "Rishtondagi xonadoningizga yetkazib, professional o'rnatiladi.",
		},
	];

	return (
		<section id='advantages' className='py-20 bg-[#060a11] relative'>
			<div className='max-w-7xl mx-auto px-4'>
				{/* Header */}
				<div className='text-center max-w-2xl mx-auto mb-14 space-y-3'>
					<div className='inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest'>
						<Award className='w-4 h-4' />
						<span>Bizning Afzalliklarimiz</span>
					</div>
					<h2 className='font-outfit text-3xl sm:text-4xl font-extrabold text-white'>
						Nega Aynan{' '}
						<span className='bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
							Rishton IMZO Filiali?
						</span>
					</h2>
					<p className='text-slate-400 text-sm sm:text-base'>
						Biz mijozlarimizga faqat sifat, mustahkamlik va Rishton bo&apos;ylab
						qulay xizmatni taqdim etamiz
					</p>
				</div>

				{/* 4 Advantage Cards */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20'>
					{advantages.map((adv, idx) => {
						const Icon = adv.icon;
						return (
							<div
								key={idx}
								className='bg-slate-900/70 border border-white/10 hover:border-cyan-500/40 p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 group shadow-lg'
							>
								<div className='w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform'>
									<Icon className='w-6 h-6' />
								</div>
								<h3 className='font-outfit font-bold text-lg text-white mb-2'>
									{adv.title}
								</h3>
								<p className='text-xs text-slate-400 leading-relaxed'>
									{adv.desc}
								</p>
							</div>
						);
					})}
				</div>

				{/* Work Process Step by Step */}
				<div className='bg-slate-900/60 border border-white/10 rounded-2xl p-8 sm:p-10 backdrop-blur-xl'>
					<div className='text-center max-w-xl mx-auto mb-10'>
						<h3 className='font-outfit text-2xl font-bold text-white mb-2'>
							Buyurtma Qanday Bajariladi?
						</h3>
						<p className='text-xs text-slate-400'>
							Oddiy 4 qadamda uyingizga zamonaviy romlar o&apos;rnatiladi
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{steps.map((step, i) => {
							const Icon = step.icon;
							return (
								<div
									key={i}
									className='relative bg-black/40 border border-white/5 p-5 rounded-xl text-center space-y-3'
								>
									<div className='absolute top-3 right-3 font-outfit text-xl font-black text-white/10'>
										{step.num}
									</div>
									<div className='w-10 h-10 mx-auto rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center'>
										<Icon className='w-5 h-5' />
									</div>
									<h4 className='font-outfit font-bold text-sm text-white'>
										{step.title}
									</h4>
									<p className='text-xs text-slate-400'>{step.desc}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

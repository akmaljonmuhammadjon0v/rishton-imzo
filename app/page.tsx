'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Calculator from '@/components/Calculator';
import Catalog from '@/components/Catalog';
import Advantages from '@/components/Advantages';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MeasurementModal from '@/components/MeasurementModal';
import { Send, PhoneCall } from 'lucide-react';

export default function Home() {
	const [modalOpen, setModalOpen] = useState(false);
	const [orderConfig, setOrderConfig] = useState<any>(null);
	const [selectedProfile, setSelectedProfile] = useState('thermo78');

	const handleOpenMeasurement = () => {
		setOrderConfig(null);
		setModalOpen(true);
	};

	const handleOrderWithConfig = (config: any) => {
		setOrderConfig(config);
		setModalOpen(true);
	};

	const handleSelectCatalogProfile = (profileId: string) => {
		setSelectedProfile(profileId);
		const el = document.getElementById('calculator');
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<main className='min-h-screen'>
			{/* Navbar */}
			<Navbar onOpenModal={handleOpenMeasurement} />

			{/* Hero */}
			<Hero onOpenModal={handleOpenMeasurement} />

			{/* Calculator */}
			<Calculator onOrderWithConfig={handleOrderWithConfig} initialProfile={selectedProfile} />

			{/* Catalog */}
			<Catalog onSelectProfile={handleSelectCatalogProfile} />

			{/* Advantages & Process */}
			<Advantages />

			{/* Gallery */}
			<Gallery />

			{/* Real Google Reviews 5.0 */}
			<Reviews />

			{/* Frequently Asked Questions */}
			<FAQ />

			{/* Contact & Map */}
			<ContactSection />

			{/* Footer */}
			<Footer />

			{/* Floating Action Buttons */}
			<div className='fixed bottom-6 right-6 z-40 flex flex-col gap-3'>
				<a
					href='https://t.me/imzorishton'
					target='_blank'
					rel='noreferrer'
					title='Telegramda Yozish'
					className='w-14 h-14 p-3.5 rounded-full bg-[#24A1DE] text-white shadow-xl shadow-cyan-500/20 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center'
				>
					<Send className='w-6 h-6' />
				</a>

				<a
					href='tel:+998903816666'
					title="Qo'ng'iroq Qilish"
					className='w-14 h-14 p-3.5 rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center'
				>
					<PhoneCall className='w-6 h-6' />
				</a>
			</div>

			{/* Measurement & Order Modal */}
			<MeasurementModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				initialConfig={orderConfig}
			/>
		</main>
	);
}

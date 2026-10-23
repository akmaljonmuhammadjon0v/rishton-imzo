import type { Metadata } from 'next';
import Script from 'next/script';
import { siteUrl, siteUrlString } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
	...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: '/' } } : {}),
	title: {
		default: 'IMZO Rishton — plastik va alyuminiy rom, eshiklar',
		template: '%s | IMZO Rishton',
	},
	description:
		'Rishtondagi IMZO shourumi: plastik va alyuminiy romlar, eshiklar va fasad tizimlari. Narxni onlayn hisoblang, bepul o‘lchovga buyurtma bering.',
	applicationName: 'IMZO Rishton',
	referrer: 'origin-when-cross-origin',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'uz_UZ',
		siteName: 'IMZO Rishton',
		title: 'IMZO Rishton — plastik va alyuminiy rom, eshiklar',
		description:
			'Rishtondagi IMZO shourumi. Rom va eshik narxini hisoblang, bepul o‘lchovga buyurtma bering.',
		...(siteUrlString ? { url: siteUrlString } : {}),
	},
	twitter: {
		card: 'summary_large_image',
		title: 'IMZO Rishton — plastik va alyuminiy rom, eshiklar',
		description:
			'Rishtondagi IMZO shourumi. Rom va eshik narxini hisoblang, bepul o‘lchovga buyurtma bering.',
	},
};

const localBusinessSchema = {
	'@context': 'https://schema.org',
	'@type': 'HomeAndConstructionBusiness',
	name: 'IMZO Rishton filiali',
	description:
		'Rishtondagi IMZO shourumi: plastik va alyuminiy romlar, eshiklar, o‘lchov va o‘rnatish xizmati.',
	telephone: '+998903816666',
	address: {
		'@type': 'PostalAddress',
		streetAddress: '97H5+FM9',
		addressLocality: 'Rishton',
		addressRegion: 'Farg‘ona viloyati',
		addressCountry: 'UZ',
	},
	openingHours: 'Mo-Su 08:30-23:59',
	areaServed: [
		'Rishton',
		'Bag‘dod',
		'Buvayda',
		'Oltiariq',
		'Farg‘ona viloyati',
	],
	sameAs: ['https://t.me/imzorishton'],
	...(siteUrlString
		? { '@id': `${siteUrlString}/#localbusiness`, url: siteUrlString }
		: {}),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='uz' className='scroll-smooth'>
			<body className='bg-imzo-dark text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white'>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(localBusinessSchema).replace(
							/</g,
							'\\u003c',
						),
					}}
				/>
				<Script
					src='https://telegram.org/js/telegram-web-app.js'
					strategy='afterInteractive'
				/>
				{children}
			</body>
		</html>
	);
}

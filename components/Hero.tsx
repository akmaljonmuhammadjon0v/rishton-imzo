'use client';

import React from 'react';
import { ShieldCheck, Calculator, Layers, CheckCircle2, Truck, Wrench } from 'lucide-react';

interface HeroProps {
  onOpenModal: () => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Warranty Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              10 Yillik Rasmiy Zavod Kafolati
            </div>

            {/* Main Headline */}
            <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Rishtonda Yevropa Sifatidagi{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                IMZO Rom va Eshiklari
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Uyingiz va binolaringiz uchun original alyuminiy hamda PVX profil tizimlari. Xonada 45% gacha issiqlikni saqlash, 42 dB shovqin to&apos;sishi va Rishton bo&apos;yicha bepul o&apos;lchov xizmati!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-7 py-4 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all text-base"
              >
                <Calculator className="w-5 h-5" />
                <span>Narxini Hisoblash</span>
              </a>

              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-cyan-500/40 font-semibold px-7 py-4 rounded-xl transition-all text-base"
              >
                <Layers className="w-5 h-5" />
                <span>Katalog Bilan Tanishish</span>
              </a>
            </div>

            {/* Features Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>100% Original Profil</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Rishton Bo&apos;ylab Bepul Yetkazish</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Nemis Furniturasi (Maco/Roto)</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative group">
              
              {/* Glow backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>

              {/* Card Container */}
              <div className="relative bg-slate-900/90 border border-white/15 rounded-2xl p-4 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="absolute top-7 left-7 z-10 bg-black/70 backdrop-blur-md border border-white/20 text-cyan-400 text-xs font-bold px-3 py-1.5 rounded-full">
                  Rishton Filiali Maxsus Taklifi
                </div>

                <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                    alt="IMZO Zamonaviy Romlar"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>

                  {/* Overlay specs inside image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex justify-around text-center">
                    <div>
                      <div className="text-[11px] text-slate-400">Issiqlik Saqlash</div>
                      <div className="font-outfit font-bold text-amber-400 text-sm sm:text-base">+45% Tejamkor</div>
                    </div>
                    <div className="w-[1px] bg-white/10"></div>
                    <div>
                      <div className="text-[11px] text-slate-400">Shovqin To&apos;sishi</div>
                      <div className="font-outfit font-bold text-cyan-400 text-sm sm:text-base">42 dB gacha</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-16 bg-slate-900/70 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            
            <div className="pt-4 sm:pt-0">
              <div className="font-outfit font-extrabold text-3xl sm:text-4xl text-white">5 000+</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Rishtonda o&apos;rnatilgan romlar</div>
            </div>

            <div className="pt-4 sm:pt-0">
              <div className="font-outfit font-extrabold text-3xl sm:text-4xl text-amber-400">10 Yil</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Rasmiy Zavod Kafolati</div>
            </div>

            <div className="pt-4 sm:pt-0">
              <div className="font-outfit font-extrabold text-3xl sm:text-4xl text-cyan-400">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Original IMZO Standarti</div>
            </div>

            <div className="pt-4 sm:pt-0">
              <div className="font-outfit font-extrabold text-3xl sm:text-4xl text-emerald-400">24 Soat</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">O&apos;lchovchi yetib borishi</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

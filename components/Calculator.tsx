import React, { useState, useEffect } from 'react';
import { 
  Calculator as CalcIcon, 
  Eye, 
  Send, 
  Info, 
  LayoutGrid, 
  Columns, 
  DoorClosed, 
  PanelLeftClose, 
  CreditCard, 
  PlusCircle, 
  ListOrdered, 
  Trash2, 
  CheckCircle2, 
  X 
} from 'lucide-react';
import { formatPrice } from '@/lib/format';

export interface SmetaItem {
  id: string;
  roomName: string;
  typeTitle: string;
  profileTitle: string;
  dimensions: string;
  colorTitle: string;
  price: number;
  count: number;
}

interface CalculatorProps {
  onOrderWithConfig: (config: any) => void;
  initialProfile?: string;
}

function StepHeading({ step, title, className = 'mb-3' }: { step: string; title: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 font-outfit text-xs font-extrabold text-cyan-300">
        {step}
      </span>
      <span className="text-sm font-bold text-slate-100">{title}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}

export default function Calculator({ onOrderWithConfig, initialProfile }: CalculatorProps) {
  const [productType, setProductType] = useState('window-double');
  const [profileSeries, setProfileSeries] = useState('thermo78');
  useEffect(() => { if (initialProfile && ['thermo78', 'engelberg76', 'trio60', 'slidingBalcony'].includes(initialProfile)) setProfileSeries(initialProfile); }, [initialProfile]);
  const [width, setWidth] = useState(1400);
  const [height, setHeight] = useState(1500);
  const [glassType, setGlassType] = useState('double-energy');
  const [color, setColor] = useState('white');
  const [extraNet, setExtraNet] = useState(true);
  const [extraSill, setExtraSill] = useState(true);
  const [extraInstall, setExtraInstall] = useState(true);

  // Installment (Nasiya) State
  const [paymentMode, setPaymentMode] = useState<'cash' | 'installment'>('cash');
  const [installmentMonths, setInstallmentMonths] = useState<3 | 6 | 12>(6);

  // Multi-item House Smeta State
  const [roomName, setRoomName] = useState('Zal romi');
  const [smetaList, setSmetaList] = useState<SmetaItem[]>([]);
  const [isSmetaOpen, setIsSmetaOpen] = useState(false);
  const [smetaAddedAlert, setSmetaAddedAlert] = useState(false);

  // Dynamic Prices from server or default
  const [basePrices, setBasePrices] = useState({
    thermo78: 1450000,
    engelberg76: 1150000,
    trio60: 850000,
    slidingBalcony: 1300000,
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.prices) setBasePrices(data.prices);
      })
      .catch(() => {});
  }, []);

  // Update default dimensions when switching types
  const handleTypeChange = (type: string) => {
    setProductType(type);
    if (type === 'door-single') {
      setWidth(900);
      setHeight(2100);
    } else if (type === 'window-triple') {
      setWidth(2100);
      setHeight(1500);
    } else if (type === 'sliding-balcony') {
      setWidth(2400);
      setHeight(2200);
    } else {
      setWidth(1400);
      setHeight(1500);
    }
  };

  // Profile names map
  const profileLabels: Record<string, string> = {
    thermo78: 'IMZO Thermo 78 (Alyuminiy)',
    engelberg76: 'Engelberg 76 (PVX 6-Kamerali)',
    trio60: 'IMZO Trio 60 (PVX 3-Kamerali)',
  };

  const colorLabels: Record<string, string> = {
    white: 'Klassik Oq',
    anthracite: 'Antratsit (Anthracite Grey)',
    walnut: 'To\'q Yong\'oq (Dark Walnut)',
    oak: 'Oltin Eman (Golden Oak)',
  };

  const colorHex: Record<string, string> = {
    white: '#e2e8f0',
    anthracite: '#334155',
    walnut: '#5c3826',
    oak: '#a66f36',
  };

  // Area in square meters
  const areaM2 = (width * height) / 1000000;

  // Base profile price per m2
  let currentBasePrice = basePrices[profileSeries as keyof typeof basePrices] || 1150000;
  if (productType === 'sliding-balcony') {
    currentBasePrice = basePrices.slidingBalcony || 1300000;
  }

  // Multipliers
  const glassMultipliers: Record<string, number> = {
    'double-standard': 1.0,
    'double-energy': 1.1,
    'triple-thermo': 1.25,
    'tinted-bronze': 1.18,
  };

  const colorMultipliers: Record<string, number> = {
    white: 1.0,
    anthracite: 1.15,
    walnut: 1.2,
    oak: 1.2,
  };

  let calculatedPrice = areaM2 * currentBasePrice * (glassMultipliers[glassType] || 1) * (colorMultipliers[color] || 1);
  if (extraNet) calculatedPrice += 80000;
  if (extraSill) calculatedPrice += 65000 * (width / 1000);

  // Round to nearest 10,000 UZS
  const finalPrice = Math.round(calculatedPrice / 10000) * 10000;

  const handleOrderClick = () => {
    const config = {
      type: productType,
      profile: profileLabels[profileSeries] || profileSeries,
      dimensions: `${width}x${height} mm`,
      color: colorLabels[color],
      glass: glassType,
      estimatedPrice: finalPrice,
    };
    onOrderWithConfig(config);
  };

  // Render SVG Diagram Elements
  const frameColor = colorHex[color] || '#e2e8f0';
  const glassFill = glassType === 'tinted-bronze' ? 'rgba(180, 120, 60, 0.45)' : 'rgba(0, 180, 255, 0.22)';
  const svgW = 400;
  const svgH = 300;
  const aspectRatio = width / height;
  const innerW = Math.min(300, 190 * aspectRatio);
  const innerH = Math.min(190, 300 / aspectRatio);
  const padX = (svgW - innerW) / 2;
  const padY = (svgH - innerH) / 2;
  const frameThick = 12;
  const depthX = 18;
  const depthY = -13;
  const glassX = padX + frameThick;
  const glassY = padY + frameThick;
  const glassW = innerW - frameThick * 2;
  const glassH = innerH - frameThick * 2;
  const frameEdgeColor: Record<string, string> = {
    white: '#94a3b8',
    anthracite: '#1e293b',
    walnut: '#3d281d',
    oak: '#75502e',
  };

  return (
    <section id="calculator" className="relative overflow-hidden bg-[#060a11] py-20">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 h-80 w-[min(80vw,900px)] -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-3xl" />
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5 text-cyan-300 text-xs font-bold uppercase tracking-widest">
            <CalcIcon className="w-4 h-4" />
            <span>Onlayn kalkulyator</span>
          </div>
          <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-white">
            Rom va Eshigingiz Narxini{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Bir zumda hisoblang
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            O&apos;lcham va profilni tanlang — mahsulot maketi hamda taxminiy narx darhol yangilanadi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] sm:text-xs">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-slate-300">Narx darhol hisoblanadi</span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-slate-300">Yakuniy o&apos;lchov bepul</span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-slate-300">Majburiyatsiz ariza</span>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Left (7 cols) */}
          <div className="relative lg:col-span-7 bg-slate-900/85 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.22)] space-y-6">
            
            {/* Step 1: Product Type */}
            <div>
              <StepHeading step="01" title="Mahsulot turini tanlang" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => handleTypeChange('window-double')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-2 transition-all ${
                    productType === 'window-double'
                      ? 'bg-blue-600/20 border-cyan-400 text-white shadow-md shadow-blue-500/10'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5 text-cyan-400" />
                  <span>2-Taqali Rom</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange('window-triple')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-2 transition-all ${
                    productType === 'window-triple'
                      ? 'bg-blue-600/20 border-cyan-400 text-white shadow-md shadow-blue-500/10'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Columns className="w-5 h-5 text-cyan-400" />
                  <span>3-Taqali Rom</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange('door-single')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-2 transition-all ${
                    productType === 'door-single'
                      ? 'bg-blue-600/20 border-cyan-400 text-white shadow-md shadow-blue-500/10'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <DoorClosed className="w-5 h-5 text-cyan-400" />
                  <span>Bir Taqali Eshik</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange('sliding-balcony')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-2 transition-all ${
                    productType === 'sliding-balcony'
                      ? 'bg-blue-600/20 border-cyan-400 text-white shadow-md shadow-blue-500/10'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <PanelLeftClose className="w-5 h-5 text-cyan-400" />
                  <span>Surma (Sliding)</span>
                </button>
              </div>
            </div>

            {/* Step 2: Profile Series */}
            <div>
              <StepHeading step="02" title="Profil seriyasini tanlang" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <div
                  onClick={() => setProfileSeries('thermo78')}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                    profileSeries === 'thermo78'
                      ? 'bg-blue-600/20 border-cyan-400 text-white'
                      : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold text-cyan-400 mb-1">Eng Ommabop</div>
                  <div className="font-outfit font-bold text-sm text-white">Thermo 78</div>
                  <div className="text-[11px] text-slate-400">Alyuminiy | Premium termoizolyatsiya</div>
                </div>

                <div
                  onClick={() => setProfileSeries('engelberg76')}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                    profileSeries === 'engelberg76'
                      ? 'bg-blue-600/20 border-cyan-400 text-white'
                      : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold text-amber-400 mb-1">Lyuks</div>
                  <div className="font-outfit font-bold text-sm text-white">Engelberg 76</div>
                  <div className="text-[11px] text-slate-400">PVX 6-Kamerali | Nemis standarti</div>
                </div>

                <div
                  onClick={() => setProfileSeries('trio60')}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                    profileSeries === 'trio60'
                      ? 'bg-blue-600/20 border-cyan-400 text-white'
                      : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold text-emerald-400 mb-1">Hamyonbop</div>
                  <div className="font-outfit font-bold text-sm text-white">IMZO Trio 60</div>
                  <div className="text-[11px] text-slate-400">PVX 3-Kamerali | Ishonchli</div>
                </div>

              </div>
            </div>

            {/* Step 3: Dimensions Sliders */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-x-4">
                <StepHeading step="03" title="O&apos;lchamlarni belgilang" className="mb-0 min-w-[220px] flex-1" />
                <span className="pb-3 text-xs font-bold text-cyan-400 font-outfit">
                  Eni: {width} mm × Bo&apos;yi: {height} mm
                </span>
              </div>

              {/* Width Slider */}
              <div className="bg-black/30 border border-white/10 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>Eni (Width):</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={width}
                      min={500}
                      max={4000}
                      step={10}
                      onChange={(e) => setWidth(Math.max(500, Math.min(4000, Number(e.target.value) || 500)))}
                      className="w-20 bg-slate-950 border border-cyan-500/40 rounded px-2 py-0.5 text-center text-white text-xs font-bold"
                    />
                    <span>mm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={500}
                  max={4000}
                  step={10}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Height Slider */}
              <div className="bg-black/30 border border-white/10 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>Bo&apos;yi (Height):</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={height}
                      min={500}
                      max={3000}
                      step={10}
                      onChange={(e) => setHeight(Math.max(500, Math.min(3000, Number(e.target.value) || 500)))}
                      className="w-20 bg-slate-950 border border-cyan-500/40 rounded px-2 py-0.5 text-center text-white text-xs font-bold"
                    />
                    <span>mm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={500}
                  max={3000}
                  step={10}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            {/* Step 4: Glass & Color */}
            <div>
              <StepHeading step="04" title="Oyna va profil rangi" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Oyna paketi turi:</label>
                <select
                  value={glassType}
                  onChange={(e) => setGlassType(e.target.value)}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:border-cyan-400 outline-none"
                >
                  <option value="double-standard">2 Qavatli Oyna (Standart)</option>
                  <option value="double-energy">2 Qavatli Low-E (Energiya Tejamkor)</option>
                  <option value="triple-thermo">3 Qavatli Termo & Shovqin To&apos;siq</option>
                  <option value="tinted-bronze">Tanirovkalangan Bronza Oyna</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Profil Rangi:</label>
                <div className="flex items-center gap-3">
                  {['white', 'anthracite', 'walnut', 'oak'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      title={colorLabels[c]}
                      style={{ backgroundColor: colorHex[c] }}
                      className={`w-9 h-9 rounded-full transition-transform border-2 ${
                        color === c ? 'scale-125 border-cyan-400 shadow-lg shadow-cyan-400/50' : 'border-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              </div>
            </div>

            {/* Step 5: Extras */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <StepHeading step="05" title="Qo&apos;shimchalar" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <label className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-2.5 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={extraNet}
                    onChange={(e) => setExtraNet(e.target.checked)}
                    className="accent-cyan-400 w-4 h-4 rounded"
                  />
                  <span>Moskit to&apos;ri (+80k)</span>
                </label>
                <label className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-2.5 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={extraSill}
                    onChange={(e) => setExtraSill(e.target.checked)}
                    className="accent-cyan-400 w-4 h-4 rounded"
                  />
                  <span>Podokonnik (+tokcha)</span>
                </label>
                <label className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-2.5 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={extraInstall}
                    onChange={(e) => setExtraInstall(e.target.checked)}
                    className="accent-cyan-400 w-4 h-4 rounded"
                  />
                  <span className="text-emerald-400 font-semibold">Rishtonda Bepul O&apos;rnatish</span>
                </label>
              </div>
            </div>

          </div>

          {/* Preview & Price Summary Right (5 cols) */}
          <div className="lg:sticky lg:top-28 lg:col-span-5 bg-slate-900/90 border border-cyan-400/15 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] flex flex-col justify-between space-y-6">
            
            {/* Preview Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Mahsulot maketi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="bg-white/[0.04] border border-white/10 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {productType === 'door-single' ? 'Eshik' : productType === 'sliding-balcony' ? 'Surma tizim' : 'Rom'}
                </span>
                <span className="bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                  {profileLabels[profileSeries]?.replace('IMZO ', '') || 'IMZO'}
                </span>
              </div>
            </div>

            {/* Dynamic SVG Drawing */}
            <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_42%,rgba(34,211,238,0.12),transparent_55%),linear-gradient(145deg,#070d18,#101c2b_55%,#08131d)] border border-white/10 rounded-xl p-4 flex items-center justify-center min-h-[260px] shadow-inner">
              <div aria-hidden="true" className="pointer-events-none absolute bottom-8 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-[50%] bg-cyan-300/10 blur-xl" />
              <svg aria-label={`Tanlangan mahsulot maketi: eni ${width} mm, bo‘yi ${height} mm`} role="img" viewBox={`0 0 ${svgW} ${svgH}`} className="relative w-full h-auto max-h-60 drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]">
                <defs>
                  <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="35%" stopColor="rgba(255,255,255,0.05)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                  </linearGradient>
                  <linearGradient id="frameFace" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                    <stop offset="45%" stopColor={frameColor} />
                    <stop offset="100%" stopColor={frameEdgeColor[color]} />
                  </linearGradient>
                  <linearGradient id="frameDepth" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={frameEdgeColor[color]} />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                  <linearGradient id="glassFace" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(186,230,253,0.84)" />
                    <stop offset="45%" stopColor={glassFill} />
                    <stop offset="100%" stopColor="rgba(8,145,178,0.28)" />
                  </linearGradient>
                </defs>

                {/* Extruded top and side faces make the frame read as a product render. */}
                <ellipse cx={padX + innerW / 2 + 7} cy={padY + innerH + 17} rx={innerW * 0.48} ry={9} fill="#020617" opacity={0.8} />
                <polygon points={`${padX},${padY} ${padX + innerW},${padY} ${padX + innerW + depthX},${padY + depthY} ${padX + depthX},${padY + depthY}`} fill="url(#frameDepth)" stroke={frameEdgeColor[color]} strokeOpacity={0.7} />
                <polygon points={`${padX + innerW},${padY} ${padX + innerW + depthX},${padY + depthY} ${padX + innerW + depthX},${padY + innerH + depthY} ${padX + innerW},${padY + innerH}`} fill="url(#frameDepth)" stroke={frameEdgeColor[color]} strokeOpacity={0.7} />
                <polygon points={`${padX},${padY + innerH} ${padX + innerW},${padY + innerH} ${padX + innerW + depthX},${padY + innerH + depthY} ${padX + depthX},${padY + innerH + depthY}`} fill={frameEdgeColor[color]} opacity={0.8} />
                <rect x={padX} y={padY} width={innerW} height={innerH} rx={6} fill="url(#frameFace)" stroke={frameEdgeColor[color]} strokeWidth={3} />
                <rect x={padX + 4} y={padY + 4} width={innerW - 8} height={innerH - 8} rx={3} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.5} />

                {/* Window Type Specific Sashes */}
                {productType === 'window-double' && (
                  <>
                    {/* Left Sash */}
                    <rect
                      x={glassX}
                      y={glassY}
                      width={glassW / 2 - 3}
                      height={glassH}
                      fill="url(#glassFace)"
                      stroke={frameColor}
                      strokeWidth={6}
                    />
                    <rect
                      x={glassX}
                      y={glassY}
                      width={glassW / 2 - 3}
                      height={glassH}
                      fill="url(#glassShine)"
                    />
                    {/* Right Opening Sash */}
                    <rect
                      x={glassX + glassW / 2 + 3}
                      y={glassY}
                      width={glassW / 2 - 3}
                      height={glassH}
                      fill="url(#glassFace)"
                      stroke={frameColor}
                      strokeWidth={8}
                    />
                    <rect
                      x={glassX + glassW / 2 + 3}
                      y={glassY}
                      width={glassW / 2 - 3}
                      height={glassH}
                      fill="url(#glassShine)"
                    />
                    {/* Opening Dotted Triangles */}
                    <polyline
                      points={`${glassX + glassW / 2 + 3},${glassY} ${glassX + glassW},${glassY + glassH / 2} ${glassX + glassW / 2 + 3},${glassY + glassH}`}
                      fill="none"
                      stroke="rgba(255,255,255,0.7)"
                      strokeDasharray="4,4"
                      strokeWidth={1.5}
                    />
                    {/* Handle */}
                    <rect
                      x={glassX + glassW / 2 + 8}
                      y={glassY + glassH / 2 - 12}
                      width={6}
                      height={24}
                      rx={2}
                      fill="#cbd5e1"
                      stroke="#0f172a"
                      strokeWidth={1}
                    />
                  </>
                )}

                {productType === 'window-triple' && (
                  <>
                    <rect
                      x={glassX}
                      y={glassY}
                      width={glassW / 3 - 2}
                      height={glassH}
                      fill="url(#glassFace)"
                      stroke={frameColor}
                      strokeWidth={5}
                    />
                    <rect
                      x={glassX + glassW / 3 + 2}
                      y={glassY}
                      width={glassW / 3 - 4}
                      height={glassH}
                      fill="url(#glassFace)"
                      stroke={frameColor}
                      strokeWidth={7}
                    />
                    <polyline
                      points={`${glassX + glassW / 3 + 2},${glassY} ${glassX + (glassW / 3) * 2 - 2},${glassY + glassH / 2} ${glassX + glassW / 3 + 2},${glassY + glassH}`}
                      fill="none"
                      stroke="rgba(255,255,255,0.7)"
                      strokeDasharray="4,4"
                      strokeWidth={1.5}
                    />
                    <rect
                      x={glassX + (glassW / 3) * 2 + 2}
                      y={glassY}
                      width={glassW / 3 - 2}
                      height={glassH}
                      fill="url(#glassFace)"
                      stroke={frameColor}
                      strokeWidth={5}
                    />
                  </>
                )}

                {productType === 'door-single' && (
                  <>
                    <rect
                      x={glassX + 10}
                      y={glassY + 10}
                      width={glassW - 20}
                      height={glassH * 0.45}
                      fill="url(#glassFace)"
                      stroke={frameColor}
                      strokeWidth={4}
                    />
                    <rect
                      x={glassX + 10}
                      y={glassY + glassH * 0.45 + 20}
                      width={glassW - 20}
                      height={glassH - glassH * 0.45 - 30}
                      fill="rgba(0,0,0,0.3)"
                      stroke={frameColor}
                      strokeWidth={4}
                    />
                    <circle cx={glassX + glassW - 20} cy={glassY + glassH / 2} r={5} fill="#f8fafc" />
                    <rect
                      x={glassX + glassW - 24}
                      y={glassY + glassH / 2}
                      width={20}
                      height={6}
                      rx={2}
                      fill="#cbd5e1"
                    />
                  </>
                )}

                {productType === 'sliding-balcony' && (
                  <>
                    <rect
                      x={glassX}
                      y={glassY}
                      width={glassW / 2 + 10}
                      height={glassH}
                      fill="url(#glassFace)"
                      stroke={frameColor}
                      strokeWidth={6}
                    />
                    <rect
                      x={glassX + glassW / 2 - 10}
                      y={glassY}
                      width={glassW / 2 + 10}
                      height={glassH}
                      fill="url(#glassFace)"
                      stroke={frameColor}
                      strokeWidth={6}
                    />
                    <line
                      x1={glassX + glassW / 4 - 20}
                      y1={glassY + glassH / 2}
                      x2={glassX + glassW / 4 + 20}
                      y2={glassY + glassH / 2}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  </>
                )}

                {/* Dimension Lines */}
                {/* Top Width */}
                <line
                  x1={padX}
                  y1={padY + depthY - 14}
                  x2={padX + innerW}
                  y2={padY + depthY - 14}
                  stroke="#00d2ff"
                  strokeWidth={1.5}
                />
                <circle cx={padX} cy={padY + depthY - 14} r={2.5} fill="#67e8f9" />
                <circle cx={padX + innerW} cy={padY + depthY - 14} r={2.5} fill="#67e8f9" />
                <text
                  x={padX + innerW / 2}
                  y={padY + depthY - 18}
                  fill="#a5f3fc"
                  fontSize={11}
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {width} mm
                </text>

                {/* Right Height */}
                <line
                  x1={padX + innerW + depthX + 14}
                  y1={padY}
                  x2={padX + innerW + depthX + 14}
                  y2={padY + innerH}
                  stroke="#00d2ff"
                  strokeWidth={1.5}
                />
                <circle cx={padX + innerW + depthX + 14} cy={padY} r={2.5} fill="#67e8f9" />
                <circle cx={padX + innerW + depthX + 14} cy={padY + innerH} r={2.5} fill="#67e8f9" />
                <text
                  x={padX + innerW + depthX + 20}
                  y={padY + innerH / 2 + 4}
                  fill="#a5f3fc"
                  fontSize={11}
                  fontWeight="700"
                  transform={`rotate(90, ${padX + innerW + depthX + 20}, ${padY + innerH / 2 + 4})`}
                >
                  {height} mm
                </text>
              </svg>
            </div>
            <p className="-mt-4 text-center text-[10px] leading-relaxed text-slate-500">Chizma tanlovlaringizga qarab yangilanadi. Yakuniy ko‘rinish o‘lchovdan keyin aniqlanadi.</p>

            {/* Summary Details */}
            <div className="space-y-2.5 text-xs sm:text-sm border-t border-white/10 pt-4">
              <div className="flex justify-between text-slate-300">
                <span>Maydon:</span>
                <strong className="text-white font-outfit">{areaM2.toFixed(2)} m²</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tanlangan rang:</span>
                <strong className="text-white">{colorLabels[color]}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Furnitura:</span>
                <strong className="text-white">Maco / Roto (Germaniya)</strong>
              </div>

              {/* Payment Mode Selector (Naqd vs Nasiya) */}
              <div className="bg-black/30 border border-white/10 p-1 rounded-xl flex gap-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentMode('cash')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    paymentMode === 'cash'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Naqd To&apos;lov
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('installment')}
                  className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    paymentMode === 'installment'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md'
                      : 'text-amber-400 hover:text-amber-300'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Bo&apos;lib To&apos;lash (Nasiya)</span>
                </button>
              </div>

              {/* Installment Term Selector */}
              {paymentMode === 'installment' && (
                <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-3 space-y-2 animate-in fade-in">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">To&apos;lov muddati:</span>
                    <div className="flex gap-1.5">
                      {[3, 6, 12].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setInstallmentMonths(m as 3 | 6 | 12)}
                          className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                            installmentMonths === m
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-black/40 text-slate-300 hover:bg-black/60'
                          }`}
                        >
                          {m} oy
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline pt-1 border-t border-amber-400/10">
                    <span className="text-xs text-amber-300 font-medium">Oylik to&apos;lov ({installmentMonths} oyga):</span>
                    <div className="text-right">
                      <span className="font-outfit font-extrabold text-lg text-amber-400">
                        {formatPrice(Math.round(finalPrice / installmentMonths))}
                      </span>
                      <span className="text-[10px] text-amber-300/80 ml-1">so&apos;m/oy</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>0% Boshlang&apos;ich to&apos;lov, pasport bilan 15 daqiqada</span>
                  </div>
                </div>
              )}

              {/* Total Price Highlight */}
              <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.1] via-blue-500/[0.05] to-transparent px-4 py-4">
                <div className="flex justify-between items-baseline gap-3">
                  <span className="text-slate-200 font-semibold text-xs sm:text-sm">
                    {paymentMode === 'installment' ? 'Umumiy qiymati' : 'Taxminiy narx'}
                  </span>
                  <div className="text-right tabular-nums">
                    <span suppressHydrationWarning className="font-outfit font-extrabold text-2xl sm:text-3xl text-cyan-300">
                      {formatPrice(finalPrice)}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5 font-medium">so&apos;m</span>
                  </div>
                </div>
                <p className="mt-1 text-right text-[10px] text-slate-400">Aniq narx bepul o&apos;lchovdan keyin tasdiqlanadi</p>
              </div>
            </div>

            {/* Actions & Multi-item Smeta */}
            <div className="space-y-3 pt-2">
              
              {/* Add to Smeta input & button */}
              <div className="bg-slate-950/80 border border-white/10 rounded-xl p-2.5 flex items-center gap-2">
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Xona nomi (masalan: Zal romi)"
                  className="bg-transparent text-xs text-white placeholder-slate-500 outline-none flex-1 px-1"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newItem: SmetaItem = {
                      id: Date.now().toString(),
                      roomName: roomName || 'Rom',
                      typeTitle: productType === 'door-single' ? 'Eshik' : productType === 'sliding-balcony' ? 'Surma Vitraj' : 'Rom',
                      profileTitle: profileLabels[profileSeries] ? profileLabels[profileSeries].split(' ')[1] : profileSeries,
                      dimensions: `${width}x${height} mm`,
                      colorTitle: colorLabels[color],
                      price: finalPrice,
                      count: 1,
                    };
                    setSmetaList(prev => [...prev, newItem]);
                    setSmetaAddedAlert(true);
                    setTimeout(() => setSmetaAddedAlert(false), 2000);
                  }}
                  className="bg-blue-600/30 hover:bg-blue-600 border border-blue-500/40 text-cyan-300 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Smetaga qo&apos;shish</span>
                </button>
              </div>

              {smetaAddedAlert && (
                <div className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>&quot;{roomName}&quot; uy smetasiga qo&apos;shildi!</span>
                </div>
              )}

              {/* View Smeta Button if items exist */}
              {smetaList.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsSmetaOpen(true)}
                  className="w-full flex items-center justify-between bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 p-3 rounded-xl text-xs font-bold transition shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4" />
                    <span>Butun Uy Smetasi ({smetaList.length} ta xil rom/eshik)</span>
                  </span>
                  <span className="font-outfit text-sm">
                    {formatPrice(smetaList.reduce((acc, it) => acc + it.price * it.count, 0))} so&apos;m &rarr;
                  </span>
                </button>
              )}

              {/* Direct Order Button */}
              <button
                onClick={handleOrderClick}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all text-sm sm:text-base"
              >
                <Send className="w-4 h-4" />
                <span>Ushbu O&apos;lchamda Buyurtma Berish</span>
              </button>

              <p className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Yakuniy aniq narx mutaxassis joyiga borib bepul o&apos;lchagach tasdiqlanadi.</span>
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* House Smeta Drawer / Modal */}
      {isSmetaOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-outfit font-bold text-lg text-white">Butun Uy Romlari Smetasi</h3>
                </div>
                <button
                  onClick={() => setIsSmetaOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Smeta List */}
              <div className="space-y-3 overflow-y-auto max-h-[48vh] pr-1">
                {smetaList.map((item, idx) => (
                  <div
                    key={item.id}
                    className="bg-black/40 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">{item.roomName}</div>
                      <div className="text-slate-400 text-[11px]">
                        {item.typeTitle} · {item.profileTitle} · {item.dimensions} · {item.colorTitle}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-outfit font-bold text-amber-400 text-sm">
                        {formatPrice(item.price * item.count)} so&apos;m
                      </span>
                      <button
                        type="button"
                        onClick={() => setSmetaList(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smeta Total & Order */}
            <div className="pt-4 border-t border-white/10 mt-4 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-300 text-sm font-semibold">Jami Uy Smetasi:</span>
                <span className="font-outfit font-extrabold text-2xl text-cyan-400">
                  {formatPrice(smetaList.reduce((acc, it) => acc + it.price * it.count, 0))} so&apos;m
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const summary = smetaList.map(it => `${it.roomName} (${it.dimensions})`).join(', ');
                  const config = {
                    type: `Butun Uy Smetasi (${smetaList.length} ta rom/eshik)`,
                    profile: 'Har xil (Smeta bo\'yicha)',
                    dimensions: summary,
                    color: 'Smeta ro\'yxati bo\'yicha',
                    estimatedPrice: smetaList.reduce((acc, it) => acc + it.price * it.count, 0),
                  };
                  setIsSmetaOpen(false);
                  onOrderWithConfig(config);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-cyan-500/40 text-sm transition"
              >
                Butun Uy Smetasiga Buyurtma Berish
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

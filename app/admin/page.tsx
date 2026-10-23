'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ClipboardList, 
  Coins, 
  Send, 
  Search, 
  Download, 
  RefreshCw, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { formatPrice } from '@/lib/format';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'pricing' | 'telegram'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Settings State
  const [settings, setSettings] = useState<any>({
    prices: {
      thermo78: 1450000,
      engelberg76: 1150000,
      trio60: 850000,
      slidingBalcony: 1300000,
    },
    telegram: {
      enabled: false,
      botToken: '',
      chatId: '',
    },
  });

  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/settings?admin=true').then((res) => {
      if (res.ok) { setIsAuthenticated(true); fetchData(); }
    }).catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setLoginError(false);
        fetchData();
      } else {
        setLoginError(true);
      }
    } catch {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, settingsRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/settings?admin=true'),
      ]);
      const ordersData = await ordersRes.json();
      const settingsData = await settingsRes.json();
      if (!ordersRes.ok || !settingsRes.ok) throw new Error('Sessiya tugagan. Qayta kiring.');

      setOrders(ordersData);
      setSettings(settingsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Holatni saqlab bo‘lmadi');
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    } catch (err) {
      alert('Xatolik yuz berdi');
    }
  };

  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prices: settings.prices }),
      });
      if (res.ok) alert('Narxlar muvaffaqiyatli saqlandi!');
    } catch {
      alert('Saqlashda xatolik');
    }
  };

  const handleSaveTelegram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram: settings.telegram }),
      });
      if (res.ok) alert('Telegram sozlamalari saqlandi!');
    } catch {
      alert('Saqlashda xatolik');
    }
  };

  const handleTestTelegram = async () => {
    setTestResult('Xabar yuborilmoqda...');
    try {
      const res = await fetch('/api/telegram/test', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setTestResult('✅ Xabar Telegramga muvaffaqiyatli yetib bordi!');
      } else {
        setTestResult(`❌ Xatolik: ${data.reason || data.error || 'Sozlamalarni tekshiring'}`);
      }
    } catch (err: any) {
      setTestResult(`❌ Server xatosi: ${err.message}`);
    }
  };

  const exportCSV = () => {
    if (orders.length === 0) return;
    const csvCell = (value: unknown) => {
      let text = String(value ?? '');
      if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
      return `"${text.replace(/"/g, '""')}"`;
    };
    let csv = 'ID,Sana,Mijoz,Telefon,Manzil,Mahsulot,Narx,Holat\n';
    orders.forEach((o) => {
      csv += [o.id, o.date, o.name, o.phone, o.address, `${o.productDetails?.type || ''} ${o.productDetails?.dimensions || ''}`, o.productDetails?.estimatedPrice, o.status].map(csvCell).join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `imzo_rishton_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    return (
      o.name?.toLowerCase().includes(q) ||
      o.phone?.toLowerCase().includes(q) ||
      o.address?.toLowerCase().includes(q) ||
      o.id?.toLowerCase().includes(q)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Yangi':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Bog\'lanildi':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'O\'lchandi':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Bajarildi':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    }
  };

  // -------------------------------------------------------------
  // Login Screen
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060a11] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold font-outfit text-sm px-3.5 py-1.5 rounded-lg shadow-lg">
            IMZO RISHTON
          </div>
          <div>
            <h2 className="font-outfit text-2xl font-bold text-white">Boshqaruv Paneli</h2>
            <p className="text-xs text-slate-400 mt-1">Filial tizimiga kirish uchun parolni kiriting</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin paroli"
                className="w-full bg-slate-950 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-3 text-center text-sm text-white outline-none tracking-wider"
              />
            </div>

            {loginError && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400">
                <AlertCircle className="w-4 h-4" />
                <span>Parol noto&apos;g&apos;ri!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition text-sm"
            >
              Kirish
            </button>
          </form>

          <Link href="/" className="inline-block text-xs text-slate-500 hover:text-slate-300">
            &larr; Asosiy saytga qaytish
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Dashboard Screen
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <header className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black font-outfit text-base px-3 py-1 rounded-lg">
              IMZO
            </div>
            <div>
              <h1 className="font-outfit font-extrabold text-lg sm:text-xl text-white">
                Rishton Filiali
              </h1>
              <div className="text-xs text-slate-400">Boshqaruv va Arizalar Paneli</div>
            </div>
            <span className="ml-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
              Menejer
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Saytni ochish</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-3.5 py-2 rounded-xl transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Chiqish</span>
            </button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/70 border border-white/10 p-5 rounded-2xl">
            <div className="text-xs text-slate-400">Jami Arizalar</div>
            <div className="font-outfit font-black text-2xl sm:text-3xl text-white mt-1">{orders.length}</div>
          </div>

          <div className="bg-slate-900/70 border border-white/10 p-5 rounded-2xl">
            <div className="text-xs text-slate-400">Yangi Arizalar</div>
            <div className="font-outfit font-black text-2xl sm:text-3xl text-cyan-400 mt-1">
              {orders.filter((o) => o.status === 'Yangi').length}
            </div>
          </div>

          <div className="bg-slate-900/70 border border-white/10 p-5 rounded-2xl">
            <div className="text-xs text-slate-400">Bajarilgan / O&apos;lchangan</div>
            <div className="font-outfit font-black text-2xl sm:text-3xl text-emerald-400 mt-1">
              {orders.filter((o) => o.status === 'Bajarildi' || o.status === 'O\'lchandi').length}
            </div>
          </div>

          <div className="bg-slate-900/70 border border-white/10 p-5 rounded-2xl">
            <div className="text-xs text-slate-400">Telegram Bot Holati</div>
            <div className="font-outfit font-bold text-base sm:text-lg mt-2 flex items-center gap-1.5">
              {settings.telegram?.enabled ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Faol Ulangan
                </span>
              ) : (
                <span className="text-slate-500">O&apos;chirilgan</span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white'
                : 'bg-white/[0.03] text-slate-400 hover:text-white'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Arizalar Ro&apos;yxati ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'pricing'
                ? 'bg-blue-600 text-white'
                : 'bg-white/[0.03] text-slate-400 hover:text-white'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Kalkulyator Narxlari</span>
          </button>

          <button
            onClick={() => setActiveTab('telegram')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'telegram'
                ? 'bg-blue-600 text-white'
                : 'bg-white/[0.03] text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Telegram Bot Sozlamasi</span>
          </button>
        </div>

        {/* TAB 1: Orders Table */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Ism, telefon yoki manzil bo'yicha qidiruv..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchData}
                  className="flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 border border-white/10 px-3.5 py-2.5 rounded-xl text-slate-300"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Yangilash</span>
                </button>

                <button
                  onClick={exportCSV}
                  className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white px-4 py-2.5 rounded-xl shadow-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Excel / CSV</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-x-auto shadow-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">ID</th>
                    <th className="py-3.5 px-4">Sana</th>
                    <th className="py-3.5 px-4">Mijoz</th>
                    <th className="py-3.5 px-4">Telefon</th>
                    <th className="py-3.5 px-4">Manzil</th>
                    <th className="py-3.5 px-4">Mahsulot / O&apos;lcham</th>
                    <th className="py-3.5 px-4">Narx</th>
                    <th className="py-3.5 px-4">Holat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500">
                        Arizalar topilmadi
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-3 px-4 font-mono font-bold text-cyan-400">{order.id}</td>
                        <td className="py-3 px-4 text-slate-400">
                          {new Date(order.date).toLocaleString('uz-UZ', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="py-3 px-4 font-bold text-white">{order.name}</td>
                        <td className="py-3 px-4">
                          <a
                            href={`tel:${order.phone}`}
                            className="flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
                          >
                            <Phone className="w-3 h-3" />
                            {order.phone}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-slate-300 max-w-xs truncate">
                          {order.address || '-'}
                        </td>
                        <td className="py-3 px-4 text-slate-200">
                          {order.productDetails ? (
                            <div>
                              <div className="font-semibold">{order.productDetails.profile || order.productDetails.type}</div>
                              <div className="text-[11px] text-slate-400">{order.productDetails.dimensions}</div>
                            </div>
                          ) : (
                            <span className="text-slate-500">{order.source}</span>
                          )}
                        </td>
                        <td suppressHydrationWarning className="py-3 px-4 font-outfit font-bold text-amber-400">
                          {order.productDetails?.estimatedPrice
                            ? formatPrice(order.productDetails.estimatedPrice) + ' so\'m'
                            : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg border text-xs font-bold outline-none cursor-pointer ${getStatusColor(
                              order.status
                            )}`}
                          >
                            <option value="Yangi" className="bg-slate-900 text-white">Yangi</option>
                            <option value="Bog'lanildi" className="bg-slate-900 text-white">Bog&apos;lanildi</option>
                            <option value="O'lchandi" className="bg-slate-900 text-white">O&apos;lchandi</option>
                            <option value="Bajarildi" className="bg-slate-900 text-white">Bajarildi</option>
                            <option value="Bekor qilindi" className="bg-slate-900 text-white">Bekor qilindi</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Pricing */}
        {activeTab === 'pricing' && (
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl backdrop-blur-xl space-y-6">
            <div>
              <h3 className="font-outfit font-bold text-xl text-white">
                Kalkulyator Narxlarini Sozlash (so&apos;m / m²)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Bu yerda o&apos;zgartirilgan narxlar veb-saytdagi kalkulyatorda darhol avtomatik amal qiladi.
              </p>
            </div>

            <form onSubmit={handleSavePricing} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">IMZO Thermo 78 (Alyuminiy):</label>
                  <input
                    type="number"
                    value={settings.prices?.thermo78 || 1450000}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        prices: { ...settings.prices, thermo78: Number(e.target.value) },
                      })
                    }
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Engelberg 76 PVX:</label>
                  <input
                    type="number"
                    value={settings.prices?.engelberg76 || 1150000}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        prices: { ...settings.prices, engelberg76: Number(e.target.value) },
                      })
                    }
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">IMZO Trio 60 PVX:</label>
                  <input
                    type="number"
                    value={settings.prices?.trio60 || 850000}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        prices: { ...settings.prices, trio60: Number(e.target.value) },
                      })
                    }
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Surma (Sliding) Vitraj:</label>
                  <input
                    type="number"
                    value={settings.prices?.slidingBalcony || 1300000}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        prices: { ...settings.prices, slidingBalcony: Number(e.target.value) },
                      })
                    }
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg"
              >
                Narxlarni Saqlash
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: Telegram Settings */}
        {activeTab === 'telegram' && (
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl backdrop-blur-xl space-y-6">
            <div>
              <h3 className="font-outfit font-bold text-xl text-white">
                Telegram Bot Xabarnoma Tizimi
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Saytda mijoz ariza qoldirganda real vaqt rejimida Telegram guruh yoki profilingizga xabar yuboriladi.
              </p>
            </div>

            <form onSubmit={handleSaveTelegram} className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer bg-black/30 p-3 rounded-xl border border-white/10">
                <input
                  type="checkbox"
                  checked={settings.telegram?.enabled || false}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      telegram: { ...settings.telegram, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 accent-cyan-400 rounded"
                />
                <span className="text-xs font-bold text-white">
                  Telegram orqali xabar yuborishni faollashtirish
                </span>
              </label>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Telegram Bot Token (@BotFather):
                </label>
                <input
                  type="password"
                  placeholder={settings.telegram?.tokenConfigured ? 'Token saqlangan (almashtirish uchun kiriting)' : 'Bot tokenini kiriting'}
                  value={settings.telegram?.botToken || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      telegram: { ...settings.telegram, botToken: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <div className="text-[11px] text-slate-500 mt-1">
                  Telegramda <b>@BotFather</b> ga kirib /newbot buyrug&apos;i bilan bot oching va berilgan tokenni bu yerga yozing.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Chat ID yoki Guruh ID:
                </label>
                <input
                  type="text"
                  placeholder="Masalan: 123456789 yoki -100123456789"
                  value={settings.telegram?.chatId || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      telegram: { ...settings.telegram, chatId: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <div className="text-[11px] text-slate-500 mt-1">
                  O&apos;z ID raqamingizni bilish uchun <b>@userinfobot</b> ga /start yozing. Guruh uchun esa botni guruhga qo&apos;shing.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg"
                >
                  Sozlamalarni Saqlash
                </button>

                <button
                  type="button"
                  onClick={handleTestTelegram}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold px-4 py-2.5 rounded-xl text-xs"
                >
                  🔔 Test Xabar Yuborish
                </button>
              </div>

              {testResult && (
                <div className="p-3 bg-black/40 border border-white/10 rounded-xl text-xs">
                  {testResult}
                </div>
              )}
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

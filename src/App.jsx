import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Ban, 
  Wallet, 
  Globe, 
  CreditCard, 
  Building2, 
  Info,
  ExternalLink // Yeni ikon eklendi
} from 'lucide-react';

// --- Veri Seti (Videodaki Analize Göre) ---
const fintechData = [
  // Popüler & Büyükler
  {
    id: 1,
    name: "Papara",
    status: "caution",
    category: "Popüler",
    description: "Satış sürecinde olduğu için belirsizlik hakim. Şu an yeni kart açma ve havale işlemleri kısıtlı olabilir.",
    features: ["Cüzdan", "Kart", "Cashback"],
    videoNote: "TCMB tarafından satışa konuldu, 2-3 ay temkinli yaklaşılmalı."
  },
  {
    id: 2,
    name: "Tosla",
    status: "neutral",
    category: "Banka Destekli",
    owner: "Akbank",
    description: "Eski avantajlarını yitirdi. Cashback oranları düşük ve işlem ücretleri var.",
    features: ["Ön Ödemeli Kart", "Oyun Ödemeleri"],
    videoNote: "Kullanmanın pek bir mantığı kalmadı."
  },
  {
    id: 3,
    name: "Pep",
    status: "inactive",
    category: "Transfer",
    description: "Eskiden yurt dışı transferlerinde liderdi ancak şu an rekabet gücünü kaybetti.",
    features: ["Yurt Dışı Transfer", "Pegasus Kart"],
    videoNote: "Tarihin tozlu sayfalarına gömüldü."
  },
  {
    id: 4,
    name: "Ozan SuperApp",
    status: "banned",
    category: "Yasaklı/Riskli",
    description: "Faaliyet izinlerinin (A, B, C) kapalı olduğu belirtiliyor.",
    features: [],
    videoNote: "Tüm ana izinleri kapalı."
  },
  {
    id: 5,
    name: "Hadi (TomBank)",
    status: "active",
    category: "Banka Destekli",
    owner: "A101",
    description: "Elektronik para kuruluşu olarak başladı, dijital bankacılığa evrildi. A101 avantajları sunuyor.",
    features: ["Veresiye", "Alışveriş Kredisi"],
    videoNote: "Daha çok orta yaş kitlesine hitap ediyor."
  },
  
  // E-Ticaret & Perakende
  {
    id: 6,
    name: "Hepsipay",
    status: "active",
    category: "E-Ticaret",
    owner: "Hepsiburada",
    description: "Hepsiburada ekosistemi için güçlü bir cüzdan. Altın/Gümüş yatırımı imkanı var.",
    features: ["Hemen Al Sonra Öde", "Yatırım"],
    videoNote: "Fatura ödeme yok ama alışveriş kredisi için iyi."
  },
  {
    id: 7,
    name: "Fups",
    status: "neutral",
    category: "Perakende",
    description: "Gençlere ve oyunlara yönelik. Revolut iddiaları olsa da Türkiye'de etkisi sınırlı.",
    features: ["Kart Paylaşımı", "Oyun"],
    videoNote: "Apple Pay gelmediği sürece Revolut söylentisi anlamsız."
  },
  
  // Operatör & Banka
  {
    id: 8,
    name: "Paycell",
    status: "active",
    category: "Operatör",
    owner: "Turkcell",
    description: "Tüm yasal izinlere sahip ancak yüksek komisyonlar ve kötü arayüz deneyimi sunuyor.",
    features: ["Mobil Ödeme", "Fatura Yansıtma"],
    videoNote: "Ücretler ve arayüz nedeniyle önerilmiyor."
  },
  {
    id: 9,
    name: "Ziraat Pay",
    status: "active",
    category: "Banka Destekli",
    owner: "Ziraat Bankası",
    description: "Aslında bir nevi ATM kartı. Havale hizmeti yok ama en güvenilir sistemlerden biri.",
    features: ["ATM Kullanımı", "Güvenlik"],
    videoNote: "Komisyonsuz işlem için ideal."
  },
  {
    id: 10,
    name: "Nays",
    status: "active",
    category: "Banka Destekli",
    owner: "İş Bankası",
    description: "Fintech değil, doğrudan banka uygulamasıdır. Kampanyaları ve güvenilirliği yüksektir.",
    features: ["Yüksek Cashback", "Borç Alma"],
    videoNote: "Listede yoktu çünkü o bir Fintech değil, Banka."
  },

  // Transfer Odaklı
  {
    id: 11,
    name: "Quick Para",
    status: "recommended",
    category: "Transfer",
    description: "KoronaPay altyapısı ile Rusya ve Türki Cumhuriyetlere ücretsiz transfer imkanı.",
    features: ["Ücretsiz Transfer", "KoronaPay"],
    videoNote: "Yurt dışı para transferi için en mantıklısı."
  },
  {
    id: 12,
    name: "Uption",
    status: "active",
    category: "Transfer",
    owner: "Aktif Bank",
    description: "Uluslararası transferler için güvenilir bir seçenek.",
    features: ["IBAN'a Transfer", "Döviz"],
    videoNote: "Cashback oranları düşük ama transferde iyi."
  },

  // Riskli / Yasaklı / Diğer
  {
    id: 13,
    name: "Ezypay (Fzy)",
    status: "banned",
    category: "Yasaklı/Riskli",
    description: "Mal varlığı dondurulmuş, tamamen yasaklı kuruluş.",
    features: [],
    videoNote: "Uzak durulmalı."
  },
  {
    id: 14,
    name: "CMT Cüzdan",
    status: "caution",
    category: "Riskli",
    description: "Kullanıcı paralarının içeride kaldığına dair yoğun şikayetler var.",
    features: [],
    videoNote: "Dolandırıcılık iddiaları mevcut."
  },
  {
    id: 15,
    name: "ParaQR / Parolapara",
    status: "banned",
    category: "Yasaklı/Riskli",
    description: "Faaliyet izinlerinin durdurulduğu belirtiliyor.",
    features: [],
    videoNote: "B ve C izinleri kapalı."
  }
];

// --- Helper Fonksiyonlar ---
const getStatusConfig = (status) => {
  switch (status) {
    case 'recommended':
      return { color: 'bg-emerald-500', text: 'Önerilen', icon: ShieldCheck, border: 'border-emerald-500/50', bg: 'bg-emerald-500/10' };
    case 'active':
      return { color: 'bg-blue-500', text: 'Aktif', icon: ShieldCheck, border: 'border-blue-500/30', bg: 'bg-blue-500/10' };
    case 'caution':
      return { color: 'bg-amber-500', text: 'Dikkatli Ol', icon: AlertTriangle, border: 'border-amber-500/50', bg: 'bg-amber-500/10' };
    case 'neutral':
      return { color: 'bg-slate-400', text: 'Nötr/Pasif', icon: Info, border: 'border-slate-500/30', bg: 'bg-slate-500/10' };
    case 'inactive':
      return { color: 'bg-slate-600', text: 'Atıl/Eski', icon: Info, border: 'border-slate-600/30', bg: 'bg-slate-600/10' };
    case 'banned':
      return { color: 'bg-red-600', text: 'Yasaklı/Riskli', icon: Ban, border: 'border-red-600/50', bg: 'bg-red-600/10' };
    default:
      return { color: 'bg-slate-500', text: 'Bilinmiyor', icon: Info, border: 'border-slate-500', bg: 'bg-slate-500/10' };
  }
};

const getCategoryIcon = (category) => {
  if (category.includes('Banka')) return Building2;
  if (category.includes('Transfer')) return Globe;
  if (category.includes('E-Ticaret')) return Wallet;
  if (category.includes('Riskli')) return AlertTriangle;
  return CreditCard;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const categories = ['Tümü', 'Popüler', 'Banka Destekli', 'Transfer', 'E-Ticaret', 'Operatör', 'Yasaklı/Riskli'];

  const filteredData = useMemo(() => {
    return fintechData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory || 
                              (selectedCategory === 'Yasaklı/Riskli' && (item.status === 'banned' || item.category === 'Riskli'));
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-indigo-500">
      
      {/* Header & Hero Section */}
      <div className="relative bg-gradient-to-b from-indigo-900/40 to-slate-900 pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-500/20 p-3 rounded-2xl border border-indigo-400/20 backdrop-blur-sm">
              <Wallet className="w-8 h-8 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Türkiye Fintech Radar
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Türkiye'deki elektronik para ve ödeme kuruluşlarının güncel durumları, 
            yasal izinleri ve güvenilirlik analizleri.
          </p>

          {/* Search & Filter Container */}
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl leading-5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 sm:text-sm transition-all shadow-xl backdrop-blur-md"
                placeholder="Kuruluş adı veya özellik ara (örn: Papara, Transfer, Altın...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats/Legend Bar */}
      <div className="border-b border-white/5 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-4 justify-center md:justify-start items-center text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Durum Rehberi:</span>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Güvenli/Önerilen</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Aktif</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Dikkat</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-600"></span>Yasaklı</div>
          <div className="ml-auto hidden md:block">
            Gösterilen: <span className="text-white font-mono">{filteredData.length}</span> Kuruluş
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center p-4 bg-slate-800 rounded-full mb-4">
              <Search className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white">Sonuç Bulunamadı</h3>
            <p className="text-slate-400 mt-2">Arama kriterlerinize uygun bir fintech kuruluşu yok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => {
              const statusConfig = getStatusConfig(item.status);
              const CatIcon = getCategoryIcon(item.category);

              return (
                <div 
                  key={item.id} 
                  className={`group relative flex flex-col bg-slate-800/40 backdrop-blur-sm rounded-2xl border ${statusConfig.border} hover:border-opacity-100 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden`}
                >
                  {/* Card Header */}
                  <div className={`px-6 py-4 border-b border-white/5 flex justify-between items-start ${statusConfig.bg}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white tracking-wide">{item.name}</h3>
                        {item.owner && (
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold bg-slate-900/50 px-2 py-0.5 rounded">
                            {item.owner}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <CatIcon className="w-3.5 h-3.5" />
                        {item.category}
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${statusConfig.color} text-white shadow-lg`}>
                      <statusConfig.icon className="w-3 h-3" />
                      {statusConfig.text}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-grow">
                      {item.description}
                    </p>
                    
                    {/* Video Analysis Note */}
                    <div className="bg-slate-900/50 rounded-lg p-3 mb-4 border border-white/5">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-slate-400 italic">
                          "<span className="text-slate-300">{item.videoNote}</span>"
                        </p>
                      </div>
                    </div>

                    {/* Features Tags */}
                    {item.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-slate-400 font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Decorative Gradient */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
          
          {/* Video Alıntı Kartı */}
          <a 
            href="https://www.youtube.com/watch?v=2sYJMMPwbdI" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group mb-8 flex items-center gap-3 px-5 py-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-red-900/50 hover:bg-red-900/10 transition-all duration-300"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/10 group-hover:bg-red-600 text-red-500 group-hover:text-white transition-colors">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-0.5">Veri Kaynağı & İnceleme</p>
              <h4 className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                TÜRKİYE'DEKİ TÜM FİNTECH KURULUŞLARI İNCELEMESİ | 63 TANE
              </h4>
            </div>
          </a>

          <p className="text-slate-500 text-sm mb-2 max-w-2xl">
            Bu rehberdeki veriler ve analiz notları, yukarıdaki video incelemesi ve 6493 sayılı kanun kapsamındaki genel bilgiler ışığında derlenmiştir.
          </p>
          <p className="text-slate-600 text-xs">
            Yatırım tavsiyesi değildir. Lütfen güncel yasal durumları resmi kaynaklardan kontrol ediniz.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
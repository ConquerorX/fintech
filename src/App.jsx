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
  ExternalLink,
  Smartphone,
  Zap,
  Filter,
  X,
  ChevronRight,
  Link as LinkIcon
} from 'lucide-react';

// --- TAM LİSTE (Düzeltilmiş ve Doğrulanmış İsimler) ---
const fintechData = [
  // --- Popüler / Büyükler ---
  {
    id: 1,
    name: "Papara",
    status: "caution",
    category: "Popüler",
    description: "Satış sürecinde olduğu için belirsizlik hakim. Şu an yeni kart açma ve havale işlemleri kısıtlı.",
    features: ["Cüzdan", "Kart", "Cashback"],
    videoNote: "TCMB satışa koydu, 2-3 ay temkinli yaklaşılmalı."
  },
  {
    id: 2,
    name: "Tosla",
    status: "neutral",
    category: "Banka Destekli",
    owner: "Akbank",
    description: "Eski avantajlarını yitirdi. Cashback oranları düşük ve işlem ücretleri var.",
    features: ["Ön Ödemeli Kart", "Oyun"],
    videoNote: "Kullanmanın pek bir mantığı kalmadı."
  },
  {
    id: 3,
    name: "PeP",
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
    features: ["Veresiye", "Kredi"],
    videoNote: "Orta yaş kitlesine hitap ediyor."
  },
  {
    id: 6,
    name: "Param",
    status: "active",
    category: "Kurumsal",
    description: "Çok büyük bir ağa sahip, devletle (Adalet Bakanlığı) çalışıyor. Bireysel avantajı az ama çok sağlam.",
    features: ["BaroKart", "Kurumsal"],
    videoNote: "Batacak bir hizmet değil, devletle çalışıyor."
  },
  
  // --- E-Ticaret / Perakende ---
  {
    id: 7,
    name: "Hepsipay",
    status: "active",
    category: "E-Ticaret",
    owner: "Hepsiburada",
    description: "Hepsiburada ekosistemi için güçlü bir cüzdan. Altın/Gümüş yatırımı imkanı var.",
    features: ["Hemen Al Sonra Öde", "Yatırım"],
    videoNote: "Fatura ödeme yok ama alışveriş kredisi için iyi."
  },
  {
    id: 8,
    name: "Trendyol Cüzdan",
    status: "inactive",
    category: "E-Ticaret",
    owner: "Trendyol",
    description: "Resmiyette var ama hizmetlere erişim kısıtlı veya kapalı.",
    features: ["Cüzdan"],
    videoNote: "Hizmetlerini kullanıcıya kapattı diye biliniyor."
  },
  {
    id: 9,
    name: "Fups",
    status: "neutral",
    category: "Perakende",
    description: "Gençlere ve oyunlara yönelik. Revolut iddiaları olsa da Türkiye'de etkisi sınırlı.",
    features: ["Kart Paylaşımı", "BİM"],
    videoNote: "Apple Pay gelmediği sürece Revolut söylentisi anlamsız."
  },
  {
    id: 10,
    name: "MoneyPay",
    status: "active",
    category: "Perakende",
    owner: "Migros",
    description: "Migros çalışanları ve sık müşterileri için avantajlı. Diğer yerlerde kampanyası az.",
    features: ["Migros", "Hazır Limit"],
    videoNote: "Son kullanıcıyı çok idame eden bir hizmet değil."
  },

  // --- Operatörler ---
  {
    id: 11,
    name: "Paycell",
    status: "active",
    category: "Operatör",
    owner: "Turkcell",
    description: "Tüm yasal izinlere sahip ancak yüksek komisyonlar ve kötü arayüz deneyimi sunuyor.",
    features: ["Mobil Ödeme", "Fatura Yansıtma"],
    videoNote: "Ücretler ve arayüz nedeniyle önerilmiyor."
  },
  {
    id: 12,
    name: "Vodafone Pay",
    status: "neutral",
    category: "Operatör",
    owner: "Vodafone",
    description: "Ciddi bir kampanyası yok. Ziraat Genç Kart harçlık avansını nakde çevirmek için kullanılıyor.",
    features: ["Mobil Ödeme"],
    videoNote: "Kart olarak adam akıllı kampanyası yok."
  },
  {
    id: 13,
    name: "Pokus",
    status: "active",
    category: "Operatör",
    owner: "Türk Telekom",
    description: "Para transferlerinde yüksek ücretler alabiliyor. D (Operatör) izni mevcut.",
    features: ["Mobil Ödeme"],
    videoNote: "Para havalesi sıkıntılı ve masraflı."
  },

  // --- Banka İştirakleri ---
  {
    id: 14,
    name: "Ziraat Pay",
    status: "recommended",
    category: "Banka Destekli",
    owner: "Ziraat Bankası",
    description: "Komisyonsuz işlem için en güvenilir ATM kartı işlevi görür.",
    features: ["ATM Kullanımı", "Güvenlik"],
    videoNote: "En güvenilir sistem, komisyonsuz."
  },
  {
    id: 15,
    name: "Nays",
    status: "recommended",
    category: "Banka Destekli",
    owner: "İş Bankası",
    description: "Doğrudan banka uygulamasıdır (Fintech değil). Kampanyaları çok iyidir.",
    features: ["Cashback", "Borç Alma"],
    videoNote: "Listede yoktu çünkü o bir Banka, Fintech değil."
  },
  {
    id: 16,
    name: "Tami",
    status: "neutral",
    category: "Banka Destekli",
    owner: "Garanti",
    description: "Havale/EFT ücretleri yüksek, kampanyaları sönük kaldı.",
    features: ["Kredi"],
    videoNote: "Çok karlı bir sistem olduğunu düşünmüyorum."
  },
  {
    id: 17,
    name: "N Kolay",
    status: "active",
    category: "Banka Destekli",
    owner: "Aktif Bank",
    description: "Aktif Bank'ın dijital yüzü. Bono, döviz, kredi işlemleri için güçlü.",
    features: ["Bono", "Kredi"],
    videoNote: "Gerekli izinlerin neredeyse hepsi var."
  },
  {
    id: 18,
    name: "Uption",
    status: "recommended",
    category: "Transfer",
    owner: "Aktif Bank",
    description: "Uluslararası transferler için çok güçlü. Cashback düşük ama transfer güvenli.",
    features: ["IBAN'a Transfer", "Döviz"],
    videoNote: "Para transferleri için en güvenli sistemlerden."
  },

  // --- Diğerleri (Alfabetik/Grup) ---
  { id: 19, name: "Mor Para", status: "neutral", category: "Diğer", description: "İrili ufaklı bir şirket. Ek hizmet sunamıyor.", videoNote: "Yasal kullanılabilir ama küçük." },
  { id: 20, name: "AHL Pay", status: "neutral", category: "Diğer", description: "Reklamlarla çıktı ama şu an sessiz.", videoNote: "Kimse konuşmuyor artık." },
  { id: 21, name: "Manibux", status: "neutral", category: "Diğer", description: "Papara alternatifi sunuldu ama cashback yetersiz.", videoNote: "Adam akıllı cashback yok." },
  { id: 22, name: "Biso", status: "neutral", category: "Transfer", description: "Sadece para transferi, cüzdan özelliği kısıtlı.", videoNote: "Cüzdan olarak kullanılamıyor." },
  { id: 23, name: "İstanbulKart", status: "active", category: "Ulaşım", description: "Fatura ödeme hariç birçok işlem yapılıyor.", videoNote: "Ulaşım ve marketlerde geçiyor." },
  { id: 24, name: "BPN", status: "neutral", category: "Transfer", description: "Sadece para transferi odaklı.", videoNote: "İsmi sanı duyulmamış." },
  { id: 25, name: "CMT Cüzdan", status: "caution", category: "Riskli", description: "Paraların içeride kaldığına dair şikayetler var.", videoNote: "Dolandırıcılık iddiaları, dikkat." },
  { id: 26, name: "Dynamic (Dinamik) Pay", status: "neutral", category: "Transfer", description: "Cüzdan hizmeti zayıf, transfer odaklı.", videoNote: "Transferle öne çıkan uygulama." },
  { id: 27, name: "Opet Bilgi (Opet Pay)", status: "active", category: "Ulaşım", description: "Opet yakıt puanları için kullanışlı.", videoNote: "Arabayla seyahat edenler için." },
  { id: 28, name: "DenizPay", status: "inactive", category: "Banka Destekli", description: "Artık adı sanı hatırlanmıyor.", videoNote: "Eskiden kullanılırdı, şimdi yok." },
  { id: 29, name: "Parazula (Eski Elpay)", status: "caution", category: "Diğer", description: "Eski ismi Elpay, şu an Parazula/Paybull altında.", videoNote: "Önceden yasaklanmış bir kuruluş." },
  { id: 30, name: "Faturamatik", status: "active", category: "Fatura", description: "Fatura ödeniyor ama komisyon yüksek.", videoNote: "Bankadan ödemek daha mantıklı." },
  { id: 31, name: "Fairpay", status: "inactive", category: "Diğer", description: "Şu an hizmet vermiyor, yeni oluşum.", videoNote: "Yakında açılacağı umuluyor." },
  { id: 32, name: "Fizy (Fzy) Pay", status: "banned", category: "Yasaklı/Riskli", description: "Mal varlığı donduruldu.", videoNote: "Direkt yasaklı, kullanamazsınız." },
  { id: 33, name: "Gönderal", status: "neutral", category: "Transfer", description: "Sadece para transferine çalışıyor.", videoNote: "Tüm izinler var ama sadece transfer." },
  { id: 34, name: "Parao", status: "neutral", category: "Diğer", description: "Yakında gelecek deniyor.", videoNote: "Kartları yakında gelecek." },
  { id: 35, name: "HiPay (High)", status: "neutral", category: "Diğer", description: "Hakkında çok bilgi yok.", videoNote: "İncelemeye değer görülmedi." },
  { id: 36, name: "IstPay", status: "inactive", category: "Diğer", description: "Görünürde var ama yok.", videoNote: "Kullanıcısı var mı bilinmiyor." },
  { id: 37, name: "Iyzico", status: "active", category: "E-Ticaret", description: "Daha çok POS hizmeti, bireysel cüzdanı karışık.", videoNote: "Mobil uygulaması çok karışık." },
  { id: 38, name: "Junom", status: "neutral", category: "Diğer", description: "Sadece web sitesi var.", videoNote: "Ne olduğu çözülemedi." },
  { id: 39, name: "Moka", status: "active", category: "Altyapı", description: "Birleşik Ödeme (United) altyapısı.", videoNote: "Birçok şirketin altyapısını sağlıyor." },
  { id: 40, name: "Mars", status: "active", category: "Diğer", description: "Moka altyapısını kullanıyor.", videoNote: "Moka United altyapısı." },
  { id: 41, name: "Turan", status: "recommended", category: "Transfer", description: "Türk devletlerine para transferi (Moka altyapısı).", videoNote: "Moka altyapısı." },
  { id: 42, name: "Moneymate", status: "neutral", category: "Diğer", description: "Adı sanı duyulmamış.", videoNote: "Cashback hizmeti yok." },
  { id: 43, name: "Moneyout", status: "neutral", category: "Diğer", description: "Bilinmiyor.", videoNote: "Bilinmiyor." },
  { id: 44, name: "NomaPay", status: "neutral", category: "Diğer", description: "Havale ve fatura ödeme yok.", videoNote: "Kimse duymadı." },
  { id: 45, name: "Papel", status: "inactive", category: "Diğer", description: "Yakın zamanda kapandı.", videoNote: "Yazık oldu, güzel cashbackleri vardı." },
  { id: 46, name: "Parakolay", status: "neutral", category: "Diğer", description: "Fatura hizmeti yok.", videoNote: "İsmi duyulmadı." },
  { id: 47, name: "Paratim", status: "neutral", category: "Diğer", description: "Ses soluk yok.", videoNote: "Tutunamadılar." },
  { id: 48, name: "ParaQR", status: "banned", category: "Yasaklı/Riskli", description: "İzinleri kapatıldı.", videoNote: "B ve C izinleri kapalı." },
  { id: 49, name: "Parolapara", status: "banned", category: "Yasaklı/Riskli", description: "İzinleri kapatıldı.", videoNote: "B ve C izinleri kapalı." },
  { id: 50, name: "Payka", status: "banned", category: "Yasaklı/Riskli", description: "İzinleri kapatıldı.", videoNote: "Ç ve E hizmetleri de yoktu." },
  { id: 51, name: "Quick Para", status: "recommended", category: "Transfer", description: "KoronaPay ile Rusya/Ukrayna transferi ücretsiz.", videoNote: "Yurt dışı transferi için en mantıklısı." },
  { id: 52, name: "PayTR", status: "active", category: "Altyapı", description: "Daha çok sanal POS hizmeti.", videoNote: "Cüzdan hizmetleri de var." },
  { id: 53, name: "Tiko Wallet", status: "neutral", category: "Diğer", description: "Yakında çıkacak deniyor.", videoNote: "Hiçbir reklam yok." },
  { id: 54, name: "QPay", status: "neutral", category: "Diğer", description: "İsmi duyan yok.", videoNote: "İzinleri var ama bilen yok." },
  { id: 55, name: "Rubik Para", status: "neutral", category: "Diğer", description: "Kullanıcı sayısı çok az.", videoNote: "İncelemeye değmez." },
  { id: 56, name: "SBM", status: "neutral", category: "Kurumsal", description: "Yurt dışı ve iş dünyası odaklı.", videoNote: "Niş bir kitle." },
  { id: 57, name: "Sipay (CPay)", status: "inactive", category: "Diğer", description: "Kapalı olarak görünüyor.", videoNote: "Tarihin tozlu raflarında." },
  { id: 58, name: "Ödero", status: "neutral", category: "Diğer", description: "Para havalesi ve fatura yok.", videoNote: "Ek izinleri yok." },
  { id: 59, name: "Bupara", status: "neutral", category: "Diğer", description: "Yakında gelecek.", videoNote: "Havale ve fatura yok." },
  { id: 60, name: "Çözüm (Elmacık)", status: "neutral", category: "Diğer", description: "İsmi sanı duyulmamış.", videoNote: "Çürük." },
  { id: 61, name: "TK Pay", status: "neutral", category: "Ulaşım", description: "THY ödeme sistemi.", videoNote: "Starbucks hesabı gibi." },
  { id: 62, name: "Vakıf Pay", status: "inactive", category: "Banka Destekli", description: "Cüzdan hizmetleri kapatıldı.", videoNote: "Şu an kapalı bir sistem." },
  { id: 63, name: "Vision Pay", status: "neutral", category: "Diğer", description: "Sitede bilgi yok.", videoNote: "Garip bir sistem." },
  { id: 64, name: "YemekPay", status: "neutral", category: "E-Ticaret", description: "Yemeksepeti POS hizmeti.", videoNote: "Havale/Fatura yok." },
  { id: 65, name: "1000Pay (BinPay)", status: "banned", category: "Yasaklı/Riskli", description: "Yayıncı tarafından ağır eleştirilen ve telif atan kurum. 1000 Yatırımlar Holding iştiraki.", videoNote: "Uzak durulmalı, eleştiriye kapalılar." },
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
      return { color: 'bg-slate-500', text: 'Nötr/Pasif', icon: Info, border: 'border-slate-500/30', bg: 'bg-slate-500/10' };
    case 'inactive':
      return { color: 'bg-slate-700', text: 'Atıl/Kapalı', icon: Info, border: 'border-slate-700/30', bg: 'bg-slate-700/10' };
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
  if (category.includes('Operatör')) return Smartphone;
  if (category.includes('Altyapı')) return Zap;
  return CreditCard;
};

// URL Eşleştirme Fonksiyonu
const getCompanyUrl = (companyName) => {
  const urlMap = {
    "Papara": "https://www.papara.com",
    "Tosla": "https://tosla.com",
    "PeP": "https://www.peple.com.tr",
    "Hadi (TomBank)": "https://www.hadikredi.com",
    "Param": "https://param.com.tr",
    "Hepsipay": "https://www.hepsipay.com",
    "Paycell": "https://paycell.com.tr",
    "Nays": "https://www.naysapp.com.tr",
    "Ziraat Pay": "https://www.ziraatbank.com.tr",
    "Uption": "https://uption.com.tr",
    "Fups": "https://fups.com",
    "Pokus": "https://pokus.com.tr",
    "Iyzico": "https://www.iyzico.com",
    "PayTR": "https://www.paytr.com",
    "Moka": "https://www.moka.com",
    "İstanbulKart": "https://www.istanbulkart.istanbul",
    "Manibux": "https://www.manibux.com",
    "MoneyPay": "https://moneypay.com.tr",
    "Turan": "https://turan.app",
    "N Kolay": "https://www.nkolay.com.tr"
  };

  return urlMap[companyName] || `https://www.google.com/search?q=${companyName}+fintech+resmi+sitesi`;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const categories = ['Tümü', 'Popüler', 'Banka Destekli', 'Transfer', 'E-Ticaret', 'Operatör', 'Yasaklı/Riskli', 'Diğer'];

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
      <div className="relative bg-gradient-to-b from-indigo-900/40 to-slate-900 pt-10 pb-8 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-500/20 p-3 rounded-2xl border border-indigo-400/20 backdrop-blur-sm shadow-xl">
              <Wallet className="w-8 h-8 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Türkiye Fintech Radar
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            Türkiye'deki 60+ elektronik para ve ödeme kuruluşunun güncel yasal durumları ve analizleri.
          </p>

          {/* Sticky Search & Filter Container for Mobile */}
          <div className="sticky top-2 z-30 max-w-3xl mx-auto space-y-3 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/5 shadow-2xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl leading-5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                placeholder="Kuruluş ara (örn: Papara, Ziraat...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Horizontal Scrollable Filters */}
            <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide -mx-1 px-1 md:justify-center justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 border whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white'
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
      <div className="border-b border-white/5 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start items-center text-[10px] md:text-xs text-slate-400">
          <span className="font-semibold text-slate-300 hidden md:block">Durum Rehberi:</span>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Güvenli</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Aktif</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Dikkat</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-600"></span>Yasaklı</div>
          <div className="ml-auto font-mono text-indigo-400">
            {filteredData.length} Kayıt
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center p-4 bg-slate-800 rounded-full mb-4">
              <Filter className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white">Sonuç Bulunamadı</h3>
            <p className="text-slate-400 mt-2">Arama kriterlerinize uygun bir kuruluş yok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredData.map((item) => {
              const statusConfig = getStatusConfig(item.status);
              const CatIcon = getCategoryIcon(item.category);

              return (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedCompany(item)}
                  className={`group relative flex flex-col bg-slate-800/40 backdrop-blur-sm rounded-xl border ${statusConfig.border} hover:border-opacity-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden cursor-pointer`}
                >
                  {/* Card Header */}
                  <div className={`px-4 py-3 border-b border-white/5 flex justify-between items-start ${statusConfig.bg}`}>
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-lg font-bold text-white tracking-wide truncate group-hover:text-indigo-200 transition-colors">{item.name}</h3>
                        {item.owner && (
                          <span className="hidden md:inline-block text-[10px] uppercase tracking-wider text-slate-400 font-semibold bg-slate-900/50 px-1.5 py-0.5 rounded">
                            {item.owner}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
                        <CatIcon className="w-3 h-3" />
                        {item.category}
                      </div>
                    </div>
                    <div className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusConfig.color} text-white shadow-sm`}>
                      <statusConfig.icon className="w-3 h-3" />
                      <span className="hidden sm:inline">{statusConfig.text}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-grow flex flex-col">
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                      {item.description}
                    </p>
                    
                    {/* Video Note */}
                    <div className="bg-slate-900/50 rounded-lg p-2.5 mb-3 border border-white/5">
                      <div className="flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-slate-400 italic line-clamp-2">
                          "{item.videoNote}"
                        </p>
                      </div>
                    </div>

                    {/* Tags & Action Hint */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {item.features && item.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-400 font-medium">
                            {feature}
                          </span>
                        ))}
                        {item.features && item.features.length > 2 && (
                          <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-400 font-medium">+{item.features.length - 2}</span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* DETAY MODAL (POPUP) */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedCompany(null)}
          />
          
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className={`px-6 py-5 border-b border-white/5 flex justify-between items-center ${getStatusConfig(selectedCompany.status).bg}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${getStatusConfig(selectedCompany.status).color} bg-opacity-20`}>
                  {React.createElement(getCategoryIcon(selectedCompany.category), { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-wide">{selectedCompany.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-xs text-slate-300 px-2 py-0.5 bg-slate-800 rounded-full border border-slate-700">
                       {selectedCompany.category}
                     </span>
                     {selectedCompany.owner && (
                       <span className="text-xs text-indigo-300 font-semibold px-2 py-0.5">
                         {selectedCompany.owner} İştiraki
                       </span>
                     )}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedCompany(null)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Status Banner */}
              <div className={`flex items-center gap-3 p-4 rounded-xl border ${getStatusConfig(selectedCompany.status).border} ${getStatusConfig(selectedCompany.status).bg}`}>
                {React.createElement(getStatusConfig(selectedCompany.status).icon, { className: `w-6 h-6 ${getStatusConfig(selectedCompany.status).text.replace('text-', 'text-emerald-500').replace('text-blue', 'text-blue-400')}` })} 
                <div className="flex-1">
                  <p className="text-sm font-bold text-white uppercase tracking-wider mb-0.5">
                    Mevcut Durum: {getStatusConfig(selectedCompany.status).text}
                  </p>
                  <p className="text-xs text-slate-300">
                    Video Analizi: <span className="italic">"{selectedCompany.videoNote}"</span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Detaylı İnceleme</h4>
                <p className="text-slate-200 text-base leading-relaxed">
                  {selectedCompany.description} Bu kuruluş hakkında daha fazla bilgi ve güncel kampanyalar için aşağıdaki bağlantıyı kullanarak resmi web sitesini ziyaret edebilirsiniz.
                </p>
              </div>

              {/* Features Grid */}
              {selectedCompany.features && selectedCompany.features.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Özellikler & Hizmetler</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedCompany.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <a 
                  href={getCompanyUrl(selectedCompany.name)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25 group"
                >
                  <Globe className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Resmi Web Sitesine Git</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
                <p className="text-center text-[10px] text-slate-500 mt-3">
                  *Yönlendirilen sayfa kuruluşun resmi web sitesi veya Google arama sonuçları olabilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950 mt-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
          
          <a 
            href="https://www.youtube.com/watch?v=2sYJMMPwbdI" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group mb-6 flex items-center gap-3 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-red-900/50 hover:bg-red-900/10 transition-all duration-300 max-w-sm w-full"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600/10 group-hover:bg-red-600 text-red-500 group-hover:text-white transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-0.5">Veri Kaynağı</p>
              <h4 className="text-xs md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                TÜRKİYE'DEKİ TÜM FİNTECH KURULUŞLARI İNCELEMESİ
              </h4>
            </div>
          </a>

          <p className="text-slate-500 text-xs md:text-sm mb-2 max-w-2xl px-4">
            Bu rehberdeki veriler ve analiz notları, yukarıdaki video incelemesi ve 6493 sayılı kanun kapsamındaki genel bilgiler ışığında derlenmiştir.
          </p>
          <p className="text-slate-600 text-[10px] md:text-xs px-4">
            Yatırım tavsiyesi değildir. Lütfen güncel yasal durumları resmi kaynaklardan kontrol ediniz.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
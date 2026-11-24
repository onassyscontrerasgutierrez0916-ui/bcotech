import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShoppingCart, Search, Sun, Moon, Filter, Tag, Check, X, Plus, Minus,
  Trash2, ExternalLink, ShieldCheck, Truck, Headphones, Monitor, Mouse,
  Keyboard, Cpu, Sparkles, SlidersHorizontal, ChevronRight, ChevronLeft,
  ArrowUpDown, Eye, Settings, Package, Grid, DollarSign, Upload, Image as ImageIcon,
  Lock, LogOut, Copy, RefreshCw, MessageCircle, AlertCircle, ArrowUp, ArrowDown, Star, Phone,
  Bot, Send
} from 'lucide-react';

// --- INITIAL DATA & SEED PRODUCTS ---
const INITIAL_CATEGORIES = [
  { id: 'auriculares', name: 'Auriculares', icon: 'Headphones' },
  { id: 'teclados', name: 'Teclados', icon: 'Keyboard' },
  { id: 'mouse', name: 'Mouse & Mousepads', icon: 'Mouse' },
  { id: 'monitores', name: 'Monitores', icon: 'Monitor' },
  { id: 'accesorios', name: 'Accesorios', icon: 'Cpu' },
  { id: 'gadgets', name: 'Gadgets', icon: 'Sparkles' }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Auriculares BCO Pro Wireless ANC',
    category: 'auriculares',
    price: 129.99,
    original_price: 169.99,
    stock: 12,
    active: true,
    featured: true,
    on_sale: true,
    description: 'Auriculares Bluetooth de alta fidelidad con cancelación de ruido activa (ANC), latencia ultra baja de 15ms y 40 horas de autonomía.',
    specs: [
      { key: 'Conectividad', value: 'Bluetooth 5.3 + Dongle 2.4GHz' },
      { key: 'Drivers', value: '50mm Neodimio Custom' },
      { key: 'Autonomía', value: 'Hasta 40 horas con ANC' },
      { key: 'Peso', value: '260g Ergonomía Aero' }
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'prod-2',
    name: 'Teclado Mecánico BCO CyberBlade RGB 75%',
    category: 'teclados',
    price: 99.50,
    original_price: 125.00,
    stock: 8,
    active: true,
    featured: true,
    on_sale: true,
    description: 'Teclado compacto Hot-Swappable con switches mecánicos lineales lubricados de fábrica, perilla multimedia y chasis de aluminio pulido.',
    specs: [
      { key: 'Formato', value: '75% Compacto ANSI' },
      { key: 'Switches', value: 'BCO Cyber Yellow Lineal' },
      { key: 'Iluminación', value: 'RGB Per-Key 16.8M' },
      { key: 'Keycaps', value: 'PBT Doble Inyección' }
    ],
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'prod-3',
    name: 'Mouse BCO NeonStrike Superlight 26K',
    category: 'mouse',
    price: 69.99,
    original_price: 69.99,
    stock: 25,
    active: true,
    featured: true,
    on_sale: false,
    description: 'Mouse ultraligero de solo 49 gramos equipado con sensor óptico de 26,000 DPI, patas de PTFE puro y microswitches ópticos de 90M de clics.',
    specs: [
      { key: 'Peso', value: '49 Gramos ultra liviano' },
      { key: 'Sensor', value: 'PixArt 3395 (26,000 DPI)' },
      { key: 'Polling Rate', value: '4000 Hz Wireless Ready' },
      { key: 'Batería', value: 'Hasta 80 horas de juego continuo' }
    ],
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'prod-4',
    name: 'Monitor BCO VisionX 27" Fast-IPS 180Hz',
    category: 'monitores',
    price: 289.00,
    original_price: 349.00,
    stock: 5,
    active: true,
    featured: true,
    on_sale: true,
    description: 'Monitor pro-gaming QHD 2K (2560x1440) con panel Fast IPS, tiempo de respuesta de 0.5ms GTG, HDR400 y soporte de brazo VESA incluido.',
    specs: [
      { key: 'Resolución', value: 'QHD 2560 x 1440' },
      { key: 'Tasa de Refresco', value: '180 Hz Fast IPS' },
      { key: 'Tiempo de Respuesta', value: '0.5 ms GTG' },
      { key: 'Color', value: '99% sRGB / DCI-P3 95%' }
    ],
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'prod-5',
    name: 'Mousepad BCO Control Glider XL',
    category: 'mouse',
    price: 24.99,
    original_price: 29.99,
    stock: 40,
    active: true,
    featured: false,
    on_sale: true,
    description: 'Superficie de tela micro-tejida híbrida de 900x400mm con bordes reforzados cosidos anti-desgaste y base de goma antideslizante de 4mm.',
    specs: [
      { key: 'Dimensiones', value: '900 x 400 x 4 mm' },
      { key: 'Superficie', value: 'Micro-weave Híbrida Speed/Control' },
      { key: 'Base', value: 'Goma natural de alto agarre' }
    ],
    images: [
      'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'prod-6',
    name: 'Brazo Articulado BCO Heavy Monitor Mount',
    category: 'accesorios',
    price: 54.00,
    original_price: 54.00,
    stock: 15,
    active: true,
    featured: false,
    on_sale: false,
    description: 'Soporte con resorte de gas para pantallas de 17 a 35 pulgadas, soporta hasta 12kg con gestión integrada de cables y rotación de 360°.',
    specs: [
      { key: 'Compatibilidad', value: 'VESA 75x75 / 100x100' },
      { key: 'Carga Máxima', value: '12 kg' },
      { key: 'Ajustes', value: 'Inclinación, giro, elevación y pivot' }
    ],
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'prod-7',
    name: 'Lámpara de Monitor BCO Tech ScreenBar Duo',
    category: 'gadgets',
    price: 45.99,
    original_price: 59.99,
    stock: 18,
    active: true,
    featured: true,
    on_sale: true,
    description: 'Barra de luz LED asimétrica para monitor que elimina encandilamientos en la pantalla, con sensor de luz ambiental y dial táctil inalámbrico.',
    specs: [
      { key: 'Temperatura de color', value: '2700K - 6500K Regulable' },
      { key: 'Alimentación', value: 'USB Type-C (5V 1A)' },
      { key: 'Control', value: 'Dial Táctil Inalámbrico 2.4G' }
    ],
    images: [
      'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'prod-8',
    name: 'Docking Station BCO 11-in-1 Dual 4K',
    category: 'accesorios',
    price: 89.99,
    original_price: 109.99,
    stock: 10,
    active: true,
    featured: false,
    on_sale: true,
    description: 'Estación de acoplamiento de aluminio USB-C con passthrough de 100W PD, doble HDMI 4K, DisplayPort, Gigabit Ethernet y lector SD/TF ultrarrápido.',
    specs: [
      { key: 'Puertos', value: '2x HDMI 4K, 1x DP, 3x USB 3.1, Ethernet 1Gbps, PD 100W' },
      { key: 'Material', value: 'Aluminio anodizado CNC disipador' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

const DEFAULT_SETTINGS = {
  whatsapp: '18098435918',
  invoice_whatsapp: '',
  hero_title: 'TECNOLOGÍA DE SIGUIENTE NIVEL',
  hero_subtitle: 'Equípate con periféricos pro, monitores de alta tasa de refresco y gadgets diseñados para rendir al máximo.',
  hero_image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  store_hours: 'Lunes a Sábado: 09:00 - 20:00 hs',
  custom_logo_url: '',
  logo_pill_in_dark: true,
  supabase_url: '',
  supabase_key: ''
};

// SQL setup query generator for easy Supabase setup
const SETUP_SQL_SCRIPT = `-- SCRIPT DE CONFIGURACIÓN BCO TECH PARA SUPABASE
-- Copia y ejecuta este script en el SQL Editor de tu proyecto Supabase (puede ejecutarse varias veces sin error):

-- 1. Tabla de Categorías
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT 'Cpu',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Productos
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  stock INT DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  on_sale BOOLEAN DEFAULT FALSE,
  description TEXT,
  specs JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de Pedidos
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  notes TEXT,
  items JSONB NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'Nuevo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabla de Ajustes de Tienda
CREATE TABLE IF NOT EXISTS public.store_settings (
  id INT PRIMARY KEY DEFAULT 1,
  whatsapp TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_image TEXT,
  store_hours TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS y políticas públicas leales (Lectura pública, Escritura pública/Autenticada)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura pública de categorias" ON public.categories;
DROP POLICY IF EXISTS "Lectura pública de categorías" ON public.categories;
DROP POLICY IF EXISTS "Escritura de categorias" ON public.categories;
CREATE POLICY "Lectura pública de categorias" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Escritura de categorias" ON public.categories FOR ALL USING (true);

DROP POLICY IF EXISTS "Lectura pública de productos" ON public.products;
DROP POLICY IF EXISTS "Escritura de productos" ON public.products;
CREATE POLICY "Lectura pública de productos" ON public.products FOR SELECT USING (true);
CREATE POLICY "Escritura de productos" ON public.products FOR ALL USING (true);

DROP POLICY IF EXISTS "Creacion y lectura de pedidos" ON public.orders;
CREATE POLICY "Creacion y lectura de pedidos" ON public.orders FOR ALL USING (true);

DROP POLICY IF EXISTS "Lectura y escritura de settings" ON public.store_settings;
CREATE POLICY "Lectura y escritura de settings" ON public.store_settings FOR ALL USING (true);

-- Crear Storage Bucket para imágenes de productos
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Imágenes de productos públicas" ON storage.objects;
DROP POLICY IF EXISTS "Subir imágenes de productos" ON storage.objects;
CREATE POLICY "Imágenes de productos públicas" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Subir imágenes de productos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
`;

// Helper: Image compressor using Canvas API
const compressImage = (file, maxWidth = 1000, quality = 0.8) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Export as WebP or JPEG
        const dataUrl = canvas.toDataURL('image/webp', quality);
        resolve(dataUrl);
      };
    };
  });
};

// --- LOGO VECTORIAL ACCURATE SVG ---
const BCOLogo = ({ className = "h-8", theme = "dark", customLogoUrl = "", usePillInDark = true }) => {
  if (customLogoUrl) {
    return (
      <div className={`inline-flex items-center select-none transition-transform hover:scale-[1.02] ${className}`}>
        <div
          className={`h-full inline-flex items-center px-2.5 py-1 rounded-2xl transition-colors ${
            theme === 'dark' && usePillInDark ? 'bg-white shadow-md' : ''
          }`}
        >
          <img
            src={customLogoUrl}
            alt="BCO Tech Logo"
            className="h-full w-auto max-w-[190px] object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 font-display select-none transition-transform hover:scale-[1.02] ${className}`}>
      {/* Isotipo BCO entrelazado + 'tech' */}
      <svg viewBox="0 0 430 140" className="h-full w-auto overflow-visible" aria-label="BCO Tech Logo">
        <defs>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Black Container Pill */}
        <rect
          x="4"
          y="10"
          width="172"
          height="120"
          rx="32"
          fill="#000000"
          stroke={theme === 'dark' ? '#8CFF00' : '#0033FF'}
          strokeWidth="3"
        />

        {/* B - Verde Neón #8CFF00 */}
        <path
          d="M 22 24 L 68 24 C 84 24 94 33 94 46 C 94 55 88 62 79 65 C 91 68 98 77 98 90 C 98 106 86 116 68 116 L 22 116 Z M 45 43 L 45 57 L 64 57 C 70 57 74 54 74 50 C 74 46 70 43 64 43 Z M 45 77 L 45 96 L 66 96 C 72 96 76 92 76 87 C 76 81 72 77 66 77 Z"
          fill="#8CFF00"
        />

        {/* C - Blanco #FFFFFF entrelazado */}
        <path
          d="M 114 28 C 90 28 74 46 74 70 C 74 94 90 112 114 112 C 130 112 141 104 146 92 L 126 86 C 123 91 119 94 113 94 C 102 94 96 84 96 70 C 96 56 102 46 113 46 C 119 46 123 49 126 54 L 146 48 C 141 36 130 28 114 28 Z"
          fill="#FFFFFF"
        />

        {/* O / D - Azul Eléctrico #0033FF */}
        <path
          d="M 134 24 L 154 24 C 166 24 174 36 174 70 C 174 104 166 116 154 116 L 134 116 C 122 116 114 104 114 70 C 114 36 122 24 134 24 Z M 136 45 L 136 95 L 150 95 C 154 95 156 86 156 70 C 156 54 154 45 150 45 Z"
          fill="#0033FF"
        />

        {/* Text 'tech' in geometric futuristic typography */}
        <text
          x="198"
          y="102"
          fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
          fontFamily="'Orbitron', 'Michroma', sans-serif"
          fontWeight="900"
          fontSize="72"
          letterSpacing="-2"
        >
          tech
        </text>
      </svg>
    </div>
  );
};

// MAIN APP COMPONENT
export default function App() {
  // --- STATE ---
  const [theme, setTheme] = useState('dark');
  const [currentView, setCurrentView] = useState('shop'); // 'shop', 'admin'
  const [adminTab, setAdminTab] = useState('products'); // 'products', 'categories', 'orders', 'settings', 'supabase'
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');

  // Store data state
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Supabase Connection State
  const [supabaseConfig, setSupabaseConfig] = useState({
    url: localStorage.getItem('bco_sp_url') || '',
    key: localStorage.getItem('bco_sp_key') || ''
  });
  const [supabaseClient, setSupabaseClient] = useState(null);
  const [spStatus, setSpStatus] = useState('fallback'); // 'connected', 'error', 'fallback'
  const [spSdkLoaded, setSpSdkLoaded] = useState(false);

  // Shopping Cart & Filters
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bco_tech_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc'

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Product Detail Modal
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Gallery active image
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState(null); // { order, waUrl, invoiceWaUrl }
  const [toastMessage, setToastMessage] = useState(null);
  const [flyingItem, setFlyingItem] = useState(null); // { src, startX, startY, endX, endY }
  const [cartBounce, setCartBounce] = useState(false);
  const cartButtonRef = useRef(null);

  // AI Assistant State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: '¡Hola! Soy el asistente virtual de BCO Tech ⚡. Pregúntame sobre productos, precios, ofertas, envíos, garantía o métodos de pago.'
    }
  ]);
  const aiMessagesEndRef = useRef(null);

  // Admin Editors State
  const [editingProduct, setEditingProduct] = useState(null); // Product form modal
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('Cpu');
  const [settingsDraft, setSettingsDraft] = useState(DEFAULT_SETTINGS);
  const [supabaseUrlDraft, setSupabaseUrlDraft] = useState(localStorage.getItem('bco_sp_url') || '');
  const [supabaseKeyDraft, setSupabaseKeyDraft] = useState(localStorage.getItem('bco_sp_key') || '');

  // Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'efectivo',
    notes: ''
  });

  // Dynamic Google Fonts Injection
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@600;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Dynamic SVG Favicon Injection
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" fill="%23000"/><text x="15" y="65" fill="%238CFF00" font-family="sans-serif" font-weight="900" font-size="45">BCO</text></svg>`;
    document.head.appendChild(favicon);

    // Load Supabase UMD bundle dynamically to avoid bundler dynamic require issues
    if (!window.supabase) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
      script.async = true;
      script.onload = () => setSpSdkLoaded(true);
      document.head.appendChild(script);
    } else {
      setSpSdkLoaded(true);
    }
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('bco_tech_cart', JSON.stringify(cart));
  }, [cart]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- SUPABASE CLIENT INITIALIZATION & SYNC ---
  useEffect(() => {
    if (supabaseConfig.url && supabaseConfig.key && spSdkLoaded && window.supabase) {
      try {
        const client = window.supabase.createClient(supabaseConfig.url, supabaseConfig.key);
        setSupabaseClient(client);

        // Fetch Data from Supabase
        const fetchData = async () => {
          try {
            const { data: catData, error: catErr } = await client.from('categories').select('*');
            if (!catErr && catData && catData.length > 0) setCategories(catData);

            const { data: prodData, error: prodErr } = await client.from('products').select('*');
            if (!prodErr && prodData && prodData.length > 0) setProducts(prodData);

            const { data: ordData, error: ordErr } = await client.from('orders').select('*').order('created_at', { ascending: false });
            if (!ordErr && ordData) setOrders(ordData);

            const { data: setDb } = await client.from('store_settings').select('*').single();
            if (setDb) setSettings(prev => ({ ...prev, ...setDb }));

            setSpStatus('connected');
            showToast('Conectado exitosamente a Supabase DB');
          } catch (err) {
            console.warn('Supabase fetch error, using local fallback:', err);
            setSpStatus('error');
          }
        };

        fetchData();
      } catch (e) {
        setSpStatus('error');
      }
    } else if (!supabaseConfig.url || !supabaseConfig.key) {
      setSpStatus('fallback');
    }
  }, [supabaseConfig, spSdkLoaded]);

  // Save Supabase Config
  const handleSaveSupabaseConfig = (url, key) => {
    localStorage.setItem('bco_sp_url', url);
    localStorage.setItem('bco_sp_key', key);
    setSupabaseConfig({ url, key });
  };

  // Theme Sync Class to HTML Document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Keep settings draft synced with loaded store settings
  useEffect(() => {
    setSettingsDraft(settings);
  }, [settings]);

  // --- CATALOG FILTERING & SORTING ---
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (!product.active) return false;
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSale = onlyOnSale ? product.on_sale : true;
      return matchesCategory && matchesSearch && matchesSale;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, onlyOnSale, sortBy]);

  // --- CART FUNCTIONS ---
  const triggerFlyAnimation = (product, sourceElement) => {
    if (!sourceElement || !cartButtonRef.current) return;
    const card = sourceElement.closest('.product-card-container');
    const imgEl = card ? card.querySelector('img') : sourceElement;
    const startRect = imgEl.getBoundingClientRect();
    const endRect = cartButtonRef.current.getBoundingClientRect();

    setFlyingItem({
      src: product.images?.[0] || 'https://via.placeholder.com/100',
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      endX: endRect.left + endRect.width / 2,
      endY: endRect.top + endRect.height / 2,
      active: false
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlyingItem(prev => prev ? { ...prev, active: true } : null);
      });
    });

    setTimeout(() => {
      setFlyingItem(null);
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 450);
    }, 650);
  };

  const addToCart = (product, quantity = 1, sourceElement = null) => {
    if (sourceElement) {
      triggerFlyAnimation(product, sourceElement);
    } else {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 450);
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name}" agregado al carrito.`);
  };

  const updateCartQty = (productId, delta) => {
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll AI chat to bottom on new messages
  useEffect(() => {
    if (isAiOpen) {
      aiMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, isAiOpen]);

  // Local FAQ / Catalog fallback answer when offline or API quota is unavailable
  const getFallbackAiReply = (query) => {
    const q = query.toLowerCase();
    const activeProds = products.filter(p => p.active);

    if (q.includes('envio') || q.includes('envío') || q.includes('entrega') || q.includes('domicilio')) {
      return 'Realizamos envíos a todo el país con confirmación por WhatsApp. Al finalizar tu pedido en el carrito puedes indicar tu dirección exacta y zona de entrega.';
    }
    if (q.includes('pago') || q.includes('efectivo') || q.includes('transferencia') || q.includes('tarjeta')) {
      return 'Aceptamos efectivo contra entrega, transferencia bancaria y link de pago/tarjeta. Al confirmar el pedido se genera tu factura en PDF y se envía por WhatsApp.';
    }
    if (q.includes('garantia') || q.includes('garantía')) {
      return 'Todos los productos de BCO Tech cuentan con garantía directa de 12 meses y soporte técnico.';
    }
    if (q.includes('horario') || q.includes('hora') || q.includes('abierto')) {
      return `Nuestro horario de atención es: ${settings.store_hours}. También puedes escribirnos al WhatsApp +${settings.whatsapp}.`;
    }
    if (q.includes('oferta') || q.includes('descuento') || q.includes('barato')) {
      const sales = activeProds.filter(p => p.on_sale);
      if (sales.length > 0) {
        return `Tenemos ofertas activas como: ${sales.slice(0, 3).map(p => `${p.name} ($${p.price.toFixed(2)})`).join(', ')}.`;
      }
    }

    const matched = activeProds.filter(
      p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
    );
    if (matched.length > 0) {
      return `Encontré esto en el catálogo: ${matched.slice(0, 3).map(p => `${p.name} a $${p.price.toFixed(2)} (${p.stock > 0 ? `${p.stock} en stock` : 'Agotado'})`).join(' | ')}.`;
    }

    return `Puedo ayudarte con información de nuestros productos, precios, envíos, métodos de pago y garantía. Si necesitas atención directa, escríbenos al WhatsApp +${settings.whatsapp}.`;
  };

  // Ask Gemini AI Assistant with exponential backoff & catalog context
  const handleAskAi = async (customPrompt = null) => {
    const question = (typeof customPrompt === 'string' ? customPrompt : aiInput).trim();
    if (!question || aiLoading) return;

    const nextMessages = [...aiMessages, { role: 'user', text: question }];
    setAiMessages(nextMessages);
    if (typeof customPrompt !== 'string') setAiInput('');
    setAiLoading(true);

    const catalogSummary = products
      .filter(p => p.active)
      .map(p => `- ${p.name} (${p.category}): $${p.price.toFixed(2)}${p.on_sale ? ` [OFERTA, antes $${p.original_price}]` : ''}, Stock: ${p.stock} un.`)
      .join('\n');

    const systemInstruction = `Eres el asistente de atención al cliente de la tienda "BCO Tech" (auriculares, teclados, mouse, monitores, accesorios y gadgets).
Responde en español de forma clara, amable y concisa. Usa SOLO la información del catálogo y ajustes proporcionados para precios, stock y horarios; si no sabes algo exacto, invita a contactar por WhatsApp al +${settings.whatsapp}.
Horario: ${settings.store_hours}
Métodos de pago: Efectivo contra entrega, Transferencia Bancaria, Link de Pago / Tarjeta.
Garantía: 12 meses directa.
Catálogo actual:
${catalogSummary}`;

    const apiKey = '';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    const contents = nextMessages.slice(-6).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    const delays = [1000, 2000, 4000];
    for (let attempt = 0; attempt <= delays.length; attempt++) {
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: systemInstruction }] }
          })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!replyText) throw new Error('Empty AI response');

        setAiMessages(prev => [...prev, { role: 'assistant', text: replyText }]);
        setAiLoading(false);
        return;
      } catch (err) {
        if (attempt < delays.length) {
          await new Promise(r => setTimeout(r, delays[attempt]));
        } else {
          setAiMessages(prev => [...prev, { role: 'assistant', text: getFallbackAiReply(question) }]);
          setAiLoading(false);
        }
      }
    }
  };

  // --- GENERADOR DE FACTURA EN PDF (SIN DEPENDENCIAS EXTERNAS) ---
  const generateInvoicePDF = (order) => {
    try {
      const escapePdfText = (str = '') =>
        String(str)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^\x20-\x7E]/g, ' ')
          .replace(/\\/g, '\\\\')
          .replace(/\(/g, '\\(')
          .replace(/\)/g, '\\)');

      const lines = [];
      let y = 740;

      const addLine = (text, size = 10, bold = false, colorRgb = '0.08 0.08 0.08', x = 45) => {
        lines.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${colorRgb} rg 1 0 0 1 ${x} ${y} Tm (${escapePdfText(text)}) Tj ET`);
      };

      // Encabezado BCO Tech
      lines.push('q 0.0 0.0 0.0 rg 40 725 532 52 re f Q');
      lines.push('q 0.55 1.0 0.0 rg 40 722 532 3 re f Q');
      y = 755;
      addLine('BCO TECH - FACTURA DE PEDIDO', 16, true, '0.55 1.0 0.0', 52);
      y = 735;
      addLine(`Orden: ${order.id}   |   Fecha: ${new Date(order.created_at).toLocaleString('es-DO')}`, 9, false, '0.9 0.9 0.9', 52);
      if (order.invoice_whatsapp) {
        y = 724;
        addLine(`Copia Factura WhatsApp: +${order.invoice_whatsapp}`, 8, false, '0.7 0.85 1.0', 52);
      }

      // Datos del cliente y tienda
      y = 695;
      addLine('DATOS DEL CLIENTE', 11, true, '0.0 0.2 1.0', 45);
      addLine(`WhatsApp BCO Tech: +${settings.whatsapp}`, 9, false, '0.35 0.35 0.35', 360);
      y -= 16;
      addLine(`Cliente: ${order.customer_name}`, 10, false, '0.1 0.1 0.1', 45);
      y -= 14;
      addLine(`Telefono: ${order.phone}`, 10, false, '0.1 0.1 0.1', 45);
      y -= 14;
      addLine(`Direccion: ${order.address}`, 10, false, '0.1 0.1 0.1', 45);
      y -= 14;
      addLine(`Metodo de pago: ${String(order.payment_method || '').toUpperCase()}`, 10, false, '0.1 0.1 0.1', 45);
      if (order.notes) {
        y -= 14;
        addLine(`Notas: ${order.notes}`, 9, false, '0.3 0.3 0.3', 45);
      }

      // Tabla de productos
      y -= 28;
      lines.push(`q 0.92 0.94 0.98 rg 40 ${y - 4} 532 20 re f Q`);
      addLine('CANT.', 9, true, '0.05 0.05 0.05', 48);
      addLine('PRODUCTO', 9, true, '0.05 0.05 0.05', 105);
      addLine('SUBTOTAL', 9, true, '0.05 0.05 0.05', 495);

      y -= 20;
      (order.items || []).forEach((item) => {
        if (y < 110) return;
        const qty = Number(item.quantity || 1);
        const unitPrice = Number(item.product?.price || 0);
        const subtotal = (qty * unitPrice).toFixed(2);
        const prodName = `${item.product?.name || 'Producto'} ($${unitPrice.toFixed(2)} c/u)`;

        addLine(`${qty}x`, 10, true, '0.1 0.1 0.1', 50);
        addLine(prodName.slice(0, 56), 10, false, '0.1 0.1 0.1', 105);
        addLine(`$${subtotal}`, 10, true, '0.1 0.1 0.1', 495);
        y -= 18;
      });

      // Línea separadora y total
      y -= 8;
      lines.push(`q 0.75 0.75 0.75 w 40 ${y} 572 ${y} l S Q`);
      y -= 24;
      addLine('TOTAL A PAGAR:', 13, true, '0.0 0.2 1.0', 360);
      addLine(`$${Number(order.total || 0).toFixed(2)}`, 14, true, '0.05 0.05 0.05', 490);

      y -= 36;
      addLine('Gracias por comprar en BCO Tech. Conserva esta factura como comprobante de tu pedido.', 9, false, '0.4 0.4 0.4', 45);

      const streamContent = lines.join('\n');
      const streamLength = streamContent.length;

      const objects = [
        '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
        '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
        '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n',
        `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
        '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
        '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n'
      ];

      let pdf = '%PDF-1.4\n';
      const offsets = [0];
      objects.forEach((obj) => {
        offsets.push(pdf.length);
        pdf += obj;
      });

      const xrefStart = pdf.length;
      pdf += `xref\n0 ${objects.length + 1}\n`;
      pdf += '0000000000 65535 f \n';
      for (let i = 1; i <= objects.length; i++) {
        pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
      }
      pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Factura-BCO-Tech-${order.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
      console.error('Error generando PDF:', err);
      showToast('No se pudo descargar la factura PDF.');
    }
  };

  // --- WHATSAPP ORDER GENERATOR & SUBMISSION ---
  const buildInvoiceWhatsAppMessage = (order) => {
    let text = `🧾 *FACTURA AUTOMÁTICA - BCO TECH* (#${order.id})\n`;
    text += `📅 *Fecha:* ${new Date(order.created_at).toLocaleString('es-DO')}\n\n`;
    text += `👤 *DATOS DEL CLIENTE*\n`;
    text += `• *Nombre:* ${order.customer_name}\n`;
    text += `• *Teléfono:* ${order.phone}\n`;
    text += `• *Dirección:* ${order.address}\n`;
    text += `• *Método de Pago:* ${String(order.payment_method || '').toUpperCase()}\n`;
    if (order.notes) text += `• *Notas:* ${order.notes}\n`;
    text += `\n📦 *DETALLE DE PRODUCTOS:*\n`;

    (order.items || []).forEach(item => {
      text += `• ${item.quantity}x ${item.product?.name} ($${Number(item.product?.price || 0).toFixed(2)} c/u) = $${(Number(item.product?.price || 0) * Number(item.quantity || 1)).toFixed(2)}\n`;
    });

    text += `\n💰 *TOTAL FACTURADO: $${Number(order.total || 0).toFixed(2)}*\n`;
    return text;
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const cleanMainWa = String(settings.whatsapp || '').replace(/\D/g, '');
    const cleanInvoiceWa = String(settings.invoice_whatsapp || '').replace(/\D/g, '');

    const newOrder = {
      id: orderId,
      customer_name: checkoutForm.name,
      phone: checkoutForm.phone,
      address: checkoutForm.address,
      payment_method: checkoutForm.paymentMethod,
      notes: checkoutForm.notes,
      invoice_whatsapp: cleanInvoiceWa,
      items: cart,
      total: cartTotal,
      status: 'Nuevo',
      created_at: new Date().toISOString()
    };

    // 1. Save order to Supabase / Local State
    if (supabaseClient) {
      await supabaseClient.from('orders').insert([newOrder]);
    }
    setOrders(prev => [newOrder, ...prev]);

    // 2. Format WhatsApp Message
    let text = `🛒 *NUEVO PEDIDO - BCO TECH* (#${orderId})\n\n`;
    text += `👤 *Cliente:* ${checkoutForm.name}\n`;
    text += `📞 *Teléfono:* ${checkoutForm.phone}\n`;
    text += `📍 *Dirección:* ${checkoutForm.address}\n`;
    text += `💳 *Método de Pago:* ${checkoutForm.paymentMethod.toUpperCase()}\n`;
    if (checkoutForm.notes) text += `📝 *Notas:* ${checkoutForm.notes}\n`;
    text += `\n📦 *PRODUCTOS:*\n`;

    cart.forEach(item => {
      text += `• ${item.quantity}x ${item.product.name} - $${(item.product.price * item.quantity).toFixed(2)}\n`;
    });

    text += `\n💰 *TOTAL A PAGAR: $${cartTotal.toFixed(2)}*\n\n`;
    text += `Quedo a la espera de la confirmación. ¡Muchas gracias!`;

    const waUrl = `https://wa.me/${cleanMainWa}?text=${encodeURIComponent(text)}`;
    const invoiceWaUrl = cleanInvoiceWa
      ? `https://wa.me/${cleanInvoiceWa}?text=${encodeURIComponent(buildInvoiceWhatsAppMessage(newOrder))}`
      : '';

    // Generar y descargar factura PDF automáticamente
    generateInvoicePDF(newOrder);
    setLastConfirmedOrder({ order: newOrder, waUrl, invoiceWaUrl });

    // Clear Cart & Close Modal
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);

    // Open main WhatsApp and, if configured, second WhatsApp for billing
    window.open(waUrl, '_blank');
    if (invoiceWaUrl && invoiceWaUrl !== waUrl) {
      setTimeout(() => {
        window.open(invoiceWaUrl, '_blank');
      }, 650);
    }
    showToast(
      cleanInvoiceWa
        ? '¡Factura PDF generada y enviada a ambos WhatsApp!'
        : '¡Factura PDF generada y pedido enviado a WhatsApp!'
    );
  };

  // Direct Product WhatsApp Inquiry
  const handleProductWhatsApp = (product) => {
    const text = `Hola *BCO Tech* 👋! Quisiera obtener más información sobre el producto:\n\n🔹 *${product.name}*\nPrecio: $${product.price.toFixed(2)}\nLink/Ref ID: ${product.id}`;
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // --- ADMIN FUNCTIONS ---
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasswordInput === 'bcotech2026' || adminPasswordInput === 'admin') {
      setAdminAuth(true);
      showToast('Sesión de administración iniciada.');
    } else {
      showToast('Contraseña incorrecta. (Prueba: bcotech2026)');
    }
  };

  // Product CRUD
  const saveProduct = async (prodData) => {
    let updatedProducts;
    if (prodData.id) {
      // Edit existing
      updatedProducts = products.map(p => p.id === prodData.id ? prodData : p);
      if (supabaseClient) {
        await supabaseClient.from('products').update(prodData).eq('id', prodData.id);
      }
    } else {
      // Create new
      const newProd = { ...prodData, id: 'prod-' + Date.now() };
      updatedProducts = [newProd, ...products];
      if (supabaseClient) {
        await supabaseClient.from('products').insert([newProd]);
      }
    }
    setProducts(updatedProducts);
    setEditingProduct(null);
    showToast('Producto guardado correctamente.');
  };

  const deleteProduct = async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (supabaseClient) {
      await supabaseClient.from('products').delete().eq('id', id);
    }
    showToast('Producto eliminado.');
  };

  const toggleProductActive = async (id) => {
    const target = products.find(p => p.id === id);
    if (!target) return;
    const updated = { ...target, active: !target.active };
    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    if (supabaseClient) {
      await supabaseClient.from('products').update({ active: updated.active }).eq('id', id);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (supabaseClient) {
      await supabaseClient.from('orders').update({ status: newStatus }).eq('id', orderId);
    }
    showToast(`Estado de pedido cambiado a ${newStatus}`);
  };

  const toggleProductFlag = async (id, field) => {
    const target = products.find(p => p.id === id);
    if (!target) return;
    const updated = { ...target, [field]: !target[field] };
    setProducts(prev => prev.map(p => p.id === id ? updated : p));
    if (supabaseClient) {
      await supabaseClient.from('products').update({ [field]: updated[field] }).eq('id', id);
    }
    showToast('Producto actualizado.');
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const cleanName = newCategoryName.trim();
    if (!cleanName) return;
    const slugId = cleanName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `cat-${Date.now()}`;

    const newCat = { id: slugId, name: cleanName, icon: newCategoryIcon };
    setCategories(prev => [...prev.filter(c => c.id !== slugId), newCat]);
    setNewCategoryName('');

    if (supabaseClient) {
      await supabaseClient.from('categories').upsert([newCat]);
    }
    showToast(`Categoría "${cleanName}" guardada.`);
  };

  const handleDeleteCategory = async (catId) => {
    setCategories(prev => prev.filter(c => c.id !== catId));
    if (selectedCategory === catId) setSelectedCategory('all');
    if (supabaseClient) {
      await supabaseClient.from('categories').delete().eq('id', catId);
    }
    showToast('Categoría eliminada.');
  };

  const handleSaveStoreSettings = async (e) => {
    e.preventDefault();
    const cleanSettings = {
      ...settingsDraft,
      whatsapp: String(settingsDraft.whatsapp || '').replace(/\D/g, '') || '18098435918',
      invoice_whatsapp: String(settingsDraft.invoice_whatsapp || '').replace(/\D/g, '')
    };
    setSettings(cleanSettings);
    if (supabaseClient) {
      await supabaseClient.from('store_settings').upsert([{ id: 1, ...cleanSettings }]);
    }
    showToast('Ajustes de la tienda guardados.');
  };

  const moveProductImage = (index, direction) => {
    setEditingProduct(prev => {
      if (!prev || !Array.isArray(prev.images)) return prev;
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prev.images.length) return prev;
      const nextImages = [...prev.images];
      const [moved] = nextImages.splice(index, 1);
      nextImages.splice(targetIndex, 0, moved);
      return { ...prev, images: nextImages };
    });
  };

  const setPrimaryProductImage = (index) => {
    setEditingProduct(prev => {
      if (!prev || !Array.isArray(prev.images) || index <= 0 || index >= prev.images.length) return prev;
      const nextImages = [...prev.images];
      const [selected] = nextImages.splice(index, 1);
      nextImages.unshift(selected);
      return { ...prev, images: nextImages };
    });
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0A0D14] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <style>{`
        @keyframes modalPop {
          0% { opacity: 0; transform: scale(0.9) translateY(16px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cartPulse {
          0%, 100% { transform: scale(1); }
          40% { transform: scale(1.2) rotate(-5deg); }
          70% { transform: scale(0.95) rotate(3deg); }
        }
        .animate-modal-pop {
          animation: modalPop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-cart-bounce {
          animation: cartPulse 0.45s ease-out;
        }
      `}</style>

      {/* Flying Product Animation */}
      {flyingItem && (
        <img
          src={flyingItem.src}
          alt=""
          style={{
            position: 'fixed',
            left: flyingItem.active ? flyingItem.endX : flyingItem.startX,
            top: flyingItem.active ? flyingItem.endY : flyingItem.startY,
            width: flyingItem.active ? '24px' : '90px',
            height: flyingItem.active ? '24px' : '90px',
            opacity: flyingItem.active ? 0.2 : 1,
            transform: `translate(-50%, -50%) scale(${flyingItem.active ? 0.3 : 1}) rotate(${flyingItem.active ? '360deg' : '0deg'})`,
            transition: 'all 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
            zIndex: 9999,
            pointerEvents: 'none',
            borderRadius: '16px',
            objectFit: 'cover',
            border: '2px solid #8CFF00',
            boxShadow: '0 0 20px rgba(140, 255, 0, 0.6)'
          }}
        />
      )}
      
      {/* Toast Floating Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce flex items-center gap-3 bg-[#000000] text-[#8CFF00] border-2 border-[#8CFF00] px-5 py-3 rounded-2xl shadow-2xl font-semibold text-sm">
          <Sparkles className="h-5 w-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors bg-opacity-90 bg-white/80 dark:bg-[#0A0D14]/90 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-6 cursor-pointer" onClick={() => setCurrentView('shop')}>
            <BCOLogo
              className="h-10 sm:h-12"
              theme={theme}
              customLogoUrl={settings.custom_logo_url}
              usePillInDark={settings.logo_pill_in_dark}
            />
          </div>

          {/* Search Bar (Desktop) */}
          {currentView === 'shop' && (
            <div className="hidden md:flex flex-1 max-w-md relative">
              <input
                type="text"
                placeholder="Buscar teclado, monitor, mouse..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#121824] text-sm rounded-full pl-11 pr-4 py-2.5 border-2 border-transparent focus:border-[#8CFF00] focus:outline-none transition-all"
              />
              <Search className="absolute left-4 top-3 text-gray-400 h-4 w-4" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-gray-400 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {/* Actions Header */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-full border-2 border-gray-200 dark:border-gray-800 hover:border-[#8CFF00] transition-colors"
              title="Cambiar Tema"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-[#8CFF00]" /> : <Moon className="h-5 w-5 text-blue-600" />}
            </button>

            {/* Admin Switch */}
            <button
              onClick={() => setCurrentView(currentView === 'shop' ? 'admin' : 'shop')}
              className={`p-2.5 rounded-full border-2 transition-all flex items-center gap-2 ${
                currentView === 'admin'
                  ? 'border-[#0033FF] bg-[#0033FF] text-white'
                  : 'border-gray-200 dark:border-gray-800 hover:border-[#0033FF]'
              }`}
              title="Panel de Admin"
            >
              <Settings className="h-5 w-5" />
              <span className="hidden lg:inline text-xs font-bold uppercase tracking-wider">
                {currentView === 'admin' ? 'Tienda' : 'Admin'}
              </span>
            </button>

            {/* Cart Button */}
            {currentView === 'shop' && (
              <button
                ref={cartButtonRef}
                onClick={() => setIsCartOpen(true)}
                className={`relative bg-[#8CFF00] text-black font-extrabold px-4 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-[#7ce000] active:scale-95 transition-all shadow-lg shadow-[#8CFF00]/20 ${cartBounce ? 'animate-cart-bounce' : ''}`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:inline text-sm uppercase font-display tracking-wide">Carrito</span>
                {cartCount > 0 && (
                  <span className="bg-black text-[#8CFF00] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Search Bar (Mobile view) */}
        {currentView === 'shop' && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar en BCO Tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-[#121824] text-sm rounded-xl pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
            </div>
          </div>
        )}
      </header>

      {/* --- MAIN PUBLIC STORE VIEW --- */}
      {currentView === 'shop' && (
        <main className="min-h-screen pb-20">

          {/* HERO BANNER SECTION */}
          <section className="relative overflow-hidden my-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden border-2 border-gray-800 bg-gradient-to-r from-black via-[#0A0D14] to-[#001133] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
              
              {/* Left Content */}
              <div className="flex-1 space-y-6 z-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8CFF00]/10 border border-[#8CFF00]/40 text-[#8CFF00] text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="h-4 w-4" /> BCO TECH OFICIAL
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
                  {settings.hero_title.split(' ')[0]}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8CFF00] to-[#0033FF]">
                    {settings.hero_title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>
                <p className="text-gray-300 text-sm sm:text-base max-w-xl">
                  {settings.hero_subtitle}
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href="#catalogo"
                    className="bg-[#8CFF00] text-black hover:bg-[#7ce000] font-bold px-7 py-3.5 rounded-2xl transition-all font-display tracking-wider uppercase text-sm shadow-lg shadow-[#8CFF00]/25 flex items-center gap-2"
                  >
                    Ver Catálogo <ChevronRight className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => {
                      setOnlyOnSale(true);
                      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="border-2 border-white/20 text-white hover:border-[#0033FF] hover:bg-[#0033FF]/20 font-bold px-6 py-3.5 rounded-2xl transition-all text-sm flex items-center gap-2"
                  >
                    <Tag className="h-4 w-4 text-[#8CFF00]" /> Ver Ofertas
                  </button>
                </div>
              </div>

              {/* Right Hero Image */}
              <div className="w-full lg:w-1/2 relative flex justify-center">
                <div className="relative rounded-2xl overflow-hidden border-4 border-[#8CFF00]/30 shadow-2xl max-h-80 sm:max-h-96 w-full object-cover">
                  <img
                    src={settings.hero_image}
                    alt="BCO Tech Hero"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-white">
                    <span>⚡ Envíos a todo el país</span>
                    <span className="text-[#8CFF00] font-bold">100% Garantía Oficial</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* FEATURED CATEGORIES CAROUSEL / GRID */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 font-display flex items-center gap-2">
              <Grid className="h-5 w-5 text-[#8CFF00]" /> Categorías
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider ${
                  selectedCategory === 'all'
                    ? 'border-[#8CFF00] bg-[#8CFF00]/10 text-[#8CFF00]'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700'
                }`}
              >
                <Sparkles className="h-6 w-6" />
                <span>Todos</span>
              </button>

              {categories.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider ${
                      isSelected
                        ? 'border-[#8CFF00] bg-[#8CFF00]/10 text-[#8CFF00]'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700'
                    }`}
                  >
                    {cat.icon === 'Headphones' && <Headphones className="h-6 w-6" />}
                    {cat.icon === 'Keyboard' && <Keyboard className="h-6 w-6" />}
                    {cat.icon === 'Mouse' && <Mouse className="h-6 w-6" />}
                    {cat.icon === 'Monitor' && <Monitor className="h-6 w-6" />}
                    {cat.icon === 'Cpu' && <Cpu className="h-6 w-6" />}
                    {cat.icon === 'Sparkles' && <Sparkles className="h-6 w-6" />}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* CATALOG SECTION */}
          <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            
            {/* Toolbar Filters & Sort */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">Filtros:</span>
                
                <button
                  onClick={() => setOnlyOnSale(!onlyOnSale)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    onlyOnSale
                      ? 'bg-[#0033FF] border-[#0033FF] text-white'
                      : 'border-gray-300 dark:border-gray-800 hover:border-gray-400'
                  }`}
                >
                  <Tag className="h-3.5 w-3.5" /> Solo Ofertas
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-100 dark:bg-[#121824] border border-gray-200 dark:border-gray-800 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-gray-100 dark:bg-[#121824] rounded-3xl my-8 border-2 border-dashed border-gray-300 dark:border-gray-800">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="font-bold text-lg">No se encontraron productos</p>
                <p className="text-xs text-gray-400 mt-1">Prueba cambiando los filtros o la búsqueda.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setOnlyOnSale(false); }}
                  className="mt-4 text-xs font-bold text-[#8CFF00] underline"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="product-card-container group bg-white dark:bg-[#121824] rounded-3xl border-2 border-gray-200 dark:border-gray-800 hover:border-[#8CFF00] transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-[#8CFF00]/10 hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div
                      className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-[#0A0D14] cursor-pointer"
                      onClick={() => {
                        setSelectedImageIndex(0);
                        setSelectedProduct(product);
                      }}
                    >
                      <img
                        src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400'}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        {product.on_sale && (
                          <span className="bg-[#0033FF] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow">
                            OFERTA
                          </span>
                        )}
                        {product.featured && (
                          <span className="bg-[#8CFF00] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow">
                            DESTACADO
                          </span>
                        )}
                      </div>

                      {/* Quick View Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white text-black font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg">
                          <Eye className="h-4 w-4" /> Vista Rápida
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0033FF] dark:text-[#8CFF00]">
                          {product.category}
                        </span>
                        <h3
                          onClick={() => {
                            setSelectedImageIndex(0);
                            setSelectedProduct(product);
                          }}
                          className="font-bold text-base leading-snug hover:text-[#0033FF] dark:hover:text-[#8CFF00] transition-colors cursor-pointer line-clamp-2 mt-1"
                        >
                          {product.name}
                        </h3>
                      </div>

                      {/* Price & Buttons */}
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-xl font-extrabold font-display">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.on_sale && product.original_price && (
                            <span className="text-xs text-gray-400 line-through font-semibold">
                              ${product.original_price.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={(e) => addToCart(product, 1, e.currentTarget)}
                            className="w-full bg-[#8CFF00] text-black font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-[#7ce000] active:scale-95 transition-all"
                          >
                            <ShoppingCart className="h-3.5 w-3.5" /> Agregar
                          </button>
                          
                          <button
                            onClick={() => handleProductWhatsApp(product)}
                            className="w-full border-2 border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-all"
                            title="Consultar por WhatsApp"
                          >
                            <MessageCircle className="h-3.5 w-3.5" /> Consultar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* FLOATING WHATSAPP BUTTON */}
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 left-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
            title="Habla con nosotros por WhatsApp"
          >
            <MessageCircle className="h-7 w-7" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold whitespace-nowrap">
              ¿Dudas? ¡Escríbenos!
            </span>
          </a>

          {/* FLOATING AI ASSISTANT BUTTON & CHAT POPOVER */}
          <button
            type="button"
            onClick={() => setIsAiOpen(prev => !prev)}
            className="fixed bottom-24 left-6 z-40 bg-[#0033FF] text-white border-2 border-[#8CFF00] p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
            title="Asistente IA BCO Tech"
          >
            <Bot className="h-6 w-6 text-[#8CFF00]" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold whitespace-nowrap">
              Asistente IA
            </span>
          </button>

          {isAiOpen && (
            <div className="fixed bottom-40 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 z-50 animate-modal-pop bg-white dark:bg-[#121824] rounded-3xl border-2 border-[#8CFF00] shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
              <div className="bg-black text-white px-4 py-3.5 flex items-center justify-between border-b border-[#8CFF00]/40">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-[#8CFF00]" />
                  <div>
                    <p className="text-xs font-black font-display uppercase tracking-wider text-[#8CFF00]">Asistente BCO Tech</p>
                    <p className="text-[10px] text-gray-300">FAQ, productos, envíos y pagos</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAiOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Quick FAQ Chips */}
              <div className="px-3 pt-2.5 pb-1.5 flex gap-1.5 overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                {['¿Cómo son los envíos?', 'Métodos de pago', 'Garantía', 'Ofertas hoy'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleAskAi(chip)}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-700 hover:border-[#8CFF00] whitespace-nowrap transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-xs">
                {aiMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#8CFF00] text-black font-semibold rounded-br-sm'
                          : 'bg-gray-100 dark:bg-[#0A0D14] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-[#0A0D14] px-3.5 py-2 rounded-2xl text-[11px] text-gray-400 animate-pulse">
                      Escribiendo respuesta...
                    </div>
                  </div>
                )}
                <div ref={aiMessagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskAi();
                }}
                className="p-3 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2 bg-gray-50 dark:bg-[#0A0D14]"
              >
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Escribe tu duda..."
                  className="flex-1 bg-white dark:bg-[#121824] border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-xs focus:border-[#8CFF00] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={aiLoading || !aiInput.trim()}
                  className="bg-[#8CFF00] disabled:opacity-50 text-black p-2.5 rounded-xl hover:bg-[#7ce000] transition-colors"
                  title="Enviar pregunta"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}

        </main>
      )}

      {/* --- ADMIN PANEL VIEW --- */}
      {currentView === 'admin' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[75vh]">
          {!adminAuth ? (
            <div className="max-w-md mx-auto bg-white dark:bg-[#121824] rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#8CFF00]/15 border border-[#8CFF00]/40 text-[#8CFF00]">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black font-display uppercase">Acceso Admin</h2>
                  <p className="text-xs text-gray-400">Panel de control de BCO Tech</p>
                </div>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1.5">Contraseña</label>
                  <input
                    type="password"
                    required
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    placeholder="Ingresa tu clave de administrador"
                    className="w-full bg-gray-100 dark:bg-[#0A0D14] border-2 border-gray-200 dark:border-gray-800 focus:border-[#8CFF00] rounded-2xl px-4 py-3 text-sm focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#8CFF00] text-black font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider font-display hover:bg-[#7ce000] transition-all"
                >
                  Entrar al Panel
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Admin Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#121824] p-5 rounded-3xl border-2 border-gray-200 dark:border-gray-800">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#8CFF00]">BCO Tech Control</span>
                  <h2 className="text-2xl font-black font-display uppercase">Panel de Administración</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentView('shop')}
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold hover:border-[#8CFF00] transition-colors"
                  >
                    Ver Tienda
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminAuth(false);
                      setAdminPasswordInput('');
                      showToast('Sesión cerrada.');
                    }}
                    className="px-4 py-2 rounded-xl bg-red-500/15 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Salir
                  </button>
                </div>
              </div>

              {/* Admin Navigation Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'products', label: 'Productos', icon: Package },
                  { id: 'categories', label: 'Categorías', icon: Grid },
                  { id: 'orders', label: `Pedidos (${orders.length})`, icon: DollarSign },
                  { id: 'settings', label: 'Ajustes Tienda', icon: Settings },
                  { id: 'supabase', label: 'Supabase & SQL', icon: RefreshCw }
                ].map(tab => {
                  const Icon = tab.icon;
                  const active = adminTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setAdminTab(tab.id)}
                      className={`px-4 py-2.5 rounded-2xl border-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
                        active
                          ? 'bg-[#8CFF00] text-black border-[#8CFF00]'
                          : 'bg-white dark:bg-[#121824] border-gray-200 dark:border-gray-800 hover:border-[#8CFF00]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: PRODUCTS */}
              {adminTab === 'products' && (
                <div className="bg-white dark:bg-[#121824] rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-lg font-bold font-display uppercase">Productos ({products.length})</h3>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProduct({
                          name: '',
                          category: categories[0]?.id || 'auriculares',
                          price: 0,
                          original_price: 0,
                          stock: 10,
                          active: true,
                          featured: false,
                          on_sale: false,
                          description: '',
                          specs: [],
                          images: []
                        })
                      }
                      className="bg-[#8CFF00] text-black font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#7ce000]"
                    >
                      <Plus className="h-4 w-4" /> Nuevo Producto
                    </button>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {products.map(prod => (
                      <div key={prod.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={prod.images?.[0] || 'https://via.placeholder.com/80'}
                            alt={prod.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-gray-700 shrink-0"
                          />
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-bold text-sm">{prod.name}</h4>
                              {!prod.active && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                                  Inactivo
                                </span>
                              )}
                              {prod.featured && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#8CFF00] text-black">
                                  Destacado
                                </span>
                              )}
                              {prod.on_sale && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#0033FF] text-white">
                                  Oferta
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Categoría: <span className="font-semibold">{prod.category}</span> • Precio:{' '}
                              <span className="font-bold text-[#8CFF00]">${Number(prod.price).toFixed(2)}</span> • Stock:{' '}
                              <span className="font-semibold">{prod.stock}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleProductFlag(prod.id, 'featured')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                              prod.featured
                                ? 'border-[#8CFF00] text-[#8CFF00] bg-[#8CFF00]/10'
                                : 'border-gray-300 dark:border-gray-700 text-gray-400'
                            }`}
                          >
                            Destacar
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleProductFlag(prod.id, 'on_sale')}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                              prod.on_sale
                                ? 'border-[#0033FF] text-blue-400 bg-[#0033FF]/15'
                                : 'border-gray-300 dark:border-gray-700 text-gray-400'
                            }`}
                          >
                            Oferta
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleProductActive(prod.id)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-gray-300 dark:border-gray-700 hover:border-[#8CFF00]"
                          >
                            {prod.active ? 'Desactivar' : 'Activar'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingProduct({ ...prod, images: [...(prod.images || [])], specs: [...(prod.specs || [])] })}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0033FF] text-white hover:opacity-90"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProduct(prod.id)}
                            className="p-2 rounded-xl text-red-400 hover:bg-red-500/15"
                            title="Eliminar producto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: CATEGORIES */}
              {adminTab === 'categories' && (
                <div className="bg-white dark:bg-[#121824] rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-6 space-y-6">
                  <h3 className="text-lg font-bold font-display uppercase">Categorías</h3>

                  <form onSubmit={handleCreateCategory} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Nombre de nueva categoría (ej: Consolas)"
                      className="sm:col-span-2 bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5"
                    />
                    <div className="flex gap-2">
                      <select
                        value={newCategoryIcon}
                        onChange={(e) => setNewCategoryIcon(e.target.value)}
                        className="flex-1 bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-3 py-2.5 font-bold"
                      >
                        <option value="Headphones">Auriculares</option>
                        <option value="Keyboard">Teclado</option>
                        <option value="Mouse">Mouse</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Cpu">Hardware</option>
                        <option value="Sparkles">Gadget</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-[#8CFF00] text-black font-extrabold px-4 py-2.5 rounded-xl uppercase whitespace-nowrap"
                      >
                        Agregar
                      </button>
                    </div>
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map(cat => (
                      <div
                        key={cat.id}
                        className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800"
                      >
                        <div>
                          <p className="font-bold text-sm">{cat.name}</p>
                          <p className="text-[11px] text-gray-400">ID: {cat.id}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="p-2 rounded-xl text-red-400 hover:bg-red-500/15"
                          title="Eliminar categoría"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: ORDERS */}
              {adminTab === 'orders' && (
                <div className="bg-white dark:bg-[#121824] rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-6 space-y-4">
                  <h3 className="text-lg font-bold font-display uppercase">Pedidos Recibidos</h3>
                  {orders.length === 0 ? (
                    <p className="text-sm text-gray-400 py-8 text-center">Aún no hay pedidos registrados.</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map(ord => (
                        <div
                          key={ord.id}
                          className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-black font-display text-sm text-[#8CFF00]">{ord.id}</span>
                              <span className="text-gray-400">• {new Date(ord.created_at).toLocaleString('es-DO')}</span>
                            </div>
                            <p className="font-bold text-sm">
                              {ord.customer_name} ({ord.phone}) — <span className="text-[#8CFF00]">${Number(ord.total || 0).toFixed(2)}</span>
                            </p>
                            <p className="text-gray-400">
                              {ord.address} • Pago: <span className="uppercase font-semibold">{ord.payment_method}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => generateInvoicePDF(ord)}
                              className="px-3 py-2 rounded-xl bg-[#0033FF] text-white font-bold hover:opacity-90"
                            >
                              PDF
                            </button>
                            <select
                              value={ord.status || 'Nuevo'}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                              className="bg-white dark:bg-[#121824] border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 font-bold"
                            >
                              <option value="Nuevo">Nuevo</option>
                              <option value="Confirmado">Confirmado</option>
                              <option value="Entregado">Entregado</option>
                              <option value="Cancelado">Cancelado</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: STORE SETTINGS */}
              {adminTab === 'settings' && (
                <form
                  onSubmit={handleSaveStoreSettings}
                  className="bg-white dark:bg-[#121824] rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-6 space-y-4 text-xs"
                >
                  <h3 className="text-lg font-bold font-display uppercase">Ajustes de la Tienda</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold uppercase mb-1">WhatsApp Principal (con código país)</label>
                      <input
                        type="text"
                        value={settingsDraft.whatsapp}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, whatsapp: e.target.value })}
                        placeholder="18098435918"
                        className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase mb-1">2do WhatsApp para Facturas (Opcional)</label>
                      <input
                        type="text"
                        value={settingsDraft.invoice_whatsapp || ''}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, invoice_whatsapp: e.target.value })}
                        placeholder="Ej: 18095550199"
                        className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase mb-1">Título del Banner</label>
                      <input
                        type="text"
                        value={settingsDraft.hero_title}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, hero_title: e.target.value })}
                        className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase mb-1">Horario de Atención</label>
                      <input
                        type="text"
                        value={settingsDraft.store_hours}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, store_hours: e.target.value })}
                        className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold uppercase mb-1">Subtítulo del Banner</label>
                    <input
                      type="text"
                      value={settingsDraft.hero_subtitle}
                      onChange={(e) => setSettingsDraft({ ...settingsDraft, hero_subtitle: e.target.value })}
                      className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold uppercase mb-1">URL Imagen del Banner</label>
                      <input
                        type="text"
                        value={settingsDraft.hero_image}
                        onChange={(e) => setSettingsDraft({ ...settingsDraft, hero_image: e.target.value })}
                        className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase mb-1">Logo Personalizado (Subir o URL)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={settingsDraft.custom_logo_url || ''}
                          onChange={(e) => setSettingsDraft({ ...settingsDraft, custom_logo_url: e.target.value })}
                          placeholder="Vacío = Logo SVG BCO Tech"
                          className="flex-1 bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-3 py-2.5"
                        />
                        <label className="px-3 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-800 font-bold cursor-pointer hover:border-[#8CFF00]">
                          Subir
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const compressed = await compressImage(file, 400, 0.85);
                              setSettingsDraft(prev => ({ ...prev, custom_logo_url: compressed }));
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(settingsDraft.logo_pill_in_dark)}
                      onChange={(e) => setSettingsDraft({ ...settingsDraft, logo_pill_in_dark: e.target.checked })}
                    />
                    Mostrar píldora blanca detrás del logo en modo oscuro
                  </label>

                  <button
                    type="submit"
                    className="bg-[#8CFF00] text-black font-black px-6 py-3 rounded-2xl uppercase tracking-wider font-display hover:bg-[#7ce000]"
                  >
                    Guardar Cambios
                  </button>
                </form>
              )}

              {/* TAB 5: SUPABASE & SQL */}
              {adminTab === 'supabase' && (
                <div className="bg-white dark:bg-[#121824] rounded-3xl border-2 border-gray-200 dark:border-gray-800 p-6 space-y-5 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-display uppercase">Conexión Supabase</h3>
                      <p className="text-gray-400">
                        Estado actual: <span className="font-bold text-[#8CFF00] uppercase">{spStatus}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(SETUP_SQL_SCRIPT);
                        showToast('Script SQL copiado al portapapeles.');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0033FF] text-white font-bold flex items-center gap-1.5"
                    >
                      <Copy className="h-4 w-4" /> Copiar SQL
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold uppercase mb-1">Supabase Project URL</label>
                      <input
                        type="text"
                        value={supabaseUrlDraft}
                        onChange={(e) => setSupabaseUrlDraft(e.target.value)}
                        placeholder="https://xxxx.supabase.co"
                        className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase mb-1">Supabase Anon Key</label>
                      <input
                        type="password"
                        value={supabaseKeyDraft}
                        onChange={(e) => setSupabaseKeyDraft(e.target.value)}
                        placeholder="eyJhbGciOi..."
                        className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSaveSupabaseConfig(supabaseUrlDraft.trim(), supabaseKeyDraft.trim())}
                    className="bg-[#8CFF00] text-black font-black px-5 py-2.5 rounded-xl uppercase"
                  >
                    Conectar Supabase
                  </button>

                  <pre className="p-4 rounded-2xl bg-[#0A0D14] text-gray-200 border border-gray-800 overflow-x-auto text-[11px] max-h-64">
                    {SETUP_SQL_SCRIPT}
                  </pre>
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {/* --- FOOTER --- */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A0D14] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <BCOLogo
              className="h-10"
              theme={theme}
              customLogoUrl={settings.custom_logo_url}
              usePillInDark={settings.logo_pill_in_dark}
            />
            <p className="text-xs text-gray-400 leading-relaxed">
              Especialistas en hardware, periféricos pro gaming y accesorios tecnológicos de alto rendimiento.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 font-display text-[#0033FF] dark:text-[#8CFF00]">Categorías</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={() => { setCurrentView('shop'); setSelectedCategory('auriculares'); }} className="hover:text-white">Auriculares</button></li>
              <li><button onClick={() => { setCurrentView('shop'); setSelectedCategory('teclados'); }} className="hover:text-white">Teclados Mecánicos</button></li>
              <li><button onClick={() => { setCurrentView('shop'); setSelectedCategory('monitores'); }} className="hover:text-white">Monitores Gaming</button></li>
              <li><button onClick={() => { setCurrentView('shop'); setSelectedCategory('mouse'); }} className="hover:text-white">Mouses Ultralight</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 font-display text-[#0033FF] dark:text-[#8CFF00]">Atención al Cliente</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[#8CFF00]" /> WhatsApp: +{settings.whatsapp}</li>
              <li>{settings.store_hours}</li>
              <li>Garantía directa de 12 meses</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 font-display text-[#0033FF] dark:text-[#8CFF00]">BCO Tech Info</h4>
            <p className="text-xs text-gray-400 mb-3">Envíos rápidos a todo el país y soporte técnico dedicado.</p>
            <div className="text-[10px] text-gray-500">
              &copy; {new Date().getFullYear()} BCO Tech. Todos los derechos reservados.
            </div>
          </div>

        </div>
      </footer>

      {/* --- CART DRAWER MODAL --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-[#121824] h-full flex flex-col justify-between p-6 border-l border-gray-200 dark:border-gray-800 shadow-2xl">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-[#8CFF00]" />
                  <h3 className="font-bold text-lg font-display uppercase">Tu Carrito</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="my-4 max-h-[60vh] overflow-y-auto space-y-3 pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-semibold">El carrito está vacío</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#0A0D14] rounded-2xl border border-gray-200 dark:border-gray-800">
                      <img src={item.product.images?.[0] || 'https://via.placeholder.com/80'} alt="" className="w-14 h-14 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h4 className="font-bold text-xs line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-[#0033FF] dark:text-[#8CFF00] font-extrabold mt-0.5">${item.product.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateCartQty(item.product.id, -1)} className="p-1 bg-gray-200 dark:bg-gray-800 rounded-md">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateCartQty(item.product.id, 1)} className="p-1 bg-gray-200 dark:bg-gray-800 rounded-md">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      
                      <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-xl">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Total Footer */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
                <div className="flex justify-between items-center text-lg font-extrabold">
                  <span>Total:</span>
                  <span className="text-[#8CFF00] font-display">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-[#8CFF00] text-black font-extrabold py-3.5 rounded-2xl text-sm uppercase tracking-wider font-display hover:bg-[#7ce000] transition-all shadow-lg shadow-[#8CFF00]/20"
                >
                  Continuar al Checkout
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* --- PRODUCT DETAIL MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300">
          <div className="animate-modal-pop bg-white dark:bg-[#121824] rounded-3xl border-2 border-[#8CFF00]/40 max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto relative space-y-6 shadow-2xl shadow-[#8CFF00]/10">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-transform hover:rotate-90">
              <X className="h-6 w-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Gallery */}
              <div className="space-y-3">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#0A0D14] border border-gray-200 dark:border-gray-800 group">
                  <img
                    src={selectedProduct.images?.[selectedImageIndex] || selectedProduct.images?.[0] || 'https://via.placeholder.com/400'}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedProduct.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        onClick={() => setSelectedImageIndex(i)}
                        className={`w-16 h-16 object-cover rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedImageIndex === i
                            ? 'border-[#8CFF00] scale-105 shadow-md shadow-[#8CFF00]/20'
                            : 'border-gray-700 opacity-60 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Details & Specs */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase text-[#8CFF00]">{selectedProduct.category}</span>
                <h2 className="text-xl font-bold font-display">{selectedProduct.name}</h2>
                
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black font-display text-[#8CFF00]">${selectedProduct.price.toFixed(2)}</span>
                  {selectedProduct.on_sale && selectedProduct.original_price && (
                    <span className="text-sm text-gray-400 line-through">${selectedProduct.original_price.toFixed(2)}</span>
                  )}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">{selectedProduct.description}</p>

                {/* Specs list */}
                {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                  <div className="bg-gray-50 dark:bg-[#0A0D14] p-3 rounded-xl border border-gray-200 dark:border-gray-800 text-xs space-y-1">
                    <p className="font-bold uppercase text-[10px] text-gray-400 mb-1">Especificaciones:</p>
                    {selectedProduct.specs.map((sp, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-gray-400">{sp.key}:</span>
                        <span className="font-semibold">{sp.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-green-400 font-bold">
                  <Check className="h-4 w-4" /> Stock disponible ({selectedProduct.stock} unidades)
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="w-full bg-[#8CFF00] text-black font-extrabold py-3 rounded-xl text-xs uppercase"
                  >
                    Agregar al Carrito
                  </button>
                  <button
                    onClick={() => handleProductWhatsApp(selectedProduct)}
                    className="w-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-extrabold py-3 rounded-xl text-xs uppercase flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CHECKOUT FORM MODAL --- */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-[#121824] rounded-3xl border-2 border-gray-200 dark:border-gray-800 max-w-lg w-full p-6 relative space-y-6">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold font-display uppercase tracking-wider">Finalizar Pedido</h3>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Alex Ramírez"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs focus:border-[#8CFF00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ej: +54 9 11 1234 5678"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs focus:border-[#8CFF00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Dirección de Entrega / Zona *</label>
                <input
                  type="text"
                  required
                  placeholder="Calle, Número, Ciudad / Zona"
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs focus:border-[#8CFF00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Método de Pago *</label>
                <select
                  value={checkoutForm.paymentMethod}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs font-bold"
                >
                  <option value="efectivo">Efectivo contra entrega</option>
                  <option value="transferencia">Transferencia Bancaria</option>
                  <option value="tarjeta">Link de Pago / Tarjeta</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Notas Adicionales</label>
                <textarea
                  placeholder="Horario preferido de entrega, observaciones..."
                  value={checkoutForm.notes}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                  rows={2}
                  className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#8CFF00] text-black font-extrabold py-3.5 rounded-2xl text-sm uppercase tracking-wider font-display hover:bg-[#7ce000] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" /> Confirmar Pedido por WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CONFIRMACIÓN DE PEDIDO + DESCARGA DE FACTURA PDF --- */}
      {lastConfirmedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="animate-modal-pop bg-white dark:bg-[#121824] rounded-3xl border-2 border-[#8CFF00] max-w-md w-full p-6 relative space-y-5 shadow-2xl">
            <button
              onClick={() => setLastConfirmedOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="inline-block px-3 py-1 rounded-full bg-[#8CFF00]/15 text-[#8CFF00] text-[10px] font-black uppercase tracking-wider">
                Pedido Registrado
              </span>
              <h3 className="text-xl font-bold font-display">Factura #{lastConfirmedOrder.order.id}</h3>
              <p className="text-xs text-gray-400">
                Se ha generado tu factura en PDF y preparado el mensaje para WhatsApp.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-[#0A0D14] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Cliente:</span>
                <span className="font-bold">{lastConfirmedOrder.order.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pago:</span>
                <span className="font-bold uppercase">{lastConfirmedOrder.order.payment_method}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-800">
                <span className="font-bold">Total:</span>
                <span className="font-black text-[#8CFF00] font-display">
                  ${Number(lastConfirmedOrder.order.total || 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => generateInvoicePDF(lastConfirmedOrder.order)}
                className="w-full bg-[#0033FF] text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider hover:opacity-95 transition-all"
              >
                Descargar PDF
              </button>
              <a
                href={lastConfirmedOrder.waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#8CFF00] text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#7ce000] transition-all"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Principal
              </a>
              {lastConfirmedOrder.invoiceWaUrl && (
                <a
                  href={lastConfirmedOrder.invoiceWaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="sm:col-span-2 w-full border-2 border-[#8CFF00] text-[#8CFF00] hover:bg-[#8CFF00] hover:text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle className="h-4 w-4" /> Enviar Factura al 2do WhatsApp (+{lastConfirmedOrder.order.invoice_whatsapp})
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- ADMIN EDIT PRODUCT FORM MODAL --- */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-[#121824] rounded-3xl border-2 border-gray-200 dark:border-gray-800 max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <button onClick={() => setEditingProduct(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold font-display uppercase">{editingProduct.id ? 'Editar Producto' : 'Nuevo Producto'}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase mb-1">Nombre del Producto</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Categoría</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-3 py-2 font-bold"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Precio ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Precio Anterior Tachado ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.original_price || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, original_price: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-bold uppercase mb-1">Stock Disponible</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                  className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editingProduct.on_sale}
                    onChange={(e) => setEditingProduct({ ...editingProduct, on_sale: e.target.checked })}
                  /> Oferta
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                  /> Destacado
                </label>
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase mb-1">Descripción Detallada</label>
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                rows={3}
                className="w-full bg-gray-100 dark:bg-[#0A0D14] border border-gray-300 dark:border-gray-800 rounded-xl px-3 py-2"
              />
            </div>

            {/* MULTI-IMAGE DRAG AND DROP WITH COMPRESSION */}
            <div>
              <label className="block font-bold uppercase mb-1">Imágenes del Producto (Arrastrar o seleccionar)</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-800 p-4 rounded-2xl text-center space-y-2 bg-gray-50 dark:bg-[#0A0D14]">
                <Upload className="h-6 w-6 mx-auto text-gray-400" />
                <p className="text-gray-400">Arrastra archivos aquí o haz clic para subir</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files);
                    const compressed = await Promise.all(files.map(f => compressImage(f)));
                    setEditingProduct(prev => ({
                      ...prev,
                      images: [...(prev.images || []), ...compressed]
                    }));
                  }}
                  className="text-xs"
                />
              </div>

              {/* Image previews and reordering */}
              {editingProduct.images && editingProduct.images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pt-3">
                  {editingProduct.images.map((img, index) => (
                    <div key={index} className="relative group shrink-0 bg-[#0A0D14] p-1.5 rounded-xl border border-gray-700 space-y-1">
                      <img src={img} alt="" className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex items-center justify-between gap-1 text-[10px]">
                        <button
                          type="button"
                          onClick={() => moveProductImage(index, -1)}
                          disabled={index === 0}
                          className="p-0.5 rounded bg-gray-800 disabled:opacity-30"
                          title="Mover izquierda"
                        >
                          <ArrowLeft className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPrimaryProductImage(index)}
                          className={`px-1 rounded font-bold ${index === 0 ? 'text-[#8CFF00]' : 'text-gray-400 hover:text-white'}`}
                          title="Principal"
                        >
                          {index === 0 ? '★' : '1ra'}
                        </button>
                        <button
                          type="button"
                          onClick={() => moveProductImage(index, 1)}
                          disabled={index === editingProduct.images.length - 1}
                          className="p-0.5 rounded bg-gray-800 disabled:opacity-30"
                          title="Mover derecha"
                        >
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }));
                        }}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => saveProduct(editingProduct)}
              className="w-full bg-[#8CFF00] text-black font-extrabold py-3 rounded-2xl text-xs uppercase"
            >
              Guardar Producto
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
// ==================== APP.JS - LUMINA WATCH SHOP ====================
// STORAGE KEYS
const STORAGE = {
    USERS: 'lumina_users',
    CURRENT_USER: 'lumina_currentUser',
    PRODUCTS: 'lumina_products',
    CART: 'lumina_cart',
    FAVORITES: 'lumina_favorites',
    LANGUAGE: 'lumina_language'
};

// ==================== EXCHANGE RATE ====================
const USD_TO_UZS = 12800; // 1$ = 12,800 UZS

// ==================== TRANSLATIONS ====================
const TRANSLATIONS = {
    uz: {
        // Hero
        hero_badge: "EST. 2024",
        hero_title: "Vaqt <span class='gradient-text'>San'atga</span> Aylanadi",
        hero_subtitle: "Bizning aniq soatlar kolleksiyamizni kashf eting, har bir soniya mukammallik haqida hikoya qiladi.",
        stat_products: "Asarlar",
        stat_brands: "Brendlar",
        stat_support: "Konsyerj",

        // Categories
        cat_all: "Barchasi",
        cat_smart: "Aqlli Soatlar",
        cat_luxury: "Hashamatli",
        cat_sport: "Sport",
        cat_classic: "Klassik",

        // Cart & UI
        cart_title: "Savat",
        cart_total_label: "Jami:",
        checkout_btn_text: "Rasmiylashtirish",
        fav_title: "Sevimlilar",
        orders_title: "Buyurtmalarim",

        // Checkout
        checkout_title: "Buyurtmani Rasmiylashtirish",
        checkout_subtitle: "Mahsulotlarni tekshiring va yetkazib berish ma'lumotlarini kiriting",
        step1_text: "1. Tekshirish",
        step2_text: "2. Ma'lumotlar",
        step3_text: "3. To'lov",
        shipping_info_title: "Yetkazib Berish Ma'lumotlari",
        fullname_label: "To'liq Ism *",
        email_label: "Email *",
        phone_label: "Telefon *",
        address_label: "Manzil *",
        city_label: "Shahar *",
        zip_label: "Pochta indeksi *",
        country_label: "Davlat *",
        payment_title: "To'lov Usuli",
        payment_card: "Kredit Karta",
        payment_crypto: "Kriptovalyuta",
        place_order_text: "Buyurtma Berish",

        // Auth
        login_title: "Xush Kelibsiz",
        login_subtitle: "Kolleksiyangizga kirish uchun tizimga kiring",
        login_btn_text: "Kirish",
        login_footer: "Luminaga yangimisiz?",
        create_account_link: "Hisob yaratish",
        register_title: "Hisob Yaratish",
        register_subtitle: "Lumina oilasiga qo'shiling",
        register_btn_text: "Ro'yxatdan o'tish",
        register_footer: "Hisobingiz bormi?",
        signin_link: "Kirish",

        // Product modal
        modal_add_cart_text: "Savatga Qo'shish",
        modal_fav_text: "Sevimlilarga Qo'shish",

        // Messages
        added_to_cart: "savatga qo'shildi",
        removed_fav: "Sevimlilardan olib tashlandi",
        added_fav: "Sevimlilarga qo'shildi",
        empty_cart: "Savat bo'sh",
        empty_fav: "Sevimlilar yo'q",
        no_products: "Soatlar topilmadi",
        login_error: "Xato login yoki parol",
        register_error: "Bunday foydalanuvchi mavjud",
        register_success: "Ro'yxatdan o'tdingiz! Iltimos, kiring",
        welcome_back: "Xush kelibsiz, ",
        logged_out: "Chiqib ketildi",
        checkout_success: "Buyurtma qabul qilindi!",

        // Currency
        currency: "so'm",
        currency_code: "UZS"
    },
    ru: {
        // Hero
        hero_badge: "ОСН. 2024",
        hero_title: "Где время <span class='gradient-text'>становится</span> искусством",
        hero_subtitle: "Откройте нашу коллекцию точных часов, где каждая секунда рассказывает историю совершенства.",
        stat_products: "Шедевров",
        stat_brands: "Брендов",
        stat_support: "Консьерж",

        // Categories
        cat_all: "Все",
        cat_smart: "Умные часы",
        cat_luxury: "Роскошь",
        cat_sport: "Спорт",
        cat_classic: "Классика",

        // Cart & UI
        cart_title: "Корзина",
        cart_total_label: "Итого:",
        checkout_btn_text: "Оформить",
        fav_title: "Избранное",
        orders_title: "Мои заказы",

        // Checkout
        checkout_title: "Оформление Заказа",
        checkout_subtitle: "Проверьте товары и введите данные доставки",
        step1_text: "1. Проверка",
        step2_text: "2. Данные",
        step3_text: "3. Оплата",
        shipping_info_title: "Информация о Доставке",
        fullname_label: "Полное Имя *",
        email_label: "Email *",
        phone_label: "Телефон *",
        address_label: "Адрес *",
        city_label: "Город *",
        zip_label: "Почтовый индекс *",
        country_label: "Страна *",
        payment_title: "Способ Оплаты",
        payment_card: "Кредитная Карта",
        payment_crypto: "Криптовалюта",
        place_order_text: "Разместить Заказ",

        // Auth
        login_title: "С Добром Пожаловать",
        login_subtitle: "Войдите чтобы получить доступ к коллекции",
        login_btn_text: "Войти",
        login_footer: "Новый пользователь?",
        create_account_link: "Создать аккаунт",
        register_title: "Создать Аккаунт",
        register_subtitle: "Присоединяйтесь к семье Lumina",
        register_btn_text: "Зарегистрироваться",
        register_footer: "Уже есть аккаунт?",
        signin_link: "Войти",

        // Product modal
        modal_add_cart_text: "В Корзину",
        modal_fav_text: "В Избранное",

        // Messages
        added_to_cart: "добавлен в корзину",
        removed_fav: "Удалено из избранного",
        added_fav: "Добавлено в избранное",
        empty_cart: "Корзина пуста",
        empty_fav: "Избранное пусто",
        no_products: "Часы не найдены",
        login_error: "Неверный логин или пароль",
        register_error: "Пользователь уже существует",
        register_success: "Регистрация прошла успешно! Войдите",
        welcome_back: "С возвращением, ",
        logged_out: "Выход выполнен",
        checkout_success: "Заказ принят!",

        // Currency
        currency: "сум",
        currency_code: "UZS"
    }
};

// ==================== GLOBAL STATE ====================
let currentUser = null;
let products = [];
let cart = [];
let favorites = [];
let currentModalProduct = null;
let currentFilter = 'all';
let currentSearch = '';
let currentLanguage = 'uz'; // Default: Uzbek

// ==================== LANGUAGE FUNCTIONS ====================
function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;

    currentLanguage = lang;
    localStorage.setItem(STORAGE.LANGUAGE, lang);

    // Update active button state
    document.querySelectorAll('.lang-btn-bottom').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update all UI texts
    updateUITexts();

    // Re-render products to update prices in new currency
    renderProducts();
    renderCartPanel();
    renderFavoritesPanel();

    showToast(`Til o'zgartirildi / Язык изменен`, 'success');
}

function updateUITexts() {
    const t = TRANSLATIONS[currentLanguage];
    if (!t) return;

    // Hero section
    const heroBadge = document.getElementById('hero-badge');
    if (heroBadge) heroBadge.innerText = t.hero_badge;

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) heroTitle.innerHTML = t.hero_title;

    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle) heroSubtitle.innerText = t.hero_subtitle;

    const statProducts = document.getElementById('stat-products');
    if (statProducts) statProducts.innerText = t.stat_products;

    const statBrands = document.getElementById('stat-brands');
    if (statBrands) statBrands.innerText = t.stat_brands;

    const statSupport = document.getElementById('stat-support');
    if (statSupport) statSupport.innerText = t.stat_support;

    // Category buttons
    const catAll = document.getElementById('cat-all');
    if (catAll) catAll.innerText = t.cat_all;

    const catSmart = document.getElementById('cat-smart');
    if (catSmart) catSmart.innerText = t.cat_smart;

    const catLuxury = document.getElementById('cat-luxury');
    if (catLuxury) catLuxury.innerText = t.cat_luxury;

    const catSport = document.getElementById('cat-sport');
    if (catSport) catSport.innerText = t.cat_sport;

    const catClassic = document.getElementById('cat-classic');
    if (catClassic) catClassic.innerText = t.cat_classic;

    // Panel titles
    const cartTitle = document.getElementById('cart-title');
    if (cartTitle) cartTitle.innerText = t.cart_title;

    const cartTotalLabel = document.getElementById('cart-total-label');
    if (cartTotalLabel) cartTotalLabel.innerText = t.cart_total_label;

    const checkoutBtnText = document.getElementById('checkout-btn-text');
    if (checkoutBtnText) checkoutBtnText.innerText = t.checkout_btn_text;

    const favTitle = document.getElementById('fav-title');
    if (favTitle) favTitle.innerText = t.fav_title;

    const ordersTitle = document.getElementById('orders-title');
    if (ordersTitle) ordersTitle.innerText = t.orders_title;

    // Checkout modal
    const checkoutTitle = document.getElementById('checkout-title');
    if (checkoutTitle) checkoutTitle.innerText = t.checkout_title;

    const checkoutSubtitle = document.getElementById('checkout-subtitle');
    if (checkoutSubtitle) checkoutSubtitle.innerText = t.checkout_subtitle;

    const step1Text = document.getElementById('step1-text');
    if (step1Text) step1Text.innerText = t.step1_text;

    const step2Text = document.getElementById('step2-text');
    if (step2Text) step2Text.innerText = t.step2_text;

    const step3Text = document.getElementById('step3-text');
    if (step3Text) step3Text.innerText = t.step3_text;

    const shippingInfoTitle = document.getElementById('shipping-info-title');
    if (shippingInfoTitle) shippingInfoTitle.innerText = t.shipping_info_title;

    const fullnameLabel = document.getElementById('fullname-label');
    if (fullnameLabel) fullnameLabel.innerText = t.fullname_label;

    const emailLabel = document.getElementById('email-label');
    if (emailLabel) emailLabel.innerText = t.email_label;

    const phoneLabel = document.getElementById('phone-label');
    if (phoneLabel) phoneLabel.innerText = t.phone_label;

    const addressLabel = document.getElementById('address-label');
    if (addressLabel) addressLabel.innerText = t.address_label;

    const cityLabel = document.getElementById('city-label');
    if (cityLabel) cityLabel.innerText = t.city_label;

    const zipLabel = document.getElementById('zip-label');
    if (zipLabel) zipLabel.innerText = t.zip_label;

    const countryLabel = document.getElementById('country-label');
    if (countryLabel) countryLabel.innerText = t.country_label;

    const paymentTitle = document.getElementById('payment-title');
    if (paymentTitle) paymentTitle.innerText = t.payment_title;

    const paymentCard = document.getElementById('payment-card');
    if (paymentCard) paymentCard.innerText = t.payment_card;

    const paymentCrypto = document.getElementById('payment-crypto');
    if (paymentCrypto) paymentCrypto.innerText = t.payment_crypto;

    const placeOrderText = document.getElementById('place-order-text');
    if (placeOrderText) placeOrderText.innerText = t.place_order_text;

    // Auth modals
    const loginTitle = document.getElementById('login-title');
    if (loginTitle) loginTitle.innerText = t.login_title;

    const loginSubtitle = document.getElementById('login-subtitle');
    if (loginSubtitle) loginSubtitle.innerText = t.login_subtitle;

    const loginBtnText = document.getElementById('login-btn-text');
    if (loginBtnText) loginBtnText.innerText = t.login_btn_text;

    const loginFooter = document.getElementById('login-footer');
    if (loginFooter) loginFooter.innerText = t.login_footer;

    const createAccountLink = document.getElementById('create-account-link');
    if (createAccountLink) createAccountLink.innerText = t.create_account_link;

    const registerTitle = document.getElementById('register-title');
    if (registerTitle) registerTitle.innerText = t.register_title;

    const registerSubtitle = document.getElementById('register-subtitle');
    if (registerSubtitle) registerSubtitle.innerText = t.register_subtitle;

    const registerBtnText = document.getElementById('register-btn-text');
    if (registerBtnText) registerBtnText.innerText = t.register_btn_text;

    const registerFooter = document.getElementById('register-footer');
    if (registerFooter) registerFooter.innerText = t.register_footer;

    const signinLink = document.getElementById('signin-link');
    if (signinLink) signinLink.innerText = t.signin_link;

    // Modal buttons
    const modalAddCartText = document.getElementById('modal-add-cart-text');
    if (modalAddCartText) modalAddCartText.innerText = t.modal_add_cart_text;

    const modalFavText = document.getElementById('modal-fav-text');
    if (modalFavText) modalFavText.innerText = t.modal_fav_text;

    // Search placeholder
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.placeholder = currentLanguage === 'uz' ? 'Asarlarni qidirish...' : 'Поиск шедевров...';
    }
}

function formatPrice(usdPrice) {
    if (currentLanguage === 'uz') {
        const uzsPrice = usdPrice * USD_TO_UZS;
        return uzsPrice.toLocaleString() + ' so\'m';
    } else {
        return '$' + usdPrice.toLocaleString();
    }
}

function getCurrencySymbol() {
    return currentLanguage === 'uz' ? 'so\'m' : '$';
}

// ==================== DEFAULT DATA ====================
const DEFAULT_PRODUCTS = [
    { id: 'p1', name: 'AURORA X1', price: 1299, category: 'Smart Watches', description: 'Ultimate smartwatch with AMOLED display, 7-day battery, and titanium build.', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400' },
    { id: 'p2', name: 'CELESTIAL GOLD', price: 8900, category: 'Luxury', description: '18K rose gold case, diamond indices, Swiss automatic movement.', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400' },
    { id: 'p3', name: 'NITRO SPORT', price: 599, category: 'Sport', description: 'Carbon fiber chronograph, 200m water resistance, heart rate monitor.', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400' },
    { id: 'p4', name: 'HERITAGE CLASSIC', price: 2450, category: 'Classic', description: 'Mechanical hand-wound movement, sapphire crystal, leather strap.', image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400' },
    { id: 'p5', name: 'PHANTOM X', price: 1899, category: 'Smart Watches', description: 'Sapphire glass, ECG, blood oxygen, and luxury ceramic bezel.', image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400' },
    { id: 'p6', name: 'ROYAL ECLIPSE', price: 12500, category: 'Luxury', description: 'Limited edition, platinum case, skeleton dial, handcrafted in Switzerland.', image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400' },
    { id: 'p7', name: 'TITAN RACER', price: 799, category: 'Sport', description: 'GPS, altimeter, compass, shock resistant, ideal for extreme sports.', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400' },
    { id: 'p8', name: 'VINTAGE MOONPHASE', price: 3200, category: 'Classic', description: 'Moon phase complication, crocodile leather strap, exhibition caseback.', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400' },
    { id: 'p9', name: 'NOVA ULTRA', price: 1599, category: 'Smart Watches', description: 'Always-on display, LTE connectivity, 100+ sports modes.', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400' },
    { id: 'p10', name: 'MIDNIGHT SAPPHIRE', price: 5600, category: 'Luxury', description: 'Blue aventurine dial, diamond markers, automatic movement.', image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400' }
];

// DEFAULT USERS
const DEFAULT_USERS = [
    { username: 'admin', password: '12345', isAdmin: true },
    { username: 'john_doe', password: 'user123', isAdmin: false }
];

// ==================== INITIALIZATION ====================
function init() {
    console.log('Initializing app...');

    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
    }

    try {
        initializeStorage();
        loadStorage();

        // Load saved language
        const savedLang = localStorage.getItem(STORAGE.LANGUAGE);
        if (savedLang && TRANSLATIONS[savedLang]) {
            currentLanguage = savedLang;
        } else {
            currentLanguage = 'uz'; // Default Uzbek
        }

        renderProducts();
        updateBadges();
        checkAuthUI();
        setupEventListeners();
        setupLanguageSelector();
        updateUITexts();
        setupLanguageSelector();
        setupAutoHideLanguageSelector()

        setTimeout(() => {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }
            console.log('App initialized successfully');
        }, 3000);

    } catch (error) {
        console.error('Initialization error:', error);
        showToast('Error loading app. Please refresh.', 'error');

        setTimeout(() => {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        }, 2000);
    }
}

function setupLanguageSelector() {
    // Create language selector HTML if not exists
    let langSelector = document.querySelector('.language-selector-bottom');
    if (!langSelector) {
        langSelector = document.createElement('div');
        langSelector.className = 'language-selector-bottom';
        langSelector.innerHTML = `
            <button class="lang-btn-bottom ${currentLanguage === 'uz' ? 'active' : ''}" data-lang="uz">
                <i class="fas fa-language"></i> O'zbek
            </button>
            <button class="lang-btn-bottom ${currentLanguage === 'ru' ? 'active' : ''}" data-lang="ru">
                <i class="fas fa-language"></i> Русский
            </button>
        `;
        document.body.appendChild(langSelector);
    }

    // Add event listeners
    document.querySelectorAll('.lang-btn-bottom').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang) setLanguage(lang);
        });
    });
}

function initializeStorage() {
    if (!localStorage.getItem(STORAGE.USERS)) {
        localStorage.setItem(STORAGE.USERS, JSON.stringify(DEFAULT_USERS));
        console.log('Default users created');
    }

    if (!localStorage.getItem(STORAGE.PRODUCTS)) {
        localStorage.setItem(STORAGE.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
        console.log('Default products created');
    }

    if (!localStorage.getItem(STORAGE.CART)) {
        localStorage.setItem(STORAGE.CART, JSON.stringify([]));
    }

    if (!localStorage.getItem(STORAGE.FAVORITES)) {
        localStorage.setItem(STORAGE.FAVORITES, JSON.stringify([]));
    }
}

function loadStorage() {
    const storedProducts = localStorage.getItem(STORAGE.PRODUCTS);
    products = storedProducts ? JSON.parse(storedProducts) : [];

    const storedCart = localStorage.getItem(STORAGE.CART);
    cart = storedCart ? JSON.parse(storedCart) : [];

    const storedFavorites = localStorage.getItem(STORAGE.FAVORITES);
    favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    const savedUser = localStorage.getItem(STORAGE.CURRENT_USER);
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch (e) {
            currentUser = null;
        }
    }
}

function saveProducts() {
    localStorage.setItem(STORAGE.PRODUCTS, JSON.stringify(products));
}

function saveCart() {
    localStorage.setItem(STORAGE.CART, JSON.stringify(cart));
    updateBadges();
}

function saveFavorites() {
    localStorage.setItem(STORAGE.FAVORITES, JSON.stringify(favorites));
    updateBadges();
}

function saveCurrentUser() {
    if (currentUser) {
        localStorage.setItem(STORAGE.CURRENT_USER, JSON.stringify(currentUser));
    } else {
        localStorage.removeItem(STORAGE.CURRENT_USER);
    }
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        if (toast && toast.remove) toast.remove();
    }, 3000);
}

// ==================== RENDER PRODUCTS ====================
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const t = TRANSLATIONS[currentLanguage];

    try {
        let filtered = products.filter(p => {
            const matchCat = currentFilter === 'all' || p.category === currentFilter;
            const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
            return matchCat && matchSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="empty-state"><i class="fas fa-eye"></i><p>${t.no_products}</p></div>`;
            return;
        }

        grid.innerHTML = filtered.map(product => `
            <div class="product-card glass-card" data-id="${product.id}">
                <div class="card-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=Watch'">
                    <button class="fav-btn ${favorites.some(f => f && f.id === product.id) ? 'active' : ''}" data-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="card-info">
                    <h3>${escapeHtml(product.name)}</h3>
                    <p class="category">${product.category}</p>
                    <div class="price-row">
                        <span class="price">${formatPrice(product.price)}</span>
                        <button class="quick-cart" data-id="${product.id}"><i class="fas fa-shopping-bag"></i></button>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.fav-btn') && !e.target.closest('.quick-cart')) {
                    const id = card.dataset.id;
                    if (id) openProductModal(id);
                }
            });
        });

        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                if (id) toggleFavorite(id);
            });
        });

        document.querySelectorAll('.quick-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                if (id) addToCart(id);
            });
        });
    } catch (error) {
        console.error('Render products error:', error);
        grid.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><p>Error loading products</p></div>';
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentModalProduct = product;
    const modal = document.getElementById('product-modal');
    const detailsDiv = document.getElementById('modal-details');
    const isFav = favorites.some(f => f && f.id === product.id);
    const t = TRANSLATIONS[currentLanguage];

    if (detailsDiv) {
        detailsDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:16px; margin-bottom:1rem;" onerror="this.src='https://via.placeholder.com/400'">
            <h2>${escapeHtml(product.name)}</h2>
            <p class="category">${product.category}</p>
            <p class="price">${formatPrice(product.price)}</p>
            <p class="description">${escapeHtml(product.description)}</p>
        `;
    }

    const favBtn = document.getElementById('modal-fav');
    if (favBtn) {
        favBtn.innerHTML = isFav ? '❤️ ' + (currentLanguage === 'uz' ? 'Sevimlilarda' : 'В избранном') : '🤍 ' + t.modal_fav_text;
    }

    if (modal) modal.style.display = 'flex';
}

// ==================== CART FUNCTIONS ====================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    showToast(`${product.name} ${TRANSLATIONS[currentLanguage].added_to_cart}`, 'success');
    renderCartPanel();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartPanel();
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCartPanel();
        }
    }
}

function renderCartPanel() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    const t = TRANSLATIONS[currentLanguage];

    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-bag"></i><p>${t.empty_cart}</p></div>`;
        const totalSpan = document.getElementById('cart-total');
        if (totalSpan) totalSpan.innerText = '0';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/70'">
                <div class="cart-item-info">
                    <h4>${escapeHtml(item.name)}</h4>
                    <p>${formatPrice(item.price)}</p>
                    <div class="qty-control">
                        <button class="qty-btn" data-id="${item.id}" data-delta="-1">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
                        <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const totalSpan = document.getElementById('cart-total');
    if (totalSpan) totalSpan.innerText = formatPrice(total);

    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const delta = parseInt(btn.dataset.delta);
            if (id && delta) updateQuantity(id, delta);
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            if (id) removeFromCart(id);
        });
    });
}

// ==================== FAVORITES ====================
function toggleFavorite(productId) {
    const exists = favorites.find(f => f && f.id === productId);
    const product = products.find(p => p.id === productId);
    const t = TRANSLATIONS[currentLanguage];

    if (!product) return;

    if (exists) {
        favorites = favorites.filter(f => f && f.id !== productId);
        showToast(t.removed_fav, 'info');
    } else {
        favorites.push(product);
        showToast(t.added_fav, 'success');
    }

    saveFavorites();
    renderProducts();
    renderFavoritesPanel();
}

function renderFavoritesPanel() {
    const container = document.getElementById('favorites-items');
    if (!container) return;

    const t = TRANSLATIONS[currentLanguage];

    if (favorites.length === 0) {
        container.innerHTML = `<div class="empty-cart"><i class="fas fa-heart"></i><p>${t.empty_fav}</p></div>`;
        return;
    }

    container.innerHTML = favorites.map(fav => `
        <div class="cart-item">
            <img src="${fav.image}" alt="${fav.name}" onerror="this.src='https://via.placeholder.com/70'">
            <div class="cart-item-info">
                <h4>${escapeHtml(fav.name)}</h4>
                <p>${formatPrice(fav.price)}</p>
                <button class="fav-remove" data-id="${fav.id}">${currentLanguage === 'uz' ? 'Olib tashlash' : 'Удалить'}</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.fav-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            if (id) toggleFavorite(id);
        });
    });
}

// ==================== AUTH ====================
function register(username, password) {
    const t = TRANSLATIONS[currentLanguage];

    if (!username || !password) {
        showToast(currentLanguage === 'uz' ? 'Username va parol kiriting' : 'Введите имя пользователя и пароль', 'error');
        return false;
    }

    const users = JSON.parse(localStorage.getItem(STORAGE.USERS) || '[]');
    if (users.find(u => u.username === username)) {
        showToast(t.register_error, 'error');
        return false;
    }

    users.push({ username, password, isAdmin: false });
    localStorage.setItem(STORAGE.USERS, JSON.stringify(users));
    showToast(t.register_success, 'success');
    return true;
}

function login(username, password) {
    const t = TRANSLATIONS[currentLanguage];
    const users = JSON.parse(localStorage.getItem(STORAGE.USERS) || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        showToast(t.login_error, 'error');
        return false;
    }

    currentUser = { username: user.username, isAdmin: user.isAdmin || false };
    saveCurrentUser();
    checkAuthUI();
    showToast(t.welcome_back + username + '!', 'success');
    closeAllModals();
    return true;
}

function logout() {
    const t = TRANSLATIONS[currentLanguage];
    currentUser = null;
    localStorage.removeItem(STORAGE.CURRENT_USER);
    checkAuthUI();
    showToast(t.logged_out, 'info');
    renderProducts();
}

function checkAuthUI() {
    const authDiv = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const welcomeSpan = document.getElementById('welcome-user');
    const adminDashboardBtn = document.getElementById('admin-dashboard-btn');

    if (currentUser) {
        if (authDiv) authDiv.style.display = 'none';
        if (userMenu) userMenu.style.display = 'flex';
        if (welcomeSpan) welcomeSpan.innerHTML = `<i class="fas fa-user-astronaut"></i> ${escapeHtml(currentUser.username)}`;

        if (adminDashboardBtn) {
            if (currentUser.isAdmin) {
                adminDashboardBtn.style.display = 'flex';
                adminDashboardBtn.onclick = () => {
                    window.location.href = 'admin.html';
                };
            } else {
                adminDashboardBtn.style.display = 'none';
            }
        }
    } else {
        if (authDiv) authDiv.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
        if (adminDashboardBtn) adminDashboardBtn.style.display = 'none';
    }
}

// ==================== UI & EVENT LISTENERS ====================
function updateBadges() {
    const cartCount = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
    const favCount = favorites.length;

    const cartBadge = document.getElementById('cart-badge');
    const favBadge = document.getElementById('fav-badge');

    if (cartBadge) cartBadge.innerText = cartCount;
    if (favBadge) favBadge.innerText = favCount;
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(m => {
        if (m) m.style.display = 'none';
    });

    const cartPanel = document.getElementById('cart-panel');
    const favPanel = document.getElementById('favorites-panel');

    if (cartPanel) cartPanel.classList.remove('open');
    if (favPanel) favPanel.classList.remove('open');
}
function setupAutoHideLanguageSelector() {
    const selector = document.querySelector('.language-selector-bottom');
    if (!selector) return;

    let hideTimeout;
    const HIDE_DELAY = 10000; // 10 soniya

    function showSelector() {
        if (hideTimeout) clearTimeout(hideTimeout);
        selector.classList.remove('hide');
        // Yana 10 soniyadan keyin yashirishni boshlaymiz
        hideTimeout = setTimeout(() => {
            selector.classList.add('hide');
        }, HIDE_DELAY);
    }

    function resetTimer() {
        if (hideTimeout) clearTimeout(hideTimeout);
        selector.classList.remove('hide');
        hideTimeout = setTimeout(() => {
            selector.classList.add('hide');
        }, HIDE_DELAY);
    }

    // Dastlab ko‘rsatib, keyin yashiramiz
    showSelector();

    // Butun sahifa bo‘ylab sichqoncha harakatlansa – tugmalarni ko‘rsat va vaqtni qayta hisobla
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('scroll', resetTimer);
    document.addEventListener('click', resetTimer);

    // Tugmalar ustiga kelsa ham qayta ishga tushir (ixtiyoriy)
    selector.addEventListener('mouseenter', resetTimer);
    selector.addEventListener('mouseleave', () => {
        // Sichqoncha tugmalardan chiqib ketgach ham 10 soniyadan keyin yashir
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            selector.classList.add('hide');
        }, HIDE_DELAY);
    });
}
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
        });
    }

    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderProducts();
        });
    }

    // Category filters
    document.querySelectorAll('.cat-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.cat;
            renderProducts();
        });
    });

    // Cart panel
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            renderCartPanel();
            const panel = document.getElementById('cart-panel');
            if (panel) panel.classList.add('open');
        });
    }

    // Favorites panel
    const favBtn = document.getElementById('favorites-btn');
    if (favBtn) {
        favBtn.addEventListener('click', () => {
            renderFavoritesPanel();
            const panel = document.getElementById('favorites-panel');
            if (panel) panel.classList.add('open');
        });
    }

    // Close panels
    const closeCart = document.getElementById('close-cart');
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            const panel = document.getElementById('cart-panel');
            if (panel) panel.classList.remove('open');
        });
    }

    const closeFav = document.getElementById('close-fav');
    if (closeFav) {
        closeFav.addEventListener('click', () => {
            const panel = document.getElementById('favorites-panel');
            if (panel) panel.classList.remove('open');
        });
    }

    // Checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const t = TRANSLATIONS[currentLanguage];
            showToast(t.checkout_success, 'success');
            cart = [];
            saveCart();
            renderCartPanel();
            updateBadges();
            const panel = document.getElementById('cart-panel');
            if (panel) panel.classList.remove('open');
        });
    }

    // Auth modals
    const loginNavBtn = document.getElementById('login-nav-btn');
    if (loginNavBtn) {
        loginNavBtn.addEventListener('click', () => {
            const modal = document.getElementById('login-modal');
            if (modal) modal.style.display = 'flex';
        });
    }

    const registerNavBtn = document.getElementById('register-nav-btn');
    if (registerNavBtn) {
        registerNavBtn.addEventListener('click', () => {
            const modal = document.getElementById('register-modal');
            if (modal) modal.style.display = 'flex';
        });
    }

    // Login action
    const doLogin = document.getElementById('do-login');
    if (doLogin) {
        doLogin.addEventListener('click', () => {
            const username = document.getElementById('login-username')?.value || '';
            const password = document.getElementById('login-password')?.value || '';
            if (login(username, password)) {
                const modal = document.getElementById('login-modal');
                if (modal) modal.style.display = 'none';
                const userInput = document.getElementById('login-username');
                const passInput = document.getElementById('login-password');
                if (userInput) userInput.value = '';
                if (passInput) passInput.value = '';
            }
        });
    }

    // Register action
    const doRegister = document.getElementById('do-register');
    if (doRegister) {
        doRegister.addEventListener('click', () => {
            const username = document.getElementById('reg-username')?.value || '';
            const password = document.getElementById('reg-password')?.value || '';
            if (register(username, password)) {
                const modal = document.getElementById('register-modal');
                if (modal) modal.style.display = 'none';
                const userInput = document.getElementById('reg-username');
                const passInput = document.getElementById('reg-password');
                if (userInput) userInput.value = '';
                if (passInput) passInput.value = '';
            }
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Modal close buttons
    document.querySelectorAll('.modal-close, .modal').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target === el || e.target.classList.contains('modal-close')) {
                closeAllModals();
            }
        });
    });

    // Modal actions
    const modalAddCart = document.getElementById('modal-add-cart');
    if (modalAddCart) {
        modalAddCart.addEventListener('click', () => {
            if (currentModalProduct) addToCart(currentModalProduct.id);
            closeAllModals();
        });
    }

    const modalFav = document.getElementById('modal-fav');
    if (modalFav) {
        modalFav.addEventListener('click', () => {
            if (currentModalProduct) {
                toggleFavorite(currentModalProduct.id);
                openProductModal(currentModalProduct.id);
            }
        });
    }
}

// Start the app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
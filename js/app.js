// ==================== APP.JS - LUMINA WATCH SHOP ====================
// STORAGE KEYS
const STORAGE = {
    USERS: 'lumina_users',
    CURRENT_USER: 'lumina_currentUser',
    PRODUCTS: 'lumina_products',
    CART: 'lumina_cart',
    FAVORITES: 'lumina_favorites'
};

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

// ==================== GLOBAL STATE ====================
let currentUser = null;
let products = [];
let cart = [];
let favorites = [];
let currentModalProduct = null;
let currentFilter = 'all';
let currentSearch = '';

// ==================== INITIALIZATION ====================
// ==================== INITIALIZATION WITH PROPER LOADER TIMING ====================
function init() {
    console.log('Initializing app...');
    
    // Show loader wrapper
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
    }
    
    try {
        // Initialize storage with default data if needed
        initializeStorage();
        
        // Load all data
        loadStorage();
        
        // Render UI
        renderProducts();
        updateBadges();
        checkAuthUI();
        setupEventListeners();
        
        // Hide loader after minimum 3 seconds to show animation
        setTimeout(() => {
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }
            console.log('App initialized successfully');
        }, 3000); // Show loader for at least 3 seconds
        
    } catch (error) {
        console.error('Initialization error:', error);
        showToast('Error loading app. Please refresh.', 'error');
        
        // Still hide loader after error
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

function initializeStorage() {
    // Initialize users if not exists
    if (!localStorage.getItem(STORAGE.USERS)) {
        localStorage.setItem(STORAGE.USERS, JSON.stringify(DEFAULT_USERS));
        console.log('Default users created');
    }
    
    // Initialize products if not exists
    if (!localStorage.getItem(STORAGE.PRODUCTS)) {
        localStorage.setItem(STORAGE.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
        console.log('Default products created');
    }
    
    // Initialize cart if not exists
    if (!localStorage.getItem(STORAGE.CART)) {
        localStorage.setItem(STORAGE.CART, JSON.stringify([]));
    }
    
    // Initialize favorites if not exists
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

function hideLoader() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 10000);
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
    
    try {
        let filtered = products.filter(p => {
            const matchCat = currentFilter === 'all' || p.category === currentFilter;
            const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase());
            return matchCat && matchSearch;
        });
        
        if (filtered.length === 0) {
            grid.innerHTML = '<div class="empty-state"><i class="fas fa-eye"></i><p>No timepieces found</p></div>';
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
                        <span class="price">$${product.price.toLocaleString()}</span>
                        <button class="quick-cart" data-id="${product.id}"><i class="fas fa-shopping-bag"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Attach event listeners
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
    return str.replace(/[&<>]/g, function(m) {
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
    
    if (detailsDiv) {
        detailsDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:16px; margin-bottom:1rem;" onerror="this.src='https://via.placeholder.com/400'">
            <h2>${escapeHtml(product.name)}</h2>
            <p class="category">${product.category}</p>
            <p class="price">$${product.price.toLocaleString()}</p>
            <p class="description">${escapeHtml(product.description)}</p>
        `;
    }
    
    const favBtn = document.getElementById('modal-fav');
    if (favBtn) {
        favBtn.innerHTML = isFav ? '❤️ Favorited' : '🤍 Add to Favorites';
        favBtn.style.background = isFav ? 'rgba(255,107,107,0.2)' : '';
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
    showToast(`${product.name} added to cart`, 'success');
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
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p></div>';
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
                    <p>$${item.price.toLocaleString()}</p>
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
    if (totalSpan) totalSpan.innerText = total.toLocaleString();
    
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
    
    if (!product) return;
    
    if (exists) {
        favorites = favorites.filter(f => f && f.id !== productId);
        showToast(`Removed from favorites`, 'info');
    } else {
        favorites.push(product);
        showToast(`Added to favorites ❤️`, 'success');
    }
    
    saveFavorites();
    renderProducts();
    renderFavoritesPanel();
}

function renderFavoritesPanel() {
    const container = document.getElementById('favorites-items');
    if (!container) return;
    
    if (favorites.length === 0) {
        container.innerHTML = '<div class="empty-cart"><i class="fas fa-heart"></i><p>No favorites yet</p></div>';
        return;
    }
    
    container.innerHTML = favorites.map(fav => `
        <div class="cart-item">
            <img src="${fav.image}" alt="${fav.name}" onerror="this.src='https://via.placeholder.com/70'">
            <div class="cart-item-info">
                <h4>${escapeHtml(fav.name)}</h4>
                <p>$${fav.price.toLocaleString()}</p>
                <button class="fav-remove" data-id="${fav.id}">Remove</button>
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
    if (!username || !password) {
        showToast('Please enter username and password', 'error');
        return false;
    }
    
    const users = JSON.parse(localStorage.getItem(STORAGE.USERS) || '[]');
    if (users.find(u => u.username === username)) {
        showToast('Username exists', 'error');
        return false;
    }
    
    users.push({ username, password, isAdmin: false });
    localStorage.setItem(STORAGE.USERS, JSON.stringify(users));
    showToast('Registered! Please login', 'success');
    return true;
}

function login(username, password) {
    const users = JSON.parse(localStorage.getItem(STORAGE.USERS) || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        showToast('Invalid credentials', 'error');
        return false;
    }
    
    currentUser = { username: user.username, isAdmin: user.isAdmin || false };
    saveCurrentUser();
    checkAuthUI();
    showToast(`Welcome back, ${username}!`, 'success');
    closeAllModals();
    return true;
}

function logout() {
    currentUser = null;
    localStorage.removeItem(STORAGE.CURRENT_USER);
    checkAuthUI();
    showToast('Logged out', 'info');
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
            showToast('Demo checkout complete!', 'success');
            cart = [];
            saveCart();
            renderCartPanel();
            updateBadges();
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
                // Clear inputs
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
                // Clear inputs
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
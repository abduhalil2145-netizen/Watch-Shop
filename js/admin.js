// ==================== ADMIN.JS - LUMINA ADMIN DASHBOARD ====================
const STORAGE = {
    USERS: 'lumina_users',
    CURRENT_USER: 'lumina_currentUser',
    PRODUCTS: 'lumina_products',
    CART: 'lumina_cart',
    FAVORITES: 'lumina_favorites',
    CATEGORIES: 'lumina_categories'
};

let products = [];
let categories = [];
let currentEditId = null;
let currentEditCategoryId = null;

// ==================== DEFAULT CATEGORIES ====================
const DEFAULT_CATEGORIES = [
    { id: 'cat1', name: 'Smart Watches', icon: 'fa-microchip', color: '#00d4ff' },
    { id: 'cat2', name: 'Luxury', icon: 'fa-gem', color: '#d4af37' },
    { id: 'cat3', name: 'Sport', icon: 'fa-running', color: '#ff6b6b' },
    { id: 'cat4', name: 'Classic', icon: 'fa-hourglass-half', color: '#c0c0c0' }
];

// ==================== INITIALIZE DEFAULT DATA ====================
function initializeDefaultData() {
    // Initialize users
    if (!localStorage.getItem(STORAGE.USERS)) {
        const defaultUsers = [
            { username: 'admin', password: '12345', isAdmin: true },
            { username: 'john_doe', password: 'user123', isAdmin: false }
        ];
        localStorage.setItem(STORAGE.USERS, JSON.stringify(defaultUsers));
        console.log('Default users created');
    }
    
    // Initialize categories
    if (!localStorage.getItem(STORAGE.CATEGORIES)) {
        localStorage.setItem(STORAGE.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
        console.log('Default categories created');
    }
    
    // Initialize products
    if (!localStorage.getItem(STORAGE.PRODUCTS)) {
        const defaultProducts = [
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
        localStorage.setItem(STORAGE.PRODUCTS, JSON.stringify(defaultProducts));
        console.log('Default products created');
    }
}

// ==================== AUTH CHECK ====================
function checkAdminAuth() {
    try {
        const currentUserStr = localStorage.getItem(STORAGE.CURRENT_USER);
        
        if (!currentUserStr) {
            showToast('Please login as admin first!', 'error');
            redirectToShop();
            return false;
        }
        
        const currentUser = JSON.parse(currentUserStr);
        
        if (!currentUser.isAdmin) {
            showToast('Admin access only!', 'error');
            redirectToShop();
            return false;
        }
        
        const welcomeSpan = document.getElementById('admin-welcome');
        if (welcomeSpan) {
            welcomeSpan.innerHTML = `<i class="fas fa-user-shield"></i> Welcome, ${currentUser.username}`;
        }
        return true;
    } catch (error) {
        console.error('Auth check error:', error);
        showToast('Authentication error!', 'error');
        redirectToShop();
        return false;
    }
}

function redirectToShop() {
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// ==================== LOAD DATA ====================
function loadCategories() {
    const storedCategories = localStorage.getItem(STORAGE.CATEGORIES);
    categories = storedCategories ? JSON.parse(storedCategories) : DEFAULT_CATEGORIES;
    if (categories.length === 0) {
        categories = [...DEFAULT_CATEGORIES];
    }
    renderCategorySelect();
    renderCategoriesList();
    renderCategoryStats();
}

function loadProducts() {
    const storedProducts = localStorage.getItem(STORAGE.PRODUCTS);
    products = storedProducts ? JSON.parse(storedProducts) : [];
    updateStatistics();
    renderProductsTable();
}

// ==================== UPDATE STATISTICS ====================
function updateStatistics() {
    const totalProducts = products.length;
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;
    
    const totalProductsEl = document.getElementById('total-products');
    const totalCategoriesEl = document.getElementById('total-categories');
    const avgPriceEl = document.getElementById('avg-price');
    const totalValueEl = document.getElementById('total-value');
    
    if (totalProductsEl) totalProductsEl.textContent = totalProducts;
    if (totalCategoriesEl) totalCategoriesEl.textContent = uniqueCategories.length;
    if (avgPriceEl) avgPriceEl.textContent = `$${avgPrice.toFixed(0)}`;
    if (totalValueEl) totalValueEl.textContent = `$${totalValue.toLocaleString()}`;
}

// ==================== RENDER CATEGORY SELECT (Dropdown) ====================
function renderCategorySelect() {
    const select = document.getElementById('product-category');
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Select Category --</option>' + 
        categories.map(cat => `<option value="${escapeHtml(cat.name)}">${escapeHtml(cat.name)}</option>`).join('');
}

// ==================== RENDER CATEGORIES LIST (Admin Panel) ====================
function renderCategoriesList() {
    const container = document.getElementById('categories-list');
    if (!container) return;
    
    if (categories.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-folder-open"></i><p>No categories yet. Create one!</p></div>';
        return;
    }
    
    container.innerHTML = categories.map(cat => `
        <div class="category-card" data-id="${cat.id}">
            <div class="category-icon" style="background: ${cat.color}20; border-color: ${cat.color}">
                <i class="fas ${cat.icon}" style="color: ${cat.color}"></i>
            </div>
            <div class="category-info">
                <h4>${escapeHtml(cat.name)}</h4>
                <p class="category-product-count">${products.filter(p => p.category === cat.name).length} products</p>
            </div>
            <div class="category-actions">
                <button class="action-btn edit-cat-btn" onclick="editCategory('${cat.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-cat-btn" onclick="deleteCategory('${cat.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// ==================== RENDER CATEGORY STATS ====================
function renderCategoryStats() {
    const categoryMap = {};
    products.forEach(product => {
        if (!categoryMap[product.category]) {
            categoryMap[product.category] = { count: 0, totalValue: 0 };
        }
        categoryMap[product.category].count++;
        categoryMap[product.category].totalValue += product.price;
    });
    
    const container = document.getElementById('category-stats');
    if (!container) return;
    
    if (Object.keys(categoryMap).length === 0) {
        container.innerHTML = '<div class="stat-card">No categories yet</div>';
        return;
    }
    
    container.innerHTML = Object.entries(categoryMap).map(([category, stats]) => `
        <div class="stat-card-mini">
            <i class="fas fa-folder"></i>
            <h4>${escapeHtml(category)}</h4>
            <p>📦 ${stats.count} products</p>
            <p>💰 $${stats.totalValue.toLocaleString()}</p>
        </div>
    `).join('');
}

// ==================== CATEGORY CRUD ====================
function openCategoryModal(mode = 'add', category = null) {
    const modal = document.getElementById('category-modal');
    const modalTitle = document.getElementById('category-modal-title');
    const categoryId = document.getElementById('category-id');
    const categoryName = document.getElementById('category-name');
    const categoryIcon = document.getElementById('category-icon');
    const categoryColor = document.getElementById('category-color');
    const submitBtn = document.getElementById('submit-category');
    
    if (!modal) return;
    
    if (mode === 'edit' && category) {
        modalTitle.textContent = 'Edit Category';
        categoryId.value = category.id;
        categoryName.value = category.name;
        categoryIcon.value = category.icon;
        categoryColor.value = category.color;
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Category';
        currentEditCategoryId = category.id;
    } else {
        modalTitle.textContent = 'Add New Category';
        categoryId.value = '';
        categoryName.value = '';
        categoryIcon.value = 'fa-folder';
        categoryColor.value = '#00d4ff';
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Category';
        currentEditCategoryId = null;
    }
    
    modal.style.display = 'flex';
}

function closeCategoryModal() {
    const modal = document.getElementById('category-modal');
    if (modal) modal.style.display = 'none';
    currentEditCategoryId = null;
}

function saveCategory() {
    const name = document.getElementById('category-name')?.value.trim();
    const icon = document.getElementById('category-icon')?.value.trim();
    const color = document.getElementById('category-color')?.value;
    
    if (!name) {
        showToast('Please enter category name', 'error');
        return;
    }
    
    if (currentEditCategoryId) {
        // Edit existing category
        const oldCategory = categories.find(c => c.id === currentEditCategoryId);
        const oldName = oldCategory.name;
        
        const index = categories.findIndex(c => c.id === currentEditCategoryId);
        if (index !== -1) {
            categories[index] = { 
                ...categories[index], 
                name: name, 
                icon: icon || 'fa-folder', 
                color: color || '#00d4ff' 
            };
            
            // Update products with new category name
            products = products.map(p => {
                if (p.category === oldName) {
                    return { ...p, category: name };
                }
                return p;
            });
            
            localStorage.setItem(STORAGE.PRODUCTS, JSON.stringify(products));
            showToast('Category updated successfully!', 'success');
        }
    } else {
        // Add new category
        const exists = categories.some(c => c.name.toLowerCase() === name.toLowerCase());
        if (exists) {
            showToast('Category already exists!', 'error');
            return;
        }
        
        const newCategory = {
            id: 'cat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            name: name,
            icon: icon || 'fa-folder',
            color: color || '#00d4ff'
        };
        categories.push(newCategory);
        showToast('Category added successfully!', 'success');
    }
    
    localStorage.setItem(STORAGE.CATEGORIES, JSON.stringify(categories));
    loadCategories();
    loadProducts();
    closeCategoryModal();
}

function editCategory(id) {
    const category = categories.find(c => c.id === id);
    if (category) {
        openCategoryModal('edit', category);
    }
}

function deleteCategory(id) {
    const category = categories.find(c => c.id === id);
    if (!category) return;
    
    const productCount = products.filter(p => p.category === category.name).length;
    
    if (productCount > 0) {
        if (confirm(`Category "${category.name}" has ${productCount} product(s). Deleting it will remove these products from the category. Continue?`)) {
            // Remove category from products (set to empty or first category)
            products = products.map(p => {
                if (p.category === category.name) {
                    return { ...p, category: 'Uncategorized' };
                }
                return p;
            });
            localStorage.setItem(STORAGE.PRODUCTS, JSON.stringify(products));
        } else {
            return;
        }
    }
    
    categories = categories.filter(c => c.id !== id);
    localStorage.setItem(STORAGE.CATEGORIES, JSON.stringify(categories));
    loadCategories();
    loadProducts();
    showToast(`Category "${category.name}" deleted`, 'success');
}

window.openCategoryModal = openCategoryModal;
window.closeCategoryModal = closeCategoryModal;
window.saveCategory = saveCategory;
window.editCategory = editCategory;
window.deleteCategory = deleteCategory;

// ==================== RENDER PRODUCTS TABLE ====================
function renderProductsTable() {
    const tbody = document.getElementById('products-table-body');
    if (!tbody) return;
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No products found. Add your first product!</td></tr>';
        return;
    }
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td><img src="${product.image}" alt="${product.name}" class="product-image-preview" onerror="this.src='https://via.placeholder.com/50'"></td>
            <td><strong>${escapeHtml(product.name)}</strong><br><small>${escapeHtml(product.description.substring(0, 50))}...</small></td>
            <td><span class="category-badge">${escapeHtml(product.category)}</span></td>
            <td>$${product.price.toLocaleString()}</td>
            <td class="action-buttons">
                <button class="action-btn edit-btn" onclick="editProduct('${product.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn delete-btn" onclick="deleteProduct('${product.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
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

// ==================== ADD/UPDATE PRODUCT ====================
function saveProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('product-name')?.value;
    const price = parseFloat(document.getElementById('product-price')?.value);
    const category = document.getElementById('product-category')?.value;
    const description = document.getElementById('product-description')?.value;
    let image = document.getElementById('product-image-url')?.value;
    
    if (!name || !price || !category || !description) {
        showToast('Please fill all required fields', 'error');
        return;
    }
    
    if (!image) {
        image = 'https://via.placeholder.com/400x400?text=Watch';
    }
    
    if (currentEditId) {
        const index = products.findIndex(p => p.id === currentEditId);
        if (index !== -1) {
            products[index] = { ...products[index], name, price, category, description, image };
            showToast('Product updated successfully!', 'success');
        }
        currentEditId = null;
        const formTitle = document.getElementById('form-title');
        const submitBtn = document.getElementById('submit-product');
        const cancelBtn = document.getElementById('cancel-edit');
        if (formTitle) formTitle.textContent = 'Add New Product';
        if (submitBtn) submitBtn.textContent = 'Add Product';
        if (cancelBtn) cancelBtn.style.display = 'none';
    } else {
        const newId = 'p' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        products.push({ id: newId, name, price, category, description, image });
        showToast('Product added successfully!', 'success');
    }
    
    localStorage.setItem(STORAGE.PRODUCTS, JSON.stringify(products));
    loadProducts();
    clearForm();
}

window.saveProduct = saveProduct;

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    currentEditId = id;
    const nameInput = document.getElementById('product-name');
    const priceInput = document.getElementById('product-price');
    const categorySelect = document.getElementById('product-category');
    const descInput = document.getElementById('product-description');
    const urlInput = document.getElementById('product-image-url');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-product');
    const cancelBtn = document.getElementById('cancel-edit');
    
    if (nameInput) nameInput.value = product.name;
    if (priceInput) priceInput.value = product.price;
    if (categorySelect) categorySelect.value = product.category;
    if (descInput) descInput.value = product.description;
    if (urlInput) urlInput.value = product.image;
    
    if (formTitle) formTitle.textContent = 'Edit Product';
    if (submitBtn) submitBtn.textContent = 'Update Product';
    if (cancelBtn) cancelBtn.style.display = 'inline-block';
    
    // Show image preview
    const previewContainer = document.getElementById('image-preview-container');
    if (previewContainer && product.image) {
        previewContainer.innerHTML = `<img src="${product.image}" class="image-preview" alt="Preview">`;
        const clearBtn = document.getElementById('clear-image');
        if (clearBtn) clearBtn.style.display = 'block';
    }
    
    const section = document.querySelector('.admin-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

window.editProduct = editProduct;

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem(STORAGE.PRODUCTS, JSON.stringify(products));
        loadProducts();
        showToast('Product deleted successfully', 'success');
        
        if (currentEditId === id) {
            cancelEdit();
        }
    }
}

window.deleteProduct = deleteProduct;

function cancelEdit() {
    currentEditId = null;
    clearForm();
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-product');
    const cancelBtn = document.getElementById('cancel-edit');
    
    if (formTitle) formTitle.textContent = 'Add New Product';
    if (submitBtn) submitBtn.textContent = 'Add Product';
    if (cancelBtn) cancelBtn.style.display = 'none';
}

window.cancelEdit = cancelEdit;

function clearForm() {
    const nameInput = document.getElementById('product-name');
    const priceInput = document.getElementById('product-price');
    const descInput = document.getElementById('product-description');
    const urlInput = document.getElementById('product-image-url');
    const fileInput = document.getElementById('product-image-file');
    const previewContainer = document.getElementById('image-preview-container');
    const clearBtn = document.getElementById('clear-image');
    
    if (nameInput) nameInput.value = '';
    if (priceInput) priceInput.value = '';
    if (descInput) descInput.value = '';
    if (urlInput) urlInput.value = '';
    if (fileInput) fileInput.value = '';
    if (previewContainer) previewContainer.innerHTML = '';
    if (clearBtn) clearBtn.style.display = 'none';
}

// ==================== IMAGE UPLOAD ====================
function setupFileUpload() {
    const uploadArea = document.getElementById('file-upload-area');
    const fileInput = document.getElementById('product-image-file');
    const urlInput = document.getElementById('product-image-url');
    const clearBtn = document.getElementById('clear-image');
    const previewContainer = document.getElementById('image-preview-container');
    
    if (!uploadArea) return;
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file);
        } else {
            showToast('Please drop an image file', 'error');
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageFile(file);
        }
    });
    
    urlInput.addEventListener('input', () => {
        const url = urlInput.value;
        if (url && (url.startsWith('http') || url.startsWith('data:'))) {
            showImagePreview(url);
            if (clearBtn) clearBtn.style.display = 'block';
        } else if (!url) {
            clearImagePreview();
            if (clearBtn) clearBtn.style.display = 'none';
        }
    });
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            urlInput.value = '';
            fileInput.value = '';
            clearImagePreview();
            clearBtn.style.display = 'none';
        });
    }
    
    function handleImageFile(file) {
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image too large (max 5MB)', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(ev) {
            const imageUrl = ev.target.result;
            urlInput.value = imageUrl;
            showImagePreview(imageUrl);
            if (clearBtn) clearBtn.style.display = 'block';
            showToast('Image uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
    
    function showImagePreview(url) {
        if (previewContainer) {
            previewContainer.innerHTML = `<img src="${url}" class="image-preview" alt="Preview" onerror="this.style.display='none'">`;
        }
    }
    
    function clearImagePreview() {
        if (previewContainer) {
            previewContainer.innerHTML = '';
        }
    }
}

// ==================== EXPORT DATA ====================
function exportProducts() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `lumina_products_${new Date().toISOString().slice(0,19)}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    showToast('Products exported successfully!', 'success');
}

window.exportProducts = exportProducts;

// ==================== BULK DELETE ====================
function bulkDelete() {
    if (confirm('⚠️ WARNING: This will delete ALL products. This action cannot be undone! Are you ABSOLUTELY sure?')) {
        products = [];
        localStorage.setItem(STORAGE.PRODUCTS, JSON.stringify(products));
        loadProducts();
        showToast('All products have been deleted', 'warning');
        cancelEdit();
    }
}

window.bulkDelete = bulkDelete;

// ==================== REFRESH STATS ====================
function refreshStats() {
    loadProducts();
    loadCategories();
    showToast('Statistics refreshed!', 'success');
}

window.refreshStats = refreshStats;

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
    setTimeout(() => toast.remove(), 3000);
}

// ==================== LOGOUT ====================
function logout() {
    localStorage.removeItem(STORAGE.CURRENT_USER);
    showToast('Logged out successfully', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

window.logout = logout;

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    const form = document.getElementById('product-form');
    if (form) {
        form.removeEventListener('submit', saveProduct);
        form.addEventListener('submit', saveProduct);
    }
    
    const cancelBtn = document.getElementById('cancel-edit');
    if (cancelBtn) {
        cancelBtn.removeEventListener('click', cancelEdit);
        cancelBtn.addEventListener('click', cancelEdit);
    }
    
    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) {
        exportBtn.removeEventListener('click', exportProducts);
        exportBtn.addEventListener('click', exportProducts);
    }
    
    const bulkDeleteBtn = document.getElementById('bulk-delete-btn');
    if (bulkDeleteBtn) {
        bulkDeleteBtn.removeEventListener('click', bulkDelete);
        bulkDeleteBtn.addEventListener('click', bulkDelete);
    }
    
    const refreshBtn = document.getElementById('refresh-stats-btn');
    if (refreshBtn) {
        refreshBtn.removeEventListener('click', refreshStats);
        refreshBtn.addEventListener('click', refreshStats);
    }
    
    const logoutBtn = document.getElementById('logout-admin');
    if (logoutBtn) {
        logoutBtn.removeEventListener('click', logout);
        logoutBtn.addEventListener('click', logout);
    }
    
    const closeModalBtn = document.querySelector('#category-modal .modal-close');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeCategoryModal);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('category-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCategoryModal();
            }
        });
    }
}

// ==================== INITIALIZATION ====================
function init() {
    console.log('Admin dashboard initializing...');
    
    initializeDefaultData();
    if (!checkAdminAuth()) return;
    
    loadCategories();
    loadProducts();
    setupEventListeners();
    setupFileUpload();
    
    console.log('Admin dashboard ready');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
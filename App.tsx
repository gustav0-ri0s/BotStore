import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Product, CartItem, AdminSectionType } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES_ES, INITIAL_PRODUCT_TYPES_ES } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import Modal from './components/Modal';
import ProductForm from './components/ProductForm';
import CartModal from './components/CartModal';
import Spinner from './components/Spinner';
import LoginModal from './components/LoginModal';
import CategoryManagement from './components/admin/CategoryManagement';
import ProductTypeManagement from './components/admin/ProductTypeManagement';
import SearchIcon from './components/icons/SearchIcon'; // Import SearchIcon

type ViewMode = 'store' | 'admin';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('botStoreProducts');
    return savedProducts ? JSON.parse(savedProducts) : INITIAL_PRODUCTS;
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>(''); // New state for search

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [viewMode, setViewMode] = useState<ViewMode>('store');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [theme, setTheme] = useState<Theme>('light');

  const [productCategories, setProductCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem('botStoreCategories');
    return savedCategories ? JSON.parse(savedCategories) : INITIAL_CATEGORIES_ES;
  });
  const [productTypes, setProductTypes] = useState<string[]>(() => {
    const savedTypes = localStorage.getItem('botStoreProductTypes');
    return savedTypes ? JSON.parse(savedTypes) : INITIAL_PRODUCT_TYPES_ES;
  });

  const [currentAdminSection, setCurrentAdminSection] = useState<AdminSectionType>('products');

  useEffect(() => {
    localStorage.setItem('botStoreCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('botStoreProducts', JSON.stringify(products));
  }, [products]);
  
  useEffect(() => {
    localStorage.setItem('botStoreCategories', JSON.stringify(productCategories));
  }, [productCategories]);

  useEffect(() => {
    localStorage.setItem('botStoreProductTypes', JSON.stringify(productTypes));
  }, [productTypes]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('botStoreTheme', theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('botStoreTheme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
    const storedCart = localStorage.getItem('botStoreCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    // Load other persisted states if necessary (products, categories, types are loaded on useState init)
  }, []);


  useEffect(() => {
    let currentProducts = [...products]; // Create a mutable copy

    if (selectedCategory !== 'all') {
      currentProducts = currentProducts.filter(p => p.category === selectedCategory);
    }

    if (searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      currentProducts = currentProducts.filter(p => 
        p.name.toLowerCase().includes(lowerSearchTerm) || 
        p.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    setFilteredProducts(currentProducts);
  }, [selectedCategory, products, searchTerm, viewMode]);

  const handleAddProductClick = useCallback(() => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  }, []);

  const handleEditProductClick = useCallback((product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  }, []);

  const handleSaveProduct = useCallback(async (productData: Omit<Product, 'id'> | Product) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    if ('id' in productData && productData.id) { 
      setProducts(prevProducts => 
        prevProducts.map(p => p.id === productData.id ? { ...p, ...productData } : p)
      );
    } else { 
      const newProduct: Product = {
        ...(productData as Omit<Product, 'id'>),
        id: Date.now().toString(),
      };
      setProducts(prevProducts => [newProduct, ...prevProducts]);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
    setIsLoading(false);
  }, []);

  const handleCloseProductModal = useCallback(() => {
    setIsProductModalOpen(false);
    setEditingProduct(null);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    setViewMode('admin');
    setCurrentAdminSection('products');
    setIsLoginModalOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setViewMode('store');
    setSelectedCategory('all');
    setSearchTerm(''); // Reset search on logout to store view
  }, []);

  const toggleViewMode = useCallback(() => {
    if (viewMode === 'store') {
      if (isAuthenticated) {
        setViewMode('admin');
        setCurrentAdminSection('products');
      } else {
        setIsLoginModalOpen(true);
      }
    } else {
      setViewMode('store');
      setSelectedCategory('all'); 
      setSearchTerm(''); // Reset search when switching to store view
    }
  }, [viewMode, isAuthenticated]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const handleUpdateCartQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const handleOpenCartModal = useCallback(() => setIsCartModalOpen(true), []);
  const handleCloseCartModal = useCallback(() => setIsCartModalOpen(false), []);

  const storePhoneNumber = "+51985116690";

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;
    let message = "Hola BotStore, estoy interesado en los siguientes productos:\n";
    let totalAmount = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      message += `- ${item.name} (Cantidad: ${item.quantity}) - S/. ${itemTotal.toFixed(2)}\n`;
      totalAmount += itemTotal;
    });
    message += `\nTotal del pedido: S/. ${totalAmount.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/${storePhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setCart([]); 
    setIsCartModalOpen(false);
  }, [cart, storePhoneNumber]);

  const handleSaveCategory = useCallback((oldName: string | null, newName: string) => {
    if (!newName.trim()) return;
    setProductCategories(prev => {
      if (oldName) { 
        setProducts(currentProducts => currentProducts.map(p => p.category === oldName ? {...p, category: newName} : p));
        return prev.map(cat => cat === oldName ? newName : cat);
      } else { 
        return prev.includes(newName) ? prev : [...prev, newName];
      }
    });
  }, []);

  const handleSaveProductType = useCallback((oldName: string | null, newName: string) => {
    if (!newName.trim()) return;
    setProductTypes(prev => {
      if (oldName) { 
        setProducts(currentProducts => currentProducts.map(p => p.type === oldName ? {...p, type: newName} : p));
        return prev.map(type => type === oldName ? newName : type);
      } else { 
        return prev.includes(newName) ? prev : [...prev, newName];
      }
    });
  }, []);
  
  const adminNavMemo = useMemo(() => {
    if (viewMode !== 'admin' || !isAuthenticated) return null;
    return (
      <nav className="mb-6 bg-white dark:bg-slate-800 shadow rounded-lg p-3">
        <div className="flex flex-wrap gap-2 sm:space-x-4">
          {(['products', 'categories', 'types'] as AdminSectionType[]).map((section) => (
            <button
              key={section}
              onClick={() => setCurrentAdminSection(section)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
                ${currentAdminSection === section 
                  ? 'bg-sky-600 dark:bg-sky-500 text-white shadow-md' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
            >
              {section === 'products' && 'Gestionar Productos'}
              {section === 'categories' && 'Gestionar Categorías'}
              {section === 'types' && 'Gestionar Tipos de Producto'}
            </button>
          ))}
        </div>
      </nav>
    );
  }, [viewMode, isAuthenticated, currentAdminSection]);

  return (
    // Removed theme class from here, relies on html tag class
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header 
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
        onAddProduct={currentAdminSection === 'products' ? handleAddProductClick : undefined}
        onOpenCart={handleOpenCartModal}
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
        isAdminSectionActive={currentAdminSection !== 'products'}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading && <div className={`fixed inset-0 flex justify-center items-center z-[100] ${theme === 'dark' ? 'bg-slate-900 bg-opacity-70' : 'bg-slate-500 bg-opacity-50' }`}><Spinner /></div>}
        
        {viewMode === 'store' && (
          <>
            <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow dark:shadow-slate-700/30">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Buscar productos por nombre o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white dark:bg-slate-700 dark:text-slate-50"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </div>
              </div>
            </div>
            <CategoryFilter
              categories={productCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </>
        )}

        {adminNavMemo}

        {viewMode === 'admin' && isAuthenticated && currentAdminSection === 'categories' && (
          <CategoryManagement categories={productCategories} onSave={handleSaveCategory} />
        )}
        {viewMode === 'admin' && isAuthenticated && currentAdminSection === 'types' && (
          <ProductTypeManagement types={productTypes} onSave={handleSaveProductType} />
        )}

        {((viewMode === 'store') || (viewMode === 'admin' && isAuthenticated && currentAdminSection === 'products')) && (
          <>
            {filteredProducts.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
                  {viewMode === 'admin' 
                    ? "No se encontraron productos. ¡Agrega algunos!" 
                    : (searchTerm ? "No hay productos que coincidan con tu búsqueda." : "No hay productos disponibles en esta categoría.")}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  {viewMode === 'admin' 
                    ? "Haz clic en 'Agregar Producto' para comenzar." 
                    : (searchTerm ? "Intenta con otros términos de búsqueda o revisa las categorías." : "Prueba una categoría diferente o vuelve más tarde.")}
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onEdit={viewMode === 'admin' && isAuthenticated ? handleEditProductClick : undefined}
                  onAddToCart={viewMode === 'store' ? handleAddToCart : undefined}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />

      {isProductModalOpen && viewMode === 'admin' && isAuthenticated && (
        <Modal 
          isOpen={isProductModalOpen} 
          onClose={handleCloseProductModal} 
          title={editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        >
          <ProductForm 
            onSubmit={handleSaveProduct} 
            initialData={editingProduct}
            onCancel={handleCloseProductModal}
            categories={productCategories}
            productTypes={productTypes}
          />
        </Modal>
      )}

      {isCartModalOpen && viewMode === 'store' && (
        <CartModal
          isOpen={isCartModalOpen}
          onClose={handleCloseCartModal}
          cartItems={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {isLoginModalOpen && !isAuthenticated && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default App;
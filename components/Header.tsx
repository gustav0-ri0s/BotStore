import React from 'react';
import PlusIcon from './icons/PlusIcon';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import KeyIcon from './icons/KeyIcon'; // For Login
import LogoutIcon from './icons/LogoutIcon'; // For Logout
import StoreIcon from './icons/StoreIcon'; // For View Store
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

type ViewMode = 'store' | 'admin';
type Theme = 'light' | 'dark';

interface HeaderProps {
  viewMode: ViewMode;
  onToggleViewMode: () => void;
  onAddProduct?: () => void; // Optional: only for admin & products section
  onOpenCart: () => void; 
  cartItemCount: number;
  isAuthenticated: boolean;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  isAdminSectionActive?: boolean; // True if admin section is not 'products'
}

const Header: React.FC<HeaderProps> = ({ 
  viewMode, 
  onToggleViewMode, 
  onAddProduct, 
  onOpenCart,
  cartItemCount,
  isAuthenticated,
  onLogout,
  theme,
  onToggleTheme,
  isAdminSectionActive
}) => {
  return (
    <header className="bg-gradient-to-r from-sky-600 to-cyan-500 dark:from-sky-700 dark:to-cyan-600 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {viewMode === 'store' ? 'BotStore' : 'BotStore Admin'}
        </h1>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            title={theme === 'light' ? 'Activar Modo Oscuro' : 'Activar Modo Claro'}
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <SunIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />}
          </button>

          {viewMode === 'store' && (
            <button
              onClick={onOpenCart}
              className="relative bg-white text-sky-600 dark:bg-slate-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-600 font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center"
              aria-label="Abrir carrito de compras"
            >
              <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
               <span className="hidden sm:inline ml-2">Carrito</span>
            </button>
          )}

          {viewMode === 'admin' && isAuthenticated && onAddProduct && !isAdminSectionActive && (
            <button
              onClick={onAddProduct}
              className="bg-white text-sky-600 dark:bg-slate-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-600 font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Agregar Producto</span>
            </button>
          )}

          {isAuthenticated ? (
            <button
              onClick={viewMode === 'admin' ? onToggleViewMode : onLogout} // If in admin, button is "View Store", if in store, button is "Logout" (but this case shouldn't happen if logic is correct)
                                                                       // Corrected: if authenticated, means we can logout or toggle to store
              className="bg-white text-sky-700 dark:bg-slate-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-slate-600 font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center"
              title={viewMode === 'admin' ? 'Ver Tienda' : 'Cerrar Sesión'}
            >
              {viewMode === 'admin' 
                ? <StoreIcon className="w-5 h-5 mr-0 sm:mr-2" /> 
                : <LogoutIcon className="w-5 h-5 mr-0 sm:mr-2" />
              }
              <span className="hidden sm:inline">
                {viewMode === 'admin' ? 'Ver Tienda' : 'Cerrar Sesión'}
              </span>
            </button>
          ) : (
            <button
              onClick={onToggleViewMode} // This will open login modal if not authenticated
              className="bg-white text-sky-700 dark:bg-slate-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-slate-600 font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center"
              title="Acceder al Panel de Admin"
            >
              <KeyIcon className="w-5 h-5 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Acceso Admin</span>
            </button>
          )}
           {/* Logout specifically for admin view if needed, or if toggleViewMode should be logout */}
           {isAuthenticated && viewMode === 'admin' && (
             <button
              onClick={onLogout}
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center"
              title="Cerrar Sesión"
            >
              <LogoutIcon className="w-5 h-5 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Salir</span>
            </button>
           )}

        </div>
      </div>
    </header>
  );
};

export default Header;
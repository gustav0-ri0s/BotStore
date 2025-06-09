import React from 'react';
import { Product } from '../types';
import EditIcon from './icons/EditIcon';
import PlusIcon from './icons/PlusIcon'; // For Add to Cart

type ViewMode = 'store' | 'admin';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void; 
  onAddToCart?: (product: Product) => void; 
  viewMode: ViewMode;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onAddToCart, viewMode }) => {
  const handleEditClick = () => {
    if (onEdit) {
      onEdit(product);
    }
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-slate-700/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl dark:hover:shadow-sky-500/40 h-full">
      <div className="w-full h-56 bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
        <img 
          className="w-full h-full object-cover" 
          src={product.imageUrl || 'https://picsum.photos/seed/placeholder/400/300'} 
          alt={product.name} 
          onError={(e) => (e.currentTarget.src = 'https://picsum.photos/seed/fallback/400/300')}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2 truncate" title={product.name}>{product.name}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 flex-grow min-h-[60px] line-clamp-3" title={product.description}>{product.description}</p>
        
        <div className="flex justify-between items-center mb-3 text-xs">
          <span className="font-semibold uppercase tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-700 dark:text-sky-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <span className="font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100 px-2 py-1 rounded-full">
            {product.type}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-200 dark:border-slate-700">
          <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">S/. {product.price.toFixed(2)}</p>
          {viewMode === 'admin' && onEdit && (
            <button
              onClick={handleEditClick}
              className="text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Editar Producto"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          )}
          {viewMode === 'store' && onAddToCart && (
            <button
              onClick={handleAddToCartClick}
              className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center text-sm"
              aria-label="Agregar al carrito"
            >
              <PlusIcon className="w-4 h-4 mr-1" /> Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
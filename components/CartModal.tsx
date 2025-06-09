import React from 'react';
import { CartItem } from '../types';
import Modal from './Modal';
import XCircleIcon from './icons/XCircleIcon';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tu Carrito de Compras">
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-slate-600 dark:text-slate-300">Tu carrito está vacío.</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">¡Agrega algunos productos de robótica!</p>
          <button
            onClick={onClose}
            className="mt-6 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
          >
            Seguir Comprando
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-y-auto max-h-[50vh] pr-2 -mr-2 mb-4 space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <img src={item.imageUrl || 'https://picsum.photos/seed/cartitem/100/100'} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm md:text-base">{item.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">S/. {item.price.toFixed(2)} c/u</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                   <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-sky-600 dark:text-sky-400 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-l disabled:opacity-50"
                      disabled={item.quantity <= 1}
                      aria-label="Disminuir cantidad"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="px-2 text-sm font-medium w-8 text-center text-slate-700 dark:text-slate-200">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-sky-600 dark:text-sky-400 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-r"
                      aria-label="Aumentar cantidad"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.id)} 
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 p-1"
                    aria-label="Eliminar artículo"
                  >
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">Total:</span>
              <span className="text-xl font-bold text-sky-600 dark:text-sky-400">S/. {totalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              disabled={cartItems.length === 0}
              className="w-full bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Comprar por WhatsApp
            </button>
             <button
              type="button"
              onClick={onClose}
              className="w-full mt-3 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-md shadow-sm transition-colors"
            >
              Seguir Comprando
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CartModal;
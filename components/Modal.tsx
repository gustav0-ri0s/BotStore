import React from 'react';
import XCircleIcon from './icons/XCircleIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const isDarkMode = document.documentElement.classList.contains('dark');
  const backdropClass = isDarkMode ? 'modal-backdrop-dark' : 'modal-backdrop-light';

  return (
    <div 
      className={`${backdropClass}`} // Removed flex, justify-center, items-center, p-4 from backdrop
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden" // Added absolute positioning and transforms
        onClick={e => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700">
          <h2 id="modal-title" className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Cerrar modal"
          >
            <XCircleIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
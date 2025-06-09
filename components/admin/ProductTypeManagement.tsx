import React, { useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import EditIcon from '../icons/EditIcon';

interface ProductTypeManagementProps {
  types: string[];
  onSave: (oldName: string | null, newName: string) => void;
  // onDelete: (name: string) => void; // Deletion omitted
}

const ProductTypeManagement: React.FC<ProductTypeManagementProps> = ({ types, onSave }) => {
  const [newTypeName, setNewTypeName] = useState('');
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAddType = () => {
    if (newTypeName.trim() && !types.includes(newTypeName.trim())) {
      onSave(null, newTypeName.trim());
      setNewTypeName('');
    } else if (types.includes(newTypeName.trim())) {
      alert('Este tipo de producto ya existe.');
    }
  };

  const handleEditType = (name: string) => {
    setEditingType(name);
    setEditName(name);
  };

  const handleSaveEdit = () => {
    if (editingType && editName.trim() && editName.trim() !== editingType) {
      if (types.includes(editName.trim())) {
        alert('Ya existe un tipo de producto con ese nombre.');
        return;
      }
      onSave(editingType, editName.trim());
    }
    setEditingType(null);
    setEditName('');
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-800 shadow-xl rounded-lg">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">Gestionar Tipos de Producto</h2>
      
      <div className="mb-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-2">
           {editingType ? `Editando: ${editingType}` : 'Agregar Nuevo Tipo de Producto'}
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={editingType ? editName : newTypeName}
            onChange={(e) => editingType ? setEditName(e.target.value) : setNewTypeName(e.target.value)}
            placeholder="Nombre del tipo de producto"
            className="flex-grow px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white dark:bg-slate-700 dark:text-slate-50"
          />
           {editingType ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-md shadow-sm"
              >
                Guardar
              </button>
              <button
                onClick={() => { setEditingType(null); setEditName(''); }}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 rounded-md shadow-sm"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={handleAddType}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 rounded-md shadow-sm"
            >
              <PlusIcon className="w-4 h-4 mr-2" /> Agregar
            </button>
          )}
        </div>
      </div>

      <h3 className="text-xl font-medium text-slate-700 dark:text-slate-200 mb-4">Tipos Existentes</h3>
      {types.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">No hay tipos de producto definidos.</p>
      ) : (
        <ul className="space-y-2">
          {types.map(type => (
            <li 
              key={type} 
              className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/60 rounded-md shadow-sm"
            >
              <span className="text-slate-800 dark:text-slate-100">{type}</span>
              <button
                onClick={() => handleEditType(type)}
                className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-500 p-1 rounded-full hover:bg-sky-100 dark:hover:bg-sky-800"
                title="Editar nombre"
              >
                <EditIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductTypeManagement;
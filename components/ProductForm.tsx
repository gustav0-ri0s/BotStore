import React, { useState, useEffect, useCallback } from 'react';
import { Product, ProductType } from '../types'; // ProductCategory removed from direct import

interface ProductFormProps {
  onSubmit: (productData: Omit<Product, 'id'> | Product) => void;
  initialData?: Product | null;
  onCancel: () => void;
  categories: string[]; // Now dynamic
  productTypes: string[]; // Now dynamic
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData, onCancel, categories, productTypes }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [category, setCategory] = useState<string>(categories[0] || ''); // Use dynamic categories
  const [type, setType] = useState<ProductType>(productTypes[0] || ''); // Use dynamic types
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const resetForm = useCallback(() => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory(categories[0] || '');
    setType(productTypes[0] || '');
    setCurrentImageUrl('');
    setImageFile(null);
  }, [categories, productTypes]);
  
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setCategory(initialData.category);
      setType(initialData.type);
      setCurrentImageUrl(initialData.imageUrl);
      setImageFile(null);
    } else {
      resetForm();
    }
  }, [initialData, resetForm]);

  // Update category/type if lists change and current selection is no longer valid
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(category)) {
      setCategory(categories[0]);
    }
  }, [categories, category]);

  useEffect(() => {
    if (productTypes.length > 0 && !productTypes.includes(type)) {
      setType(productTypes[0]);
    }
  }, [productTypes, type]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCurrentImageUrl(initialData?.imageUrl || '');
      setImageFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || price === '' || Number(price) <= 0) {
        alert("Por favor, completa todos los campos obligatorios (Nombre, Descripción) y asegúrate que el precio sea un número positivo.");
        return;
    }
    if (!category) {
      alert("Por favor, selecciona una categoría.");
      return;
    }
    if(!type) {
      alert("Por favor, selecciona un tipo de producto.");
      return;
    }
    
    let productDataPayload: Omit<Product, 'id' | 'imageUrl'> & { imageUrl?: string } = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      type,
    };

    if (imageFile && currentImageUrl.startsWith('data:image')) {
        productDataPayload.imageUrl = currentImageUrl;
    } else if (initialData && initialData.imageUrl && !imageFile) {
        productDataPayload.imageUrl = initialData.imageUrl;
    } else {
        productDataPayload.imageUrl = `https://picsum.photos/seed/${name.trim().replace(/\s+/g, '-') || Date.now()}/400/300`;
    }

    if (initialData && initialData.id) {
        onSubmit({ ...productDataPayload, id: initialData.id, imageUrl: productDataPayload.imageUrl! });
    } else {
        onSubmit(productDataPayload as Omit<Product, 'id'>);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre del Producto</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white dark:bg-slate-700 dark:text-slate-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white dark:bg-slate-700 dark:text-slate-50"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Precio (S/.)</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={e => setPrice(parseFloat(e.target.value) || '')}
          required
          min="0.01"
          step="0.01"
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white dark:bg-slate-700 dark:text-slate-50"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoría</label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white dark:bg-slate-700 dark:text-slate-50"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo de Producto</label>
          <select
            id="type"
            value={type}
            onChange={e => setType(e.target.value as ProductType)}
            required
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white dark:bg-slate-700 dark:text-slate-50"
          >
            <option value="">Selecciona un tipo</option>
            {productTypes.map(pt => (
              <option key={pt} value={pt}>{pt}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="imageUpload" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Imagen del Producto</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-50 dark:file:bg-sky-700 file:text-sky-700 dark:file:text-sky-100 hover:file:bg-sky-100 dark:hover:file:bg-sky-600"
        />
        {currentImageUrl && (
          <div className="mt-3 border border-slate-200 dark:border-slate-700 rounded-md p-2 inline-block">
            <img src={currentImageUrl} alt="Vista previa" className="h-32 w-auto object-contain rounded" />
          </div>
        )}
        {!currentImageUrl && (
             <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Sube una imagen. Si está en blanco, se usará una imagen de marcador de posición.</p>
        )}
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-md shadow-sm transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          {initialData ? 'Guardar Cambios' : 'Agregar Producto'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
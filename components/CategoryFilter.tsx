import React from 'react';

interface CategoryFilterProps {
  categories: string[]; // Was ProductCategory[]
  selectedCategory: string | 'all'; // Was ProductCategory | 'all'
  onSelectCategory: (category: string | 'all') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  const allCategoriesList: (string | 'all')[] = ['all', ...categories];

  return (
    <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow dark:shadow-slate-700/30">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Filtrar por Categoría</h3>
      <div className="flex flex-wrap gap-2">
        {allCategoriesList.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out
              ${selectedCategory === category 
                ? 'bg-sky-600 dark:bg-sky-500 text-white shadow-md hover:bg-sky-700 dark:hover:bg-sky-600' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
          >
            {category === 'all' ? 'Todos los Productos' : category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
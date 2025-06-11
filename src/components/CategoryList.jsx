import { useState } from 'react';
import ProductCard from './ProductCard';

const CategoryList = ({ categories, products, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('все');

  const filteredProducts = activeCategory === 'все' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="category-list">
      <div className="category-filters">
        <button 
          className={activeCategory === 'все' ? 'active' : ''}
          onClick={() => setActiveCategory('все')}
        >
          Все товары
        </button>
        
        {categories.map(category => (
          <button 
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

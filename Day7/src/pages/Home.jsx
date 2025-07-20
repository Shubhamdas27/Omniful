import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import Notification from '../components/Notification';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notification, setNotification] = useState(null);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (productName) => {
    setNotification({
      message: `${productName} added to cart! 🛒`,
      type: 'success'
    });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="home">
      <div className="container">
        <h1 className="page-title">Welcome to Apka Bazaar</h1>
        <p className="page-subtitle">Discover premium branded products at best prices</p>
        
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <div className="products-section">
          <div className="products-header">
            <h2 className="products-title">
              {selectedCategory === 'all' ? 'All Products' : 
               selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </h2>
            <span className="products-count">
              {filteredProducts.length} products found
            </span>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default Home;

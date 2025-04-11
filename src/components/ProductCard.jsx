import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css'; // Add styles

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <img src={product.image} alt={product.title} className="product-card-image" />
        <div className="product-card-info">
          <h3 className="product-card-title">{product.title}</h3>
          <p className="product-card-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
       {/* Optional: Add to Cart button directly on card */}
      {/* <button onClick={() => addToCart(product)}>Add to Cart</button> */}
    </div>
  );
}

export default ProductCard;
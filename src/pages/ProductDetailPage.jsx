import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/fakeStoreApi';
import { useCart } from '../contexts/CartContext'; // Import useCart
import '../styles/ProductDetailPage.css'; // Add styles

function ProductDetailPage() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart(); // Get addToCart function from context

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]); // Refetch if ID changes

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!product) return <p>Product not found.</p>; // Should not happen if API call is successful

  return (
    <div className="product-detail-page">
      <div className="product-detail-image-container">
        <img src={product.image} alt={product.title} className="product-detail-image"/>
      </div>
      <div className="product-detail-info">
        <h1 className="product-detail-title">{product.title}</h1>
        <p className="product-detail-category">Category: {product.category}</p>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        {/* Add Rating if available */}
        {product.rating && (
             <p className="product-detail-rating">
                Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
        )}
        <button
            onClick={() => addToCart(product)} // Pass the whole product object
            className="add-to-cart-button"
        >
            Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
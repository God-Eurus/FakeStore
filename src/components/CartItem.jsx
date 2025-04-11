import React from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/CartItem.css'; // Add styles

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) { // Prevent quantity < 1 via buttons
        updateQuantity(item.id, newQuantity);
    } else if (newQuantity === 0) {
        // Optionally ask for confirmation before removing
        removeFromCart(item.id);
    }
  };

   const handleRemove = () => {
     // Optionally: Add a confirmation dialog here
     removeFromCart(item.id);
   };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
         <p className="cart-item-subtotal">
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button onClick={handleRemove} className="remove-item-button">Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem'; // Create this component
import "../styles/CartPage.css"; // Add styles

function CartPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) return; // Don't checkout empty cart

    // Simulate checkout process
    clearCart(); // Clear items from context/localStorage
    setShowConfirmation(true);

    // Hide confirmation after 4 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 4000); // 4000 milliseconds = 4 seconds
  };

  const total = getCartTotal();

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {showConfirmation && (
        <div className="checkout-confirmation-popup">
          Order placed successfully!
        </div>
      )}

      {cartItems.length === 0 && !showConfirmation ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <p className="cart-total">Total: ${total.toFixed(2)}</p>
            <button
                onClick={handleCheckout}
                className="checkout-button"
                disabled={cartItems.length === 0 || showConfirmation} // Disable if empty or just checked out
             >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
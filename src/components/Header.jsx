import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Import useCart
import '../styles/Header.css'; // Add styles

function Header({ onLogout }) {
  const navigate = useNavigate();
  const { getCartItemCount } = useCart(); // Get cart count function
  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    onLogout(); // Call logout function passed from App
    navigate('/login'); // Navigate to login page
  };

  return (
    <header className="app-header">
      <nav className="navigation container">
        <Link to="/" className="nav-logo">FakeStore</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </Link>
          </li>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
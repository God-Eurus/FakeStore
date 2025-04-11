import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header'; // Assuming Header component exists
import LoginPage from './pages/LoginPage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './contexts/CartContext'; // Assuming CartContext exists


// Helper function to check auth status
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  // Optional: Listen for storage changes (e.g., if logged out in another tab)

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('authToken'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  return { isAuthenticated, login, logout };
};

// Component to protect routes
const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login' }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  // Renders the child route's element (nested route)
  return <Outlet />;
};

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <CartProvider> {/* Wrap with CartProvider for cart state */}
      <Router>
        {/* Conditionally render Header if needed outside protected routes, or move inside */}
        {isAuthenticated && <Header onLogout={logout} />}
        <div className="container"> {/* Optional container */}
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage onLoginSuccess={login} />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { getAllProducts, getAllCategories, getProductsByCategory } from '../api/fakeStoreApi';
import ProductCard from '../components/ProductCard'; // Create this component
import '../styles/ProductListingPage.css'; // Add styles

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch categories and initial products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getAllProducts(),
          getAllCategories()
        ]);
        setProducts(fetchedProducts);
        setCategories(['all', ...fetchedCategories]); // Add 'all' option
      } catch (err) {
        setError('Failed to load data. Please try refreshing.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (selectedCategory === 'all') {
        // Avoid refetching if 'all' was just selected after initial load
        // We could optimize this further if needed
        if (products.length === 0) { // Refetch if initial load failed maybe?
           setLoading(true);
           try {
               setProducts(await getAllProducts());
           } catch(err) { setError('Failed to load products.'); }
           finally { setLoading(false); }
        }
        return; // No need to fetch specifically for 'all' if already loaded
      }

      setLoading(true);
      setError('');
      try {
        setProducts(await getProductsByCategory(selectedCategory));
      } catch (err) {
        setError(`Failed to load products for ${selectedCategory}.`);
        console.error(err);
        setProducts([]); // Clear products on category fetch error
      } finally {
        setLoading(false);
      }
    };

    // Only run if it's not the initial 'all' selection during setup
    if (categories.length > 0) {
        // If selecting 'all' after another category, fetch all products
        if (selectedCategory === 'all') {
             setLoading(true);
            getAllProducts()
                .then(setProducts)
                .catch(() => setError('Failed to load all products.'))
                .finally(() => setLoading(false));
        } else {
            fetchCategoryProducts();
        }
    }
  }, [selectedCategory, categories]); // Rerun when selectedCategory changes

  // Filter products based on search term (client-side)
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-listing-page">
      <h2>Products</h2>

      <div className="filters">
         {/* Category Filter */}
         <div className="filter-group">
            <label htmlFor="category-select">Category:</label>
            <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={loading || categories.length <= 1} // Disable while loading or if no categories
            >
                {categories.map(category => (
                <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
                ))}
            </select>
         </div>

        {/* Search Bar (Optional) */}
        <div className="filter-group">
            <label htmlFor="search-input">Search:</label>
            <input
                type="text"
                id="search-input"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>


      {loading && <p>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
             <p>No products found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;
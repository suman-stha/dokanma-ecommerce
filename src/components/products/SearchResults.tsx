import { useState, useEffect, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CartContext } from "../../App";
import ProductModal from "./ProductModal";
import "../../assets/styles/SearchResults.css";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError("");

      try {
        // In a real app, we would fetch from the backend API
        // For now, simulating with a timeout and mock data
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock API response - in production, this would be a fetch call
        // to your backend API, something like:
        // const response = await fetch(`/api/products/search?query=${query}`);
        // const data = await response.json();

        // For now, let's use a mock data set
        const mockProducts = [
          {
            id: 1,
            name: "Basmati Rice",
            price: 19.99,
            description: "Premium long grain basmati rice (10 lb)",
            image: "/images/Basmati.jfif",
            category: "food-grocery",
          },
          {
            id: 2,
            name: "Masala Chai Tea",
            price: 5.99,
            description: "Authentic spiced tea blend (100g)",
            image: "/images/tea.webp",
            category: "food-grocery",
          },
          {
            id: 3,
            name: "Ghee",
            price: 12.99,
            description: "Clarified butter for cooking (32 oz)",
            image: "/images/ghee.jfif",
            category: "food-grocery",
          },
          {
            id: 4,
            name: "Jimbu",
            price: 3.99,
            description: "Himalayan aromatic herb (50g)",
            image: "/images/jimbu.jfif",
            category: "spices-masalas",
          },
          {
            id: 5,
            name: "Meat Masala",
            price: 4.99,
            description: "Blend of spices for meat dishes (100g)",
            image: "/images/meat masala.webp",
            category: "spices-masalas",
          },
          {
            id: 6,
            name: "Timur",
            price: 5.49,
            description: "Sichuan pepper (50g)",
            image: "/images/timur.webp",
            category: "spices-masalas",
          },
          {
            id: 7,
            name: "Puja Thali Set",
            price: 24.99,
            description: "Complete brass thali set for puja rituals",
            image: "/images/puja-thali.jpg",
            category: "puja-samagri",
          },
          {
            id: 8,
            name: "Incense Sticks",
            price: 2.99,
            description: "Fragrant incense sticks for puja (20 sticks)",
            image: "/images/incense.jpg",
            category: "puja-samagri",
          },
        ];

        // Filter products based on search query
        const filteredProducts = mockProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        setProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  const handleShowProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCartFromModal = (product: any, quantity: number) => {
    addToCart(product, quantity);
    setSelectedProduct(null);
  };

  return (
    <div className="search-results-container">
      <div className="container">
        <div className="search-header">
          <h1>Search Results</h1>
          <p>
            {loading
              ? "Searching..."
              : products.length > 0
              ? `Found ${products.length} ${
                  products.length === 1 ? "result" : "results"
                } for "${query}"`
              : `No results found for "${query}"`}
          </p>
        </div>

        {error && <div className="search-error">{error}</div>}

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Searching for products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="products-grid search-results-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleShowProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="no-results">
            <p>No products found matching your search.</p>
            <div className="no-results-suggestions">
              <h3>Suggestions:</h3>
              <ul>
                <li>Check the spelling of your search term</li>
                <li>Try using a single keyword</li>
                <li>Try searching for a related item</li>
                <li>
                  Browse our{" "}
                  <Link to="/categories/food-grocery">categories</Link> instead
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="no-search">
            <p>Enter a search term to find products.</p>
            <Link to="/" className="back-btn">
              Return to Home
            </Link>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCartFromModal}
        />
      )}
    </div>
  );
};

export default SearchResults;

import { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import CartPage from "./components/cart/CartPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import CategoryPage from "./components/products/CategoryPage";
import SearchResults from "./components/products/SearchResults";
import ProductModal from "./components/products/ProductModal";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import UserDashboard from "./components/user/dashboard/UserDashboard";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import ProductManagement from "./components/admin/products/ProductManagement";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

// Define cart item interface
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

// Create cart context
export const CartContext = createContext<{
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

function Home() {
  const featuredProducts = [
    {
      id: 101,
      name: "Basmati Rice (10 lb)",
      price: 19.99,
      image: "/images/Basmati.jfif",
      category: "food-grocery",
      description: "Premium long grain basmati rice",
    },
    {
      id: 2,
      name: "Masala Chai Tea",
      price: 5.99,
      description: "Authentic spiced tea blend (100g)",
      image: "/images/tea.webp",
    },
    {
      id: 102,
      name: "Ghee (32 oz)",
      price: 12.99,
      image: "/images/ghee.jfif",
      category: "food-grocery",
      description: "Pure clarified butter for cooking",
    },
    {
      id: 4,
      name: "Jimbu",
      price: 3.99,
      description: "Himalayan aromatic herb (50g)",
      image: "/images/jimbu.jfif",
    },
    {
      id: 5,
      name: "Meat Masala",
      price: 4.99,
      description: "Blend of spices for meat dishes (100g)",
      image: "/images/meat masala.webp",
    },
    {
      id: 6,
      name: "Timur",
      price: 5.49,
      description: "Sichuan pepper (50g)",
      image: "/images/timur.webp",
    },
  ];

  // Use the cart context
  const { addToCart } = useContext(CartContext);

  // State for product modal
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Handle showing product details
  const handleShowProduct = (productId: number) => {
    const product = featuredProducts.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  // Handle adding to cart directly from modal
  const handleAddToCartFromModal = (product: any, quantity: number) => {
    addToCart(product, quantity);
    setSelectedProduct(null);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Authentic Nepali & Indian Groceries</h1>
          <p>
            Your one-stop shop for premium South Asian ingredients delivered to
            your door
          </p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
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
                    onClick={() => handleShowProduct(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCartFromModal}
        />
      )}

      <section className="benefits">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🚚</div>
              <h3>Free Delivery</h3>
              <p>On orders over $50</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🌿</div>
              <h3>Fresh Quality</h3>
              <p>Imported directly from Nepal and India</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🛒</div>
              <h3>Wide Selection</h3>
              <p>Over 1000+ authentic products</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  // Initialize empty cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add to cart function
  const addToCart = (product: any, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item is already in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        // Item doesn't exist in cart, add it
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: quantity,
          },
        ];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Update quantity function
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
  };

  // Toggle theme between light and dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  // Handle scroll events for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AuthProvider>
      <Router>
        <CartContext.Provider
          value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
          }}
        >
          <div className={`app ${darkMode ? "dark-mode" : ""}`}>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route
                  path="/categories/:category"
                  element={<CategoryPage />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* User Dashboard Routes */}
                <Route path="/account" element={<UserDashboard />} />
                <Route path="/account/orders" element={<UserDashboard />} />
                <Route path="/account/profile" element={<UserDashboard />} />

                {/* Admin Dashboard Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductManagement />} />
              </Routes>
            </main>
            <Footer />

            {showBackToTop && (
              <button
                className="back-to-top"
                onClick={scrollToTop}
                aria-label="Back to top"
              >
                ↑
              </button>
            )}

            <div className="theme-toggle">
              <button onClick={toggleTheme} className="theme-toggle-btn">
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </CartContext.Provider>
      </Router>
    </AuthProvider>
  );
}

export default App;

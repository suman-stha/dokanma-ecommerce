import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../App";
import ProductModal from "./ProductModal";
import "../../assets/styles/CategoryPage.css";

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

// Mock product data - normally this would come from an API
const allProducts: Product[] = [
  // Food & Grocery
  {
    id: 101,
    name: "Basmati Rice (10 lb)",
    price: 19.99,
    image: "/images/Basmati.jfif",
    category: "food-grocery",
    description: "Premium long grain basmati rice",
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
    id: 103,
    name: "Dal Makhani",
    price: 4.99,
    image: "/images/tea.webp",
    category: "food-grocery",
    description: "Black lentil curry mix",
  },

  // Puja Samagri
  {
    id: 201,
    name: "Incense Sticks",
    price: 2.99,
    image: "/images/incense.jpg",
    category: "puja-samagri",
    description: "Fragrant sandalwood incense",
  },
  {
    id: 202,
    name: "Brass Diya Lamp",
    price: 9.99,
    image: "/images/puja-thali.jpg",
    category: "puja-samagri",
    description: "Traditional brass oil lamp for ceremonies",
  },
  {
    id: 203,
    name: "Coconut for Puja",
    price: 3.49,
    image: "/images/puja-thali.jpg",
    category: "puja-samagri",
    description: "Fresh coconut for offerings",
  },

  // Health & Beauty
  {
    id: 301,
    name: "Ayurvedic Hair Oil",
    price: 7.99,
    image: "/images/jimbu.jfif",
    category: "health-beauty",
    description: "Natural nourishing hair oil",
  },
  {
    id: 302,
    name: "Multani Mitti",
    price: 4.49,
    image: "/images/tea.webp",
    category: "health-beauty",
    description: "Fuller's earth clay for skin care",
  },
  {
    id: 303,
    name: "Neem Soap",
    price: 2.99,
    image: "/images/tea.webp",
    category: "health-beauty",
    description: "Medicinal soap for skin problems",
  },

  // New Items
  {
    id: 401,
    name: "Instant Dhokla Mix",
    price: 3.99,
    image: "/images/tea.webp",
    category: "new-items",
    description: "Quick and easy savory snack mix",
  },
  {
    id: 402,
    name: "Frozen Samosas (12 pack)",
    price: 8.99,
    image: "/images/meat masala.webp",
    category: "new-items",
    description: "Ready to fry vegetable samosas",
  },
  {
    id: 403,
    name: "Paneer Cubes (Frozen)",
    price: 6.49,
    image: "/images/timur.webp",
    category: "new-items",
    description: "Fresh paneer cubes, ready to cook",
  },

  // Noodles & Snacks
  {
    id: 501,
    name: "Wai Wai Noodles (5 pack)",
    price: 3.99,
    image: "/images/ghee.jfif",
    category: "noodles-snacks",
    description: "Popular Nepali instant noodles",
  },
  {
    id: 502,
    name: "Masala Chips",
    price: 1.99,
    image: "/images/tea.webp",
    category: "noodles-snacks",
    description: "Spicy potato chips",
  },
  {
    id: 503,
    name: "Bhujia Sev",
    price: 2.49,
    image: "/images/jimbu.jfif",
    category: "noodles-snacks",
    description: "Crunchy gram flour snack",
  },

  // Spices & Masalas
  {
    id: 601,
    name: "Garam Masala",
    price: 4.99,
    image: "/images/meat masala.webp",
    category: "spices-masalas",
    description: "Aromatic blend of ground spices",
  },
  {
    id: 602,
    name: "Kashmiri Chili Powder",
    price: 3.99,
    image: "/images/meat masala.webp",
    category: "spices-masalas",
    description: "Vibrant red chili powder with mild heat",
  },
  {
    id: 603,
    name: "Whole Cumin Seeds",
    price: 2.99,
    image: "/images/timur.webp",
    category: "spices-masalas",
    description: "Aromatic seeds for tempering dishes",
  },
];

// Category name mapping for display purposes
const categoryNames: Record<string, string> = {
  "food-grocery": "Food & Grocery",
  "puja-samagri": "Puja Samagri",
  "health-beauty": "Health & Beauty",
  "new-items": "New Items",
  "noodles-snacks": "Noodles & Snacks",
  "spices-masalas": "Spices & Masalas",
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Simulate API call to fetch products for this category
    setLoading(true);

    setTimeout(() => {
      // Filter products by category
      const filteredProducts = allProducts.filter(
        (product) => product.category === category
      );
      setProducts(filteredProducts);
      setLoading(false);
    }, 500); // Simulate loading delay
  }, [category]);

  // Handle showing product details
  const handleShowProduct = (productId: number) => {
    const product = allProducts.find((p) => p.id === productId);
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
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1>
            {category ? categoryNames[category] || "Products" : "All Products"}
          </h1>
          <p>{products.length} items found</p>
        </div>

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length > 0 ? (
          <div className="products-grid">
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
                    onClick={() => handleShowProduct(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found in this category.</p>
            <Link to="/" className="back-to-shop">
              Return to Shop
            </Link>
          </div>
        )}
      </div>

      {/* Product Modal */}
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

export default CategoryPage;

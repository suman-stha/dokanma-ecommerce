import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/styles/CategoryPage.css';

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

// Dummy product data with categories
const dummyProducts: Product[] = [
  // Food & Grocery
  {
    id: 1,
    name: "Basmati Rice (10 lb)",
    price: 19.99,
    description: "Premium long grain basmati rice",
    image: "/src/assets/rice.jpg",
    category: "food-grocery"
  },
  {
    id: 2,
    name: "Toor Dal (2 lb)",
    price: 6.99,
    description: "Split pigeon peas for daily cooking",
    image: "/src/assets/rice.jpg",
    category: "food-grocery"
  },
  {
    id: 3,
    name: "Atta Flour (10 lb)",
    price: 12.99,
    description: "Whole wheat flour for chapati and roti",
    image: "/src/assets/rice.jpg",
    category: "food-grocery"
  },
  
  // Puja Samagri
  {
    id: 4,
    name: "Incense Sticks",
    price: 3.99,
    description: "Aromatic incense sticks for puja",
    image: "/src/assets/rice.jpg",
    category: "puja-samagri"
  },
  {
    id: 5,
    name: "Brass Diya",
    price: 15.99,
    description: "Traditional brass oil lamp for rituals",
    image: "/src/assets/rice.jpg",
    category: "puja-samagri"
  },
  {
    id: 6,
    name: "Camphor Tablets",
    price: 4.99,
    description: "Pure camphor tablets for aarti",
    image: "/src/assets/rice.jpg",
    category: "puja-samagri"
  },
  
  // Health & Beauty
  {
    id: 7,
    name: "Ayurvedic Hair Oil",
    price: 9.99,
    description: "Traditional blend of herbs for hair care",
    image: "/src/assets/rice.jpg",
    category: "health-beauty"
  },
  {
    id: 8,
    name: "Himalayan Face Cream",
    price: 14.99,
    description: "Natural face cream with Himalayan herbs",
    image: "/src/assets/rice.jpg",
    category: "health-beauty"
  },
  {
    id: 9,
    name: "Neem Soap",
    price: 4.99,
    description: "Antibacterial soap made with neem extract",
    image: "/src/assets/rice.jpg",
    category: "health-beauty"
  },
  
  // New Items
  {
    id: 10,
    name: "Organic Quinoa",
    price: 8.99,
    description: "Newly imported organic quinoa",
    image: "/src/assets/rice.jpg",
    category: "new-items"
  },
  {
    id: 11,
    name: "Instant Pot Mini",
    price: 69.99,
    description: "Brand new mini instant pot for quick cooking",
    image: "/src/assets/rice.jpg",
    category: "new-items"
  },
  {
    id: 12,
    name: "Electric Spice Grinder",
    price: 29.99,
    description: "New electric grinder for fresh spices",
    image: "/src/assets/rice.jpg",
    category: "new-items"
  },
  
  // Noodles & Snacks
  {
    id: 13,
    name: "Wai Wai Noodles (Pack of 5)",
    price: 5.99,
    description: "Popular Nepali instant noodles",
    image: "/src/assets/rice.jpg",
    category: "noodles-snacks"
  },
  {
    id: 14,
    name: "Haldiram's Mixture",
    price: 3.99,
    description: "Spicy Indian snack mix",
    image: "/src/assets/rice.jpg",
    category: "noodles-snacks"
  },
  {
    id: 15,
    name: "Bhujia Sev",
    price: 4.99,
    description: "Crispy gram flour snack",
    image: "/src/assets/rice.jpg",
    category: "noodles-snacks"
  },
  
  // Spices & Masalas
  {
    id: 16,
    name: "Garam Masala",
    price: 5.99,
    description: "Authentic blend of aromatic spices",
    image: "/src/assets/rice.jpg",
    category: "spices-masalas"
  },
  {
    id: 17,
    name: "Turmeric Powder",
    price: 4.99,
    description: "Pure ground turmeric root",
    image: "/src/assets/rice.jpg",
    category: "spices-masalas"
  },
  {
    id: 18,
    name: "Whole Cumin Seeds",
    price: 3.99,
    description: "Aromatic whole cumin seeds for cooking",
    image: "/src/assets/rice.jpg",
    category: "spices-masalas"
  }
];

// Category display names mapping
const categoryNames: Record<string, string> = {
  'food-grocery': 'Food & Grocery',
  'puja-samagri': 'Puja Samagri',
  'health-beauty': 'Health & Beauty',
  'new-items': 'New Items',
  'noodles-snacks': 'Noodles & Snacks',
  'spices-masalas': 'Spices & Masalas'
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch products by category
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (categoryId) {
        const filteredProducts = dummyProducts.filter(product => product.category === categoryId);
        setProducts(filteredProducts);
        setCategoryName(categoryNames[categoryId] || 'Products');
      } else {
        // If no category specified, show all products
        setProducts(dummyProducts);
        setCategoryName('All Products');
      }
      setLoading(false);
    }, 500); // Simulated delay
    
  }, [categoryId]);
  
  // Mock function to add item to cart
  const handleAddToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
    // You would typically update cart state here
    alert(`Added ${products.find(p => p.id === productId)?.name} to cart!`);
  };
  
  return (
    <div className="category-page">
      <div className="container">
        <h1 className="category-title">{categoryName}</h1>
        
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
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
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">No products found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage; 
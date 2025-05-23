import { useState } from 'react';
import '../../assets/styles/ProductModal.css';

// Use a more generic Product type to work with both Home and CategoryPage products
interface ProductBase {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductModalProps {
  product: ProductBase;
  onClose: () => void;
  onAddToCart: (product: ProductBase, quantity: number) => void;
}

const ProductModal = ({ product, onClose, onAddToCart }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="product-modal-overlay" onClick={handleOutsideClick}>
      <div className="product-modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        <div className="product-modal-grid">
          <div className="product-modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-modal-details">
            <h2>{product.name}</h2>
            <p className="product-modal-price">${product.price.toFixed(2)}</p>
            <p className="product-modal-description">{product.description}</p>

            <div className="product-modal-quantity">
              <span>Quantity:</span>
              <div className="quantity-control">
                <button
                  className="quantity-btn"
                  style={{ color: "black" }}
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  style={{ color: "black" }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-modal-subtotal">
              <span>Subtotal:</span>
              <span>${(product.price * quantity).toFixed(2)}</span>
            </div>

            <div className="product-modal-actions">
              <button className="continue-shopping-btn" onClick={onClose}>
                Cancel
              </button>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 
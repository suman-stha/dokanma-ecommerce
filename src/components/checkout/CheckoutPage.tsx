import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/CheckoutPage.css';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'credit-card' | 'paypal' | 'cash';
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage = () => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'credit-card',
  });

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Mock cart data
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Basmati Rice (10 lb)",
      price: 19.99,
      quantity: 1
    },
    {
      id: 2,
      name: "Masala Chai Tea (100g)",
      price: 5.99,
      quantity: 2
    },
    {
      id: 3,
      name: "Ghee (32 oz)",
      price: 12.99,
      quantity: 1
    }
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (method: CheckoutFormData['paymentMethod']) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Submit order logic would go here
      alert('Order submitted successfully!');
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Shipping</div>
            </div>
            <div className="step-connector"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Payment</div>
            </div>
            <div className="step-connector"></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Review</div>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="shipping-section">
                  <h2>Shipping Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">Zip Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="India">India</option>
                      <option value="Nepal">Nepal</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="payment-section">
                  <h2>Payment Method</h2>
                  <div className="payment-options">
                    <div
                      className={`payment-option ${formData.paymentMethod === 'credit-card' ? 'selected' : ''}`}
                      onClick={() => handlePaymentMethodChange('credit-card')}
                    >
                      <div className="payment-option-radio">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'credit-card'}
                          readOnly
                        />
                      </div>
                      <div className="payment-option-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                      </div>
                      <div className="payment-option-label">
                        Credit/Debit Card
                      </div>
                    </div>

                    <div
                      className={`payment-option ${formData.paymentMethod === 'paypal' ? 'selected' : ''}`}
                      onClick={() => handlePaymentMethodChange('paypal')}
                    >
                      <div className="payment-option-radio">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'paypal'}
                          readOnly
                        />
                      </div>
                      <div className="payment-option-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"></path>
                          <path d="M12 12v.01"></path>
                        </svg>
                      </div>
                      <div className="payment-option-label">
                        PayPal
                      </div>
                    </div>

                    <div
                      className={`payment-option ${formData.paymentMethod === 'cash' ? 'selected' : ''}`}
                      onClick={() => handlePaymentMethodChange('cash')}
                    >
                      <div className="payment-option-radio">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'cash'}
                          readOnly
                        />
                      </div>
                      <div className="payment-option-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                          <circle cx="12" cy="12" r="2"></circle>
                          <path d="M6 12h.01M18 12h.01"></path>
                        </svg>
                      </div>
                      <div className="payment-option-label">
                        Cash on Delivery
                      </div>
                    </div>
                  </div>

                  {formData.paymentMethod === 'credit-card' && (
                    <div className="credit-card-form">
                      <div className="form-group">
                        <label htmlFor="cardName">Name on Card</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate">Expiry Date</label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="cvv">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="review-section">
                  <h2>Order Review</h2>
                  <div className="review-info">
                    <div className="review-group">
                      <h3>Shipping Address</h3>
                      <p>
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zipCode}<br />
                        {formData.country}
                      </p>
                    </div>
                    <div className="review-group">
                      <h3>Payment Method</h3>
                      <p>
                        {formData.paymentMethod === 'credit-card' && 'Credit/Debit Card'}
                        {formData.paymentMethod === 'paypal' && 'PayPal'}
                        {formData.paymentMethod === 'cash' && 'Cash on Delivery'}
                      </p>
                    </div>
                    <div className="review-group">
                      <h3>Contact Information</h3>
                      <p>
                        Email: {formData.email}<br />
                        Phone: {formData.phone}
                      </p>
                    </div>
                  </div>

                  <div className="review-items">
                    <h3>Order Items</h3>
                    {cartItems.map(item => (
                      <div className="review-item" key={item.id}>
                        <div className="item-name">
                          {item.name} <span className="item-qty">x{item.quantity}</span>
                        </div>
                        <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="checkout-buttons">
                {step > 1 && (
                  <button
                    type="button"
                    className="back-button"
                    onClick={goBack}
                  >
                    Back
                  </button>
                )}
                <button type="submit" className="continue-button">
                  {step === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map(item => (
                <div className="summary-item" key={item.id}>
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-qty">x{item.quantity}</div>
                  </div>
                  <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="promo-code">
              <input type="text" placeholder="Promo Code" />
              <button>Apply</button>
            </div>
            
            <div className="secure-checkout">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 
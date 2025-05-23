import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../App";
import "../../assets/styles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total items in cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const categoryDropdownRef = useRef<HTMLLIElement>(null);
  const accountDropdownRef = useRef<HTMLLIElement>(null);

  // Categories menu data
  const categories = [
    { id: 1, name: "Food & Grocery", path: "/categories/food-grocery" },
    { id: 2, name: "Puja Samagri", path: "/categories/puja-samagri" },
    { id: 3, name: "Health & Beauty", path: "/categories/health-beauty" },
    { id: 4, name: "New Items", path: "/categories/new-items" },
    { id: 5, name: "Noodles & Snacks", path: "/categories/noodles-snacks" },
    { id: 6, name: "Spices & Masalas", path: "/categories/spices-masalas" },
  ];

  // Handle scroll event to apply different styling when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest(".navbar-menu") &&
        !target.closest(".mobile-toggle")
      ) {
        setIsMenuOpen(false);
      }

      // Close category dropdown if click is outside
      if (
        categoryDropdownOpen &&
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(target as Node)
      ) {
        setCategoryDropdownOpen(false);
      }

      // Close account dropdown if click is outside
      if (
        accountDropdownOpen &&
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(target as Node)
      ) {
        setAccountDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, categoryDropdownOpen, accountDropdownOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Toggle category dropdown
  const toggleCategoryDropdown = (e: React.MouseEvent) => {
    if (window.innerWidth <= 768) return; // Don't toggle on mobile, let the link work
    e.preventDefault();
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  // Toggle account dropdown
  const toggleAccountDropdown = (e: React.MouseEvent) => {
    if (window.innerWidth <= 768) return; // Don't toggle on mobile
    e.preventDefault();
    setAccountDropdownOpen(!accountDropdownOpen);
    if (!accountDropdownOpen) setCategoryDropdownOpen(false);
  };

  // Close dropdowns when clicking category on mobile
  const handleMobileNavigation = () => {
    setIsMenuOpen(false);
    setCategoryDropdownOpen(false);
    setAccountDropdownOpen(false);
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with the query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // Close mobile menu if open
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <div className="logo-background-wrapper">
              <img
                src="/images/dokanma2.png"
                alt="Dokanma.com Logo"
                className="navbar-logo-img"
              />
            </div>
            <div className="navbar-logo-text">
              <h1>
                Dokanma<span>.com</span>
              </h1>
              <p>Nepali & Indian Groceries</p>
            </div>
          </Link>
        </div>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for groceries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        <div
          className={`mobile-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>

            <li
              ref={categoryDropdownRef}
              className={`has-dropdown ${categoryDropdownOpen ? "active" : ""}`}
            >
              <Link
                to="/categories"
                onClick={toggleCategoryDropdown}
                className="dropdown-toggle"
              >
                Categories
                <span className="dropdown-icon">▼</span>
              </Link>
              <div className="dropdown-menu">
                <ul>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link to={category.path} onClick={handleMobileNavigation}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <Link to="/deals" onClick={() => setIsMenuOpen(false)}>
                Special Deals
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>

            <li
              ref={accountDropdownRef}
              className={`has-dropdown ${accountDropdownOpen ? "active" : ""}`}
            >
              <a
                href="#"
                onClick={toggleAccountDropdown}
                className="dropdown-toggle"
              >
                Account
                <span className="dropdown-icon">▼</span>
              </a>
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/login" onClick={handleMobileNavigation}>
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={handleMobileNavigation}>
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="cart-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Cart
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Quick cart toggle for mobile */}
      <Link to="/cart" className="quick-cart-toggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>
    </nav>
  );
};

export default Navbar;

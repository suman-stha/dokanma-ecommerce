import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import API from "../../../services/AxiosConfig";
import "../../../assets/styles/AdminDashboard.css";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

const ProductManagement = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "",
    stock: 0,
    image: "",
    description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would be an API call:
      // const response = await API.get('/admin/products');
      // setProducts(response.data);

      // Mock data for demonstration
      setProducts([
        {
          id: 1,
          name: "Basmati Rice",
          price: 19.99,
          category: "Rice",
          stock: 50,
          image: "/images/Basmati.jfif",
          description: "Premium long grain basmati rice (10 lb)",
        },
        {
          id: 2,
          name: "Masala Chai Tea",
          price: 5.99,
          category: "Tea",
          stock: 100,
          image: "/images/tea.webp",
          description: "Authentic spiced tea blend (100g)",
        },
        {
          id: 3,
          name: "Ghee",
          price: 12.99,
          category: "Dairy",
          stock: 30,
          image: "/images/ghee.jfif",
          description: "Clarified butter for cooking (32 oz)",
        },
        {
          id: 4,
          name: "Jimbu",
          price: 3.99,
          category: "Spices",
          stock: 45,
          image: "/images/jimbu.jfif",
          description: "Himalayan aromatic herb (50g)",
        },
        {
          id: 5,
          name: "Meat Masala",
          price: 4.99,
          category: "Spices",
          stock: 60,
          image: "/images/meat masala.webp",
          description: "Blend of spices for meat dishes (100g)",
        },
        {
          id: 6,
          name: "Timur",
          price: 5.49,
          category: "Spices",
          stock: 40,
          image: "/images/timur.webp",
          description: "Sichuan pepper (50g)",
        },
      ]);
      setFilteredProducts([
        {
          id: 1,
          name: "Basmati Rice",
          price: 19.99,
          category: "Rice",
          stock: 50,
          image: "/images/Basmati.jfif",
          description: "Premium long grain basmati rice (10 lb)",
        },
        {
          id: 2,
          name: "Masala Chai Tea",
          price: 5.99,
          category: "Tea",
          stock: 100,
          image: "/images/tea.webp",
          description: "Authentic spiced tea blend (100g)",
        },
        {
          id: 3,
          name: "Ghee",
          price: 12.99,
          category: "Dairy",
          stock: 30,
          image: "/images/ghee.jfif",
          description: "Clarified butter for cooking (32 oz)",
        },
        {
          id: 4,
          name: "Jimbu",
          price: 3.99,
          category: "Spices",
          stock: 45,
          image: "/images/jimbu.jfif",
          description: "Himalayan aromatic herb (50g)",
        },
        {
          id: 5,
          name: "Meat Masala",
          price: 4.99,
          category: "Spices",
          stock: 60,
          image: "/images/meat masala.webp",
          description: "Blend of spices for meat dishes (100g)",
        },
        {
          id: 6,
          name: "Timur",
          price: 5.49,
          category: "Spices",
          stock: 40,
          image: "/images/timur.webp",
          description: "Sichuan pepper (50g)",
        },
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      price: 0,
      category: "",
      stock: 0,
      image: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setFormData({ ...product });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // In a real implementation, this would be an API call:
        // await API.delete(`/admin/products/${productId}`);

        // Update local state
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== productId)
        );
        alert("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (currentProduct) {
        // Update existing product
        // In a real implementation, this would be an API call:
        // await API.put(`/admin/products/${currentProduct.id}`, formData);

        // Update local state
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === currentProduct.id ? ({ ...p, ...formData } as Product) : p
          )
        );
        alert("Product updated successfully");
      } else {
        // Add new product
        // In a real implementation, this would be an API call:
        // const response = await API.post('/admin/products', formData);
        // const newProduct = response.data;

        // Mock new product with generated ID
        const newProduct = {
          ...formData,
          id: Math.max(...products.map((p) => p.id), 0) + 1,
        } as Product;

        // Update local state
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        alert("Product added successfully");
      }

      // Close modal and reset form
      setIsModalOpen(false);
      setCurrentProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    }
  };

  if (!user || !user.roles.includes("ROLE_ADMIN")) {
    return (
      <div className="admin-unauthorized">
        <h2>Unauthorized Access</h2>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-products">
      <div className="admin-header-actions">
        <h2>Product Management</h2>
        <div className="admin-actions">
          <div className="admin-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-add" onClick={handleAddProduct}>
            <i className="fas fa-plus"></i> Add Product
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="admin-loading">Loading products...</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <div className="product-image-small">
                      <img src={product.image} alt={product.name} />
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditProduct(product)}
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>{currentProduct ? "Edit Product" : "Add New Product"}</h3>
              <button
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Rice">Rice</option>
                  <option value="Spices">Spices</option>
                  <option value="Tea">Tea</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Lentils">Lentils</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {currentProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "../../../assets/styles/UserDashboard.css";

const UserDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        // In a real implementation, this would be an API call:
        // const response = await API.get('/user/orders');
        // setOrders(response.data);

        // Mock data for demonstration
        setOrders([
          {
            id: 1,
            date: "2023-05-15",
            total: 89.99,
            items: 3,
            status: "Delivered",
          },
          {
            id: 2,
            date: "2023-04-28",
            total: 45.5,
            items: 1,
            status: "Delivered",
          },
          {
            id: 3,
            date: "2023-03-12",
            total: 124.75,
            items: 4,
            status: "Delivered",
          },
        ]);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (!user) {
    return (
      <div className="user-unauthorized">
        <h2>Please Sign In</h2>
        <p>You need to be signed in to view your dashboard.</p>
        <Link to="/login" className="btn-primary">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard-sidebar">
        <div className="user-profile-summary">
          <div className="user-avatar">
            <img src="/images/profile-placeholder.png" alt="User" />
          </div>
          <div className="user-info">
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>{user.email}</p>
          </div>
        </div>

        <nav className="user-nav">
          <ul>
            <li>
              <button
                className={activeTab === "dashboard" ? "active" : ""}
                onClick={() => setActiveTab("dashboard")}
              >
                <i className="fas fa-home"></i> Dashboard
              </button>
            </li>
            <li>
              <button
                className={activeTab === "orders" ? "active" : ""}
                onClick={() => setActiveTab("orders")}
              >
                <i className="fas fa-shopping-bag"></i> My Orders
              </button>
            </li>
            <li>
              <button
                className={activeTab === "profile" ? "active" : ""}
                onClick={() => setActiveTab("profile")}
              >
                <i className="fas fa-user"></i> Profile
              </button>
            </li>
            <li>
              <button
                className={activeTab === "addresses" ? "active" : ""}
                onClick={() => setActiveTab("addresses")}
              >
                <i className="fas fa-map-marker-alt"></i> Addresses
              </button>
            </li>
            <li>
              <button
                className={activeTab === "wishlist" ? "active" : ""}
                onClick={() => setActiveTab("wishlist")}
              >
                <i className="fas fa-heart"></i> Wishlist
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="user-dashboard-content">
        {activeTab === "dashboard" && (
          <div className="dashboard-welcome">
            <h2>Welcome back, {user.firstName}!</h2>
            <div className="dashboard-summary">
              <div className="summary-card">
                <div className="summary-icon">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <div className="summary-data">
                  <h3>{orders.length}</h3>
                  <p>Total Orders</p>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon">
                  <i className="fas fa-truck"></i>
                </div>
                <div className="summary-data">
                  <h3>0</h3>
                  <p>In Transit</p>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="summary-data">
                  <h3>0</h3>
                  <p>Wishlist Items</p>
                </div>
              </div>
            </div>

            <div className="recent-orders">
              <div className="section-header">
                <h3>Recent Orders</h3>
                <button onClick={() => setActiveTab("orders")}>View All</button>
              </div>
              {isLoading ? (
                <p>Loading your orders...</p>
              ) : (
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 3).map((order: any) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.items}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>
                          <span
                            className={`status status-${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <Link to={`/orders/${order.id}`} className="btn-view">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-section">
            <h2>My Orders</h2>
            {isLoading ? (
              <p>Loading your orders...</p>
            ) : orders.length > 0 ? (
              <table className="orders-table full-width">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.items}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <span
                          className={`status status-${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/orders/${order.id}`} className="btn-view">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <i className="fas fa-shopping-bag empty-icon"></i>
                <h3>No Orders Yet</h3>
                <p>You haven't placed any orders yet.</p>
                <Link to="/" className="btn-primary">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="profile-section">
            <h2>My Profile</h2>
            <form className="profile-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue={user.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" defaultValue={user.lastName} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  defaultValue={user.email}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Add your phone number"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-save">
                  Save Changes
                </button>
              </div>
            </form>

            <div className="password-section">
              <h3>Change Password</h3>
              <form className="password-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input type="password" id="currentPassword" />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input type="password" id="newPassword" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input type="password" id="confirmPassword" />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-save">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

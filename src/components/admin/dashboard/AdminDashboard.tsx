import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "../../../assets/styles/AdminDashboard.css";
import { useAuth } from "../../../context/AuthContext";

interface Order {
  id: number;
  customerName: string;
  date: string;
  total: number;
  status: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real implementation, these would be API calls
        // const orderResponse = await API.get('/admin/orders/stats');
        // const productResponse = await API.get('/admin/products/stats');
        // const userResponse = await API.get('/admin/users/stats');
        // const recentOrdersResponse = await API.get('/admin/orders/recent');

        // Mock data for demonstration
        setStats({
          totalOrders: 152,
          totalProducts: 89,
          totalUsers: 324,
          totalRevenue: 15289.99,
        });

        setRecentOrders([
          {
            id: 1,
            customerName: "John Doe",
            date: "2023-05-20",
            total: 129.99,
            status: "Delivered",
          },
          {
            id: 2,
            customerName: "Jane Smith",
            date: "2023-05-19",
            total: 79.99,
            status: "Processing",
          },
          {
            id: 3,
            customerName: "Mike Johnson",
            date: "2023-05-18",
            total: 199.99,
            status: "Shipped",
          },
          {
            id: 4,
            customerName: "Sarah Williams",
            date: "2023-05-17",
            total: 49.99,
            status: "Delivered",
          },
          {
            id: 5,
            customerName: "David Brown",
            date: "2023-05-16",
            total: 89.99,
            status: "Processing",
          },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (!user || !user.roles.includes("ROLE_ADMIN")) {
    return (
      <div className="admin-unauthorized">
        <h2>Unauthorized Access</h2>
        <p>You don't have permission to access the admin dashboard.</p>
        <Link to="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Dokanma Admin</h2>
        </div>
        <nav className="admin-nav">
          <ul>
            <li>
              <Link to="/admin" className="active">
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/products">
                <i className="fas fa-box"></i> Products
              </Link>
            </li>
            <li>
              <Link to="/admin/orders">
                <i className="fas fa-shopping-cart"></i> Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/users">
                <i className="fas fa-users"></i> Users
              </Link>
            </li>
            <li>
              <Link to="/admin/settings">
                <i className="fas fa-cog"></i> Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="admin-content">
        <header className="admin-header">
          <div className="admin-search">
            <input type="text" placeholder="Search..." />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="admin-user">
            <span>Welcome, {user?.firstName}</span>
            <div className="admin-profile-pic">
              <img src="/images/profile-placeholder.png" alt="Admin" />
            </div>
          </div>
        </header>

        <main className="admin-main">
          {isLoading ? (
            <div className="admin-loading">Loading dashboard data...</div>
          ) : (
            <>
              <div className="admin-stats">
                <div className="stat-card">
                  <div className="stat-icon orders-icon">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <div className="stat-data">
                    <h3>{stats.totalOrders}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon products-icon">
                    <i className="fas fa-box"></i>
                  </div>
                  <div className="stat-data">
                    <h3>{stats.totalProducts}</h3>
                    <p>Total Products</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon users-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="stat-data">
                    <h3>{stats.totalUsers}</h3>
                    <p>Total Users</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon revenue-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="stat-data">
                    <h3>${stats.totalRevenue.toFixed(2)}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
              </div>

              <div className="admin-recent-orders">
                <div className="card-header">
                  <h2>Recent Orders</h2>
                  <Link to="/admin/orders" className="view-all">
                    View All
                  </Link>
                </div>

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order: Order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{order.date}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>
                          <span
                            className={`status status-${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="btn-view">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn-edit">
                              <i className="fas fa-pen"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

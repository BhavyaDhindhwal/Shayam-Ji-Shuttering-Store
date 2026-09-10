import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      title: "Total Sales",
      value: "₹0",
      icon: "₹",
      change: "This Month",
    },
    {
      title: "Pending Payment",
      value: "₹0",
      icon: "₹",
      change: "To be collected",
    },
    {
      title: "Active Renters",
      value: "0",
      icon: "👥",
      change: "Currently active",
    },
    {
      title: "New Enquiries",
      value: "0",
      icon: "✉",
      change: "This Month",
    },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="welcome-text">Welcome back, Owner</p>
          <h1>Shayam Ji Shuttering Store</h1>
        </div>

        <button className="add-button">+ New Order</button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div className="stat-card-top">
              <div className="stat-icon">{stat.icon}</div>
              <span className="three-dots">•••</span>
            </div>

            <p>{stat.title}</p>

            <h2>{stat.value}</h2>

            <span className="stat-change">{stat.change}</span>
          </div>
        ))}
      </div>

      {/* Sales + Stock */}
      <div className="main-grid">
        {/* Sales Overview */}
        <div className="dashboard-card sales-card">
          <div className="card-header">
            <div>
              <h2>Sales Overview</h2>
              <p>Daily and weekly sales performance</p>
            </div>

            <select defaultValue="week">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="chart">
            <div className="y-axis">
              <span>₹50K</span>
              <span>₹40K</span>
              <span>₹30K</span>
              <span>₹20K</span>
              <span>₹10K</span>
              <span>₹0</span>
            </div>

            <div className="chart-area">
              <div className="grid-line line-1"></div>
              <div className="grid-line line-2"></div>
              <div className="grid-line line-3"></div>
              <div className="grid-line line-4"></div>
              <div className="grid-line line-5"></div>

              <div className="empty-chart">
                <span>📊</span>
                <strong>Sales data will appear here</strong>
                <small>Connect your orders to view sales</small>
              </div>

              <div className="x-axis">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Overview */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Stock Overview</h2>
              <p>Current inventory status</p>
            </div>

            <button className="view-btn">View All</button>
          </div>

          <div className="stock-list">
            <div className="stock-item">
              <div>
                <strong>Setting Plate</strong>
                <small>Various Sizes</small>
              </div>

              <div className="stock-number">
                <strong>500</strong>
                <small>Total</small>
              </div>

              <span className="stock-good">400 Available</span>
            </div>

            <div className="stock-item">
              <div>
                <strong>3 Meter Standard</strong>
                <small>Standard</small>
              </div>

              <div className="stock-number">
                <strong>300</strong>
                <small>Total</small>
              </div>

              <span className="stock-good">250 Available</span>
            </div>

            <div className="stock-item">
              <div>
                <strong>Base Jack</strong>
                <small>No Size</small>
              </div>

              <div className="stock-number">
                <strong>200</strong>
                <small>Total</small>
              </div>

              <span className="stock-warning">45 Issued</span>
            </div>

            <div className="stock-item">
              <div>
                <strong>Pin</strong>
                <small>No Size</small>
              </div>

              <div className="stock-number">
                <strong>500</strong>
                <small>Total</small>
              </div>

              <span className="stock-good">480 Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-grid">
        {/* Recent Orders */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Recent Orders</h2>
              <p>Latest shuttering material orders</p>
            </div>

            <button className="view-btn">View All</button>
          </div>

          <div className="empty-table">
            <span>📦</span>
            <strong>No orders yet</strong>
            <small>New orders will appear here</small>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Payment Summary</h2>
              <p>Current payment status</p>
            </div>
          </div>

          <div className="payment-summary">
            <div className="payment-row">
              <span>Total Billing</span>
              <strong>₹0</strong>
            </div>

            <div className="payment-row">
              <span>Amount Received</span>
              <strong>₹0</strong>
            </div>

            <div className="payment-row pending-row">
              <span>Pending Amount</span>
              <strong>₹0</strong>
            </div>
          </div>

          <button className="payment-button">
            View Payments
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
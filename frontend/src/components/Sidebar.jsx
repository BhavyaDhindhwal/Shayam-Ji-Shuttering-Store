import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: "▣" },
    { name: "Products & Stock", path: "/products", icon: "📦" },
    { name: "Customers", path: "/customers", icon: "👥" },
    { name: "Orders", path: "/orders", icon: "📋" },
    { name: "Payments", path: "/payments", icon: "💳" },
    { name: "Reports", path: "/reports", icon: "📊" },
    { name: "Enquiries", path: "/enquiries", icon: "✉" },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">SJ</div>

        <div>
          <h2>Shayam Ji</h2>
          <span>Shuttering Store</span>
        </div>
      </div>

      <nav className="sidebar-menu">

        <p className="menu-title">MAIN MENU</p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span>{item.icon}</span>
            {item.name}
          </NavLink>
        ))}

        <p className="menu-title bottom-title">
          SYSTEM
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <span>⚙</span>
          Settings
        </NavLink>

        <button
          className="menu-item logout"
          onClick={() => alert("Logout feature will be connected later.")}
        >
          <span>↪</span>
          Logout
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;
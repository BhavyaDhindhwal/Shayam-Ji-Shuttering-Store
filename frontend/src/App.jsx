import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Sidebar from "./components/Sidebar";
import Orders from "./pages/Orders";
import Payments from "./pages/Payments";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payments" element={<Payments />} />

            <Route
              path="/orders"
              element={<h1>Orders Page</h1>}
            />

            <Route
              path="/payments"
              element={<h1>Payments Page</h1>}
            />

            <Route
              path="/reports"
              element={<h1>Reports Page</h1>}
            />

            <Route
              path="/enquiries"
              element={<h1>Enquiries Page</h1>}
            />

            <Route
              path="/settings"
              element={<h1>Settings Page</h1>}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
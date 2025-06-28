// src/App.jsx
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import "./app.css";

// Các trang người dùng
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import News from "./pages/News";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";

// Các trang admin
import AdminProducts from "./pages/admin/AdminProduct";
import AdminOrders from "./pages/admin/AdminOrder";
import AdminCatalogs from "./pages/admin/AdminCatalog";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout dùng chung cho cả user + admin */}
        <Route element={<MainLayout />}>
          {/* Trang người dùng */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Trang admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/catalogs" element={<AdminCatalogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

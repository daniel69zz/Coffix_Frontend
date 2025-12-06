import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Login from "../pages/LoginPage";
import ProductosPage from "../pages/ProductosPage";
import { PedidosPage } from "../pages/PedidosPage";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<MainLayout />}>
        <Route path="ventas" element={<ProductosPage />} />
        <Route path="pedidos" element={<PedidosPage />} />
      </Route>
    </Routes>
  );
}

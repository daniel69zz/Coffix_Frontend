// routes/MyRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Login from "../pages/LoginPage";
import ProductosPage from "../pages/ProductosPage";
import { PedidosPage } from "../pages/PedidosPage";
import { PrivateRouter } from "./PrivateRouter";
import { GestionStockPage } from "../pages/GestionStockPage";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRouter />}>
        <Route path="/main" element={<MainLayout />}>
          <Route path="ventas" element={<ProductosPage />} />
          <Route path="pedidos" element={<PedidosPage />} />
          <Route path="restock" element={<GestionStockPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

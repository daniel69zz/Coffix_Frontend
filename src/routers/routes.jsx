import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Login from "../pages/Login";
import ProductosPage from "../pages/ProductosPage";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<MainLayout />}>
        <Route path="ventas" element={<ProductosPage />} />
      </Route>
    </Routes>
  );
}

export function firstAllowedPath(rol) {
  if (rol === "ADMIN") return "/main/ventas";
  if (rol === "COCINA") return "/main/pedidos";
  return "/main/ventas"; // CAJERO
}

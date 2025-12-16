const categorias = [
  { id: 0, categoria: "Todos" },
  { id: 1, categoria: "Bebidas Calientes" },
  { id: 2, categoria: "Bebidas Frías" },
  { id: 3, categoria: "Panadería" },
];

export function getCategorias() {
  return categorias;
}

const estado_pedidos = [
  { id: 0, nombre: "Todos" },
  { id: 1, nombre: "Pendientes" },
  { id: 2, nombre: "En preparacion" },
  { id: 3, nombre: "Listos" },
  { id: 4, nombre: "Entregados" },
];

export function getEstados() {
  return estado_pedidos;
}

// 0 = TODOS (no es de la bd)
// 1 = Pendiente
// 2 = En Preparacion
// 3 = Listo
// 4 = Entregado

export function filtrarPedidos(id_est) {
  if (id_est === 0) return pedidos;

  const filtrado = pedidos.filter((it) => it.id_estado === id_est);

  return filtrado;
}

// actual
export function formatearHora(fc_hora) {
  if (!fc_hora) return "";

  const partes = fc_hora.split("T");
  if (partes.length === 2) {
    return partes[1].substring(0, 5);
  }

  return fc_hora;
}

export function getNextEstado(estado) {
  switch (estado) {
    case "Pendiente":
      return "En preparacion";
    case "En preparacion":
      return "Listo";
    case "Listo":
      return "Entregado";
    case "Entregado":
    default:
      return null;
  }
}

export function getButtonLabel(estado) {
  switch (estado) {
    case "Pendiente":
      return "MARCAR EN PREPARACIÓN";
    case "En preparacion":
      return "MARCAR LISTO";
    case "Listo":
      return "MARCAR ENTREGADO";
    case "Entregado":
      return "PEDIDO ENTREGADO";
    default:
      return "ACTUALIZAR ESTADO";
  }
}

export function rol_sitios(rol) {
  if (rol === "ADMIN") return "/main/ventas";
  if (rol === "COCINA") return "/main/pedidos";
  return "/main/ventas"; // CAJERO
}

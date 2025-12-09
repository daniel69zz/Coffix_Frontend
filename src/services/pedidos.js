const API_PEDIDOS = "http://localhost:8080/api/pedidos";

export async function getPedidos() {
  const res = await fetch(API_PEDIDOS);

  if (!res.ok) throw new Error("Error al cargar pedidos");

  return res.json();
}

const estado_pedidos = [
  { id: 0, nombre: "Todos" },
  { id: 1, nombre: "Pendiente" },
  { id: 2, nombre: "En preparacion" },
  { id: 3, nombre: "Listo" },
  { id: 4, nombre: "Entregado" },
];

export function getEstados() {
  return estado_pedidos;
}

export async function filtrarPedidos(estado) {
  if (estado === "Todos") {
    return getPedidos();
  }

  const url = `${API_PEDIDOS}?estado=${estado}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error al cargar pedidos por estado");
  }

  return res.json();
}

export async function actualizarPedido(id_pedido, estado) {
  const url = `${API_PEDIDOS}/${id_pedido}/estado/${encodeURIComponent(
    estado
  )}`;

  const res = await fetch(url, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Error al actualizar pedido");
  }

  return res.json();
}

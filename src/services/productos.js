const API_PRODUCTOS = "http://localhost:8080/api/productos";

export async function getProductos() {
  const res = await fetch(API_PRODUCTOS);

  if (!res.ok) throw new Error("Error al cargar productos");

  return res.json();
}

const categorias = [
  { id: 0, categoria: "Todos" },
  { id: 1, categoria: "Bebidas Calientes" },
  { id: 2, categoria: "Bebidas Frías" },
  { id: 3, categoria: "Panadería" },
];

export function getCategorias() {
  return categorias;
}

export async function filtrarProductos(tipo) {
  if (tipo === 0) {
    return getProductos();
  }

  const url = `${API_PRODUCTOS}/tipo/${tipo}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Error al cargar productos por tipo");
  }

  return res.json();
}

export async function actualizar_stock_producto(id_producto, cantidad) {
  const url = `${API_PRODUCTOS}/${id_producto}/restock?cantidad=${cantidad}`;

  const res = await fetch(url, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Error al actualizar stock del producto");
  }
}

export function getProductos() {
  return data_prod;
}

export const data_prod = [
  {
    id: 1,
    nombre: "Arroz Blanco 1kg",
    precio: 3.5,
    imagen:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    categoria: "Abarrotes",
  },
  {
    id: 2,
    nombre: "Aceite Vegetal 1L",
    precio: 5.99,
    imagen:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    categoria: "Abarrotes",
  },
  {
    id: 3,
    nombre: "Pasta Spaguetti 500g",
    precio: 2.25,
    imagen:
      "https://imgs.search.brave.com/i8rlLE-CYofn1kADzy_-bnIXi1gWl1FggV3JJTjPQbs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzYwNDU0OC1NTFU3/ODYxNzcxNzQ1N18w/ODIwMjQtVi53ZWJw",
    categoria: "Abarrotes",
  },
  {
    id: 4,
    nombre: "Lentejas 500g",
    precio: 2.8,
    imagen:
      "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400",
    categoria: "Abarrotes",
  },
  {
    id: 5,
    nombre: "Harina de Trigo 1kg",
    precio: 2.99,
    imagen:
      "https://imgs.search.brave.com/xhv6qY5esUhroDQV8XSQ4K2OMKfaaTF0sRebxegZcqw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZ2Zt/LmVsY29ydGVpbmds/ZXMuZXMvU0dGTS9k/Y3RtL01FRElBMDMv/MjAyNDEwLzI4LzAw/MTE4MDM3OTAwMDE4/X19fXzdfXzYwMHg2/MDAuanBn",
    categoria: "Abarrotes",
  },

  // Categoría: Bebidas
  {
    id: 6,
    nombre: "Coca Cola 2L",
    precio: 4.5,
    imagen: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400",
    categoria: "Bebidas",
  },
  {
    id: 7,
    nombre: "Agua Mineral 1.5L",
    precio: 1.5,
    imagen: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400",
    categoria: "Bebidas",
  },
  {
    id: 8,
    nombre: "Jugo de Naranja 1L",
    precio: 3.75,
    imagen:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
    categoria: "Bebidas",
  },
  {
    id: 9,
    nombre: "Cerveza Pack 6 und",
    precio: 8.99,
    imagen:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400",
    categoria: "Bebidas",
  },
  {
    id: 10,
    nombre: "Té Helado Limón 1.5L",
    precio: 2.99,
    imagen: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
    categoria: "Bebidas",
  },

  // Categoría: Lácteos
  {
    id: 11,
    nombre: "Leche Entera 1L",
    precio: 2.8,
    imagen: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
    categoria: "Lacteos",
  },
  {
    id: 12,
    nombre: "Yogurt Natural 1L",
    precio: 3.5,
    imagen:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    categoria: "Lacteos",
  },
  {
    id: 13,
    nombre: "Queso Fresco 500g",
    precio: 6.75,
    imagen:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400",
    categoria: "Lacteos",
  },
  {
    id: 14,
    nombre: "Mantequilla 250g",
    precio: 4.25,
    imagen:
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400",
    categoria: "Lacteos",
  },
  {
    id: 15,
    nombre: "Crema de Leche 200ml",
    precio: 2.99,
    imagen:
      "https://imgs.search.brave.com/ofqQ0VQmmours-ecku1gAZsHinYHQ2yp0Cjep7y1cYk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdXBl/cm1lcmNhZG9zbmFj/aW9uYWwuY29tL21l/ZGlhL2NhdGFsb2cv/cHJvZHVjdC8yLzAv/MjAwMjIwMy0xLmpw/Zz9vcHRpbWl6ZT1t/ZWRpdW0mYmctY29s/b3I9MjU1LDI1NSwy/NTUmZml0PWJvdW5k/cyZoZWlnaHQ9MzAw/JndpZHRoPTI0MCZj/YW52YXM9MjQwOjMw/MA",
    categoria: "Lacteos",
  },

  // Categoría: Carnes y Embutidos
  {
    id: 16,
    nombre: "Pechuga de Pollo 1kg",
    precio: 8.5,
    imagen:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
    categoria: "Carnes y Embutidos",
  },
  {
    id: 17,
    nombre: "Carne Molida 500g",
    precio: 7.25,
    imagen:
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400",
    categoria: "Carnes y Embutidos",
  },
  {
    id: 18,
    nombre: "Jamón Ahumado 200g",
    precio: 5.5,
    imagen:
      "https://images.unsplash.com/photo-1595777216528-071e0127ccbf?w=400",
    categoria: "Carnes y Embutidos",
  },
  {
    id: 19,
    nombre: "Salchichas Pack 8 und",
    precio: 4.99,
    imagen:
      "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=400",
    categoria: "Carnes y Embutidos",
  },
  {
    id: 20,
    nombre: "Chorizo Parrillero 500g",
    precio: 6.75,
    imagen:
      "https://images.unsplash.com/photo-1613564834361-9436948817d1?w=400",
    categoria: "Carnes y Embutidos",
  },

  // Categoría: Frutas y Verduras
  {
    id: 21,
    nombre: "Manzanas Rojas 1kg",
    precio: 3.5,
    imagen:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
    categoria: "Frutas y Verduras",
  },
  {
    id: 22,
    nombre: "Plátanos 1kg",
    precio: 2.25,
    imagen:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
    categoria: "Frutas y Verduras",
  },
  {
    id: 23,
    nombre: "Tomates 1kg",
    precio: 2.8,
    imagen: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400",
    categoria: "Frutas y Verduras",
  },
  {
    id: 24,
    nombre: "Lechuga Fresca",
    precio: 1.5,
    imagen:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400",
    categoria: "Frutas y Verduras",
  },
  {
    id: 25,
    nombre: "Zanahorias 500g",
    precio: 1.99,
    imagen:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
    categoria: "Frutas y Verduras",
  },

  // Categoría: Limpieza e Higiene
  {
    id: 26,
    nombre: "Detergente Líquido 1L",
    precio: 4.5,
    imagen:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400",
    categoria: "Limpieza e Higiene",
  },
  {
    id: 27,
    nombre: "Papel Higiénico 12 Rollos",
    precio: 7.99,
    imagen:
      "https://images.unsplash.com/photo-1584556326561-c8746083993b?w=400",
    categoria: "Limpieza e Higiene",
  },
  {
    id: 28,
    nombre: "Jabón de Manos 250ml",
    precio: 2.75,
    imagen:
      "https://imgs.search.brave.com/TIy1aAc__LSS3kDb5JmX5OzatSVvCDRbUslicu11gHw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFjbjRTNTRVLUwu/anBn",
    categoria: "Limpieza e Higiene",
  },
  {
    id: 29,
    nombre: "Desinfectante 1L",
    precio: 5.25,
    imagen:
      "https://imgs.search.brave.com/wBUIUlOrpMW0jgrkZFcZg7NNbb3y5TP_wkwJ5xguVqM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hZGVvLmNvbS9t/ZWRpYS8yMzU4Mzkz/L21lZGlhLnBuZz93/aWR0aD02NTAmaGVp/Z2h0PTY1MCZmb3Jt/YXQ9anBnJnF1YWxp/dHk9ODAmZml0PWJv/dW5kcw",
    categoria: "Limpieza e Higiene",
  },
  {
    id: 30,
    nombre: "Lavavajillas 500ml",
    precio: 3.5,
    imagen:
      "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400",
    categoria: "Limpieza e Higiene",
  },

  // Categoría: Snacks y Dulces
  {
    id: 31,
    nombre: "Papas Fritas 150g",
    precio: 2.5,
    imagen:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400",
    categoria: "Snacks y Dulces",
  },
  {
    id: 32,
    nombre: "Chocolate con Leche 100g",
    precio: 2.99,
    imagen:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400",
    categoria: "Snacks y Dulces",
  },
  {
    id: 33,
    nombre: "Galletas de Chocolate 200g",
    precio: 3.25,
    imagen: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    categoria: "Snacks y Dulces",
  },
  {
    id: 34,
    nombre: "Gomitas de Frutas 150g",
    precio: 2.75,
    imagen:
      "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400",
    categoria: "Snacks y Dulces",
  },
  {
    id: 35,
    nombre: "Palomitas para Microondas",
    precio: 1.99,
    imagen:
      "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400",
    categoria: "Snacks y Dulces",
  },
];

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

const pedidos = [
  {
    id: 1,
    codigo: "COD-1242353",
    id_estado: 2,
    estado: "En Preparacion",
    items: [
      { nombre: "Cafe Americano", cantidad: 1, precio: 2.5 },
      { nombre: "Cafe Latte", cantidad: 1, precio: 1.5 },
    ],
    total: 4.0,
    hora: "4:37 p.m.",
  },
  {
    id: 2,
    codigo: "COD-1242354",
    id_estado: 1,
    estado: "Pendiente",
    items: [
      { nombre: "Capuccino", cantidad: 2, precio: 3.0 },
      { nombre: "Empanada de queso", cantidad: 1, precio: 2.0 },
    ],
    total: 8.0,
    hora: "4:40 p.m.",
  },
  {
    id: 3,
    codigo: "COD-1242355",
    id_estado: 3,
    estado: "Listos",
    items: [
      { nombre: "Mocaccino", cantidad: 1, precio: 3.5 },
      { nombre: "Tostadas", cantidad: 2, precio: 1.5 },
    ],
    total: 6.5,
    hora: "4:45 p.m.",
  },
  {
    id: 4,
    codigo: "COD-1242356",
    id_estado: 4,
    estado: "Entregados",
    items: [
      { nombre: "Cafe Americano", cantidad: 2, precio: 2.5 },
      { nombre: "Brownie", cantidad: 1, precio: 2.5 },
    ],
    total: 7.5,
    hora: "4:50 p.m.",
  },
  {
    id: 5,
    codigo: "COD-1242357",
    id_estado: 2,
    estado: "En Preparacion",
    items: [
      { nombre: "Chocolate Caliente", cantidad: 1, precio: 3.0 },
      { nombre: "Croissant", cantidad: 2, precio: 2.0 },
    ],
    total: 7.0,
    hora: "4:55 p.m.",
  },
];

export function getPedidos() {
  return pedidos;
}

export function filtrarPedidos(id_est) {
  if (id_est === 0) return pedidos;

  const filtrado = pedidos.filter((it) => it.id_estado === id_est);

  return filtrado;
}

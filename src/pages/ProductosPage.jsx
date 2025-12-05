import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import { getProductos, getCategorias } from "../data/data_plana";
import { useState } from "react";
import { useCart } from "../utils/CartContext";

export default function ProductosPage() {
  const [btnactive, setBtnactive] = useState(null);
  const { items, removeItem, totalPrice, clearCart, setQty } = useCart();

  const productos = getProductos();
  const categorias = getCategorias();

  const onQty = (id, value) => {
    const n = Number(value) || 1;
    setQty(id, n);
  };

  const toFixed2 = (value) => {
    if (!value) return 0;

    return parseFloat(value.toFixed(2));
  };
  return (
    <Container>
      <div className="FirstPart">
        <h2>PRODUCTOS</h2>
        <input type="text" placeholder="Buscar productos..." />
        <div className="ContainerButtons">
          {categorias.map((categ) => (
            <Button
              key={categ.id}
              id={categ.id}
              onClick={() => setBtnactive(categ.id)}
              $activo={btnactive === categ.id}
            >
              {categ.categoria}
            </Button>
          ))}
        </div>
        <Grid>
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </Grid>
      </div>

      {/* Parte Pedido */}
      <div className="SecondPart">
        <h2>PEDIDO ACTUAL</h2>
        <h4>Nombre del Cliente (opcional)</h4>
        <input type="text" placeholder="Ingrese nombre..." />

        <div className="cart-list">
          {items.map((producto_p) => (
            <div key={producto_p.id} className="cart-item">
              <div className="cart-left">
                <img
                  className="cart-image"
                  src={producto_p.imagen}
                  alt="pedido"
                />
                <div>
                  <h5 className="cart-title">{producto_p.nombre}</h5>
                  <p className="cart-price">Bs. {producto_p.precio}</p>
                </div>
              </div>

              <div className="cart-right">
                <label className="qty-label">Cantidad</label>
                <input
                  type="number"
                  className="qty-input"
                  min={1}
                  value={producto_p.cantidad}
                  onChange={(e) => onQty(producto_p.id, e.target.value)}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeItem(producto_p.id)}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="subtotal-card">
          <p className="subtotal-label">Subtotal</p>
          <p className="subtotal-value">{toFixed2(totalPrice)}</p>
        </div>

        <div className="actions-row">
          <button className="btn-secondary" onClick={clearCart}>
            Vaciar carrito
          </button>
          <button className="btn-primary">Procesar Pago</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  input {
    margin: 15px 0;
    border-radius: 5px;
    padding: 2px 3px;
    width: 100%;
    border-width: 2px;
    border-color: black;
  }

  .FirstPart {
    border-radius: 10px;
    margin: 20px;
    margin-right: 5px;
    background-color: white;
    padding: 20px;
    width: 100%;

    .ContainerButtons {
      display: flex;
      gap: 20px;
    }
  }

  .SecondPart {
    border-radius: 10px;
    margin: 20px;
    margin-left: 4px;
    background-color: white;
    padding: 20px;
    width: 30%;

    /* Para que no crezca infinito y se organice en columna */
    display: flex;
    flex-direction: column;
    max-height: 93vh; /* ajusta según te guste */
    h4 {
      margin-top: 10px;
    }

    .cart-list {
      margin-top: 12px;
      flex: 1; /* ocupa el espacio disponible */
      overflow-y: auto; /* scroll vertical solo aquí */
      padding-right: 8px; /* deja espacio para la barra de scroll */
    }

    .cart-item {
      align-items: center;
      justify-content: space-between;
      padding: 16px; /* p-4 */
      border-radius: 12px; /* rounded-xl */
      background-color: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-top: 12px;
    }

    /* flex items-center gap-4 */
    .cart-left {
      display: flex;
      align-items: center;
      gap: 16px; /* gap-4 */
    }

    /* w-16 h-16 object-cover rounded-lg */
    .cart-image {
      width: 64px; /* w-16 */
      height: 64px; /* h-16 */
      object-fit: cover;
      border-radius: 8px; /* rounded-lg */
    }

    /* font-semibold text-black */
    .cart-title {
      margin: 0;
      font-weight: 600;
      color: #000000;
    }

    /* text-sm text-gray-600 */
    .cart-price {
      margin: 4px 0 0;
      font-size: 14px; /* text-sm */
      color: #4b5563; /* text-gray-600 */
    }

    /* flex items-center gap-3 */
    .cart-right {
      display: flex;
      align-items: center;
      gap: 12px; /* gap-3 */
    }

    /* text-sm text-black */
    .qty-label {
      font-size: 14px;
      color: #000000;
    }

    /* w-16 rounded-lg border px-2 py-1 text-gray-700 */
    .qty-input {
      width: 64px;
      padding: 4px 8px; /* py-1 px-2 */
      border-radius: 8px; /* rounded-lg */
      border: 1px solid #d1d5db;
      color: #374151; /* text-gray-700 */
      font-size: 14px;
      outline: none;
      margin: 0; /* para que no herede el margin global del input */

      &:focus {
        border-color: #111827;
      }
    }

    /* px-3 py-1 rounded-lg bg-red-600 text-white */
    .remove-btn {
      padding: 4px 12px; /* py-1 px-3 */
      border-radius: 8px; /* rounded-lg */
      border: none;
      background-color: #dc2626; /* bg-red-600 */
      color: #ffffff;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: #b91c1c;
      }
    }
  }
`;

const Button = styled.div`
  padding: 5px;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  font-size: 16px;
  cursor: pointer;

  background-color: ${({ $activo }) => ($activo ? "black" : "white")};
  color: ${({ $activo }) => ($activo ? "white" : "black")};
`;

const Grid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;

  max-height: 66vh;
  overflow-y: auto;
  padding-right: 8px;
`;

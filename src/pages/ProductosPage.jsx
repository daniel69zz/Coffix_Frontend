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
              <div className="cart-up">
                <img
                  className="cart-image"
                  src={producto_p.imagen}
                  alt="pedido"
                />
                <div className="cart-target">
                  <h3 className="cart-title">{producto_p.nombre}</h3>
                  <span className="cart-price">Bs. {producto_p.precio}</span>
                </div>
              </div>

              <div className="cart-down">
                <label className="cant-label">Cantidad</label>
                <input
                  type="number"
                  className="cant-input"
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

        <div className="Pago">
          <div className="SubtotalTotal">
            <p className="subtotal-label">Subtotal:</p>
            <p className="subtotal-value">{toFixed2(totalPrice)}</p>
          </div>

          <div className="SubtotalTotal">
            <p className="total-label">Total:</p>
            <p className="total-value">{toFixed2(totalPrice)}</p>
          </div>
        </div>

        <div className="BtnPago">
          <button>Procesar Pago</button>

          <button className="clear" onClick={clearCart}>
            Vaciar carrito
          </button>
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

    flex: 0 0 70%;
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

    flex: 0 0 27%;

    display: flex;
    flex-direction: column;
    max-height: 93vh;
    h4 {
      margin-top: 10px;
    }

    .cart-list {
      margin-top: 12px;
      flex: 1;
      overflow-y: auto;
      padding-right: 8px;
      .cart-item {
        width: 100%;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        padding: 4px;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        margin-top: 12px;

        .cart-up {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 8px;

          .cart-image {
            width: 64px;
            height: 64px;
            object-fit: cover;
            border-radius: 8px; /* rounded-lg */
          }

          .cart-target {
            .cart-title {
              margin: 3px 0;
              font-weight: 600;
              color: #000000;
            }
            .cart-price {
              font-weight: bold;
              margin: 4px 0 0;
              font-size: 18px;
              color: #4b5563;
            }
          }
        }

        .cart-down {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 17px;

          font-weight: bold;

          .cant-label {
            color: #000000;
          }

          .cant-input {
            font-size: 17px;
            width: 64px;
            padding: 4px 8px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            color: #374151;
            outline: none;
            margin: 0;

            &:focus {
              border-color: #111827;
            }
          }

          .remove-btn {
            margin-left: auto;
            padding: 4px 12px;
            border-radius: 8px;
            border: none;
            background-color: #dc2626;
            color: #ffffff;
            font-size: 18px;
            cursor: pointer;

            &:hover {
              background-color: #b91c1c;
            }
          }
        }
      }
    }

    .Pago {
      margin: 10px 0;
      font-size: 23px;

      .SubtotalTotal {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: bold;
        margin: 1rem 0;
      }

      .subtotal-value {
        margin-left: auto;
      }

      .total-value {
        margin-left: auto;
      }
    }

    .BtnPago {
      gap: 20px;
      justify-content: center;
      padding: 10px;
      display: flex;

      button {
        border-style: solid;
        font-size: 20px;
        margin-top: 5px;
        padding: 10px;
        background-color: #f7c22e;
        color: black;
        font-weight: 600;
        border-radius: 12px;
        transition: 0.2s;
        cursor: pointer;

        &:hover {
          background-color: #007a52;
        }
      }

      .clear {
        &:hover {
          background-color: red;
        }
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

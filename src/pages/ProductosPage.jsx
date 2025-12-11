import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import { getCategorias } from "../utils/data_plana";
import { useState, useEffect } from "react";
import { useCart } from "../utils/CartContext";
import { filtrarProductos } from "../services/productos";
import PagoPage from "./PagoPage";

export default function ProductosPage() {
  // 0 = "Todos"
  const [btnactive, setBtnactive] = useState(0);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const [mostrandoPago, setMostrandoPago] = useState(false);
  const [nombreCliente, setNombreCliente] = useState("");

  const categorias = getCategorias();
  const { items, removeItem, totalPrice, clearCart, setQty } = useCart();

  const recargarProductos = () => {
    setLoading(true);
    setError(null);

    filtrarProductos(btnactive)
      .then((data) => {
        setProductosFiltrados(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    recargarProductos();
  }, [btnactive]);

  const filtrar = (idCategoria) => {
    setBtnactive(idCategoria);
  };

  const onQty = (id, value) => {
    const n = Number(value) || 1;
    setQty(id, n);
  };

  const toFixed2 = (value) => {
    if (!value) return 0;
    return parseFloat(value.toFixed(2));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const productosMostrados = productosFiltrados.filter((p) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(term) ||
      (p.nombre_tipo && p.nombre_tipo.toLowerCase().includes(term))
    );
  });

  if (error) {
    return (
      <Container>
        <div className="FirstPart">
          <p>Ocurrió un error: {error}</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="FirstPart">
          <h2>PRODUCTOS</h2>

          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={handleSearchChange}
          />

          <div className="ContainerButtons">
            {categorias.map((categ) => (
              <Button
                key={categ.id}
                id={categ.id}
                onClick={() => filtrar(categ.id)}
                $activo={btnactive === categ.id}
              >
                {categ.categoria}
              </Button>
            ))}
          </div>

          {loading && <p>Cargando productos...</p>}

          <Grid>
            {productosMostrados.map((producto) => (
              <ProductCard key={producto.id_producto} producto={producto} />
            ))}
          </Grid>
        </div>

        <div className="SecondPart">
          <h2>PEDIDO ACTUAL</h2>
          <h4>Nombre del Cliente (opcional)</h4>
          <input
            type="text"
            placeholder="Ingrese nombre..."
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
          />

          <div className="cart-list">
            {items.map((producto_p) => (
              <div key={producto_p.id_producto} className="cart-item">
                <div className="cart-up">
                  <img
                    className="cart-image"
                    src={`/${producto_p.path_img}`}
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
                    onChange={(e) =>
                      onQty(producto_p.id_producto, e.target.value)
                    }
                  />
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(producto_p.id_producto)}
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
            <button onClick={() => setMostrandoPago(true)}>
              Procesar Pago
            </button>

            <button className="clear" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        </div>
      </Container>

      {mostrandoPago && (
        <Overlay>
          <div className="EspacioModal">
            <PagoPage
              total={toFixed2(totalPrice)}
              items={items}
              nombreCliente={nombreCliente}
              onCancelar={() => setMostrandoPago(false)}
              onRegistrarPago={() => {
                clearCart();
              }}
            />
          </div>
        </Overlay>
      )}
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  .EspacioModal {
    background-color: #fffbea;
    padding: 30px;
    border-radius: 16px;
    width: 720px;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
  }
`;
const Container = styled.div`
  display: flex;

  input {
    margin: 15px 0;
    border-radius: 6px;
    padding: 6px 8px;
    width: 100%;
    border: 2px solid #000;
    font-size: 15px;
  }

  .FirstPart {
    border-radius: 14px;
    margin: 20px;
    margin-right: 8px;
    background-color: white;
    padding: 24px;
    flex: 0 0 70%;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);

    .ContainerButtons {
      margin: 18px 0;
      display: flex;
      gap: 20px;
    }
  }

  .SecondPart {
    border-radius: 14px;
    margin: 20px;
    margin-left: 8px;
    background-color: white;
    padding: 24px;
    flex: 0 0 27%;
    display: flex;
    flex-direction: column;
    max-height: 93vh;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);

    h4 {
      margin-top: 10px;
      font-size: 18px;
      font-weight: 700;
    }

    /* CART LIST */
    .cart-list {
      margin-top: 14px;
      flex: 1;
      overflow-y: auto;
      padding-right: 8px;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background: #c4c4c4;
        border-radius: 6px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #999;
      }

      .cart-item {
        width: 100%;
        padding: 10px;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        margin-top: 12px;

        .cart-up {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 10px;

          .cart-image {
            width: 64px;
            height: 64px;
            border-radius: 8px;
            object-fit: cover;
          }

          .cart-target {
            .cart-title {
              margin: 2px 0;
              font-weight: 700;
            }
            .cart-price {
              font-weight: bold;
              margin-top: 4px;
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

          .cant-input {
            font-size: 16px;
            width: 64px;
            padding: 4px 8px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
          }

          .remove-btn {
            margin-left: auto;
            padding: 6px 14px;
            border-radius: 8px;
            background-color: #dc2626;
            color: white;
            border: none;
            cursor: pointer;
            transition: 0.2s ease;

            &:hover {
              background-color: #b91c1c;
            }
          }
        }
      }
    }

    /* PAGO */
    .Pago {
      margin: 10px 0;
      font-size: 22px;

      .SubtotalTotal {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: bold;
        margin: 1rem 0;
      }

      .subtotal-value,
      .total-value {
        margin-left: auto;
      }
    }

    /* Botones de pago */
    .BtnPago {
      display: flex;
      gap: 20px;
      justify-content: center;
      padding: 10px;

      button {
        font-size: 20px;
        padding: 10px 16px;
        background-color: #f7c22e;
        color: black;
        font-weight: 700;
        border-radius: 12px;
        border: 1px solid #b48b12;
        cursor: pointer;
        transition: 0.2s ease;

        &:hover {
          background-color: #ddb020;
        }
      }

      .clear {
        background: #ff3b3b;
        border-color: #a80000;
        color: white;

        &:hover {
          background-color: #cc0000;
        }
      }
    }
  }
`;

const Button = styled.div`
  padding: 8px 14px;
  border-radius: 8px;
  border: 2px solid ${({ $activo }) => ($activo ? "black" : "#333")};
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.25s ease;

  background-color: ${({ $activo }) => ($activo ? "black" : "white")};
  color: ${({ $activo }) => ($activo ? "white" : "black")};

  &:hover {
    background-color: ${({ $activo }) => ($activo ? "#2c2c2c" : "#f2f2f2")};
  }
`;

const Grid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 20px;
  width: 100%;

  max-height: 66vh;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

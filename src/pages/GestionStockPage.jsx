import styled from "styled-components";
import { useEffect, useState } from "react";
import { getCategorias, filtrarProductos } from "../services/productos";
import { Message } from "../utils/Message";
import RestockModal from "../utils/RestockModal";

export function GestionStockPage() {
  //0 = "Todos"
  const [btnactive, setBtnactive] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [productoRestock, setProductoRestock] = useState(null);

  const [showMessage, setShowMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const categorias = getCategorias();

  const cargarProductos = () => {
    setLoading(true);
    setError(null);

    filtrarProductos(btnactive)
      .then((data) => {
        setProductos(data);
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
    cargarProductos();
  }, [btnactive]);

  // modal de restock
  const onRestock = (prod) => {
    setProductoRestock(prod);
  };

  //  modal message
  const handleRestockActualizado = () => {
    setProductoRestock(null);
    cargarProductos();
    setMensaje("Stock actualizado correctamente");
    setShowMessage(true);
  };

  const productosFiltrados = productos.filter((prod) => {
    if (!busqueda.trim()) return true;

    const term = busqueda.toLowerCase();
    return (
      prod.nombre.toLowerCase().includes(term) ||
      (prod.nombre_tipo && prod.nombre_tipo.toLowerCase().includes(term))
    );
  });

  const categoriaActualObj = categorias.find((c) => c.id === btnactive);
  const tituloTabla =
    categoriaActualObj && categoriaActualObj.id !== 0
      ? categoriaActualObj.categoria
      : "Todos los productos";

  return (
    <Container>
      <div className="Stock">
        <h2>GESTION DE STOCK</h2>

        {productoRestock && (
          <RestockModal
            producto={productoRestock}
            onCancelar={() => setProductoRestock(null)}
            onActualizado={handleRestockActualizado}
          />
        )}

        {showMessage && (
          <Message mensaje={mensaje} onCancelar={() => setShowMessage(false)} />
        )}

        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

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

        <TablaBox>
          <h3>{tituloTabla}</h3>

          <div className="TabHeader">
            <span>Nombre</span>
            <span>Categoria</span>
            <span>Precio</span>
            <span>Stock</span>
            <span>Estado</span>
            <span>Acción</span>
          </div>

          {loading && <p>Cargando productos...</p>}
          {error && <p>Error: {error}</p>}

          <div className="TabBody">
            {productosFiltrados.map((prod) => {
              const disponible = prod.stock > 0;
              const stockBajo = prod.stock <= 10;

              const precioFormateado =
                typeof prod.precio === "number"
                  ? prod.precio.toFixed(2)
                  : prod.precio;

              return (
                <TabRow key={prod.id_producto}>
                  <span>{prod.nombre}</span>
                  <span>{prod.nombre_tipo}</span>
                  <span>Bs. {precioFormateado}</span>

                  <input
                    type="number"
                    readOnly
                    value={prod.stock}
                    $peligro={stockBajo}
                  />

                  <Span $disponible={disponible}>
                    {disponible ? "Disponible" : "No Disponible"}
                  </Span>

                  <div className="Actions">
                    <button type="button" onClick={() => onRestock(prod)}>
                      <span>📦</span>
                      <span>Restock</span>
                    </button>
                  </div>
                </TabRow>
              );
            })}
          </div>
        </TablaBox>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-right: 10px;

  height: 100vh;

  input {
    margin: 15px 0;
    border-radius: 6px;
    padding: 6px 10px;
    width: 100%;
    border: 1.8px solid #444;
    font-size: 15px;
  }

  .Stock {
    border-radius: 12px;
    margin: 20px;
    margin-right: 5px;
    background-color: #ffffff;
    padding: 20px;
    width: 100%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

    display: flex;
    flex-direction: column;
    min-height: 0;

    .ContainerButtons {
      margin: 18px 0;
      display: flex;
      gap: 14px;
    }
  }

  h2 {
    font-size: 22px;
    margin-bottom: 14px;
    font-weight: 700;
  }
`;

const TablaBox = styled.div`
  margin-top: 10px;
  border-radius: 12px;
  border: 1px solid #d2d2d2;
  padding: 22px 24px;
  background: #fafafa;

  max-height: calc(100vh - 220px);
  display: flex;
  flex-direction: column;
  min-height: 0;

  h3 {
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 700;
  }

  .TabHeader {
    font-size: 17px;
    display: grid;
    grid-template-columns: 2.2fr 1.7fr 1fr 0.8fr 1.2fr 1.4fr;
    padding: 10px 4px;
    border-bottom: 2px solid #444;
    font-weight: 700;
  }

  .TabBody {
    font-size: 17px;
    max-height: 350px;
    overflow-y: auto;
    padding-right: 6px;
  }
`;

const TabRow = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1.7fr 1fr 0.8fr 1.2fr 1.4fr;
  align-items: center;
  padding: 10px 4px;
  border-bottom: 1px solid #e1e1e1;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  input {
    width: 60px;
    text-align: center;
    border-radius: 5px;
    border: 2.5px solid #333;
    background-color: ${({ $peligro }) => ($peligro ? "#ffb3b3" : "white")};
    padding: 4px 6px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s ease;

    &:focus {
      border-color: #222;
      background-color: ${({ $peligro }) => ($peligro ? "#ff9e9e" : "#f7f7f7")};
      outline: none;
    }
  }

  .Actions {
    display: flex;
    justify-content: flex-start;

    button {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 16px;
      border-radius: 8px;
      border: 1.5px solid #333;
      background-color: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;

      &:hover {
        background-color: #ffe07c;
      }
    }
  }
`;

const Span = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid #333;
  background-color: ${({ $disponible }) => ($disponible ? "#222" : "#e8e8e8")};
  color: ${({ $disponible }) => ($disponible ? "white" : "#222")};
`;

const Button = styled.div`
  padding: 6px 14px;
  border-radius: 6px;
  border: 1.5px solid black;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  background-color: ${({ $activo }) => ($activo ? "black" : "white")};
  color: ${({ $activo }) => ($activo ? "white" : "black")};

  &:hover {
    background-color: ${({ $activo }) => ($activo ? "#222" : "#f5f5f5")};
  }
`;

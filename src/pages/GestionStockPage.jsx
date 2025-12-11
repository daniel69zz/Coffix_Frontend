import styled from "styled-components";
import { useEffect, useState } from "react";
import { getCategorias, filtrarProductos } from "../services/productos";
import { Message } from "../utils/Message";
import RestockModal from "../utils/RestockModal"; // 👈 default import

export function GestionStockPage() {
  // igual que ProductosPage: 0 = "Todos"
  const [btnactive, setBtnactive] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // producto seleccionado para restock
  const [productoRestock, setProductoRestock] = useState(null);

  // mensaje de éxito estilo modal
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

  // abrir el modal de restock para el producto seleccionado
  const onRestock = (prod) => {
    setProductoRestock(prod);
  };

  // lo que pasa cuando el modal termina de actualizar bien
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

        {/* 🧊 Modal para actualizar stock */}
        {productoRestock && (
          <RestockModal
            producto={productoRestock}
            onCancelar={() => setProductoRestock(null)}
            onActualizado={handleRestockActualizado}
          />
        )}

        {/* ✅ Mensaje de éxito */}
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

          <TablaHeader>
            <span>Nombre</span>
            <span>Categoria</span>
            <span>Precio</span>
            <span>Stock</span>
            <span>Estado</span>
            <span>Acción</span>
          </TablaHeader>

          {loading && <p>Cargando productos...</p>}
          {error && <p>Error: {error}</p>}

          <TablaBody>
            {productosFiltrados.map((prod) => {
              const disponible = prod.stock > 0;
              const stockBajo = prod.stock <= 10;

              const precioFormateado =
                typeof prod.precio === "number"
                  ? prod.precio.toFixed(2)
                  : prod.precio;

              return (
                <TablaRow key={prod.id_producto}>
                  <span>{prod.nombre}</span>
                  <span>{prod.nombre_tipo}</span>
                  <span>Bs. {precioFormateado}</span>

                  <StockInput
                    type="number"
                    readOnly
                    value={prod.stock}
                    $peligro={stockBajo}
                  />

                  <EstadoPill $disponible={disponible}>
                    {disponible ? "Disponible" : "No Disponible"}
                  </EstadoPill>

                  <AccionCell>
                    <RestockButton
                      type="button"
                      onClick={() => onRestock(prod)}
                    >
                      <span>📦</span>
                      <span>Restock</span>
                    </RestockButton>
                  </AccionCell>
                </TablaRow>
              );
            })}
          </TablaBody>
        </TablaBox>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-right: 10px;

  input {
    margin: 15px 0;
    border-radius: 5px;
    padding: 2px 3px;
    width: 100%;
    border-width: 2px;
    border-color: black;
  }

  .Stock {
    border-radius: 10px;
    margin: 20px;
    margin-right: 5px;
    background-color: white;
    padding: 20px;
    width: 100%;

    .ContainerButtons {
      margin: 18px 0;
      display: flex;
      gap: 20px;
    }
  }

  h2 {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const TablaBox = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid black;
  padding: 18px 20px;

  h3 {
    margin-bottom: 16px;
  }
`;

const TablaHeader = styled.div`
  font-size: 18px;
  display: grid;
  grid-template-columns: 2.2fr 1.7fr 1fr 0.8fr 1.2fr 1.4fr;
  padding: 8px 0;
  border-bottom: 1px solid black;
  font-weight: bold;
`;

const TablaBody = styled.div`
  font-size: 18px;
  max-height: 320px;
  overflow-y: auto;
`;

const TablaRow = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1.7fr 1fr 0.8fr 1.2fr 1.4fr;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const StockInput = styled.input`
  width: 48px;
  text-align: center;
  border-radius: 4px;
  border: 4px solid black;
  background-color: ${({ $peligro }) => ($peligro ? "red" : "transparent")};
  padding: 2px;
`;

const EstadoPill = styled.span`
  font-size: 15px;
  margin-right: 15px;
  display: inline-flex;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid black;
  font-weight: bold;
  background-color: ${({ $disponible }) => ($disponible ? "#555" : "#e4e4e4")};
  color: ${({ $disponible }) => ($disponible ? "white" : "black")};
`;

const AccionCell = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const RestockButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
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

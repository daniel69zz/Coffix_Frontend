import styled from "styled-components";
import { useEffect, useState } from "react";
// AJUSTA ESTOS IMPORTS A TU PROYECTO
// import { getCategorias, filtrarProductos } from "../services/productos";
import { getCategorias } from "../services/productos";

export function GestionStockPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categorias = getCategorias ? getCategorias() : [];

  const cargarProductos = () => {};

  useEffect(() => {
    cargarProductos();
  }, [categoriaActiva]);

  const onBuscar = (e) => {
    e.preventDefault();
    cargarProductos();
  };

  const onRestock = (prod) => {
    // acá luego puedes abrir modal / navegar / llamar a servicio de restock
    console.log("Restock producto:", prod);
  };

  return (
    <Container>
      <div className="Stock">
        <h2>GESTION DE STOCK</h2>

        {/* PANEL DE FILTROS */}
        <FiltrosBox>
          <h3>Filtros de Categoria</h3>

          <div className="linea">
            <span>Categoria:</span>
            <div className="botones">
              <FilterButton
                type="button"
                onClick={() => setCategoriaActiva("Todos")}
                $activo={categoriaActiva === "Todos"}
              >
                Todos
              </FilterButton>

              {categorias.map((cat) => (
                <FilterButton
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoriaActiva(cat.nombre)}
                  $activo={categoriaActiva === cat.nombre}
                >
                  {cat.nombre}
                </FilterButton>
              ))}
            </div>

            <form onSubmit={onBuscar} className="buscar">
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <SearchButton type="submit">Buscar</SearchButton>
            </form>
          </div>
        </FiltrosBox>

        {/* TABLA DE PRODUCTOS */}
        <TablaBox>
          <h3>Bebidas calientes</h3>

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
            {productos.map((prod) => {
              const disponible = prod.stock_actual > 0;
              const stockBajo = prod.stock_actual <= 1;

              return (
                <TablaRow key={prod.id_producto}>
                  <span>{prod.nombre}</span>
                  <span>{prod.categoria}</span>
                  <span>${prod.precio.toFixed(1)}</span>

                  <StockInput
                    type="number"
                    readOnly
                    value={prod.stock_actual}
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

/* STYLES */

const Container = styled.div`
  display: flex;
  margin-right: 10px;

  .Stock {
    border-radius: 10px;
    margin: 20px;
    margin-right: 5px;
    background-color: white;
    padding: 20px;
    width: 100%;
  }

  h2 {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const FiltrosBox = styled.div`
  border-radius: 10px;
  border: 1px solid black;
  padding: 18px 20px;
  margin: 16px 0;

  h3 {
    margin-bottom: 12px;
  }

  .linea {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .botones {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .buscar {
    display: flex;
    gap: 10px;
    align-items: center;

    input {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid black;
      min-width: 180px;
    }
  }

  span {
    font-weight: 500;
  }
`;

const FilterButton = styled.button`
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid black;
  background-color: ${({ $activo }) => ($activo ? "#555" : "#e4e4e4")};
  color: ${({ $activo }) => ($activo ? "white" : "black")};
  cursor: pointer;
  font-size: 14px;
`;

const SearchButton = styled.button`
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
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
  display: grid;
  grid-template-columns: 2.2fr 1.7fr 1fr 0.8fr 1.2fr 1.4fr;
  padding: 8px 0;
  border-bottom: 1px solid black;
  font-weight: 600;
`;

const TablaBody = styled.div`
  max-height: 55vh;
  overflow-y: auto;
`;

const TablaRow = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1.7fr 1fr 0.8fr 1.2fr 1.4fr;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

const StockInput = styled.input`
  width: 48px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid ${({ $peligro }) => ($peligro ? "red" : "black")};
  background-color: ${({ $peligro }) => ($peligro ? "#ffecec" : "transparent")};
  padding: 2px;
`;

const EstadoPill = styled.span`
  display: inline-flex;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid black;
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

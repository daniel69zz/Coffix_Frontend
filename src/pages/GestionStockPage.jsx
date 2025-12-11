import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  getCategorias,
  filtrarProductos,
  actualizar_stock_producto,
} from "../services/productos";

export function GestionStockPage() {
  const [categoriaActiva, setCategoriaActiva] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categorias = getCategorias ? getCategorias() : [];

  const cargarProductos = () => {
    setLoading(true);
    setError(null);

    filtrarProductos(categoriaActiva)
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
  }, [categoriaActiva]);

  const onBuscar = (e) => {
    e.preventDefault();
  };

  const onRestock = async (prod) => {
    try {
      const input = window.prompt(
        `Cantidad a restockear para "${prod.nombre}":`,
        "5"
      );

      if (input === null) return;

      const cantidad = Number(input);

      if (!Number.isFinite(cantidad) || cantidad <= 0) {
        alert("Cantidad inválida. Debe ser un número mayor a 0.");
        return;
      }

      await actualizar_stock_producto(prod.id_producto, cantidad);

      cargarProductos();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al hacer restock del producto");
    }
  };

  const productosFiltrados = productos.filter((prod) => {
    if (!busqueda.trim()) return true;

    const term = busqueda.toLowerCase();
    return (
      prod.nombre.toLowerCase().includes(term) ||
      (prod.nombre_tipo && prod.nombre_tipo.toLowerCase().includes(term))
    );
  });

  const categoriaActualObj = categorias.find((c) => c.id === categoriaActiva);
  const tituloTabla =
    categoriaActualObj && categoriaActualObj.id !== 0
      ? categoriaActualObj.categoria
      : "Todos los productos";

  return (
    <Container>
      <div className="Stock">
        <h2>GESTION DE STOCK</h2>

        <FiltrosBox>
          <h3>Filtros de Categoria</h3>

          <div className="linea">
            <span>Categoria:</span>
            <div className="botones">
              {categorias.map((cat) => (
                <FilterButton
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoriaActiva(cat.id)}
                  $activo={categoriaActiva === cat.id}
                >
                  {cat.categoria}
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
  font-size: 18px;
  display: grid;
  grid-template-columns: 2.2fr 1.7fr 1fr 0.8fr 1.2fr 1.4fr;
  padding: 8px 0;
  border-bottom: 1px solid black;
  font-weight: bold;
`;

const TablaBody = styled.div`
  font-size: 18px;
  max-height: 55vh;
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

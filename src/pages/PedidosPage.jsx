import styled from "styled-components";
import {
  getEstados,
  filtrarPedidos,
  buscarPedidosPorCodigo,
} from "../services/pedidos";
import { useEffect, useState } from "react";
import PedidoCard from "../components/PedidoCard";
import { Message } from "../utils/Message";

export function PedidosPage() {
  const [btnactive, setBtnactive] = useState("Todos");
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchCodigo, setSearchCodigo] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const estados_pedidos = getEstados();

  const recargarPedidos = () => {
    setLoading(true);
    setError(null);

    filtrarPedidos(btnactive)
      .then((data) => {
        setPedidosFiltrados(data);
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
    recargarPedidos();
  }, [btnactive]);

  const filtrar = (nombre) => {
    setBtnactive(nombre);
  };

  const handleEstadoActualizado = (msg) => {
    recargarPedidos();
    setMensaje(msg || "Estado del pedido actualizado correctamente");
    setShowMessage(true);
  };

  const handleBuscarPorCodigo = async () => {
    const valor = searchCodigo.trim();

    if (!valor) {
      recargarPedidos();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await buscarPedidosPorCodigo(valor);
      setPedidosFiltrados(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al buscar pedidos por código");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="Pedidos">
        <h2>GESTION DE PEDIDOS</h2>

        <div className="SearchContainer">
          <input
            className="SearchInput"
            type="text"
            placeholder="Buscar pedido por código..."
            value={searchCodigo}
            onChange={(e) => setSearchCodigo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleBuscarPorCodigo();
              }
            }}
          />
        </div>

        {showMessage && (
          <Message mensaje={mensaje} onCancelar={() => setShowMessage(false)} />
        )}

        <div className="ContainerButtons">
          {estados_pedidos.map((estado) => (
            <Button
              key={estado.id}
              id={estado.id}
              onClick={() => filtrar(estado.nombre)}
              $activo={btnactive === estado.nombre}
            >
              {estado.nombre}
            </Button>
          ))}
        </div>

        {loading && <p>Cargando pedidos...</p>}
        {error && <p>Error: {error}</p>}

        <div className="PedidosC">
          {pedidosFiltrados.map((ped) => (
            <PedidoCard
              key={ped.id_pedido}
              ped={ped}
              onEstadoActualizado={handleEstadoActualizado}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-right: 10px;

  .Pedidos {
    margin: 20px 10px 20px 20px;
    background: white;
    padding: 24px;
    border-radius: 14px;
    width: 100%;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;

    .SearchContainer {
      margin: 10px 0 16px 0;
    }

    .SearchInput {
      width: 100%;
      max-width: 360px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 14px;
      outline: none;
    }

    .SearchInput:focus {
      border-color: #000;
    }

    .ContainerButtons {
      margin: 18px 0;
      display: flex;
      gap: 16px;
    }

    .PedidosC {
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

      &::-webkit-scrollbar-track {
        background: #f2f2f2;
        border-radius: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: #c4c4c4;
        border-radius: 6px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #a6a6a6;
      }
    }
  }
`;
const Button = styled.div`
  padding: 8px 14px;
  border-radius: 8px;
  border: 2px solid ${({ $activo }) => ($activo ? "black" : "#444")};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
  user-select: none;

  background-color: ${({ $activo }) => ($activo ? "black" : "white")};
  color: ${({ $activo }) => ($activo ? "white" : "black")};

  &:hover {
    background-color: ${({ $activo }) => ($activo ? "#2a2a2a" : "#f2f2f2")};
  }
`;

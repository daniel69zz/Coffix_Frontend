import styled from "styled-components";
import { getEstados, filtrarPedidos } from "../services/pedidos";
import { useEffect, useState } from "react";
import PedidoCard from "../components/PedidoCard";
import { Message } from "../utils/Message";

export function PedidosPage() {
  const [btnactive, setBtnactive] = useState("Todos");
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Container>
      <div className="Pedidos">
        <h2>GESTION DE PEDIDOS</h2>

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

    .PedidosC {
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      width: 100%;

      max-height: 66vh;
      overflow-y: auto;
      padding-right: 8px;
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

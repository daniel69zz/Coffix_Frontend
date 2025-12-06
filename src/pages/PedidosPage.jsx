import styled from "styled-components";
import { getEstados, filtrarPedidos } from "../data/data_plana";
import { useState } from "react";
import PedidoCard from "../components/PedidoCard";

export function PedidosPage() {
  const [btnactive, setBtnactive] = useState(0);
  const [pedidosFiltrados, setPedidosFiltrados] = useState(() =>
    filtrarPedidos(btnactive)
  );

  const estados_pedidos = getEstados();

  const filtrar = (est_id) => {
    setBtnactive(est_id);
    setPedidosFiltrados(() => filtrarPedidos(est_id));
  };

  return (
    <Container>
      <div className="Pedidos">
        <h2>GESTION DE PEDIDOS</h2>
        <div className="ContainerButtons">
          {estados_pedidos.map((estado) => (
            <Button
              key={estado.id}
              id={estado.id}
              onClick={() => filtrar(estado.id)}
              $activo={btnactive === estado.id}
            >
              {estado.nombre}
            </Button>
          ))}
        </div>

        <div className="PedidosC">
          {pedidosFiltrados.map((ped) => (
            <PedidoCard key={ped.id} ped={ped} />
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

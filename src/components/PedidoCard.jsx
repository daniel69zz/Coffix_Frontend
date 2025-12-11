import styled from "styled-components";
import { actualizarPedido } from "../services/pedidos";

function formatearHora(fc_hora) {
  if (!fc_hora) return "";

  const partes = fc_hora.split("T");
  if (partes.length === 2) {
    return partes[1].substring(0, 5);
  }

  return fc_hora;
}

function getNextEstado(estado) {
  switch (estado) {
    case "Pendiente":
      return "En preparacion";
    case "En preparacion":
      return "Listo";
    case "Listo":
      return "Entregado";
    case "Entregado":
    default:
      return null;
  }
}

function getButtonLabel(estado) {
  switch (estado) {
    case "Pendiente":
      return "MARCAR EN PREPARACIÓN";
    case "En preparacion":
      return "MARCAR LISTO";
    case "Listo":
      return "MARCAR ENTREGADO";
    case "Entregado":
      return "PEDIDO ENTREGADO";
    default:
      return "ACTUALIZAR ESTADO";
  }
}

export default function PedidoCard({ ped, onEstadoActualizado }) {
  const handleClick = async (e) => {
    e.stopPropagation();

    const next = getNextEstado(ped.estado);
    if (!next) return;

    try {
      const actualizado = await actualizarPedido(ped.id_pedido, next);

      if (onEstadoActualizado) {
        onEstadoActualizado(`Pedido ${ped.cod_pedido} actualizado a "${next}"`);
      }
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el estado del pedido");
    }
  };

  const buttonLabel = getButtonLabel(ped.estado);
  const isDisabled = getNextEstado(ped.estado) === null;

  return (
    <CardContainer>
      <HeaderRow>
        <Codigo>{ped.cod_pedido}</Codigo>

        <EstadoPill $estado={ped.estado}>{ped.estado}</EstadoPill>
      </HeaderRow>

      {Array.isArray(ped.detalles) && ped.detalles.length > 0 && (
        <ItemsWrapper>
          {ped.detalles.map((it, idx) => (
            <ItemRow key={idx}>
              <span>
                {it.cantidad}x {it.producto.nombre}
              </span>
              <span>
                $
                {typeof it.producto.precio === "number"
                  ? it.producto.precio.toFixed(2)
                  : it.producto.precio}
              </span>
            </ItemRow>
          ))}
        </ItemsWrapper>
      )}

      <Divider />

      <FooterRow>
        <span>Creado</span>
        <span>{formatearHora(ped.fc_hora)}</span>
      </FooterRow>

      <MarcarListoButton disabled={isDisabled} onClick={handleClick}>
        {buttonLabel}
      </MarcarListoButton>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background: #d9d9d9;
  border-radius: 12px;
  padding: 10px 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  color: #000;
  box-sizing: border-box;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 20px;
`;

const Codigo = styled.span`
  font-weight: 700;
`;

const EstadoPill = styled.span`
  font-size: 15px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid black;

  background-color: ${({ $estado }) =>
    $estado === "Pendiente"
      ? "#FF0000"
      : $estado === "En preparacion"
      ? "#66CCCC"
      : $estado === "Listo"
      ? "#33FF33"
      : $estado === "Entregado"
      ? "#999999"
      : "#999999"};

  color: ${({ $estado }) =>
    $estado === "Pendiente"
      ? "#000000"
      : $estado === "En preparacion"
      ? "#3333FF"
      : $estado === "Listo"
      ? "#003300"
      : "#000000"};
`;

const ItemsWrapper = styled.div`
  margin: 20px 0;
  font-size: 20px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;

  span:first-child {
    font-weight: 600;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #777;
  margin: 6px 0;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  color: #555;
  font-weight: bold;
  margin: 10px 0;
`;

const MarcarListoButton = styled.button`
  width: 100%;
  padding: 6px 0;
  border-radius: 4px;
  border: 1px solid #c9a000;
  background: #ffd54a;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.5px;
  cursor: pointer;

  &:disabled {
    background: #cccccc;
    border-color: #aaaaaa;
    cursor: default;
  }
`;

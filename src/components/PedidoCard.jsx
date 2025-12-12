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
      await actualizarPedido(ped.id_pedido, next);

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

  // Intentamos obtener la prioridad desde distintas formas posibles
  let prioridadLabel =
    ped?.prioridadLabel ?? ped?.prioridad_label ?? ped?.prioridadlabel ?? null;

  if (!prioridadLabel && ped?.prioridad != null) {
    if (typeof ped.prioridad === "number") {
      prioridadLabel = `P${ped.prioridad}`;
    } else if (
      typeof ped.prioridad === "string" &&
      ped.prioridad.trim() !== ""
    ) {
      prioridadLabel = ped.prioridad.trim();
    }
  }

  return (
    <CardContainer>
      <HeaderRow>
        <CodigoBlock>
          <Codigo>{ped.cod_pedido}</Codigo>

          {prioridadLabel && (
            <PrioridadText $prioridad={prioridadLabel}>
              Prioridad: {prioridadLabel}
            </PrioridadText>
          )}
        </CodigoBlock>

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
  background: #f5f5f5;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #222;
  box-sizing: border-box;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* ✅ para que el pill quede arriba si hay 2 líneas */
  margin-bottom: 12px;
`;

const CodigoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Codigo = styled.span`
  font-weight: 700;
  font-size: 20px;
`;

const PrioridadText = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${({ $prioridad }) =>
    $prioridad === "Alta"
      ? "#b30000"
      : $prioridad === "Media"
      ? "#004085"
      : $prioridad === "Baja"
      ? "#155724"
      : "#555555"};
`;

const EstadoPill = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid #333;
  min-width: 90px;
  text-align: center;
  transition: background 0.3s, color 0.3s;

  background-color: ${({ $estado }) =>
    $estado === "Pendiente"
      ? "#ffcccc"
      : $estado === "En preparacion"
      ? "#cce5ff"
      : $estado === "Listo"
      ? "#d4edda"
      : "#e0e0e0"};

  color: ${({ $estado }) =>
    $estado === "Pendiente"
      ? "#b30000"
      : $estado === "En preparacion"
      ? "#004085"
      : $estado === "Listo"
      ? "#155724"
      : "#555555"};
`;

const ItemsWrapper = styled.div`
  margin: 20px 0;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  span:first-child {
    font-weight: 600;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 8px 0;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #555;
  font-weight: bold;
  margin: 12px 0;
`;

const MarcarListoButton = styled.button`
  width: 100%;
  padding: 8px 0;
  border-radius: 8px;
  border: 1px solid #c9a000;
  background: #ffd54a;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:enabled {
    background-color: #ffc107;
  }

  &:disabled {
    background: #e0e0e0;
    border-color: #cccccc;
    cursor: not-allowed;
  }
`;

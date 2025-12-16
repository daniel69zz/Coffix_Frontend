import styled from "styled-components";
import { actualizarPedido } from "../services/pedidos";
import {
  formatearHora,
  getNextEstado,
  getButtonLabel,
} from "../utils/fn_utils";

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

  let prioridadLabel = ped?.prioridadLabel ?? null;

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
    <Container>
      <div className="HeaderCard">
        <div className="CodeCard">
          <span className="CodeSpan">{ped.cod_pedido}</span>

          {prioridadLabel && (
            <PrioridadSpan $prioridad={prioridadLabel}>
              Prioridad: {prioridadLabel}
            </PrioridadSpan>
          )}
        </div>

        <EstadoSpan $estado={ped.estado}>{ped.estado}</EstadoSpan>
      </div>

      {Array.isArray(ped.detalles) && ped.detalles.length > 0 && (
        <Items>
          {ped.detalles.map((it, idx) => (
            <div className="ItemRow" key={idx}>
              <span>
                {it.cantidad}x {it.producto.nombre}
              </span>
              <span>
                $
                {typeof it.producto.precio === "number"
                  ? it.producto.precio.toFixed(2)
                  : it.producto.precio}
              </span>
            </div>
          ))}
        </Items>
      )}

      <Divider />

      <FooterRow>
        <span>Creado</span>
        <span>{formatearHora(ped.fc_hora)}</span>
      </FooterRow>

      <ListButton disabled={isDisabled} onClick={handleClick}>
        {buttonLabel}
      </ListButton>
    </Container>
  );
}

const Container = styled.div`
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

  .HeaderCard {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;

    .CodeCard {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .CodeSpan {
        font-weight: 700;
        font-size: 20px;
      }
    }
  }
`;

const PrioridadSpan = styled.span`
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

const EstadoSpan = styled.span`
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

const Items = styled.div`
  margin: 20px 0;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .ItemRow {
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

const ListButton = styled.button`
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

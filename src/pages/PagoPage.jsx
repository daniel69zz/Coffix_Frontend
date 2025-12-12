import { useState } from "react";
import styled from "styled-components";
import logo from "/logo_sis_v3.png";
import { registrarPedido } from "../services/pedidos";
import { Message } from "../utils/Message";

export default function PagoPage({
  total = 0,
  items = [],
  nombreCliente = "",
  onCancelar,
  onRegistrarPago,
}) {
  const [efectivo, setEfectivo] = useState("");
  const [pagado, setPagado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEfectivoChange = (e) => {
    const val = e.target.value;

    if (val === "") {
      setEfectivo("");
      return;
    }

    // permite solo números y punto decimal
    const regex = /^\d*\.?\d*$/;
    if (!regex.test(val)) return;

    setEfectivo(val);
  };

  const efectivoNum = efectivo === "" ? 0 : Number(efectivo);
  const cambio = Math.max(0, efectivoNum - total);

  const handleRegistrarPago = async () => {
    const efectivoNum = efectivo === "" ? 0 : Number(efectivo);

    if (items.length === 0) {
      setError("No hay productos en el carrito");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await registrarPedido({
        nombreCliente,
        montoPagado: efectivoNum,
        items,
      });

      setPagado(true);

      if (onRegistrarPago) onRegistrarPago();
    } catch (err) {
      console.error(err);
      setError(err?.message || "Error al registrar el pedido");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cuando pagado = true: NO se renderiza nada más, solo el overlay Message
  if (pagado) {
    return (
      <Message mensaje="PAGO REGISTRADO EXITOSAMENTE" onCancelar={onCancelar} />
    );
  }

  return (
    <Card>
      <LogoWrapper>
        <div className="imgContent">
          <img src={logo} alt="logo coffix" />
        </div>
      </LogoWrapper>

      <Content>
        <FieldRow>
          <Label>Total:</Label>
          <Input readOnly value={Number(total).toFixed(2)} />
        </FieldRow>

        <FieldRow>
          <Label>Efectivo:</Label>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={efectivo}
            onChange={handleEfectivoChange}
          />
        </FieldRow>

        <FieldRow>
          <Label>Cambio:</Label>
          <Input readOnly value={cambio.toFixed(2)} />
        </FieldRow>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <ButtonsRow>
          <CancelButton type="button" onClick={onCancelar} disabled={loading}>
            CANCELAR
          </CancelButton>

          <PrimaryButton
            type="button"
            onClick={handleRegistrarPago}
            disabled={loading}
          >
            {loading ? "PROCESANDO..." : "REGISTRAR PAGO"}
          </PrimaryButton>
        </ButtonsRow>
      </Content>
    </Card>
  );
}

const Card = styled.div`
  background: white;
  border-radius: 40px;
  padding: 32px 40px;
  display: flex;
  min-width: 600px;
`;

const LogoWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  .imgContent {
    display: flex;
    background-color: inherit;

    img {
      height: 150px;
      object-fit: cover;
      background-color: inherit;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Label = styled.span`
  font-weight: 700;
  min-width: 90px;
  text-align: right;
`;

const Input = styled.input`
  flex: 1;
  height: 48px;
  padding: 0 10px;
  border: 1px solid #000;
  border-radius: 2px;
  font-size: 14px;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 40px;
`;

const BaseButton = styled.button`
  flex: 1;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #c79c00;
  background: #ffd000;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(BaseButton)``;
const PrimaryButton = styled(BaseButton)``;

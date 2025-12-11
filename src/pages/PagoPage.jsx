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

    const regex = /^\d*\.?\d*$/;
    if (!regex.test(val)) {
      return;
    }

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

      const resp = await registrarPedido({
        nombreCliente,
        montoPagado: efectivoNum,
        items,
      });

      // console.log("Respuesta API:", resp);

      setPagado(true);

      if (onRegistrarPago) {
        onRegistrarPago();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al registrar el pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <LogoWrapper>
        <div className="imgContent">
          <img src={logo} alt="logo coffix" />
        </div>
      </LogoWrapper>

      <Content>
        {pagado ? (
          <Message
            mensaje="PAGO REGISTRADO EXITOSAMENTE"
            onCancelar={onCancelar}
          />
        ) : (
          <>
            <FieldRow>
              <Label>Total:</Label>
              <Input readOnly value={total.toFixed(2)} />
            </FieldRow>
            <FieldRow>
              <Label>Efectivo:</Label>
              <Input
                type="number"
                min="0"
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
              <CancelButton
                type="button"
                onClick={onCancelar}
                disabled={loading}
              >
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
          </>
        )}
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
`;

const LogoWrapper = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: #fff7d0;
  display: flex;
  align-items: center;
  justify-content: center;

  .imgContent {
    display: flex;
    img {
      height: 130px;
      object-fit: contain;
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
  gap: 20px;
`;

const Label = styled.span`
  font-weight: 700;
  min-width: 110px;
  text-align: right;
  font-size: 15px;
  color: #333;
`;

const Input = styled.input`
  flex: 1;
  height: 46px;
  padding: 0 12px;
  border: 1px solid #b8b8b8;
  border-radius: 6px;
  font-size: 15px;
  transition: 0.2s ease;

  &:focus {
    border-color: #ffaf00;
    box-shadow: 0 0 6px rgba(255, 175, 0, 0.4);
    outline: none;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 32px;
`;

const BaseButton = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 6px;
  border: 1px solid #c79c00;
  background: #ffd000;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #e6b800;
  }
`;

const CancelButton = styled(BaseButton)`
  background: #e1e1e1;
  border-color: #b5b5b5;

  &:hover {
    background: #cfcfcf;
  }
`;

const PrimaryButton = styled(BaseButton)``;

const SuccessWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  button {
    width: 50%;
    font-size: 15px;
    padding: 10px;
    background-color: #f7c22e;
    color: black;
    font-weight: bold;
    border-radius: 12px;
    border: 1px solid #b48b12;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      background: #e4b020;
    }
  }

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #333;
  }

  p {
    font-size: 15px;
    color: #444;
  }
`;

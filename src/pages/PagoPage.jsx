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
  const [descuento, setDescuento] = useState("");
  const [tipoDescuento, setTipoDescuento] = useState("porcentaje"); // "porcentaje" o "monto"
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

  const handleDescuentoChange = (e) => {
    const val = e.target.value;

    if (val === "") {
      setDescuento("");
      return;
    }

    const regex = /^\d*\.?\d*$/;
    if (!regex.test(val)) {
      return;
    }

    // Validar límites según tipo de descuento
    if (tipoDescuento === "porcentaje") {
      const numVal = Number(val);
      if (numVal > 100) {
        setDescuento("100");
        return;
      }
    } else if (tipoDescuento === "monto") {
      const numVal = Number(val);
      if (numVal > total) {
        setDescuento(total.toString());
        return;
      }
    }

    setDescuento(val);
  };

  // Calcular descuento aplicado
  const descuentoNum = descuento === "" ? 0 : Number(descuento);
  let descuentoAplicado = 0;

  if (tipoDescuento === "porcentaje" && descuentoNum > 0) {
    descuentoAplicado = (total * descuentoNum) / 100;
  } else if (tipoDescuento === "monto" && descuentoNum > 0) {
    descuentoAplicado = descuentoNum;
  }

  // Calcular total con descuento
  const totalConDescuento = Math.max(0, total - descuentoAplicado);
  const efectivoNum = efectivo === "" ? 0 : Number(efectivo);
  const cambio = Math.max(0, efectivoNum - totalConDescuento);

  const handleRegistrarPago = async () => {
    const efectivoNum = efectivo === "" ? 0 : Number(efectivo);

    if (items.length === 0) {
      setError("No hay productos en el carrito");
      return;
    }

    // Validar que el efectivo sea suficiente
    if (efectivoNum < totalConDescuento) {
      setError(
        `Faltan $${(totalConDescuento - efectivoNum).toFixed(2)} en efectivo`
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const resp = await registrarPedido({
        nombreCliente,
        montoPagado: efectivoNum,
        items,
        descuento: descuentoAplicado,
        totalOriginal: total,
        totalFinal: totalConDescuento,
        tipoDescuento,
        valorDescuento: descuentoNum,
      });

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
              <Label>Total Original:</Label>
              <Input readOnly value={total.toFixed(2)} />
            </FieldRow>

            <FieldRow>
              <Label>Tipo Descuento:</Label>
              <Select
                value={tipoDescuento}
                onChange={(e) => {
                  setTipoDescuento(e.target.value);
                  setDescuento(""); // Resetear descuento al cambiar tipo
                }}
              >
                <option value="porcentaje">Porcentaje (%)</option>
                <option value="monto">Monto Fijo ($)</option>
              </Select>
            </FieldRow>

            <FieldRow>
              <Label>
                {tipoDescuento === "porcentaje"
                  ? "Descuento %:"
                  : "Descuento $:"}
              </Label>
              <Input
                type="number"
                min="0"
                max={tipoDescuento === "porcentaje" ? "100" : total}
                placeholder="0"
                value={descuento}
                onChange={handleDescuentoChange}
              />
            </FieldRow>

            <FieldRow>
              <Label>Descuento Aplicado:</Label>
              <Input readOnly value={descuentoAplicado.toFixed(2)} />
            </FieldRow>

            <FieldRow>
              <Label>Total con Descuento:</Label>
              <Input
                readOnly
                value={totalConDescuento.toFixed(2)}
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#fff7d0",
                  borderColor: "#ffd000",
                }}
              />
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

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

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
                disabled={loading || efectivoNum < totalConDescuento}
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
  gap: 20px;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Label = styled.span`
  font-weight: 700;
  min-width: 160px;
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

const Select = styled.select`
  flex: 1;
  height: 46px;
  padding: 0 12px;
  border: 1px solid #b8b8b8;
  border-radius: 6px;
  font-size: 15px;
  background-color: white;
  cursor: pointer;
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
  margin-top: 20px;
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

  &:disabled {
    background: #e1e1e1;
    border-color: #b5b5b5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(BaseButton)`
  background: #e1e1e1;
  border-color: #b5b5b5;

  &:hover:not(:disabled) {
    background: #cfcfcf;
  }
`;

const PrimaryButton = styled(BaseButton)``;

import logo from "/logo_sis_v3.png";
import { useState } from "react";
import styled from "styled-components";
import { actualizar_stock_producto } from "../services/productos";

export default function RestockModal({ producto, onCancelar, onActualizado }) {
  const [cantidad, setCantidad] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCantidadChange = (e) => {
    const val = e.target.value;

    if (val === "") {
      setCantidad("");
      return;
    }

    // solo enteros positivos
    const regex = /^\d+$/;
    if (!regex.test(val)) return;

    setCantidad(val);
  };

  const handleActualizarStock = async () => {
    const num = Number(cantidad);

    if (!cantidad || Number.isNaN(num) || num <= 0) {
      setError("Ingresa una cantidad válida mayor a 0");
      return;
    }

    if (!producto) {
      setError("No hay producto seleccionado");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await actualizar_stock_producto(producto.id_producto, num);

      // avisamos al padre que se actualizó
      if (onActualizado) {
        onActualizado();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al actualizar el stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <Card>
        <Content>
          <LogoWrapper>
            <div className="imgContent">
              <img src={logo} alt="logo coffix" />
            </div>
          </LogoWrapper>
          <div className="BodyInput">
            <h3>Actualizar stock</h3>
            <p>Producto: {producto?.nombre}</p>

            <FieldRow>
              <Label>Cantidad:</Label>
              <Input
                type="number"
                min="1"
                placeholder="Ej: 5"
                value={cantidad}
                onChange={handleCantidadChange}
              />
            </FieldRow>

            {error && <ErrorText>{error}</ErrorText>}

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
                onClick={handleActualizarStock}
                disabled={loading}
              >
                {loading ? "ACTUALIZANDO..." : "ACTUALIZAR STOCK"}
              </PrimaryButton>
            </ButtonsRow>
          </div>
        </Content>
      </Card>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5); /* fondo oscuro */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* por encima de todo */
`;

const Card = styled.div`
  border-radius: 40px;
  padding: 30px;
  min-width: 600px;
  background-color: #fff85a;
`;

const Content = styled.div`
  background-color: white;
  gap: 50px;

  border-radius: 40px;
  padding: 32px 40px;
  display: flex;

  .BodyInput {
    display: flex;
    flex-direction: column;
    gap: 10px;

    h3 {
      font-size: 22px;
      font-weight: 700;
      text-align: center;
      margin: 0;
    }

    p {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
    }
  }
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

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
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
    cursor: default;
  }
`;

const CancelButton = styled(BaseButton)``;
const PrimaryButton = styled(BaseButton)``;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
`;

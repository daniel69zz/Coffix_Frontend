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
  background: rgba(0, 0, 0, 0.6); /* fondo más elegante */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Card = styled.div`
  border-radius: 40px;
  padding: 30px;
  min-width: 600px;
  background-color: #fffbea;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 30px;
  animation: popUp 0.25s ease-out;

  @keyframes popUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  display: flex;
  gap: 50px;
  background-color: white;
  border-radius: 40px;
  padding: 32px 40px;
  align-items: center;
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
    img {
      height: 130px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;

const BodyInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;

  h3 {
    font-size: 22px;
    font-weight: 700;
    text-align: center;
    margin: 0;
    color: #333;
  }

  p {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: #555;
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
  color: #333;
`;

const Input = styled.input`
  flex: 1;
  height: 48px;
  padding: 0 12px;
  border: 1px solid #000;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #f7c22e;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 40px;
`;

const BaseButton = styled.button`
  flex: 1;
  height: 48px;
  border-radius: 8px;
  border: none;
  background: #ffd000;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #e0b800;
    transform: scale(1.03);
  }

  &:disabled {
    opacity: 0.7;
    cursor: default;
    background: #cccccc;
  }
`;

const CancelButton = styled(BaseButton)`
  background: #f3f3f3;
  color: #333;

  &:hover {
    background: #e0e0e0;
  }
`;

const PrimaryButton = styled(BaseButton)``;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
  text-align: center;
`;

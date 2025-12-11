import styled from "styled-components";

export function Message({ mensaje, onCancelar }) {
  return (
    <Overlay>
      <SuccessWrapper>
        <h2>{mensaje}</h2>
        <button type="button" onClick={onCancelar}>
          CERRAR
        </button>
      </SuccessWrapper>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const SuccessWrapper = styled.div`
  background: white;
  padding: 24px 32px;
  border-radius: 16px;
  min-width: 280px;
  max-width: 400px;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 16px;

  button {
    width: 50%;
    border-style: solid;
    font-size: 15px;
    margin: 0 auto;
    margin-top: 5px;
    padding: 10px;
    background-color: #f7c22e;
    color: black;
    font-weight: bold;
    border-radius: 12px;
    cursor: pointer;
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
  }

  p {
    font-size: 14px;
  }
`;

import styled from "styled-components";

export default function PedidoCard({ ped }) {
  return (
    <CardContainer>
      <HeaderRow>
        <Codigo>{ped.codigo}</Codigo>
        <EstadoPill $estado={ped.id_estado}>{ped.estado}</EstadoPill>
      </HeaderRow>

      <ItemsWrapper>
        {ped.items.map((it, idx) => (
          <ItemRow key={idx}>
            <span>
              {it.cantidad}x {it.nombre}
            </span>
            <span>${it.precio.toFixed(2)}</span>
          </ItemRow>
        ))}
      </ItemsWrapper>

      <Divider />

      {/* TOTAL */}
      <TotalRow>
        {/* <strong>Total</strong>
        <strong>${ped.total.toFixed(1)}</strong> */}
      </TotalRow>

      <FooterRow>
        <span>Creado</span>
        <span>{ped.hora}</span>
      </FooterRow>

      <MarcarListoButton>MARCAR LISTO</MarcarListoButton>
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
  background-color: ${({ $estado }) =>
    $estado === 1
      ? "#FF0000"
      : $estado === 2
      ? "#66CCCC"
      : $estado === 3
      ? "#33FF33"
      : "#999999"};
  border: 1px solid black;
  color: ${({ $estado }) =>
    $estado === 1
      ? "#000000"
      : $estado === 2
      ? "#3333FF"
      : $estado === 3
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

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
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
`;

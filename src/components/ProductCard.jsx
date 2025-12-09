import { useState } from "react";
import styled from "styled-components";
import { useCart } from "../utils/CartContext";

export default function ProductCard({ producto }) {
  const { addItem, items } = useCart();

  const [cantidad, setCantidad] = useState(0);

  const incrementar = () => setCantidad(cantidad + 1);
  const decrementar = () => cantidad > 0 && setCantidad(cantidad - 1);

  const bt_additem = () => {
    const min = Math.max(0, cantidad);
    addItem(producto, min);
    setCantidad(0);
  };

  return (
    <Card>
      <img src={`/${producto.path_img}`} alt={producto.nombre} />

      <CardContent>
        <div className="CategoryTag">{producto.nombre_tipo}</div>

        <h2>{producto.nombre}</h2>

        <PriceCantBox>
          <span className="Price">Bs. {producto.precio}</span>

          <div className="Cantidad">
            <button onClick={decrementar}>-</button>

            <span className="Display">{cantidad}</span>

            <button onClick={incrementar}>+</button>
          </div>
        </PriceCantBox>

        <AddButton onClick={bt_additem}>+ AGREGAR</AddButton>
      </CardContent>
    </Card>
  );
}
const Card = styled.div`
  background-color: #d1d5db;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 12rem;
    object-fit: contain;
    padding: 1rem;
  }
`;

const CardContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 13rem;

  .CategoryTag {
    background-color: black;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    width: fit-content;
    margin-bottom: 4px;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: bold;
    color: black;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    transition: 0.2s;
  }
`;

const PriceCantBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;

  .Price {
    font-size: 1.35rem;
    font-weight: bold;
    color: #72650c;
  }

  .Cantidad {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      border-color: black;
      border-style: solid;
      background-color: red;
      color: white;
      padding: 0.25rem 0.5rem;
      font-size: 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        background-color: green;
      }
    }

    .Display {
      background-color: white;
      color: #1f2937;
      padding: 0.25rem 0.75rem;
      border-radius: 8px;
      font-weight: 600;
      min-width: 40px;
      text-align: center;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
    }
  }
`;

const AddButton = styled.button`
  border-style: solid;

  margin-top: 5px;
  padding: 10px 0;
  background-color: #f7c22e;
  color: black;
  font-weight: 600;
  border-radius: 12px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #007a52;
  }
`;

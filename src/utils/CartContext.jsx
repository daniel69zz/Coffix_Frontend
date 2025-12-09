import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (producto, cantidad = 1) => {
    if (cantidad <= 0) return;

    setItems((l_prev) => {
      const it_found = l_prev.findIndex(
        (it) => it.id_producto === producto.id_producto
      );

      if (it_found !== -1) {
        const copia = [...l_prev];

        copia[it_found] = {
          ...copia[it_found],
          cantidad: copia[it_found].cantidad + cantidad,
        };

        return copia;
      }

      return [
        ...l_prev,
        {
          ...producto,
          cantidad,
        },
      ];
    });
  };

  const removeItem = (id_producto) => {
    setItems((l_prev) => l_prev.filter((it) => it.id_producto !== id_producto));
  };

  const setQty = (id, qty) => {
    const it = items.find((x) => x.id === id);
    if (!it) return;
    it.qty = Math.max(1, qty);
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, it) => acc + it.cantidad, 0);
  const totalPrice = items.reduce(
    (acc, it) => acc + it.cantidad * it.precio,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        setQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

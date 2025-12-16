import { FaShoppingCart } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { GiHistogram } from "react-icons/gi";
import { BsFillBoxSeamFill } from "react-icons/bs";

const linksArray = [
  {
    label: "Productos",
    Icon: FaShoppingCart,
    to: "ventas",
    roles: ["ADMIN", "CAJERO"],
  },
  {
    label: "Pedidos",
    Icon: FaClipboardList,
    to: "pedidos",
    roles: ["ADMIN", "CAJERO", "COCINA"],
  },
  {
    label: "Reportes",
    Icon: GiHistogram,
    to: "reporte",
    roles: ["ADMIN"],
  },
  {
    label: "Restock",
    Icon: BsFillBoxSeamFill,
    to: "restock",
    roles: ["ADMIN"],
  },
];

export default function links_sidebar() {
  return linksArray;
}

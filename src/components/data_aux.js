import { FaShoppingCart } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { GiHistogram } from "react-icons/gi";
import { BsFillBoxSeamFill } from "react-icons/bs";

const linksArray = [
  {
    label: "Productos",
    Icon: FaShoppingCart,
    to: "ventas",
  },
  {
    label: "Pedidos",
    Icon: FaClipboardList,
    to: "pedidos",
  },
  {
    label: "Reportes",
    Icon: GiHistogram,
    to: "reporte",
  },
  {
    label: "Restock",
    Icon: BsFillBoxSeamFill,
    to: "restock",
  },
];

export default function links_sidebar() {
  return linksArray;
}

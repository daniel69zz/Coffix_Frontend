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
    to: "/",
  },
  {
    label: "Reportes",
    Icon: GiHistogram,
    to: "/",
  },
  {
    label: "Restock",
    Icon: BsFillBoxSeamFill,
    to: "/",
  },
];

export default function links_sidebar() {
  return linksArray;
}

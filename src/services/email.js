import emailjs from "@emailjs/browser";

// const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
// const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
// const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SERVICE_ID = "service_mhqh8pf";
const TEMPLATE_ID = "template_bdm440n";
const PUBLIC_KEY = "4a8zms4-4OWCNgnhQ";

export async function enviarCorreoAviso({ correo, nombre }) {
  const params = {
    to_email: correo, // debe coincidir con tu template de EmailJS
    to_name: nombre || "Usuario",
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
}

const API_REPORTES = "http://localhost:8080/api/reportes";

export async function getReporteVentas(fechaInicio, fechaFin) {
  const params = new URLSearchParams({
    inicio: fechaInicio, // "2025-02-10"
    fin: fechaFin, // "2025-02-13"
  });

  const res = await fetch(`${API_REPORTES}/ventas?${params.toString()}`);
  if (!res.ok) throw new Error("Error al cargar reporte de ventas");
  return res.json(); // { totalIngresos, ventasPorDia }
}

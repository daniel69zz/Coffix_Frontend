import { useState, useMemo } from "react";
import styled from "styled-components";
import { getReporteVentas } from "../services/reporte";
import { FaBox } from "react-icons/fa6";

export function ReportePage() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [ventasPorDia, setVentasPorDia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuscar = async () => {
    if (!fechaInicio || !fechaFin) {
      setError("Selecciona ambas fechas");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getReporteVentas(fechaInicio, fechaFin);
      setTotalIngresos(Number(data.totalIngresos || 0));
      setVentasPorDia(data.ventasPorDia || []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los reportes");
    } finally {
      setLoading(false);
    }
  };

  const gruposPorFecha = useMemo(() => {
    const map = new Map();

    ventasPorDia.forEach((v) => {
      const key = v.fecha;
      if (!map.has(key)) {
        map.set(key, {
          fecha: key,
          totalDia: 0,
          items: [],
        });
      }
      const grupo = map.get(key);
      grupo.items.push(v);
      grupo.totalDia += Number(v.totalProducto || 0);
    });

    return Array.from(map.values()).sort((a, b) => {
      // dd/MM/yyyy
      const [da, ma, ya] = a.fecha.split("/");
      const [db, mb, yb] = b.fecha.split("/");
      const fa = new Date(`${ya}-${ma}-${da}`);
      const fb = new Date(`${yb}-${mb}-${db}`);
      return fa - fb;
    });
  }, [ventasPorDia]);

  return (
    <PageWrapper>
      <div className="Reporte">
        <h1>REPORTES</h1>

        <FiltrosCard>
          <h2>Filtros de Fecha</h2>
          <div className="FiltroBody">
            <div className="fecha">
              <label>Fecha Inicio</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>

            <div className="fecha">
              <label>Fecha Fin</label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>

            <button type="button" onClick={handleBuscar} disabled={loading}>
              {loading ? "BUSCANDO..." : "BUSCAR"}
            </button>
          </div>

          {error && <ErrorMsg>{error}</ErrorMsg>}
        </FiltrosCard>

        <ContenidoRow>
          <IngresosCard>
            <div className="HeaderIngresos">
              <h3>Ingresos Totales</h3>
              <div className="symbol_money">
                <span>$</span>
              </div>
            </div>

            <div className="monto">${totalIngresos.toFixed(2)}</div>
          </IngresosCard>

          <VentasCard>
            <div className="ventasHeader">
              <h3>Ventas</h3>
              <div className="imgBox">
                <FaBox />
              </div>
            </div>

            <TablaHeader>
              <span>Fecha</span>
              <span>Cantidad</span>
              <span>Productos</span>
              <span>Total</span>
            </TablaHeader>

            <TablaBody>
              {gruposPorFecha.length === 0 && !loading && (
                <SinDatos>No hay ventas en ese intervalo</SinDatos>
              )}

              {gruposPorFecha.map((grupo, idxGrupo) => (
                <GrupoDia key={grupo.fecha}>
                  {idxGrupo > 0 && <hr />}

                  <GrupoHeaderRow>
                    <GrupoFecha>{grupo.fecha}</GrupoFecha>
                    <GrupoTotal>
                      Total del día: ${grupo.totalDia.toFixed(2)}
                    </GrupoTotal>
                  </GrupoHeaderRow>

                  {/* Filas de productos de ese día */}
                  {grupo.items.map((v, idxRow) => (
                    <VentaRow key={`${grupo.fecha}-${idxRow}`}>
                      <FechaBox>{v.fecha}</FechaBox>

                      <CantidadBox>
                        <CantidadInput readOnly value={v.cantidadVendida} />
                      </CantidadBox>

                      <ProductosCol>
                        <span>{v.producto}</span>
                      </ProductosCol>

                      <TotalBox>
                        ${Number(v.totalProducto || 0).toFixed(2)}
                      </TotalBox>
                    </VentaRow>
                  ))}
                </GrupoDia>
              ))}
            </TablaBody>
          </VentasCard>
        </ContenidoRow>
      </div>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;

  .Reporte {
    border-radius: 10px;
    margin: 20px;
    margin-right: 14px;
    background-color: white;
    padding: 20px;

    h1 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
    }
  }
`;

const FiltrosCard = styled.div`
  border: 2px solid #c9c9c9;
  border-radius: 8px;
  padding: 16px 20px;
  background: #ffffff;

  h2 {
    font-size: 19px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .FiltroBody {
    display: flex;
    align-items: flex-end;
    gap: 24px;
    flex-wrap: wrap;

    button {
      padding: 8px 20px;
      border-radius: 4px;
      border: 1px solid #444;
      background: #ffd400;
      cursor: pointer;
      font-weight: 600;
      margin-top: 18px;

      &:disabled {
        opacity: 0.7;
        cursor: default;
      }
    }

    .fecha {
      display: flex;
      flex-direction: column;
      gap: 4px;

      label {
        font-size: 17px;
      }

      input {
        padding: 6px 10px;
        border-radius: 4px;
        border: 1px solid #999;
        min-width: 160px;
        background: #e0e0e0;
      }
    }
  }
`;

const ErrorMsg = styled.p`
  margin-top: 8px;
  color: #c62828;
  font-size: 13px;
`;

const ContenidoRow = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const IngresosCard = styled.div`
  border-radius: 8px;
  border: 2px solid #c9c9c9;
  background: #ffffff;
  padding: 16px;

  align-self: flex-start;

  .HeaderIngresos {
    gap: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
      font-weight: 600;
    }

    .symbol_money {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 35px;
        font-weight: 700;
      }
    }
  }

  .monto {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    font-size: 32px;
    font-weight: 700;
  }
`;

const VentasCard = styled.div`
  border-radius: 8px;
  border: 2px solid #c9c9c9;
  background: #ffffff;
  padding: 16px 20px;

  .ventasHeader {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    h3 {
      font-size: 22px;
      font-weight: 700;
    }
  }

  .imgBox {
    display: flex;
    align-items: center;
    img {
      height: 100px;
    }
  }
`;

const TablaHeader = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 140px 90px 1fr 100px;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 19px;
`;

const TablaBody = styled.div`
  margin-top: 4px;

  max-height: 320px;
  overflow-y: auto;
`;

const GrupoDia = styled.div`
  margin-bottom: 12px;

  hr {
    color: black;
    border-top: 1px solid #c9c9c9;
    margin: 8px 0 12px;
  }
`;

const GrupoHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  font-size: 17px;
`;

const GrupoFecha = styled.span`
  font-weight: 600;
  margin-left: 5px;
`;

const GrupoTotal = styled.span`
  font-weight: 600;
`;

/* Filas individuales */
const VentaRow = styled.div`
  display: grid;
  grid-template-columns: 140px 90px 1fr 100px;
  align-items: stretch;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 16px;
`;

const FechaBox = styled.div`
  background: #d9d9d9;
  border-radius: 3px;
  border: 1px solid #999;
  padding: 6px 10px;
  font-weight: 600;
  text-align: center;
`;

const CantidadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CantidadInput = styled.input`
  width: 50px;
  text-align: center;
  padding: 4px;
  border-radius: 3px;
  border: 1px solid #999;
  background: #f0f0f0;
  font-size: 17px;
`;

const ProductosCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 18px;
`;

const TotalBox = styled.div`
  border-radius: 3px;
  border: 1px solid #999;
  padding: 6px 10px;
  text-align: center;
  background: #f0f0f0;
  font-weight: 600;
  font-size: 17px;
`;

const SinDatos = styled.div`
  margin-top: 12px;
  color: #666;
`;

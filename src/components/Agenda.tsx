import { useState } from "react";
import { EVENTOS_AGENDA } from "../data";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TIPO_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  medicao: { bg: "rgba(92,155,224,0.15)", color: "#5C9BE0", label: "Medição" },
  visita: { bg: "rgba(201,168,76,0.15)", color: "#C9A84C", label: "Visita" },
  entrega: { bg: "rgba(76,175,130,0.15)", color: "#4CAF82", label: "Entrega" },
  aprovacao: { bg: "rgba(155,92,224,0.15)", color: "#9B5CE0", label: "Aprovação" },
  montagem: { bg: "rgba(232,168,56,0.15)", color: "#E8A838", label: "Montagem" },
  assistencia: { bg: "rgba(224,92,92,0.15)", color: "#E05C5C", label: "Assistência" },
};

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function Agenda() {
  const [ano, setAno] = useState(2024);
  const [mes, setMes] = useState(6); // July
  const [diaSelected, setDiaSelected] = useState<number | null>(28);

  const cells = buildCalendar(ano, mes);

  function prevMes() {
    if (mes === 0) { setMes(11); setAno(ano - 1); } else setMes(mes - 1);
    setDiaSelected(null);
  }
  function nextMes() {
    if (mes === 11) { setMes(0); setAno(ano + 1); } else setMes(mes + 1);
    setDiaSelected(null);
  }

  const getEventosDia = (dia: number) => {
    const key = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    return EVENTOS_AGENDA.filter(e => e.data === key);
  };

  const eventosSelected = diaSelected ? getEventosDia(diaSelected) : [];
  const proximosEventos = EVENTOS_AGENDA.slice(0, 5);

  return (
    <div style={{ padding: "32px 36px", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "#C9A84C", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>Gestão</div>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 400, color: "#E8E6E1", margin: 0 }}>Agenda</h1>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {Object.entries(TIPO_COLORS).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: v.color }} />
            <span style={{ fontSize: 11, color: "#7A7870" }}>{v.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        {/* Calendário */}
        <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 20 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <button onClick={prevMes} style={{ background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#7A7870", display: "flex", alignItems: "center" }}>
              <ChevronLeft size={14} />
            </button>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 16, color: "#E8E6E1" }}>{MESES[mes]} {ano}</div>
            <button onClick={nextMes} style={{ background: "none", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#7A7870", display: "flex", alignItems: "center" }}>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Dias da semana */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
            {DIAS_SEMANA.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 10, color: "#5A5850", padding: "4px 0", fontFamily: "JetBrains Mono, monospace" }}>{d}</div>
            ))}
          </div>

          {/* Células */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {cells.map((dia, i) => {
              if (dia === null) return <div key={i} />;
              const eventos = getEventosDia(dia);
              const isToday = dia === 28 && mes === 6 && ano === 2024;
              const isSelected = dia === diaSelected;
              return (
                <button
                  key={i}
                  onClick={() => setDiaSelected(dia)}
                  style={{
                    background: isSelected ? "rgba(201,168,76,0.15)" : isToday ? "rgba(201,168,76,0.08)" : "transparent",
                    border: isSelected ? "1px solid rgba(201,168,76,0.4)" : isToday ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent",
                    borderRadius: 6, padding: "6px 4px", cursor: "pointer", textAlign: "center", transition: "all 0.1s",
                  }}
                >
                  <div style={{ fontSize: 12, color: isSelected ? "#C9A84C" : isToday ? "#C9A84C" : "#E8E6E1", fontFamily: "JetBrains Mono, monospace" }}>{dia}</div>
                  {eventos.length > 0 && (
                    <div style={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 3, flexWrap: "wrap" }}>
                      {eventos.slice(0, 3).map((ev, j) => (
                        <div key={j} style={{ width: 5, height: 5, borderRadius: "50%", background: TIPO_COLORS[ev.tipo]?.color || "#7A7870" }} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel lateral */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Eventos do dia selecionado */}
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, color: "#7A7870", marginBottom: 12 }}>
              {diaSelected ? `${diaSelected} ${MESES[mes].slice(0, 3)} ${ano}` : "Selecione um dia"}
            </div>
            {eventosSelected.length === 0 ? (
              <div style={{ fontSize: 12, color: "#5A5850", textAlign: "center", padding: "16px 0" }}>Nenhum evento</div>
            ) : (
              eventosSelected.map(ev => {
                const tipo = TIPO_COLORS[ev.tipo];
                return (
                  <div key={ev.id} style={{ marginBottom: 10, padding: "10px 12px", borderRadius: 8, background: tipo.bg, borderLeft: `3px solid ${tipo.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: tipo.color, fontFamily: "JetBrains Mono, monospace" }}>{ev.hora}</span>
                      <span style={{ fontSize: 10, color: tipo.color }}>{tipo.label}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#E8E6E1", fontWeight: 500 }}>{ev.titulo}</div>
                    <div style={{ fontSize: 10, color: "#7A7870", marginTop: 3 }}>{ev.local}</div>
                    <div style={{ fontSize: 10, color: "#5A5850", marginTop: 2 }}>Resp: {ev.resp}</div>
                  </div>
                );
              })
            )}
          </div>

          {/* Próximas entregas/instalações */}
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#E8E6E1", marginBottom: 12 }}>Próximos Compromissos</div>
            {proximosEventos.map(ev => {
              const tipo = TIPO_COLORS[ev.tipo];
              return (
                <div key={ev.id} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 32, minWidth: 32, textAlign: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#E8E6E1", fontFamily: "JetBrains Mono, monospace", lineHeight: 1 }}>{ev.data.split("-")[2]}</div>
                    <div style={{ fontSize: 9, color: "#5A5850" }}>/{ev.data.split("-")[1]}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: tipo.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: "#E8E6E1" }}>{ev.titulo}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#5A5850", marginTop: 2, paddingLeft: 11 }}>{ev.hora} · {ev.resp}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

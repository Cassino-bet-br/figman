import { useState } from "react";
import { MEDICAO_CHECKLIST } from "../data";
import { CheckCircle, XCircle, Camera, MapPin, PenLine, UserCheck } from "lucide-react";

export default function Medicao() {
  const [checklist, setChecklist] = useState(MEDICAO_CHECKLIST);
  const [assinado, setAssinado] = useState(false);
  const [geoOk, setGeoOk] = useState(true);

  const toggle = (id: string) => {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, ok: !c.ok } : c));
  };

  const concluidos = checklist.filter(c => c.ok).length;
  const total = checklist.length;
  const pct = Math.round((concluidos / total) * 100);

  return (
    <div style={{ padding: "32px 36px", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "#C9A84C", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>Gestão</div>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 400, color: "#E8E6E1", margin: 0 }}>Medição Técnica</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        {/* Ficha principal */}
        <div>
          {/* Header da ficha */}
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Projeto", value: "P-2024-046" },
                { label: "Cliente", value: "Residência Costa" },
                { label: "Endereço", value: "Rua das Garças, 240 — Vila Olímpia" },
                { label: "Data", value: "28 Jul 2024 — 09:00" },
                { label: "Responsável", value: "Carlos M. — Técnico Sênior" },
                { label: "Tipo", value: "1ª Medição — Cozinha + Sala" },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: 10, color: "#7A7870", marginBottom: 3, fontFamily: "JetBrains Mono, monospace", letterSpacing: 0.5 }}>{f.label.toUpperCase()}</div>
                  <div style={{ fontSize: 13, color: "#E8E6E1" }}>{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progresso */}
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#7A7870" }}>Progresso do Checklist</span>
                <span style={{ fontSize: 12, color: "#C9A84C", fontFamily: "JetBrains Mono, monospace" }}>{concluidos}/{total}</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#4CAF82" : "#C9A84C", borderRadius: 3, transition: "width 0.4s ease" }} />
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: pct === 100 ? "#4CAF82" : "#C9A84C", fontFamily: "JetBrains Mono, monospace" }}>{pct}%</div>
          </div>

          {/* Checklist */}
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)", fontSize: 12, color: "#7A7870" }}>
              Checklist de Vistoria
            </div>
            {checklist.map((item, i) => (
              <div
                key={item.id}
                style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 18px", borderBottom: i < checklist.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", cursor: "pointer", transition: "background 0.1s" }}
                onClick={() => toggle(item.id)}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <div style={{ marginTop: 1 }}>
                  {item.ok
                    ? <CheckCircle size={16} style={{ color: "#4CAF82" }} />
                    : <XCircle size={16} style={{ color: "#E05C5C" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: item.ok ? "#E8E6E1" : "#9A9890" }}>{item.item}</div>
                  {item.obs && <div style={{ fontSize: 11, color: "#7A7870", marginTop: 3, fontStyle: "italic" }}>{item.obs}</div>}
                </div>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: item.ok ? "rgba(76,175,130,0.12)" : "rgba(224,92,92,0.12)", color: item.ok ? "#4CAF82" : "#E05C5C" }}>
                  {item.ok ? "OK" : "NOK"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Painel direito */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Dimensões principais */}
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#E8E6E1", marginBottom: 14 }}>Dimensões Registradas</div>
            {[
              { label: "Parede Norte", value: "3,45m", detalhe: "largura total" },
              { label: "Parede Sul", value: "3,41m", detalhe: "+4mm irregular" },
              { label: "Parede Leste", value: "4,20m", detalhe: "largura total" },
              { label: "Parede Oeste", value: "4,20m", detalhe: "ok" },
              { label: "Pé-direito Min.", value: "2,78m", detalhe: "confirmado" },
              { label: "Pé-direito Max.", value: "2,82m", detalhe: "desnível 4cm" },
              { label: "Área Total", value: "14,49 m²", detalhe: "calculada" },
            ].map(d => (
              <div key={d.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div>
                  <div style={{ fontSize: 12, color: "#9A9890" }}>{d.label}</div>
                  <div style={{ fontSize: 10, color: "#5A5850" }}>{d.detalhe}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#C9A84C", fontFamily: "JetBrains Mono, monospace" }}>{d.value}</div>
              </div>
            ))}
          </div>

          {/* Fotos & Mídia */}
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#E8E6E1" }}>Fotos & Vídeos</div>
              <Camera size={14} style={{ color: "#7A7870" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              {Array.from({ length: 9 }, (_, i) => (
                <div key={i} style={{ aspectRatio: "1", borderRadius: 6, background: i < 6 ? `hsl(${200 + i * 10}, 15%, 20%)` : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {i < 6 ? (
                    <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, hsl(${200 + i * 15}, 20%, 18%), hsl(${210 + i * 10}, 15%, 25%))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Camera size={12} style={{ color: "rgba(255,255,255,0.2)" }} />
                    </div>
                  ) : (
                    <span style={{ fontSize: 9, color: "#5A5850" }}>{i === 8 ? "+6" : ""}</span>
                  )}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 10, color: "#7A7870" }}>12 fotos · 1 vídeo registrados</div>
          </div>

          {/* Geolocalização */}
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <MapPin size={14} style={{ color: geoOk ? "#4CAF82" : "#E05C5C" }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: "#E8E6E1" }}>Geolocalização</span>
              <span style={{ fontSize: 10, marginLeft: "auto", color: geoOk ? "#4CAF82" : "#E05C5C" }}>{geoOk ? "Capturada" : "Pendente"}</span>
            </div>
            <div style={{ fontSize: 11, color: "#7A7870", fontFamily: "JetBrains Mono, monospace" }}>-23.5989, -46.6862</div>
            <div style={{ fontSize: 10, color: "#5A5850", marginTop: 2 }}>Vila Olímpia, São Paulo</div>
            <div style={{ marginTop: 10, height: 60, borderRadius: 6, background: "linear-gradient(135deg, #161820, #1C1F2A)", border: "1px solid rgba(92,155,224,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 10, color: "#5C9BE0" }}>📍 Mapa disponível</span>
            </div>
          </div>

          {/* Assinatura */}
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <PenLine size={14} style={{ color: "#7A7870" }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: "#E8E6E1" }}>Assinatura do Cliente</span>
            </div>
            <div
              onClick={() => setAssinado(true)}
              style={{ height: 70, borderRadius: 6, background: "rgba(255,255,255,0.02)", border: `1px dashed ${assinado ? "rgba(76,175,130,0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              {assinado ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Fraunces, serif", fontSize: 20, color: "#4CAF82", fontStyle: "italic" }}>M. Costa</div>
                  <div style={{ fontSize: 9, color: "#5A5850", marginTop: 2 }}>Assinado digitalmente</div>
                </div>
              ) : (
                <span style={{ fontSize: 11, color: "#5A5850" }}>Clique para assinar</span>
              )}
            </div>
            {assinado && (
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <UserCheck size={12} style={{ color: "#4CAF82" }} />
                <span style={{ fontSize: 10, color: "#4CAF82" }}>Assinatura coletada — 28 Jul 2024, 09:47</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

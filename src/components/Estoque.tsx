import { useState } from "react";
import { MATERIAIS, ORDENS_COMPRA } from "../data";
import { ShoppingCart, AlertTriangle, TrendingDown, CheckCircle } from "lucide-react";

function StatusBar({ atual, minimo, reservado }: { atual: number; minimo: number; reservado: number }) {
  const max = Math.max(atual + 20, minimo * 2);
  const pct = Math.min((atual / max) * 100, 100);
  const status = atual <= 0 ? "critico" : atual < minimo ? "baixo" : "ok";
  const colors = { critico: "#E05C5C", baixo: "#E8A838", ok: "#4CAF82" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.max(pct, 2)}%`, background: colors[status], borderRadius: 2, transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: 10, fontFamily: "JetBrains Mono, monospace", color: colors[status], minWidth: 42 }}>
        {status === "critico" ? "CRÍTICO" : status === "baixo" ? "BAIXO" : "OK"}
      </span>
    </div>
  );
}

export default function Estoque() {
  const [tab, setTab] = useState<"materiais" | "compras">("materiais");
  const [filtro, setFiltro] = useState("todos");

  const categorias = ["todos", ...Array.from(new Set(MATERIAIS.map(m => m.categoria)))];
  const filtrados = filtro === "todos" ? MATERIAIS : MATERIAIS.filter(m => m.categoria === filtro);

  const criticos = MATERIAIS.filter(m => m.disponivel < 0).length;
  const baixos = MATERIAIS.filter(m => m.disponivel >= 0 && m.atual < m.minimo).length;
  const emCompra = MATERIAIS.filter(m => m.em_compra > 0).length;

  return (
    <div style={{ padding: "32px 36px", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "#C9A84C", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>Gestão</div>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 400, color: "#E8E6E1", margin: 0 }}>Estoque & Compras</h1>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Itens Críticos", value: criticos, icon: AlertTriangle, color: "#E05C5C", desc: "abaixo de zero" },
          { label: "Estoque Baixo", value: baixos, icon: TrendingDown, color: "#E8A838", desc: "abaixo do mínimo" },
          { label: "Em Compra", value: emCompra, icon: ShoppingCart, color: "#5C9BE0", desc: "ordens ativas" },
        ].map(k => (
          <div key={k.label} style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `${k.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <k.icon size={18} style={{ color: k.color }} />
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 600, color: k.color, lineHeight: 1, fontFamily: "JetBrains Mono, monospace" }}>{k.value}</div>
              <div style={{ fontSize: 11, color: "#7A7870", marginTop: 2 }}>{k.label}</div>
              <div style={{ fontSize: 10, color: "#5A5850" }}>{k.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#141518", padding: 4, borderRadius: 8, width: "fit-content" }}>
        {(["materiais", "compras"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 18px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontFamily: "DM Sans, sans-serif", background: tab === t ? "#1C1D22" : "transparent", color: tab === t ? "#E8E6E1" : "#7A7870", fontWeight: tab === t ? 500 : 400, transition: "all 0.15s" }}>
            {t === "materiais" ? "Materiais" : "Necessidade de Compra"}
          </button>
        ))}
      </div>

      {tab === "materiais" && (
        <>
          {/* Filtro categoria */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {categorias.map(c => (
              <button key={c} onClick={() => setFiltro(c)} style={{ padding: "4px 12px", borderRadius: 20, border: `1px solid ${filtro === c ? "#C9A84C" : "rgba(255,255,255,0.08)"}`, background: filtro === c ? "rgba(201,168,76,0.12)" : "transparent", color: filtro === c ? "#C9A84C" : "#7A7870", fontSize: 11, cursor: "pointer", fontFamily: "DM Sans, sans-serif", textTransform: filtro === c ? "none" : "none" }}>
                {c === "todos" ? "Todos" : c}
              </button>
            ))}
          </div>

          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {["Código", "Material", "Atual", "Reservado", "Disponível", "Em Compra", "Mínimo", "Custo Médio", "Fornecedor", "Local", "Status"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, color: "#7A7870", fontWeight: 500, fontFamily: "JetBrains Mono, monospace", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((m, i) => {
                  const status = m.disponivel < 0 ? "critico" : m.atual < m.minimo ? "baixo" : "ok";
                  const rowBg = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)";
                  return (
                    <tr key={m.id} style={{ background: rowBg, borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.1s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = rowBg}
                    >
                      <td style={{ padding: "10px 14px", color: "#7A7870", fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>{m.id}</td>
                      <td style={{ padding: "10px 14px", color: "#E8E6E1", maxWidth: 200 }}>
                        <div style={{ fontWeight: 500 }}>{m.nome}</div>
                        <div style={{ fontSize: 10, color: "#7A7870" }}>{m.categoria}</div>
                      </td>
                      <td style={{ padding: "10px 14px", color: "#E8E6E1", fontFamily: "JetBrains Mono, monospace" }}>{m.atual}</td>
                      <td style={{ padding: "10px 14px", color: "#7A7870", fontFamily: "JetBrains Mono, monospace" }}>{m.reservado}</td>
                      <td style={{ padding: "10px 14px", fontFamily: "JetBrains Mono, monospace", color: m.disponivel < 0 ? "#E05C5C" : m.disponivel < m.minimo ? "#E8A838" : "#4CAF82", fontWeight: 500 }}>{m.disponivel}</td>
                      <td style={{ padding: "10px 14px", color: m.em_compra > 0 ? "#5C9BE0" : "#5A5850", fontFamily: "JetBrains Mono, monospace" }}>{m.em_compra}</td>
                      <td style={{ padding: "10px 14px", color: "#7A7870", fontFamily: "JetBrains Mono, monospace" }}>{m.minimo}</td>
                      <td style={{ padding: "10px 14px", color: "#E8E6E1", fontFamily: "JetBrains Mono, monospace" }}>R$ {m.custo.toFixed(2)}</td>
                      <td style={{ padding: "10px 14px", color: "#9A9890", fontSize: 11 }}>{m.fornecedor}</td>
                      <td style={{ padding: "10px 14px", color: "#7A7870", fontFamily: "JetBrains Mono, monospace" }}>{m.localizacao}</td>
                      <td style={{ padding: "10px 14px", minWidth: 130 }}><StatusBar atual={m.atual} minimo={m.minimo} reservado={m.reservado} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "compras" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {ORDENS_COMPRA.map((oc, i) => (
            <div key={i} style={{ background: "#141518", border: `1px solid ${oc.urgente ? "rgba(224,92,92,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 10, padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#E8E6E1" }}>{oc.fornecedor}</div>
                  <div style={{ fontSize: 10, color: "#7A7870", marginTop: 2 }}>{oc.itens.length} {oc.itens.length === 1 ? "item" : "itens"}</div>
                </div>
                {oc.urgente && (
                  <span style={{ fontSize: 10, padding: "3px 8px", background: "rgba(224,92,92,0.15)", color: "#E05C5C", borderRadius: 4, fontFamily: "JetBrains Mono, monospace" }}>URGENTE</span>
                )}
              </div>
              {oc.itens.map((item, j) => (
                <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 12 }}>
                  <span style={{ color: "#9A9890", flex: 1 }}>{item.material}</span>
                  <span style={{ color: "#7A7870", marginRight: 16, fontFamily: "JetBrains Mono, monospace" }}>×{item.qtd}</span>
                  <span style={{ color: "#E8E6E1", fontFamily: "JetBrains Mono, monospace" }}>R$ {(item.qtd * item.custo).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: 12, color: "#7A7870" }}>Total da ordem</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: "#C9A84C", fontFamily: "JetBrains Mono, monospace" }}>R$ {oc.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <button style={{ marginTop: 12, width: "100%", padding: "8px", borderRadius: 7, border: "none", background: oc.urgente ? "rgba(224,92,92,0.15)" : "rgba(201,168,76,0.12)", color: oc.urgente ? "#E05C5C" : "#C9A84C", fontSize: 12, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}>
                Gerar Ordem de Compra →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

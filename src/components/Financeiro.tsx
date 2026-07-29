import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { PROJETOS_FINANCEIRO, GRAFICO_RECEITAS, CONTAS_PAGAR, CONTAS_RECEBER } from "../data";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1C1D22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ fontSize: 11, color: "#7A7870", marginBottom: 6 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ fontSize: 12, color: p.color, display: "flex", justifyContent: "space-between", gap: 20 }}>
          <span>{p.name === "receita" ? "Receita" : "Despesa"}</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace" }}>R$ {p.value.toLocaleString("pt-BR")}</span>
        </div>
      ))}
    </div>
  );
}

export default function Financeiro() {
  const [tab, setTab] = useState<"resultado" | "contas" | "fluxo" | "dre">("resultado");

  const totalReceber = CONTAS_RECEBER.reduce((s, c) => s + c.valor, 0);
  const totalPagar = CONTAS_PAGAR.reduce((s, c) => s + c.valor, 0);
  const saldoProj = totalReceber - totalPagar;

  return (
    <div style={{ padding: "32px 36px", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "#C9A84C", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace", marginBottom: 6 }}>Gestão</div>
        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 28, fontWeight: 400, color: "#E8E6E1", margin: 0 }}>Financeiro</h1>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "A Receber", value: totalReceber, icon: ArrowUpRight, color: "#4CAF82", sub: `${CONTAS_RECEBER.length} títulos` },
          { label: "A Pagar", value: totalPagar, icon: ArrowDownRight, color: "#E05C5C", sub: `${CONTAS_PAGAR.length} contas` },
          { label: "Saldo Projetado", value: saldoProj, icon: DollarSign, color: "#C9A84C", sub: "próximos 30 dias" },
        ].map(k => (
          <div key={k.label} style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: "#7A7870", marginBottom: 8 }}>{k.label}</div>
                <div style={{ fontSize: 22, fontWeight: 600, color: k.color, fontFamily: "JetBrains Mono, monospace" }}>{fmt(k.value)}</div>
                <div style={{ fontSize: 10, color: "#5A5850", marginTop: 4 }}>{k.sub}</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${k.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <k.icon size={16} style={{ color: k.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "20px", marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "#E8E6E1", fontWeight: 500, marginBottom: 4 }}>Receitas × Despesas</div>
        <div style={{ fontSize: 11, color: "#7A7870", marginBottom: 20 }}>Últimos 6 meses</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={GRAFICO_RECEITAS} barGap={4} barSize={20}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="mes" tick={{ fill: "#7A7870", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#7A7870", fontSize: 10, fontFamily: "JetBrains Mono, monospace" }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="receita" fill="#4CAF82" radius={[3, 3, 0, 0]} animationDuration={800} />
            <Bar dataKey="despesa" fill="#E05C5C" radius={[3, 3, 0, 0]} animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "#4CAF82" }} /><span style={{ fontSize: 11, color: "#7A7870" }}>Receita</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: "#E05C5C" }} /><span style={{ fontSize: 11, color: "#7A7870" }}>Despesa</span></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#141518", padding: 4, borderRadius: 8, width: "fit-content" }}>
        {(["resultado", "contas", "fluxo", "dre"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontFamily: "DM Sans, sans-serif", background: tab === t ? "#1C1D22" : "transparent", color: tab === t ? "#E8E6E1" : "#7A7870", fontWeight: tab === t ? 500 : 400, transition: "all 0.15s" }}>
            {t === "resultado" ? "Resultado por Projeto" : t === "contas" ? "Contas" : t === "fluxo" ? "Fluxo de Caixa" : "DRE"}
          </button>
        ))}
      </div>

      {tab === "resultado" && (
        <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 900 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Projeto", "Cliente", "Vendido", "Entrada", "Parcelas Rest.", "Mat.", "M.O.", "Transp.", "Comissão", "Retrabalho", "Lucro Bruto", "Margem"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, color: "#7A7870", fontWeight: 500, fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROJETOS_FINANCEIRO.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.05)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"}
                >
                  <td style={{ padding: "10px 14px", color: "#C9A84C", fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>{p.id}</td>
                  <td style={{ padding: "10px 14px", color: "#E8E6E1", whiteSpace: "nowrap" }}>{p.cliente}</td>
                  <td style={{ padding: "10px 14px", color: "#E8E6E1", fontFamily: "JetBrains Mono, monospace" }}>R$ {p.valor.toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "10px 14px", color: "#4CAF82", fontFamily: "JetBrains Mono, monospace" }}>R$ {p.entrada.toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "10px 14px", color: "#7A7870", textAlign: "center", fontFamily: "JetBrains Mono, monospace" }}>{p.parcelas_rest}</td>
                  <td style={{ padding: "10px 14px", color: "#9A9890", fontFamily: "JetBrains Mono, monospace" }}>R$ {p.custo_mat.toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "10px 14px", color: "#9A9890", fontFamily: "JetBrains Mono, monospace" }}>R$ {p.mao_obra.toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "10px 14px", color: "#9A9890", fontFamily: "JetBrains Mono, monospace" }}>R$ {p.transporte.toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "10px 14px", color: "#9A9890", fontFamily: "JetBrains Mono, monospace" }}>R$ {p.comissao.toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "10px 14px", color: p.retrabalho > 0 ? "#E05C5C" : "#5A5850", fontFamily: "JetBrains Mono, monospace" }}>R$ {p.retrabalho.toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "10px 14px", color: "#4CAF82", fontWeight: 600, fontFamily: "JetBrains Mono, monospace" }}>R$ {p.lucro.toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: p.margem >= 25 ? "rgba(76,175,130,0.15)" : p.margem >= 15 ? "rgba(201,168,76,0.15)" : "rgba(224,92,92,0.15)", color: p.margem >= 25 ? "#4CAF82" : p.margem >= 15 ? "#C9A84C" : "#E05C5C", fontFamily: "JetBrains Mono, monospace" }}>
                      {p.margem.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "contas" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 8 }}>
              <ArrowUpRight size={14} style={{ color: "#4CAF82" }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#E8E6E1" }}>A Receber</span>
            </div>
            {CONTAS_RECEBER.map((c, i) => (
              <div key={i} style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, color: "#E8E6E1" }}>{c.desc}</div>
                  <div style={{ fontSize: 10, color: "#7A7870", marginTop: 2 }}>Vence {c.venc}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#4CAF82", fontFamily: "JetBrains Mono, monospace" }}>R$ {c.valor.toLocaleString("pt-BR")}</div>
                  <div style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, background: c.status === "vencendo" ? "rgba(232,168,56,0.2)" : "rgba(76,175,130,0.1)", color: c.status === "vencendo" ? "#E8A838" : "#7A7870", marginTop: 3, display: "inline-block" }}>{c.status}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 8 }}>
              <ArrowDownRight size={14} style={{ color: "#E05C5C" }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#E8E6E1" }}>A Pagar</span>
            </div>
            {CONTAS_PAGAR.map((c, i) => (
              <div key={i} style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, color: "#E8E6E1" }}>{c.desc}</div>
                  <div style={{ fontSize: 10, color: "#7A7870", marginTop: 2 }}>Vence {c.venc}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#E05C5C", fontFamily: "JetBrains Mono, monospace" }}>R$ {c.valor.toLocaleString("pt-BR")}</div>
                  <div style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, background: "rgba(224,92,92,0.1)", color: "#7A7870", marginTop: 3, display: "inline-block" }}>{c.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "fluxo" && (
        <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 13, color: "#E8E6E1", fontWeight: 500, marginBottom: 16 }}>Fluxo de Caixa — Julho/Agosto 2024</div>
          {GRAFICO_RECEITAS.map((m, i) => {
            const saldo = m.receita - m.despesa;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ width: 36, fontSize: 11, color: "#7A7870", fontFamily: "JetBrains Mono, monospace" }}>{m.mes}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                    <div style={{ height: 6, borderRadius: 3, background: "#4CAF82", width: `${(m.receita / 200000) * 100}%`, transition: "width 0.8s ease" }} />
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ height: 6, borderRadius: 3, background: "#E05C5C", width: `${(m.despesa / 200000) * 100}%`, transition: "width 0.8s ease" }} />
                  </div>
                </div>
                <div style={{ textAlign: "right", minWidth: 100 }}>
                  <div style={{ fontSize: 11, color: saldo > 0 ? "#4CAF82" : "#E05C5C", fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>+R$ {saldo.toLocaleString("pt-BR")}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "dre" && (
        <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 24, maxWidth: 500 }}>
          <div style={{ fontSize: 13, color: "#E8E6E1", fontWeight: 500, marginBottom: 20 }}>DRE Simplificada — Julho 2024</div>
          {[
            { label: "Receita Bruta", value: 189000, tipo: "positivo", nivel: 0 },
            { label: "(-) Deduções e Impostos", value: -17010, tipo: "negativo", nivel: 1 },
            { label: "= Receita Líquida", value: 171990, tipo: "subtotal", nivel: 0 },
            { label: "(-) Custo dos Produtos Vendidos", value: -72400, tipo: "negativo", nivel: 1 },
            { label: "= Lucro Bruto", value: 99590, tipo: "subtotal", nivel: 0 },
            { label: "(-) Despesas Operacionais", value: -34200, tipo: "negativo", nivel: 1 },
            { label: "(-) Comissões", value: -9450, tipo: "negativo", nivel: 1 },
            { label: "(-) Retrabalhos", value: -3550, tipo: "negativo", nivel: 1 },
            { label: "= Lucro Operacional", value: 52390, tipo: "subtotal", nivel: 0 },
            { label: "(-) Impostos s/ Resultado", value: -9430, tipo: "negativo", nivel: 1 },
            { label: "= Lucro Líquido", value: 42960, tipo: "total", nivel: 0 },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: `${row.tipo === "subtotal" || row.tipo === "total" ? 10 : 8}px ${row.nivel > 0 ? 20 : 0}px`, borderTop: row.tipo === "subtotal" || row.tipo === "total" ? "1px solid rgba(255,255,255,0.07)" : "none", marginTop: row.tipo === "subtotal" || row.tipo === "total" ? 4 : 0 }}>
              <span style={{ fontSize: 12, color: row.tipo === "total" ? "#C9A84C" : row.tipo === "subtotal" ? "#E8E6E1" : "#9A9890", fontWeight: row.tipo === "total" ? 600 : row.tipo === "subtotal" ? 500 : 400 }}>{row.label}</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: row.tipo === "total" ? 700 : 500, color: row.tipo === "total" ? "#C9A84C" : row.value >= 0 ? "#4CAF82" : "#E05C5C" }}>
                {row.value >= 0 ? "" : ""}R$ {Math.abs(row.value).toLocaleString("pt-BR")}
              </span>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(201,168,76,0.08)", borderRadius: 8, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "#7A7870" }}>Margem Líquida</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#C9A84C", fontFamily: "JetBrains Mono, monospace" }}>22,7%</span>
          </div>
        </div>
      )}
    </div>
  );
}

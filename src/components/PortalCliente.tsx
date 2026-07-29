import { useState } from "react";
import { PORTAL_ETAPAS, PORTAL_PAGAMENTOS } from "../data";
import { CheckCircle, Clock, CreditCard, Image, Calendar, Package, ExternalLink, Camera } from "lucide-react";

const FOTOS_PROD = [
  { label: "Chapas cortadas", data: "24 Jul" },
  { label: "Furação CNC", data: "25 Jul" },
  { label: "Montagem corpo", data: "26 Jul" },
  { label: "Gavetas", data: "27 Jul" },
];

export default function PortalCliente() {
  const [tabPortal, setTabPortal] = useState<"timeline" | "renders" | "materiais" | "fotos">("timeline");

  const totalPago = PORTAL_PAGAMENTOS.filter(p => p.status === "pago").reduce((s, p) => s + p.valor, 0);
  const totalGeral = PORTAL_PAGAMENTOS.reduce((s, p) => s + p.valor, 0);
  const pctPago = Math.round((totalPago / totalGeral) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#0B0C0E", fontFamily: "DM Sans, sans-serif" }}>
      {/* Header do portal — visão do cliente */}
      <div style={{ background: "linear-gradient(135deg, #0F1013 0%, #141518 100%)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #C9A84C, #9A7A32)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#0B0C0E", fontWeight: 700, fontSize: 15, fontFamily: "JetBrains Mono, monospace" }}>M</span>
          </div>
          <div>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 16, color: "#E8E6E1" }}>Móveis Arte</div>
            <div style={{ fontSize: 10, color: "#7A7870", letterSpacing: 0.5 }}>PORTAL DO CLIENTE</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #C9A84C, #9A7A32)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#0B0C0E" }}>RC</div>
          <div>
            <div style={{ fontSize: 12, color: "#E8E6E1", fontWeight: 500 }}>Família Rodrigues</div>
            <div style={{ fontSize: 10, color: "#7A7870" }}>P-2024-041</div>
          </div>
          <ExternalLink size={13} style={{ color: "#5A5850", marginLeft: 8 }} />
        </div>
      </div>

      <div style={{ padding: "32px 40px" }}>
        {/* Hero do projeto */}
        <div style={{ background: "linear-gradient(135deg, #141518, #1C1D22)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px 28px", marginBottom: 24, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "#C9A84C", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "JetBrains Mono, monospace", marginBottom: 8 }}>Seu Projeto</div>
            <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 400, color: "#E8E6E1", margin: "0 0 6px" }}>Cozinha + Área de Serviço</h1>
            <div style={{ fontSize: 13, color: "#7A7870" }}>Residência Costa · Vila Olímpia, São Paulo</div>
            <div style={{ marginTop: 16, display: "flex", gap: 20 }}>
              <div>
                <div style={{ fontSize: 10, color: "#5A5850" }}>INÍCIO</div>
                <div style={{ fontSize: 12, color: "#E8E6E1", fontWeight: 500 }}>15 Jul 2024</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#5A5850" }}>PREVISÃO ENTREGA</div>
                <div style={{ fontSize: 12, color: "#C9A84C", fontWeight: 500 }}>10 Ago 2024</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#5A5850" }}>MONTAGEM</div>
                <div style={{ fontSize: 12, color: "#E8E6E1", fontWeight: 500 }}>12–14 Ago 2024</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "#5A5850", marginBottom: 4 }}>STATUS ATUAL</div>
            <div style={{ fontSize: 13, padding: "6px 14px", background: "rgba(232,168,56,0.15)", color: "#E8A838", borderRadius: 6, fontWeight: 500 }}>Em Produção</div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 10, color: "#5A5850", marginBottom: 6 }}>PAGAMENTO</div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden", width: 140 }}>
                <div style={{ height: "100%", width: `${pctPago}%`, background: "#C9A84C", borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 10, color: "#7A7870", marginTop: 4 }}>{pctPago}% pago · R$ {totalPago.toLocaleString("pt-BR")}/{totalGeral.toLocaleString("pt-BR")}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#141518", padding: 4, borderRadius: 8, width: "fit-content" }}>
          {(["timeline", "renders", "materiais", "fotos"] as const).map(t => (
            <button key={t} onClick={() => setTabPortal(t)} style={{ padding: "7px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontFamily: "DM Sans, sans-serif", background: tabPortal === t ? "#1C1D22" : "transparent", color: tabPortal === t ? "#E8E6E1" : "#7A7870", fontWeight: tabPortal === t ? 500 : 400, transition: "all 0.15s" }}>
              {t === "timeline" ? "Linha do Tempo" : t === "renders" ? "Renders 3D" : t === "materiais" ? "Materiais" : "Produção"}
            </button>
          ))}
        </div>

        {tabPortal === "timeline" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
            {/* Timeline */}
            <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#E8E6E1", marginBottom: 24 }}>Etapas do Projeto</div>
              {PORTAL_ETAPAS.map((etapa, i) => {
                const isLast = i === PORTAL_ETAPAS.length - 1;
                return (
                  <div key={etapa.id} style={{ display: "flex", gap: 16, position: "relative" }}>
                    {/* Linha conectora */}
                    {!isLast && (
                      <div style={{ position: "absolute", left: 11, top: 26, bottom: -8, width: 2, background: etapa.concluido ? "#C9A84C" : "rgba(255,255,255,0.06)" }} />
                    )}
                    {/* Ícone */}
                    <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, border: etapa.atual ? "2px solid #C9A84C" : "none", background: etapa.concluido ? "#C9A84C" : etapa.atual ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                      {etapa.concluido ? <CheckCircle size={12} style={{ color: "#0B0C0E" }} /> : etapa.atual ? <Clock size={11} style={{ color: "#C9A84C" }} /> : <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />}
                    </div>
                    {/* Conteúdo */}
                    <div style={{ flex: 1, paddingBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: etapa.concluido ? "#E8E6E1" : etapa.atual ? "#C9A84C" : "#5A5850", fontWeight: etapa.atual ? 600 : 400 }}>{etapa.label}</span>
                        <span style={{ fontSize: 11, color: etapa.concluido ? "#4CAF82" : etapa.atual ? "#C9A84C" : "#5A5850", fontFamily: "JetBrains Mono, monospace" }}>{etapa.data}</span>
                      </div>
                      {etapa.atual && (
                        <div style={{ marginTop: 6, fontSize: 11, color: "#7A7870" }}>Sua cozinha está em produção na fábrica. Fotos e atualizações disponíveis em Produção.</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagamentos + Aprovações */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <CreditCard size={14} style={{ color: "#C9A84C" }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#E8E6E1" }}>Pagamentos</span>
                </div>
                {PORTAL_PAGAMENTOS.map((p, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < PORTAL_PAGAMENTOS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "#E8E6E1" }}>{p.desc}</div>
                      <div style={{ fontSize: 10, color: "#7A7870", marginTop: 1 }}>{p.data}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "JetBrains Mono, monospace", color: p.status === "pago" ? "#4CAF82" : p.status === "vencendo" ? "#E8A838" : "#7A7870" }}>R$ {p.valor.toLocaleString("pt-BR")}</div>
                      <div style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, marginTop: 3, background: p.status === "pago" ? "rgba(76,175,130,0.12)" : p.status === "vencendo" ? "rgba(232,168,56,0.12)" : "rgba(255,255,255,0.04)", color: p.status === "pago" ? "#4CAF82" : p.status === "vencendo" ? "#E8A838" : "#5A5850", display: "inline-block" }}>{p.status === "pago" ? "Pago" : p.status === "vencendo" ? "Vence hoje" : "Pendente"}</div>
                    </div>
                  </div>
                ))}
                <button style={{ marginTop: 12, width: "100%", padding: "9px", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 7, color: "#C9A84C", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>
                  Pagar 2ª Parcela →
                </button>
              </div>

              <div style={{ background: "#141518", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#C9A84C", marginBottom: 10 }}>Aprovação Pendente</div>
                <div style={{ fontSize: 12, color: "#E8E6E1", marginBottom: 8 }}>Confirmação de cor — Frente das gavetas</div>
                <div style={{ fontSize: 11, color: "#7A7870", marginBottom: 14 }}>Aguardando sua confirmação entre Branco Neve (atual) ou Off-White para a frente das gavetas inferiores.</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ flex: 1, padding: "8px", background: "rgba(76,175,130,0.15)", border: "1px solid rgba(76,175,130,0.3)", borderRadius: 7, color: "#4CAF82", fontSize: 12, cursor: "pointer" }}>Aprovar</button>
                  <button style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, color: "#7A7870", fontSize: 12, cursor: "pointer" }}>Revisar</button>
                </div>
              </div>

              <div style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Calendar size={14} style={{ color: "#5C9BE0" }} />
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#E8E6E1" }}>Agendar Montagem</span>
                </div>
                <div style={{ fontSize: 11, color: "#7A7870", marginBottom: 12 }}>Previsão: 12–14 Agosto. Confirme o horário de entrada para equipe de montagem.</div>
                <button style={{ width: "100%", padding: "9px", background: "rgba(92,155,224,0.12)", border: "1px solid rgba(92,155,224,0.25)", borderRadius: 7, color: "#5C9BE0", fontSize: 12, cursor: "pointer" }}>
                  Confirmar Data de Montagem →
                </button>
              </div>
            </div>
          </div>
        )}

        {tabPortal === "renders" && (
          <div>
            <div style={{ fontSize: 13, color: "#7A7870", marginBottom: 16 }}>Renders e visualizações 3D aprovados pelo cliente</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {["Cozinha — Visão Geral", "Bancada e Cooktop", "Área de Serviço", "Detalhe Gavetas"].map((label, i) => (
                <div key={i} style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: 180, background: `linear-gradient(${135 + i * 25}deg, #141820, #1E2230, #16191F)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      <Image size={24} style={{ color: "rgba(255,255,255,0.15)" }} />
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.1)", marginTop: 6 }}>Render 3D</div>
                    </div>
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ fontSize: 12, color: "#E8E6E1" }}>{label}</div>
                    <div style={{ fontSize: 10, color: "#5A5850", marginTop: 2 }}>Aprovado em 20 Jul 2024</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tabPortal === "materiais" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
            {[
              { nome: "MDF Branco Neve", cat: "Corpo principal", acabamento: "Lacado BP", aprovado: true },
              { nome: "Frente Off-White", cat: "Portas e gavetas", acabamento: "Lacado UV fosco", aprovado: false },
              { nome: "Quartzo Stellar White", cat: "Bancada", acabamento: "Polido", aprovado: true },
              { nome: "Corrediça Blum Tandem", cat: "Gavetas", acabamento: "Soft-close", aprovado: true },
              { nome: "Dobradiça Clip Top 110°", cat: "Portas", acabamento: "Níquel escovado", aprovado: true },
              { nome: "Puxador Cilidro 128mm", cat: "Geral", acabamento: "Inox escovado", aprovado: true },
            ].map((m, i) => (
              <div key={i} style={{ background: "#141518", border: `1px solid ${m.aprovado ? "rgba(255,255,255,0.07)" : "rgba(201,168,76,0.2)"}`, borderRadius: 10, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Package size={14} style={{ color: "#7A7870" }} />
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: m.aprovado ? "rgba(76,175,130,0.12)" : "rgba(201,168,76,0.15)", color: m.aprovado ? "#4CAF82" : "#C9A84C" }}>{m.aprovado ? "Aprovado" : "Aguardando"}</span>
                </div>
                <div style={{ fontSize: 13, color: "#E8E6E1", fontWeight: 500 }}>{m.nome}</div>
                <div style={{ fontSize: 11, color: "#7A7870", marginTop: 3 }}>{m.cat}</div>
                <div style={{ fontSize: 10, color: "#5A5850", marginTop: 2 }}>{m.acabamento}</div>
              </div>
            ))}
          </div>
        )}

        {tabPortal === "fotos" && (
          <div>
            <div style={{ fontSize: 13, color: "#7A7870", marginBottom: 16 }}>Fotos do andamento da produção — atualizadas pela equipe de fábrica</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
              {FOTOS_PROD.map((foto, i) => (
                <div key={i} style={{ background: "#141518", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ height: 150, background: `linear-gradient(${140 + i * 30}deg, #161820, #1A1D28, #141518)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Camera size={20} style={{ color: "rgba(255,255,255,0.12)" }} />
                  </div>
                  <div style={{ padding: "10px 14px" }}>
                    <div style={{ fontSize: 12, color: "#E8E6E1" }}>{foto.label}</div>
                    <div style={{ fontSize: 10, color: "#5A5850", marginTop: 2 }}>{foto.data}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: "#141518", border: "1px dashed rgba(255,255,255,0.07)", borderRadius: 10, minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, color: "#5A5850" }}>Novas fotos em breve</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

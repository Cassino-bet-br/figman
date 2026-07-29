import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type Etapa = {
  nome: string
  planejada: string
  concluida?: string
  responsavel: string
  concluido: boolean
  checklist: { item: string; feito: boolean }[]
}

type Material = {
  descricao: string
  qtd: string
  unidade: string
  valorUnit: number
  total: number
  status: 'disponivel' | 'aguardando' | 'falta'
}

type Order = {
  id: string
  numero: string
  cliente: string
  ambientes: string[]
  valor: number
  responsavel: string
  responsavelIniciais: string
  progresso: number
  prazo: string
  diasRestantes: number
  atrasado: boolean
  etapa: string
  estado: 'PR' | 'SC'
  etapas: Etapa[]
  materiais: Material[]
  custosPrevisto: number
  custosReal: number
  imagem: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const ETAPAS_KANBAN = [
  'Liberado', 'Separação', 'Corte', 'Borda', 'Usinagem',
  'Montagem', 'Acabamento', 'Qualidade', 'Embalagem', 'Expedição',
]

const CHECKLIST_BASE = [
  { item: 'Conferir medidas', feito: true },
  { item: 'Separar materiais', feito: false },
  { item: 'Registrar início', feito: false },
]

const ORDERS: Order[] = [
  {
    id: '1', numero: 'PD-2407-001', cliente: 'Ana Paula Ribeiro',
    ambientes: ['Cozinha', 'Lavanderia'], valor: 38500, responsavel: 'Marcos Silva',
    responsavelIniciais: 'MS', progresso: 45, prazo: '14 ago', diasRestantes: 17,
    atrasado: false, etapa: 'Corte', estado: 'PR',
    etapas: [
      { nome: 'Liberado', planejada: '15 jul', concluida: '15 jul', responsavel: 'Carla N.', concluido: true, checklist: [{ item: 'Aprovar projeto', feito: true }, { item: 'Assinar contrato', feito: true }] },
      { nome: 'Separação', planejada: '18 jul', concluida: '18 jul', responsavel: 'Marcos S.', concluido: true, checklist: CHECKLIST_BASE.map(c => ({ ...c, feito: true })) },
      { nome: 'Corte', planejada: '22 jul', responsavel: 'Felipe R.', concluido: false, checklist: CHECKLIST_BASE },
      { nome: 'Borda', planejada: '24 jul', responsavel: 'Felipe R.', concluido: false, checklist: CHECKLIST_BASE },
      { nome: 'Usinagem', planejada: '26 jul', responsavel: 'Marcos S.', concluido: false, checklist: CHECKLIST_BASE },
      { nome: 'Montagem', planejada: '30 jul', responsavel: 'Marcos S.', concluido: false, checklist: CHECKLIST_BASE },
      { nome: 'Acabamento', planejada: '2 ago', responsavel: 'Carla N.', concluido: false, checklist: CHECKLIST_BASE },
      { nome: 'Qualidade', planejada: '5 ago', responsavel: 'Ricardo C.', concluido: false, checklist: CHECKLIST_BASE },
      { nome: 'Embalagem', planejada: '8 ago', responsavel: 'Marcos S.', concluido: false, checklist: CHECKLIST_BASE },
      { nome: 'Expedição', planejada: '14 ago', responsavel: 'Felipe R.', concluido: false, checklist: CHECKLIST_BASE },
    ],
    materiais: [
      { descricao: 'MDF Eucatex 18mm BP', qtd: '12', unidade: 'chapa', valorUnit: 148, total: 1776, status: 'disponivel' },
      { descricao: 'Corrediça Blum Tandem 500mm', qtd: '8', unidade: 'par', valorUnit: 112, total: 896, status: 'aguardando' },
      { descricao: 'Dobradiça Clip Top 110°', qtd: '24', unidade: 'un', valorUnit: 18, total: 432, status: 'disponivel' },
      { descricao: 'Fita de borda BP Branco TX 0,4mm', qtd: '120', unidade: 'm', valorUnit: 1.2, total: 144, status: 'disponivel' },
      { descricao: 'Puxador Perfil 1200mm', qtd: '6', unidade: 'un', valorUnit: 68, total: 408, status: 'falta' },
    ],
    custosPrevisto: 24200, custosReal: 19800,
    imagem: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '2', numero: 'PD-2407-002', cliente: 'Bruno Fernandes',
    ambientes: ['Escritório'], valor: 22800, responsavel: 'Carla Nunes',
    responsavelIniciais: 'CN', progresso: 80, prazo: '28 jul', diasRestantes: -2,
    atrasado: true, etapa: 'Qualidade', estado: 'SC',
    etapas: ETAPAS_KANBAN.map((nome, i) => ({ nome, planejada: `${14 + i} jul`, concluida: i < 7 ? `${15 + i} jul` : undefined, responsavel: 'Carla N.', concluido: i < 7, checklist: CHECKLIST_BASE })),
    materiais: [
      { descricao: 'MDF Eucatex 15mm BP', qtd: '6', unidade: 'chapa', valorUnit: 132, total: 792, status: 'disponivel' },
      { descricao: 'Dobradiça Clip Top 110°', qtd: '12', unidade: 'un', valorUnit: 18, total: 216, status: 'disponivel' },
    ],
    custosPrevisto: 13500, custosReal: 14200,
    imagem: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '3', numero: 'PD-2407-003', cliente: 'Diego Martins',
    ambientes: ['Cozinha'], valor: 45000, responsavel: 'Marcos Silva',
    responsavelIniciais: 'MS', progresso: 65, prazo: '31 jul', diasRestantes: 1,
    atrasado: false, etapa: 'Montagem', estado: 'PR',
    etapas: ETAPAS_KANBAN.map((nome, i) => ({ nome, planejada: `${10 + i} jul`, concluida: i < 5 ? `${11 + i} jul` : undefined, responsavel: 'Marcos S.', concluido: i < 5, checklist: CHECKLIST_BASE })),
    materiais: [
      { descricao: 'MDF Eucatex 18mm Carvalho', qtd: '16', unidade: 'chapa', valorUnit: 165, total: 2640, status: 'disponivel' },
      { descricao: 'Tampo Granito Preto São Gabriel', qtd: '1', unidade: 'm²', valorUnit: 620, total: 620, status: 'aguardando' },
    ],
    custosPrevisto: 28800, custosReal: 27100,
    imagem: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '4', numero: 'PD-2407-004', cliente: 'Giovanna Lima',
    ambientes: ['Banheiro', 'Lavabo'], valor: 14200, responsavel: 'Felipe Ramos',
    responsavelIniciais: 'FR', progresso: 98, prazo: '29 jul', diasRestantes: -1,
    atrasado: true, etapa: 'Expedição', estado: 'SC',
    etapas: ETAPAS_KANBAN.map((nome, i) => ({ nome, planejada: `${5 + i} jul`, concluida: i < 9 ? `${6 + i} jul` : undefined, responsavel: 'Felipe R.', concluido: i < 9, checklist: CHECKLIST_BASE.map(c => ({ ...c, feito: true })) })),
    materiais: [
      { descricao: 'MDF Eucatex 15mm Branco', qtd: '4', unidade: 'chapa', valorUnit: 132, total: 528, status: 'disponivel' },
    ],
    custosPrevisto: 8200, custosReal: 8400,
    imagem: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '5', numero: 'PD-2407-005', cliente: 'Camila Torres',
    ambientes: ['Quarto Casal', 'Closet'], valor: 31200, responsavel: 'Felipe Ramos',
    responsavelIniciais: 'FR', progresso: 10, prazo: '22 ago', diasRestantes: 25,
    atrasado: false, etapa: 'Liberado', estado: 'PR',
    etapas: ETAPAS_KANBAN.map((nome, i) => ({ nome, planejada: `${28 + i} jul`, responsavel: 'Felipe R.', concluido: false, checklist: CHECKLIST_BASE })),
    materiais: [
      { descricao: 'MDF Eucatex 18mm Linho', qtd: '10', unidade: 'chapa', valorUnit: 158, total: 1580, status: 'aguardando' },
      { descricao: 'Corrediça Blum Movento 600mm', qtd: '10', unidade: 'par', valorUnit: 128, total: 1280, status: 'aguardando' },
    ],
    custosPrevisto: 19500, custosReal: 0,
    imagem: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '6', numero: 'PD-2407-006', cliente: 'Fábio Oliveira',
    ambientes: ['Escritório', 'Sala de Reunião'], valor: 29400, responsavel: 'Carla Nunes',
    responsavelIniciais: 'CN', progresso: 30, prazo: '5 ago', diasRestantes: 8,
    atrasado: false, etapa: 'Borda', estado: 'PR',
    etapas: ETAPAS_KANBAN.map((nome, i) => ({ nome, planejada: `${20 + i} jul`, concluida: i < 3 ? `${21 + i} jul` : undefined, responsavel: 'Carla N.', concluido: i < 3, checklist: CHECKLIST_BASE })),
    materiais: [
      { descricao: 'MDF Eucatex 18mm Grafite', qtd: '8', unidade: 'chapa', valorUnit: 162, total: 1296, status: 'disponivel' },
      { descricao: 'Vidro Temperado 6mm', qtd: '2', unidade: 'm²', valorUnit: 280, total: 560, status: 'falta' },
    ],
    custosPrevisto: 17800, custosReal: 8900,
    imagem: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=180&h=120&fit=crop&auto=format',
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const brl = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v)

const statusMaterial = {
  disponivel: { label: 'Disponível', color: '#4E7C59', bg: 'rgba(78,124,89,0.1)' },
  aguardando: { label: 'Aguardando', color: '#C89A3C', bg: 'rgba(200,154,60,0.1)' },
  falta: { label: 'Falta', color: '#B4553F', bg: 'rgba(180,85,63,0.1)' },
}

// ── Side Panel ────────────────────────────────────────────────────────────────

function SidePanel({ order, onClose, darkMode }: { order: Order; onClose: () => void; darkMode: boolean }) {
  const [tab, setTab] = useState<'etapas' | 'materiais' | 'custos'>('etapas')

  const cardBg = darkMode ? '#1E1B18' : '#FBFAF7'
  const bg = darkMode ? '#181512' : '#F4F1EC'
  const border = darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'
  const text = darkMode ? '#FBFAF7' : '#141210'
  const muted = '#8A857D'

  const margem = order.custosReal > 0
    ? ((order.valor - order.custosReal) / order.valor * 100).toFixed(1)
    : ((order.valor - order.custosPrevisto) / order.valor * 100).toFixed(1)

  const tabs = [
    { id: 'etapas', label: 'Etapas' },
    { id: 'materiais', label: 'Materiais' },
    { id: 'custos', label: 'Custos & Margem' },
  ] as const

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(20,18,16,0.4)', zIndex: 40, backdropFilter: 'blur(2px)' }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed', right: 0, top: 0, bottom: 0, width: '480px', maxWidth: '95vw',
          backgroundColor: bg, zIndex: 50, display: 'flex', flexDirection: 'column',
          boxShadow: '-12px 0 40px rgba(20,18,16,0.18)',
          animation: 'slideIn 0.25s ease',
        }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: none; opacity: 1; } }`}</style>

        {/* Header */}
        <div style={{ padding: '20px 24px 0', borderBottom: `1px solid ${border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#A9784F', textTransform: 'uppercase' }}>
                  {order.numero}
                </span>
                {order.atrasado && (
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#FBFAF7', backgroundColor: '#B4553F', borderRadius: '20px', padding: '1px 7px' }}>Atrasado</span>
                )}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: text, margin: 0 }}>
                {order.cliente}
              </h2>
              <p style={{ fontSize: '12px', color: muted, margin: '3px 0 0' }}>
                {order.ambientes.join(' · ')} · {order.estado}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: muted, padding: '4px', borderRadius: '6px', display: 'flex' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Quick stats row */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
            {[
              { label: 'Valor', value: brl(order.valor) },
              { label: 'Progresso', value: `${order.progresso}%` },
              { label: 'Prazo', value: order.prazo },
              { label: 'Etapa', value: order.etapa },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', color: muted, textTransform: 'uppercase' }}>{s.label}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: text, marginTop: '2px' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0' }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1, padding: '8px 0', fontSize: '12.5px', fontWeight: tab === t.id ? 600 : 400,
                  color: tab === t.id ? '#A9784F' : muted, background: 'none', border: 'none',
                  borderBottom: `2px solid ${tab === t.id ? '#A9784F' : 'transparent'}`,
                  cursor: 'pointer', transition: 'color 0.15s, border-color 0.15s',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

          {/* ETAPAS */}
          {tab === 'etapas' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {order.etapas.map((etapa, i) => (
                <div key={etapa.nome} style={{ display: 'flex', gap: '14px' }}>
                  {/* Timeline line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px', flexShrink: 0 }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
                      backgroundColor: etapa.concluido ? '#4E7C59' : order.etapa === etapa.nome ? '#A9784F' : darkMode ? 'rgba(231,225,216,0.1)' : '#E7E1D8',
                      border: `2px solid ${etapa.concluido ? '#4E7C59' : order.etapa === etapa.nome ? '#A9784F' : darkMode ? 'rgba(231,225,216,0.15)' : '#E7E1D8'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {etapa.concluido && (
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FBFAF7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                      )}
                    </div>
                    {i < order.etapas.length - 1 && (
                      <div style={{ width: '2px', flex: 1, minHeight: '28px', backgroundColor: etapa.concluido ? '#4E7C59' : darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, paddingBottom: i < order.etapas.length - 1 ? '16px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '13px', fontWeight: order.etapa === etapa.nome ? 600 : 500, color: order.etapa === etapa.nome ? '#A9784F' : text }}>
                        {etapa.nome}
                      </span>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', color: muted }}>Planejado: {etapa.planejada}</div>
                        {etapa.concluida && <div style={{ fontSize: '11px', color: '#4E7C59' }}>Concluído: {etapa.concluida}</div>}
                      </div>
                    </div>
                    <div style={{ fontSize: '11.5px', color: muted, marginTop: '2px' }}>Resp.: {etapa.responsavel}</div>

                    {/* Checklist */}
                    {(etapa.concluido || order.etapa === etapa.nome) && (
                      <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {etapa.checklist.map(c => (
                          <div key={c.item} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{
                              width: '13px', height: '13px', borderRadius: '3px', flexShrink: 0,
                              backgroundColor: c.feito ? '#4E7C59' : 'transparent',
                              border: `1.5px solid ${c.feito ? '#4E7C59' : border}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              {c.feito && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FBFAF7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12" /></svg>}
                            </div>
                            <span style={{ fontSize: '11.5px', color: c.feito ? muted : text, textDecoration: c.feito ? 'line-through' : 'none' }}>{c.item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MATERIAIS */}
          {tab === 'materiais' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: text }}>Lista de materiais</span>
                <span style={{ fontSize: '12px', color: muted }}>{order.materiais.length} itens</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {order.materiais.map((mat, i) => {
                  const s = statusMaterial[mat.status]
                  return (
                    <div key={i} style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: 500, color: text, marginBottom: '3px' }}>{mat.descricao}</div>
                          <div style={{ fontSize: '11.5px', color: muted }}>{mat.qtd} {mat.unidade} · {brl(mat.valorUnit)}/{mat.unidade}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#A9784F' }}>{brl(mat.total)}</div>
                          <span style={{ fontSize: '10px', fontWeight: 600, color: s.color, backgroundColor: s.bg, borderRadius: '20px', padding: '1px 7px' }}>{s.label}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: '14px', padding: '12px 14px', backgroundColor: 'rgba(169,120,79,0.08)', borderRadius: '12px', border: '1px solid rgba(169,120,79,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: text }}>Total materiais</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#A9784F' }}>
                    {brl(order.materiais.reduce((s, m) => s + m.total, 0))}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOS */}
          {tab === 'custos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Resumo */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { label: 'Receita', value: order.valor, color: '#4E7C59' },
                  { label: 'Custo Previsto', value: order.custosPrevisto, color: text },
                  { label: 'Custo Real', value: order.custosReal || order.custosPrevisto, color: order.custosReal > order.custosPrevisto ? '#B4553F' : text },
                  { label: 'Margem Real', value: Number(margem), suffix: '%', color: Number(margem) >= 30 ? '#4E7C59' : '#B4553F' },
                ].map(item => (
                  <div key={item.label} style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, marginBottom: '6px' }}>{item.label}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: item.color }}>
                      {'suffix' in item ? `${item.value}%` : brl(item.value as number)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '14px', padding: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, marginBottom: '12px' }}>
                  Composição de Custos
                </div>
                {[
                  { label: 'Materiais', previsto: order.custosPrevisto * 0.62, real: order.custosReal * 0.61 || order.custosPrevisto * 0.62 },
                  { label: 'Mão de obra produção', previsto: order.custosPrevisto * 0.22, real: order.custosReal * 0.24 || order.custosPrevisto * 0.22 },
                  { label: 'Mão de obra montagem', previsto: order.custosPrevisto * 0.08, real: order.custosReal * 0.08 || order.custosPrevisto * 0.08 },
                  { label: 'Transporte', previsto: order.custosPrevisto * 0.04, real: order.custosReal * 0.04 || order.custosPrevisto * 0.04 },
                  { label: 'Impostos', previsto: order.custosPrevisto * 0.04, real: order.custosReal * 0.03 || order.custosPrevisto * 0.04 },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', marginBottom: '8px', borderBottom: `1px solid ${border}` }}>
                    <span style={{ fontSize: '12.5px', color: text }}>{row.label}</span>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                      <span style={{ color: muted }}>{brl(row.previsto)}</span>
                      <span style={{ fontWeight: 600, color: row.real > row.previsto * 1.05 ? '#B4553F' : text }}>{brl(row.real)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Margem bar */}
              <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '14px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: text }}>Margem de contribuição</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: Number(margem) >= 30 ? '#4E7C59' : '#B4553F' }}>{margem}%</span>
                </div>
                <div style={{ height: '10px', backgroundColor: darkMode ? 'rgba(231,225,216,0.08)' : '#F4F1EC', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(Number(margem), 100)}%`, backgroundColor: Number(margem) >= 30 ? '#4E7C59' : '#B4553F', borderRadius: '5px', transition: 'width 0.8s ease' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '11px', color: muted }}>
                  <span>0%</span>
                  <span>Meta 35%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ── Kanban Card ───────────────────────────────────────────────────────────────

function OrderCard({ order, onClick, darkMode }: { order: Order; onClick: () => void; darkMode: boolean }) {
  const [hovered, setHovered] = useState(false)
  const cardBg = darkMode ? '#1E1B18' : '#FBFAF7'
  const border = darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'
  const text = darkMode ? '#FBFAF7' : '#141210'

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${order.atrasado ? 'rgba(180,85,63,0.4)' : border}`,
        borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 10px 28px rgba(20,18,16,0.12)' : 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        minWidth: '180px',
      }}
    >
      <div style={{ position: 'relative', height: '80px', backgroundColor: '#E7E1D8' }}>
        <img src={order.imagem} alt={order.cliente} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {order.atrasado && (
          <span style={{ position: 'absolute', top: '6px', right: '6px', fontSize: '10px', fontWeight: 600, color: '#FBFAF7', backgroundColor: '#B4553F', borderRadius: '6px', padding: '2px 6px' }}>Atrasado</span>
        )}
      </div>
      <div style={{ padding: '10px 11px 11px' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#A9784F', textTransform: 'uppercase', marginBottom: '2px' }}>{order.numero}</div>
        <div style={{ fontSize: '12.5px', fontWeight: 600, color: text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.cliente}</div>
        <div style={{ fontSize: '11px', color: '#8A857D', marginBottom: '8px' }}>{order.ambientes.join(', ')}</div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#A9784F', marginBottom: '8px' }}>{brl(order.valor)}</div>

        {/* Progress */}
        <div style={{ height: '4px', backgroundColor: darkMode ? 'rgba(231,225,216,0.1)' : '#F4F1EC', borderRadius: '2px', marginBottom: '5px' }}>
          <div style={{ height: '100%', width: `${order.progresso}%`, background: order.atrasado ? '#B4553F' : 'linear-gradient(90deg, #A9784F, #C79A6E)', borderRadius: '2px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px' }}>
          <span style={{ color: '#8A857D' }}>{order.progresso}%</span>
          <span style={{ color: order.diasRestantes < 0 ? '#B4553F' : order.diasRestantes <= 3 ? '#C89A3C' : '#8A857D', fontWeight: 500 }}>
            {order.diasRestantes < 0 ? `${Math.abs(order.diasRestantes)}d atraso` : `${order.diasRestantes}d`}
          </span>
        </div>

        {/* Responsible + state */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg, #A9784F, #C79A6E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: 700, color: '#FBFAF7' }}>
              {order.responsavelIniciais}
            </div>
            <span style={{ fontSize: '10.5px', color: '#8A857D' }}>{order.responsavel.split(' ')[0]}</span>
          </div>
          <span style={{ fontSize: '10px', fontWeight: 600, color: '#8A857D', backgroundColor: darkMode ? 'rgba(231,225,216,0.06)' : '#F4F1EC', borderRadius: '4px', padding: '1px 5px' }}>{order.estado}</span>
        </div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Pedidos({ darkMode }: { darkMode: boolean }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<'todos' | 'atrasado' | 'no-prazo'>('todos')
  const [filterEstado, setFilterEstado] = useState<'todos' | 'PR' | 'SC'>('todos')
  const [filterResp, setFilterResp] = useState<string>('todos')

  const responsaveis = Array.from(new Set(ORDERS.map(o => o.responsavel)))

  const filtered = ORDERS.filter(o => {
    if (filterStatus === 'atrasado' && !o.atrasado) return false
    if (filterStatus === 'no-prazo' && o.atrasado) return false
    if (filterEstado !== 'todos' && o.estado !== filterEstado) return false
    if (filterResp !== 'todos' && o.responsavel !== filterResp) return false
    return true
  })

  const bg = darkMode ? '#141210' : '#F4F1EC'
  const cardBg = darkMode ? '#1E1B18' : '#FBFAF7'
  const border = darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'
  const text = darkMode ? '#FBFAF7' : '#141210'
  const muted = '#8A857D'

  const filterBtn = (active: boolean) => ({
    fontSize: '12px', fontWeight: active ? 600 : 400,
    color: active ? '#A9784F' : muted,
    backgroundColor: active ? 'rgba(169,120,79,0.1)' : cardBg,
    border: `1px solid ${active ? 'rgba(169,120,79,0.3)' : border}`,
    borderRadius: '8px', padding: '5px 12px', cursor: 'pointer',
    fontFamily: "'Inter', sans-serif", transition: 'all 0.15s',
  } as React.CSSProperties)

  const select = {
    fontSize: '12px', color: text, backgroundColor: cardBg,
    border: `1px solid ${border}`, borderRadius: '8px', padding: '5px 10px',
    cursor: 'pointer', fontFamily: "'Inter', sans-serif", outline: 'none',
  } as React.CSSProperties

  return (
    <div style={{ backgroundColor: bg, minHeight: '100%', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header + Filters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: text, margin: 0 }}>Pedidos em Produção</h2>
          <p style={{ fontSize: '12px', color: muted, margin: '3px 0 0' }}>{filtered.length} pedidos · clique no card para detalhes</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button style={filterBtn(filterStatus === 'todos')} onClick={() => setFilterStatus('todos')}>Todos</button>
          <button style={filterBtn(filterStatus === 'atrasado')} onClick={() => setFilterStatus('atrasado')}>Atrasados</button>
          <button style={filterBtn(filterStatus === 'no-prazo')} onClick={() => setFilterStatus('no-prazo')}>No prazo</button>
          <select style={select} value={filterEstado} onChange={e => setFilterEstado(e.target.value as 'todos' | 'PR' | 'SC')}>
            <option value="todos">PR + SC</option>
            <option value="PR">Paraná</option>
            <option value="SC">Santa Catarina</option>
          </select>
          <select style={select} value={filterResp} onChange={e => setFilterResp(e.target.value)}>
            <option value="todos">Todos responsáveis</option>
            {responsaveis.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Kanban */}
      <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', gap: '16px', minWidth: 'max-content' }}>
          {ETAPAS_KANBAN.map(etapa => {
            const orders = filtered.filter(o => o.etapa === etapa)
            return (
              <div key={etapa} style={{ minWidth: '196px', maxWidth: '196px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 2px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted }}>{etapa}</span>
                  <span style={{ fontSize: '11px', color: muted, backgroundColor: darkMode ? 'rgba(231,225,216,0.06)' : '#F4F1EC', borderRadius: '20px', padding: '1px 7px' }}>{orders.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {orders.length === 0 ? (
                    <div style={{ height: '60px', border: `1.5px dashed ${border}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '11px', color: muted }}>Vazio</span>
                    </div>
                  ) : orders.map(o => (
                    <OrderCard key={o.id} order={o} onClick={() => setSelectedOrder(o)} darkMode={darkMode} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Side panel */}
      {selectedOrder && (
        <SidePanel order={selectedOrder} onClose={() => setSelectedOrder(null)} darkMode={darkMode} />
      )}
    </div>
  )
}

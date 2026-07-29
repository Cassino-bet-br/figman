import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type OrcStatus = 'Aguardando' | 'Aprovado' | 'Recusado' | 'Em revisão'

type Orcamento = {
  id: string
  numero: string
  cliente: string
  ambientes: string[]
  valor: number
  data: string
  validade: string
  status: OrcStatus
  arquiteto?: string
}

type LineItem = {
  id: string
  descricao: string
  qtd: number
  unidade: string
  valorUnit: number
  categoria: 'material' | 'mao-obra' | 'fixo'
}

type OrcVersion = 'essencial' | 'intermediaria' | 'premium'

// ── Data ──────────────────────────────────────────────────────────────────────

const ORCAMENTOS: Orcamento[] = [
  { id: '1', numero: 'ORC-2407-001', cliente: 'Ana Paula Ribeiro', ambientes: ['Cozinha', 'Lavanderia'], valor: 38500, data: '02 jul', validade: '16 jul', status: 'Aprovado', arquiteto: 'Studio Forma' },
  { id: '2', numero: 'ORC-2407-002', cliente: 'Bruno Fernandes', ambientes: ['Escritório'], valor: 22800, data: '05 jul', validade: '19 jul', status: 'Aprovado' },
  { id: '3', numero: 'ORC-2407-003', cliente: 'Elena Souza', ambientes: ['Sala de estar', 'Painel TV'], valor: 18700, data: '23 jul', validade: '06 ago', status: 'Aguardando' },
  { id: '4', numero: 'ORC-2407-004', cliente: 'Fábio Oliveira', ambientes: ['Escritório', 'Sala de Reunião'], valor: 29400, data: '24 jul', validade: '07 ago', status: 'Em revisão', arquiteto: 'AK Arquitetura' },
  { id: '5', numero: 'ORC-2407-005', cliente: 'Isabela Matos', ambientes: ['Cozinha', 'Área Gourmet'], valor: 52300, data: '25 jul', validade: '08 ago', status: 'Aguardando', arquiteto: 'Studio Forma' },
  { id: '6', numero: 'ORC-2406-018', cliente: 'João Batista', ambientes: ['Quarto Master'], valor: 24100, data: '18 jun', validade: '02 jul', status: 'Recusado' },
  { id: '7', numero: 'ORC-2407-006', cliente: 'Karen Silva', ambientes: ['Closet'], valor: 16800, data: '26 jul', validade: '09 ago', status: 'Aguardando' },
  { id: '8', numero: 'ORC-2407-007', cliente: 'Lucas Mendes', ambientes: ['Home Office'], valor: 12400, data: '27 jul', validade: '10 ago', status: 'Aprovado', arquiteto: 'MH Interiores' },
]

const LINE_ITEMS_BASE: LineItem[] = [
  { id: '1', descricao: 'MDF 18mm (chapa)', qtd: 10, unidade: 'chapa', valorUnit: 148, categoria: 'material' },
  { id: '2', descricao: 'Ferragens (dobradiças, puxadores)', qtd: 1, unidade: 'vb', valorUnit: 850, categoria: 'material' },
  { id: '3', descricao: 'Corrediças Blum', qtd: 6, unidade: 'par', valorUnit: 112, categoria: 'material' },
  { id: '4', descricao: 'Fita de borda 0,4mm', qtd: 80, unidade: 'm', valorUnit: 1.2, categoria: 'material' },
  { id: '5', descricao: 'Vidros temperados', qtd: 0, unidade: 'm²', valorUnit: 280, categoria: 'material' },
  { id: '6', descricao: 'Horas produção', qtd: 40, unidade: 'h', valorUnit: 65, categoria: 'mao-obra' },
  { id: '7', descricao: 'Horas montagem', qtd: 16, unidade: 'h', valorUnit: 85, categoria: 'mao-obra' },
  { id: '8', descricao: 'Transporte / logística', qtd: 1, unidade: 'vb', valorUnit: 380, categoria: 'fixo' },
  { id: '9', descricao: 'Impostos (Simples Nacional)', qtd: 1, unidade: 'vb', valorUnit: 0, categoria: 'fixo' },
  { id: '10', descricao: 'Comissão vendedor', qtd: 1, unidade: 'vb', valorUnit: 0, categoria: 'fixo' },
]

const VERSION_MULTIPLIERS: Record<OrcVersion, number> = {
  essencial: 1,
  intermediaria: 1.28,
  premium: 1.62,
}

const VERSION_LABELS: Record<OrcVersion, { label: string; desc: string; badge: string }> = {
  essencial: { label: 'Essencial', desc: 'MDF Branco, ferragens básicas, acabamento padrão', badge: '#8A857D' },
  intermediaria: { label: 'Intermediária', desc: 'MDF texturizado, ferragens Blum, soft-close', badge: '#A9784F' },
  premium: { label: 'Premium', desc: 'MDF importado, ferragens Blum Legrabox, vidros, LED', badge: '#C89A3C' },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const brl = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v)

const STATUS_STYLE: Record<OrcStatus, { color: string; bg: string }> = {
  Aprovado: { color: '#4E7C59', bg: 'rgba(78,124,89,0.1)' },
  Aguardando: { color: '#C89A3C', bg: 'rgba(200,154,60,0.1)' },
  Recusado: { color: '#B4553F', bg: 'rgba(180,85,63,0.1)' },
  'Em revisão': { color: '#5A7EA0', bg: 'rgba(90,126,160,0.1)' },
}

// ── Proposal Preview ──────────────────────────────────────────────────────────

function ProposalPreview({ items, version, cliente, ambientes, margem, comissao, onClose }: {
  items: LineItem[]; version: OrcVersion; cliente: string; ambientes: string; margem: number; comissao: number; onClose: () => void
}) {
  const mult = VERSION_MULTIPLIERS[version]
  const custoBase = items.reduce((s, i) => s + i.qtd * i.valorUnit, 0)
  const custoFinal = custoBase * mult
  const impostos = custoFinal * 0.06
  const comissaoVal = custoFinal * (comissao / 100)
  const margemVal = custoFinal * (margem / 100)
  const total = custoFinal + impostos + comissaoVal + margemVal
  const v = VERSION_LABELS[version]

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(20,18,16,0.6)', zIndex: 60, backdropFilter: 'blur(4px)' }} />
      <div style={{
        position: 'fixed', top: '5vh', left: '50%', transform: 'translateX(-50%)',
        width: '620px', maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto',
        backgroundColor: '#FBFAF7', borderRadius: '20px', zIndex: 70,
        boxShadow: '0 32px 80px rgba(20,18,16,0.3)',
      }}>
        {/* Capa */}
        <div style={{ background: 'linear-gradient(135deg, #141210 0%, #2a2218 60%, #3d2e1a 100%)', padding: '48px 44px 36px', borderRadius: '20px 20px 0 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(88deg, transparent, transparent 3px, rgba(169,120,79,0.04) 3px, rgba(169,120,79,0.04) 6px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #A9784F, #C79A6E)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '20px', color: '#FBFAF7' }}>M</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '15px', color: '#FBFAF7' }}>Marcenaria Mobile</div>
                <div style={{ fontSize: '10px', color: 'rgba(201,154,110,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Móveis planejados premium</div>
              </div>
            </div>
            <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(201,154,110,0.7)', marginBottom: '8px' }}>Proposta Comercial</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: '#FBFAF7', margin: '0 0 8px', lineHeight: 1.2 }}>
              {cliente || 'Cliente'}
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(251,250,247,0.55)', margin: '0 0 24px' }}>{ambientes || 'Ambientes a definir'}</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FBFAF7', backgroundColor: v.badge, borderRadius: '20px', padding: '4px 14px', letterSpacing: '0.06em' }}>
                Versão {v.label}
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(251,250,247,0.4)' }}>Válida por 15 dias</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 44px' }}>
          {/* Render placeholder */}
          <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '28px', backgroundColor: '#E7E1D8', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=620&h=200&fit=crop&auto=format" alt="render" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Descrição versão */}
          <div style={{ backgroundColor: 'rgba(169,120,79,0.07)', border: '1px solid rgba(169,120,79,0.2)', borderRadius: '12px', padding: '16px 18px', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A9784F', marginBottom: '6px' }}>Incluso nesta versão</div>
            <p style={{ fontSize: '13.5px', color: '#141210', margin: 0, lineHeight: 1.6 }}>{v.desc}</p>
          </div>

          {/* Valor por ambiente */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A857D', marginBottom: '10px' }}>Valor por ambiente</div>
            {(ambientes || 'Ambiente principal').split(',').map((amb, i, arr) => (
              <div key={amb} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #E7E1D8' : 'none' }}>
                <span style={{ fontSize: '13px', color: '#141210' }}>{amb.trim()}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#A9784F' }}>{brl(total / arr.length)}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ background: 'linear-gradient(135deg, #141210, #2a2218)', borderRadius: '14px', padding: '22px 24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(201,154,110,0.7)', marginBottom: '4px' }}>Valor total</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: '#FBFAF7' }}>{brl(total)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'rgba(251,250,247,0.4)', marginBottom: '4px' }}>Prazo de entrega</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#C79A6E' }}>45 dias úteis</div>
              </div>
            </div>
          </div>

          {/* Condições de pagamento */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A857D', marginBottom: '10px' }}>Condições de pagamento</div>
            {[
              { label: '30% na assinatura', valor: total * 0.3 },
              { label: '40% no início da produção', valor: total * 0.4 },
              { label: '30% na entrega', valor: total * 0.3 },
            ].map(p => (
              <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 12px', backgroundColor: 'rgba(169,120,79,0.05)', borderRadius: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', color: '#141210' }}>{p.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#A9784F' }}>{brl(p.valor)}</span>
              </div>
            ))}
          </div>

          {/* Aceite digital */}
          <div style={{ border: '2px solid rgba(169,120,79,0.3)', borderRadius: '14px', padding: '20px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: '#8A857D', marginBottom: '14px' }}>Ao assinar, o cliente concorda com os termos e condições desta proposta.</div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <div style={{ flex: 1, borderBottom: '1.5px solid #141210', paddingBottom: '6px', maxWidth: '200px' }}>
                <div style={{ fontSize: '10px', color: '#8A857D', textAlign: 'center', marginTop: '4px' }}>Assinatura do cliente</div>
              </div>
              <div style={{ flex: 1, borderBottom: '1.5px solid #141210', paddingBottom: '6px', maxWidth: '120px' }}>
                <div style={{ fontSize: '10px', color: '#8A857D', textAlign: 'center', marginTop: '4px' }}>Data</div>
              </div>
            </div>
            <button style={{ marginTop: '16px', backgroundColor: '#141210', color: '#FBFAF7', border: 'none', borderRadius: '10px', padding: '10px 28px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              Aceitar Proposta Digitalmente
            </button>
          </div>
        </div>

        <button onClick={onClose} style={{ position: 'absolute', top: '18px', right: '18px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: '#FBFAF7', cursor: 'pointer', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>
    </>
  )
}

// ── Builder ───────────────────────────────────────────────────────────────────

function QuoteBuilder({ onClose, darkMode }: { onClose: () => void; darkMode: boolean }) {
  const [items, setItems] = useState<LineItem[]>(LINE_ITEMS_BASE)
  const [activeVersion, setActiveVersion] = useState<OrcVersion>('intermediaria')
  const [margem, setMargem] = useState(35)
  const [comissao, setComissao] = useState(5)
  const [cliente, setCliente] = useState('')
  const [ambientes, setAmbientes] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const mult = VERSION_MULTIPLIERS[activeVersion]
  const subtotal = items.reduce((s, i) => s + i.qtd * i.valorUnit, 0) * mult
  const impostos = subtotal * 0.06
  const comissaoVal = subtotal * (comissao / 100)
  const margemVal = subtotal * (margem / 100)
  const total = subtotal + impostos + comissaoVal + margemVal

  const bg = darkMode ? '#181512' : '#F4F1EC'
  const cardBg = darkMode ? '#1E1B18' : '#FBFAF7'
  const border = darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'
  const text = darkMode ? '#FBFAF7' : '#141210'
  const muted = '#8A857D'

  const inputStyle = {
    backgroundColor: bg, border: `1px solid ${border}`, borderRadius: '8px',
    padding: '7px 10px', fontSize: '12.5px', color: text, outline: 'none',
    fontFamily: "'Inter', sans-serif", width: '100%',
  } as React.CSSProperties

  const updateItem = (id: string, field: 'qtd' | 'valorUnit', val: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i))
  }

  const categorias: { id: LineItem['categoria']; label: string }[] = [
    { id: 'material', label: 'Materiais' },
    { id: 'mao-obra', label: 'Mão de obra' },
    { id: 'fixo', label: 'Fixos' },
  ]

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(20,18,16,0.5)', zIndex: 50, backdropFilter: 'blur(3px)' }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '860px', maxWidth: '97vw', maxHeight: '92vh',
        backgroundColor: bg, borderRadius: '20px', zIndex: 60,
        boxShadow: '0 32px 80px rgba(20,18,16,0.28)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ padding: '22px 28px', borderBottom: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: text, margin: 0 }}>Novo Orçamento</h2>
            <p style={{ fontSize: '12px', color: muted, margin: '3px 0 0' }}>Monte o orçamento por itens e gere até 3 versões</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: muted, cursor: 'pointer', display: 'flex' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '22px 28px', display: 'flex', gap: '22px' }}>
          {/* Left: form */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Client + ambientes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, display: 'block', marginBottom: '5px' }}>Cliente</label>
                <input value={cliente} onChange={e => setCliente(e.target.value)} placeholder="Nome do cliente" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, display: 'block', marginBottom: '5px' }}>Ambientes</label>
                <input value={ambientes} onChange={e => setAmbientes(e.target.value)} placeholder="Cozinha, Closet..." style={inputStyle} />
              </div>
            </div>

            {/* Versions */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, display: 'block', marginBottom: '8px' }}>Versão da proposta</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                {(['essencial', 'intermediaria', 'premium'] as OrcVersion[]).map(v => {
                  const vl = VERSION_LABELS[v]
                  const isActive = activeVersion === v
                  return (
                    <button key={v} onClick={() => setActiveVersion(v)} style={{
                      border: `1.5px solid ${isActive ? vl.badge : border}`, borderRadius: '12px', padding: '12px',
                      backgroundColor: isActive ? `${vl.badge}14` : cardBg, cursor: 'pointer',
                      textAlign: 'left', transition: 'all 0.15s', fontFamily: "'Inter', sans-serif",
                    }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: isActive ? vl.badge : text, marginBottom: '3px' }}>{vl.label}</div>
                      <div style={{ fontSize: '10.5px', color: muted, lineHeight: 1.5 }}>{vl.desc}</div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: vl.badge, marginTop: '6px' }}>×{VERSION_MULTIPLIERS[v].toFixed(2)}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Line items */}
            {categorias.map(cat => {
              const catItems = items.filter(i => i.categoria === cat.id)
              return (
                <div key={cat.id}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, marginBottom: '8px' }}>{cat.label}</div>
                  <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '12px', overflow: 'hidden' }}>
                    {catItems.map((item, idx) => (
                      <div key={item.id} style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '9px 12px', borderBottom: idx < catItems.length - 1 ? `1px solid ${border}` : 'none' }}>
                        <span style={{ flex: 1, fontSize: '12.5px', color: text, minWidth: 0 }}>{item.descricao}</span>
                        <input type="number" value={item.qtd} min={0} onChange={e => updateItem(item.id, 'qtd', Number(e.target.value))}
                          style={{ ...inputStyle, width: '56px', textAlign: 'center', padding: '4px 6px' }} />
                        <span style={{ fontSize: '11px', color: muted, width: '30px', flexShrink: 0 }}>{item.unidade}</span>
                        <input type="number" value={item.valorUnit} min={0} onChange={e => updateItem(item.id, 'valorUnit', Number(e.target.value))}
                          style={{ ...inputStyle, width: '80px', textAlign: 'right', padding: '4px 8px' }} />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#A9784F', width: '72px', textAlign: 'right', flexShrink: 0 }}>
                          {brl(item.qtd * item.valorUnit * mult)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: summary */}
          <div style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, marginBottom: '12px' }}>Resumo</div>

              {[
                { label: 'Subtotal', value: subtotal },
                { label: 'Impostos (6%)', value: impostos },
                { label: `Comissão (${comissao}%)`, value: comissaoVal },
                { label: `Margem (${margem}%)`, value: margemVal },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: muted }}>{row.label}</span>
                  <span style={{ fontSize: '12px', color: text }}>{brl(row.value)}</span>
                </div>
              ))}

              <div style={{ height: '1px', backgroundColor: border, margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: text }}>Total</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#A9784F' }}>{brl(total)}</span>
              </div>
            </div>

            {/* Sliders */}
            <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '14px', padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, marginBottom: '12px' }}>Parâmetros</div>

              {[
                { label: 'Margem', value: margem, setter: setMargem, min: 10, max: 60 },
                { label: 'Comissão', value: comissao, setter: setComissao, min: 0, max: 15 },
              ].map(p => (
                <div key={p.label} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '12px', color: text }}>{p.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#A9784F' }}>{p.value}%</span>
                  </div>
                  <input type="range" min={p.min} max={p.max} value={p.value} onChange={e => p.setter(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#A9784F' }} />
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPreview(true)}
              style={{ backgroundColor: '#141210', color: '#FBFAF7', border: 'none', borderRadius: '12px', padding: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif', display: 'flex', alignItems: 'center', gap: '7px', justifyContent: 'center", transition: 'background 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2a2520')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#141210')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
              Ver Proposta
            </button>

            <button style={{ backgroundColor: 'rgba(169,120,79,0.12)', color: '#A9784F', border: '1px solid rgba(169,120,79,0.3)', borderRadius: '12px', padding: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              Salvar Orçamento
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <ProposalPreview
          items={items} version={activeVersion} cliente={cliente} ambientes={ambientes}
          margem={margem} comissao={comissao} onClose={() => setShowPreview(false)}
        />
      )}
    </>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Orcamentos({ darkMode }: { darkMode: boolean }) {
  const [showBuilder, setShowBuilder] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'todos' | OrcStatus>('todos')

  const filtered = filterStatus === 'todos' ? ORCAMENTOS : ORCAMENTOS.filter(o => o.status === filterStatus)

  const enviados = ORCAMENTOS.length
  const aprovados = ORCAMENTOS.filter(o => o.status === 'Aprovado').length
  const taxaConversao = Math.round((aprovados / ORCAMENTOS.length) * 100)
  const ticketMedio = Math.round(ORCAMENTOS.reduce((s, o) => s + o.valor, 0) / ORCAMENTOS.length)

  const bg = darkMode ? '#141210' : '#F4F1EC'
  const cardBg = darkMode ? '#1E1B18' : '#FBFAF7'
  const border = darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'
  const text = darkMode ? '#FBFAF7' : '#141210'
  const muted = '#8A857D'

  const thStyle: React.CSSProperties = {
    padding: '10px 14px', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.08em',
    textTransform: 'uppercase', color: muted, textAlign: 'left', whiteSpace: 'nowrap',
    borderBottom: `1px solid ${border}`,
  }
  const tdStyle: React.CSSProperties = {
    padding: '12px 14px', fontSize: '13px', color: text, borderBottom: `1px solid ${border}`,
  }

  return (
    <div style={{ backgroundColor: bg, minHeight: '100%', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
        {[
          { label: 'Enviados no mês', value: `${enviados}`, sub: 'Julho 2025' },
          { label: 'Taxa de conversão', value: `${taxaConversao}%`, sub: `${aprovados} aprovados` },
          { label: 'Ticket médio', value: brl(ticketMedio), sub: 'Todos os orçamentos' },
        ].map(k => (
          <div key={k.label} style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '16px', padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #A9784F, #C79A6E)' }} />
            <div style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: muted, marginBottom: '8px', marginTop: '4px' }}>{k.label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: text, marginBottom: '4px' }}>{k.value}</div>
            <div style={{ fontSize: '12px', color: muted }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Table header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['todos', 'Aprovado', 'Aguardando', 'Em revisão', 'Recusado'] as const).map(s => {
            const isActive = filterStatus === s
            return (
              <button key={s} onClick={() => setFilterStatus(s)} style={{
                fontSize: '12px', fontWeight: isActive ? 600 : 400,
                color: isActive ? '#A9784F' : muted,
                backgroundColor: isActive ? 'rgba(169,120,79,0.1)' : cardBg,
                border: `1px solid ${isActive ? 'rgba(169,120,79,0.3)' : border}`,
                borderRadius: '8px', padding: '5px 12px', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", transition: 'all 0.15s',
              }}>
                {s === 'todos' ? 'Todos' : s}
              </button>
            )
          })}
        </div>
        <button
          onClick={() => setShowBuilder(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#141210', color: '#FBFAF7', border: 'none', borderRadius: '10px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Novo Orçamento
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: darkMode ? 'rgba(231,225,216,0.03)' : '#F4F1EC' }}>
              <th style={thStyle}>Número</th>
              <th style={thStyle}>Cliente</th>
              <th style={thStyle}>Ambientes</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Valor</th>
              <th style={thStyle}>Data</th>
              <th style={thStyle}>Validade</th>
              <th style={thStyle}>Arquiteto</th>
              <th style={thStyle}>Status</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(orc => {
              const s = STATUS_STYLE[orc.status]
              return (
                <tr key={orc.id} style={{ transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = darkMode ? 'rgba(231,225,216,0.03)' : 'rgba(169,120,79,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={tdStyle}>
                    <span style={{ fontWeight: 600, color: '#A9784F', fontSize: '12px' }}>{orc.numero}</span>
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{orc.cliente}</td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: '12px', color: muted }}>{orc.ambientes.join(', ')}</span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: '#A9784F' }}>
                    {brl(orc.valor)}
                  </td>
                  <td style={{ ...tdStyle, fontSize: '12px', color: muted }}>{orc.data}</td>
                  <td style={{ ...tdStyle, fontSize: '12px', color: muted }}>{orc.validade}</td>
                  <td style={{ ...tdStyle, fontSize: '12px', color: muted }}>{orc.arquiteto || '—'}</td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: s.color, backgroundColor: s.bg, borderRadius: '20px', padding: '3px 10px', whiteSpace: 'nowrap' }}>
                      {orc.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      <button style={{ background: 'none', border: `1px solid ${border}`, borderRadius: '6px', padding: '4px 7px', cursor: 'pointer', color: muted, fontSize: '11px' }} title="Visualizar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      </button>
                      <button style={{ background: 'none', border: `1px solid ${border}`, borderRadius: '6px', padding: '4px 7px', cursor: 'pointer', color: muted, fontSize: '11px' }} title="Editar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showBuilder && <QuoteBuilder onClose={() => setShowBuilder(false)} darkMode={darkMode} />}
    </div>
  )
}

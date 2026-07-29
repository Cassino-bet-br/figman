import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

type FunnelStage = 'Novo contato' | 'Visita agendada' | 'Medição realizada' | 'Orçamento enviado' | 'Negociação' | 'Fechado' | 'Perdido'

type HistoricoItem = {
  tipo: 'mensagem' | 'visita' | 'orcamento' | 'projeto' | 'nota'
  texto: string
  data: string
  autor?: string
}

type Cliente = {
  id: string
  nome: string
  telefone: string
  email: string
  cidade: string
  estado: 'PR' | 'SC'
  enderecaObra: string
  ambientes: string[]
  origem: string
  arquiteto?: string
  etapa: FunnelStage
  projetos: number
  valorTotal: number
  ultimoContato: string
  historico: HistoricoItem[]
  motivoPerda?: string
}

type MotivoPerda = 'preco' | 'prazo' | 'concorrente' | 'desistencia' | 'sem-retorno'

// ── Data ──────────────────────────────────────────────────────────────────────

const FUNIL_ETAPAS: FunnelStage[] = [
  'Novo contato', 'Visita agendada', 'Medição realizada', 'Orçamento enviado', 'Negociação', 'Fechado', 'Perdido',
]

const CLIENTES: Cliente[] = [
  {
    id: '1', nome: 'Ana Paula Ribeiro', telefone: '(41) 99821-3344', email: 'ana.ribeiro@email.com',
    cidade: 'Curitiba', estado: 'PR', enderecaObra: 'Rua das Flores, 142, Batel, Curitiba-PR',
    ambientes: ['Cozinha', 'Lavanderia', 'Closet'], origem: 'Indicação de arquiteto', arquiteto: 'Studio Forma',
    etapa: 'Fechado', projetos: 2, valorTotal: 58500, ultimoContato: '18 jul',
    historico: [
      { tipo: 'projeto', texto: 'Pedido PD-2407-001 em produção — cozinha + lavanderia', data: '15 jul', autor: 'Marcos S.' },
      { tipo: 'orcamento', texto: 'ORC-2407-001 aprovado — R$ 38.500', data: '02 jul', autor: 'Carla N.' },
      { tipo: 'visita', texto: 'Visita técnica de medição realizada no ap. 142', data: '25 jun', autor: 'Felipe R.' },
      { tipo: 'mensagem', texto: 'Cliente enviou fotos da obra para referência no WhatsApp', data: '20 jun', autor: 'Carla N.' },
    ],
  },
  {
    id: '2', nome: 'Bruno Fernandes', telefone: '(41) 98732-5566', email: 'bfernandes@gmail.com',
    cidade: 'São José dos Pinhais', estado: 'PR', enderecaObra: 'Av. das Araucárias, 890, São José dos Pinhais-PR',
    ambientes: ['Escritório'], origem: 'Google Ads',
    etapa: 'Fechado', projetos: 1, valorTotal: 22800, ultimoContato: '20 jul',
    historico: [
      { tipo: 'projeto', texto: 'Pedido em qualidade, entrega prevista 28/07', data: '20 jul', autor: 'Carla N.' },
      { tipo: 'mensagem', texto: 'Pagamento atrasado — 2ª parcela R$ 11.400', data: '18 jul', autor: 'Ricardo C.' },
    ],
  },
  {
    id: '3', nome: 'Camila Torres', telefone: '(48) 99654-7788', email: 'camila.torres@outlook.com',
    cidade: 'Florianópolis', estado: 'SC', enderecaObra: 'Rua Lauro Müller, 55, Beira-Mar, Florianópolis-SC',
    ambientes: ['Quarto Casal', 'Closet'], origem: 'Indicação de cliente', arquiteto: 'Costa Interiores',
    etapa: 'Medição realizada', projetos: 1, valorTotal: 31200, ultimoContato: '22 jul',
    historico: [
      { tipo: 'visita', texto: 'Medição técnica realizada — 42m² de ambiente', data: '22 jul', autor: 'Felipe R.' },
      { tipo: 'orcamento', texto: 'Enviando proposta em 3 versões até 25/07', data: '22 jul', autor: 'Carla N.' },
    ],
  },
  {
    id: '4', nome: 'Diego Martins', telefone: '(41) 99345-2211', email: 'diego.martins@empresa.com.br',
    cidade: 'Curitiba', estado: 'PR', enderecaObra: 'Al. Dr. Carlos de Carvalho, 1600, ap 82, Curitiba-PR',
    ambientes: ['Cozinha'], origem: 'Instagram',
    etapa: 'Fechado', projetos: 1, valorTotal: 45000, ultimoContato: '25 jul',
    historico: [
      { tipo: 'projeto', texto: 'Produção avançando — montagem iniciada', data: '25 jul', autor: 'Marcos S.' },
      { tipo: 'mensagem', texto: 'Cliente aprovou granito Preto São Gabriel no showroom', data: '18 jul' },
    ],
  },
  {
    id: '5', nome: 'Elena Souza', telefone: '(41) 98211-9900', email: 'elena.souza@gmail.com',
    cidade: 'Pinhais', estado: 'PR', enderecaObra: 'Rua Tijucas do Sul, 88, Pinhais-PR',
    ambientes: ['Sala de estar', 'Painel TV'], origem: 'Site',
    etapa: 'Orçamento enviado', projetos: 0, valorTotal: 0, ultimoContato: '23 jul',
    historico: [
      { tipo: 'orcamento', texto: 'ORC-2407-003 enviado — R$ 18.700', data: '23 jul', autor: 'Carla N.' },
      { tipo: 'visita', texto: 'Visita de apresentação no showroom', data: '19 jul' },
    ],
  },
  {
    id: '6', nome: 'Fábio Oliveira', telefone: '(48) 99901-6655', email: 'fabio.oliveira@meuescritorio.com',
    cidade: 'Joinville', estado: 'SC', enderecaObra: 'Rua do Príncipe, 310, Centro, Joinville-SC',
    ambientes: ['Escritório', 'Sala de Reunião'], origem: 'Indicação de arquiteto', arquiteto: 'AK Arquitetura',
    etapa: 'Negociação', projetos: 1, valorTotal: 29400, ultimoContato: '26 jul',
    historico: [
      { tipo: 'mensagem', texto: 'Solicitou desconto de 5% — aguardando autorização da diretoria', data: '26 jul', autor: 'Ricardo C.' },
      { tipo: 'orcamento', texto: 'ORC-2407-004 revisado com nova versão Intermediária', data: '24 jul', autor: 'Carla N.' },
    ],
  },
  {
    id: '7', nome: 'Giovanna Lima', telefone: '(41) 97654-3322', email: 'gi.lima@hotmail.com',
    cidade: 'Curitiba', estado: 'PR', enderecaObra: 'Av. Sete de Setembro, 4120, ap 32, Curitiba-PR',
    ambientes: ['Banheiro', 'Lavabo'], origem: 'Google Ads',
    etapa: 'Fechado', projetos: 1, valorTotal: 14200, ultimoContato: '27 jul',
    historico: [
      { tipo: 'projeto', texto: 'Projeto concluído — aguardando entrega', data: '27 jul', autor: 'Felipe R.' },
    ],
  },
  {
    id: '8', nome: 'João Batista', telefone: '(41) 99112-4477', email: 'joao.batista@email.com',
    cidade: 'Colombo', estado: 'PR', enderecaObra: 'Rua Bento Munhoz, 45, Colombo-PR',
    ambientes: ['Quarto Master'], origem: 'Indicação de cliente',
    etapa: 'Perdido', projetos: 0, valorTotal: 0, ultimoContato: '02 jul',
    motivoPerda: 'preco',
    historico: [
      { tipo: 'nota', texto: 'Perdido para concorrente — preço 15% abaixo do nosso', data: '02 jul', autor: 'Carla N.' },
    ],
  },
  {
    id: '9', nome: 'Karen Silva', telefone: '(48) 98877-6655', email: 'karen.silva@email.com',
    cidade: 'Blumenau', estado: 'SC', enderecaObra: 'Rua XV de Novembro, 200, Centro, Blumenau-SC',
    ambientes: ['Closet'], origem: 'Instagram',
    etapa: 'Orçamento enviado', projetos: 0, valorTotal: 0, ultimoContato: '26 jul',
    historico: [
      { tipo: 'orcamento', texto: 'ORC-2407-006 enviado via WhatsApp', data: '26 jul', autor: 'Carla N.' },
    ],
  },
  {
    id: '10', nome: 'Lucas Mendes', telefone: '(41) 99450-8833', email: 'lucas.mendes@gmail.com',
    cidade: 'Araucária', estado: 'PR', enderecaObra: 'Rua Minas Gerais, 510, Araucária-PR',
    ambientes: ['Home Office'], origem: 'Google Ads', arquiteto: 'MH Interiores',
    etapa: 'Visita agendada', projetos: 0, valorTotal: 0, ultimoContato: '27 jul',
    historico: [
      { tipo: 'visita', texto: 'Visita agendada para 30/07 às 14h', data: '27 jul', autor: 'Marcos S.' },
    ],
  },
]

const MOTIVOS: { id: MotivoPerda; label: string; desc: string }[] = [
  { id: 'preco', label: 'Preço', desc: 'O cliente considerou o valor alto ou achou mais barato em outro lugar' },
  { id: 'prazo', label: 'Prazo', desc: 'O prazo de entrega não atendeu às necessidades do cliente' },
  { id: 'concorrente', label: 'Concorrente', desc: 'O cliente escolheu outro fornecedor' },
  { id: 'desistencia', label: 'Desistência', desc: 'O cliente desistiu do projeto ou adiou indefinidamente' },
  { id: 'sem-retorno', label: 'Sem retorno', desc: 'O cliente parou de responder e não foi possível reengajá-lo' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const brl = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v)

const HISTORICO_ICON: Record<HistoricoItem['tipo'], React.ReactNode> = {
  mensagem: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  visita: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3,11 22,2 13,21 11,13 3,11" /></svg>,
  orcamento: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>,
  projeto: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  nota: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" /></svg>,
}

const MOTIVO_LABEL: Record<string, string> = {
  preco: 'Preço', prazo: 'Prazo', concorrente: 'Concorrente', desistencia: 'Desistência', 'sem-retorno': 'Sem retorno',
}

// ── Perda Modal ───────────────────────────────────────────────────────────────

function PerdaModal({ cliente, onConfirm, onCancel, darkMode }: {
  cliente: Cliente; onConfirm: (motivo: MotivoPerda) => void; onCancel: () => void; darkMode: boolean
}) {
  const [motivo, setMotivo] = useState<MotivoPerda | null>(null)
  const bg = darkMode ? '#1E1B18' : '#FBFAF7'
  const text = darkMode ? '#FBFAF7' : '#141210'
  const border = darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'
  const muted = '#8A857D'

  return (
    <>
      <div onClick={onCancel} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(20,18,16,0.5)', zIndex: 80, backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '460px', maxWidth: '95vw', backgroundColor: bg, borderRadius: '20px', zIndex: 90, padding: '28px', boxShadow: '0 24px 64px rgba(20,18,16,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(180,85,63,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B4553F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: text, margin: 0 }}>Marcar como perdido</h3>
            <p style={{ fontSize: '12px', color: muted, margin: '2px 0 0' }}>{cliente.nome}</p>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: muted, marginBottom: '16px', lineHeight: 1.6 }}>
          Qual foi o principal motivo da perda? Isso ajuda a melhorar nossa estratégia comercial.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {MOTIVOS.map(m => (
            <button key={m.id} onClick={() => setMotivo(m.id)} style={{
              display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px',
              border: `1.5px solid ${motivo === m.id ? '#B4553F' : border}`,
              borderRadius: '12px', backgroundColor: motivo === m.id ? 'rgba(180,85,63,0.08)' : 'transparent',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', fontFamily: "'Inter', sans-serif",
            }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `2px solid ${motivo === m.id ? '#B4553F' : border}`, backgroundColor: motivo === m.id ? '#B4553F' : 'transparent', flexShrink: 0, marginTop: '1px', transition: 'all 0.15s' }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: text, marginBottom: '2px' }}>{m.label}</div>
                <div style={{ fontSize: '11.5px', color: muted, lineHeight: 1.4 }}>{m.desc}</div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '10px', backgroundColor: 'transparent', border: `1px solid ${border}`, borderRadius: '10px', color: muted, cursor: 'pointer', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>
            Cancelar
          </button>
          <button onClick={() => motivo && onConfirm(motivo)} style={{ flex: 1, padding: '10px', backgroundColor: motivo ? '#B4553F' : border, color: motivo ? '#FBFAF7' : muted, border: 'none', borderRadius: '10px', cursor: motivo ? 'pointer' : 'not-allowed', fontSize: '13px', fontWeight: 600, fontFamily: "'Inter', sans-serif", transition: 'background 0.15s' }}>
            Confirmar perda
          </button>
        </div>
      </div>
    </>
  )
}

// ── Client Profile ────────────────────────────────────────────────────────────

function ClienteProfile({ cliente, onClose, onMarkLost, darkMode }: {
  cliente: Cliente; onClose: () => void; onMarkLost: () => void; darkMode: boolean
}) {
  const [novaMsg, setNovaMsg] = useState('')
  const bg = darkMode ? '#181512' : '#F4F1EC'
  const cardBg = darkMode ? '#1E1B18' : '#FBFAF7'
  const border = darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'
  const text = darkMode ? '#FBFAF7' : '#141210'
  const muted = '#8A857D'

  const etapaIndex = FUNIL_ETAPAS.indexOf(cliente.etapa)
  const etapaCor = cliente.etapa === 'Fechado' ? '#4E7C59' : cliente.etapa === 'Perdido' ? '#B4553F' : '#A9784F'

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(20,18,16,0.4)', zIndex: 40, backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '500px', maxWidth: '96vw', backgroundColor: bg, zIndex: 50, display: 'flex', flexDirection: 'column', boxShadow: '-12px 0 40px rgba(20,18,16,0.18)' }}>
        {/* Header */}
        <div style={{ padding: '22px 24px', borderBottom: `1px solid ${border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #A9784F, #C79A6E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: '#FBFAF7', fontFamily: "'Playfair Display', serif", flexShrink: 0 }}>
                {cliente.nome.charAt(0)}
              </div>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: text, margin: 0 }}>{cliente.nome}</h2>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11.5px', color: muted }}>{cliente.cidade}, {cliente.estado}</span>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, color: etapaCor, backgroundColor: `${etapaCor}14`, borderRadius: '20px', padding: '1px 8px' }}>{cliente.etapa}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: muted, padding: '4px', display: 'flex' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>

          {/* Stage progress */}
          <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
            {FUNIL_ETAPAS.filter(e => e !== 'Perdido').map((e, i) => (
              <div key={e} style={{ flex: 1, height: '4px', borderRadius: '2px', backgroundColor: i <= etapaIndex && cliente.etapa !== 'Perdido' ? etapaCor : darkMode ? 'rgba(231,225,216,0.1)' : '#E7E1D8', transition: 'background 0.2s' }} />
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Contact */}
          <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: muted, marginBottom: '12px' }}>Contato</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.18z" /></svg>, label: cliente.telefone, action: `tel:${cliente.telefone}` },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, label: cliente.email, action: `mailto:${cliente.email}` },
              ].map(c => (
                <a key={c.label} href={c.action} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: text, textDecoration: 'none', fontSize: '13px' }}>
                  <span style={{ color: '#A9784F', display: 'flex' }}>{c.icon}</span>
                  {c.label}
                </a>
              ))}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: text }}>
                <span style={{ color: '#A9784F', display: 'flex', marginTop: '1px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </span>
                {cliente.enderecaObra}
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Origem', value: cliente.origem },
              { label: 'Arquiteto', value: cliente.arquiteto || '—' },
              { label: 'Projetos', value: `${cliente.projetos}` },
              { label: 'Valor total', value: cliente.valorTotal > 0 ? brl(cliente.valorTotal) : '—' },
              { label: 'Último contato', value: cliente.ultimoContato },
              { label: 'Motivo perda', value: cliente.motivoPerda ? MOTIVO_LABEL[cliente.motivoPerda] : '—' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '10px', padding: '10px 12px' }}>
                <div style={{ fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, marginBottom: '3px' }}>{item.label}</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: item.label === 'Motivo perda' && cliente.motivoPerda ? '#B4553F' : text }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Ambientes */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: muted, marginBottom: '8px' }}>Ambientes de interesse</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {cliente.ambientes.map(a => (
                <span key={a} style={{ fontSize: '12px', fontWeight: 500, color: '#A9784F', backgroundColor: 'rgba(169,120,79,0.1)', border: '1px solid rgba(169,120,79,0.2)', borderRadius: '20px', padding: '3px 10px' }}>{a}</span>
              ))}
            </div>
          </div>

          {/* Histórico */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: muted, marginBottom: '10px' }}>Histórico de interações</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cliente.historico.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '7px', backgroundColor: 'rgba(169,120,79,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9784F', flexShrink: 0 }}>
                    {HISTORICO_ICON[h.tipo]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12.5px', color: text, margin: 0, lineHeight: 1.5 }}>{h.texto}</p>
                    <span style={{ fontSize: '11px', color: muted }}>{h.data}{h.autor ? ` · ${h.autor}` : ''}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* New note */}
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <input value={novaMsg} onChange={e => setNovaMsg(e.target.value)} placeholder="Adicionar anotação..." style={{ flex: 1, backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '8px', padding: '8px 12px', fontSize: '12.5px', color: text, outline: 'none', fontFamily: "'Inter', sans-serif" }} />
              <button style={{ backgroundColor: '#A9784F', color: '#FBFAF7', border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                Salvar
              </button>
            </div>
          </div>

          {/* WhatsApp / Actions */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href={`https://wa.me/${cliente.telefone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', backgroundColor: '#25D366', color: '#FBFAF7', borderRadius: '10px', padding: '10px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
              WhatsApp
            </a>
            {cliente.etapa !== 'Perdido' && (
              <button onClick={onMarkLost} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', backgroundColor: 'rgba(180,85,63,0.1)', color: '#B4553F', border: '1px solid rgba(180,85,63,0.3)', borderRadius: '10px', padding: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                Marcar como perdido
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Clientes({ darkMode }: { darkMode: boolean }) {
  const [clientes, setClientes] = useState<Cliente[]>(CLIENTES)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
  const [perdaTarget, setPerdaTarget] = useState<Cliente | null>(null)
  const [filterEstado, setFilterEstado] = useState<'todos' | 'PR' | 'SC'>('todos')
  const [viewMode, setViewMode] = useState<'funil' | 'tabela'>('funil')

  const bg = darkMode ? '#141210' : '#F4F1EC'
  const cardBg = darkMode ? '#1E1B18' : '#FBFAF7'
  const border = darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'
  const text = darkMode ? '#FBFAF7' : '#141210'
  const muted = '#8A857D'

  const filtered = filterEstado === 'todos' ? clientes : clientes.filter(c => c.estado === filterEstado)

  const handleMarkLost = (motivo: MotivoPerda) => {
    if (!perdaTarget) return
    setClientes(prev => prev.map(c => c.id === perdaTarget.id ? { ...c, etapa: 'Perdido' as FunnelStage, motivoPerda: motivo } : c))
    setSelectedCliente(prev => prev?.id === perdaTarget.id ? { ...prev, etapa: 'Perdido', motivoPerda: motivo } : prev)
    setPerdaTarget(null)
  }

  const FUNIL_COLORS: Partial<Record<FunnelStage, string>> = {
    Fechado: '#4E7C59', Perdido: '#B4553F',
  }

  const thStyle: React.CSSProperties = { padding: '10px 14px', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, textAlign: 'left', whiteSpace: 'nowrap', borderBottom: `1px solid ${border}` }
  const tdStyle: React.CSSProperties = { padding: '12px 14px', fontSize: '13px', color: text, borderBottom: `1px solid ${border}` }

  return (
    <div style={{ backgroundColor: bg, minHeight: '100%', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: text, margin: 0 }}>Clientes & CRM</h2>
          <p style={{ fontSize: '12px', color: muted, margin: '3px 0 0' }}>{filtered.length} clientes · clique para abrir a ficha</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* View toggle */}
          <div style={{ display: 'flex', backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '10px', overflow: 'hidden' }}>
            {(['funil', 'tabela'] as const).map(v => (
              <button key={v} onClick={() => setViewMode(v)} style={{ padding: '6px 14px', fontSize: '12.5px', fontWeight: viewMode === v ? 600 : 400, color: viewMode === v ? '#A9784F' : muted, backgroundColor: viewMode === v ? 'rgba(169,120,79,0.1)' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.15s', textTransform: 'capitalize' }}>
                {v === 'funil' ? 'Funil' : 'Tabela'}
              </button>
            ))}
          </div>
          <select value={filterEstado} onChange={e => setFilterEstado(e.target.value as typeof filterEstado)} style={{ fontSize: '12px', color: text, backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", outline: 'none' }}>
            <option value="todos">PR + SC</option>
            <option value="PR">Paraná</option>
            <option value="SC">Santa Catarina</option>
          </select>
          <button style={{ display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#141210', color: '#FBFAF7', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Novo Cliente
          </button>
        </div>
      </div>

      {/* FUNIL VIEW */}
      {viewMode === 'funil' && (
        <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '14px', minWidth: 'max-content' }}>
            {FUNIL_ETAPAS.map(etapa => {
              const etapaClientes = filtered.filter(c => c.etapa === etapa)
              const cor = FUNIL_COLORS[etapa] || '#A9784F'
              const valorTotal = etapaClientes.reduce((s, c) => s + c.valorTotal, 0)

              return (
                <div key={etapa} style={{ minWidth: '196px', maxWidth: '196px' }}>
                  <div style={{ marginBottom: '10px', padding: '0 2px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: muted }}>{etapa}</span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: cor, backgroundColor: `${cor}14`, borderRadius: '20px', padding: '1px 7px' }}>{etapaClientes.length}</span>
                    </div>
                    {valorTotal > 0 && <div style={{ fontSize: '11px', color: muted, marginTop: '2px' }}>{brl(valorTotal)}</div>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {etapaClientes.length === 0 ? (
                      <div style={{ height: '56px', border: `1.5px dashed ${border}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '11px', color: muted }}>Vazio</span>
                      </div>
                    ) : etapaClientes.map(c => (
                      <div key={c.id} onClick={() => setSelectedCliente(c)} style={{ backgroundColor: cardBg, border: `1px solid ${c.etapa === 'Perdido' ? 'rgba(180,85,63,0.25)' : border}`, borderRadius: '12px', padding: '12px', cursor: 'pointer', transition: 'box-shadow 0.15s, transform 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 20px rgba(20,18,16,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>
                        <div style={{ fontSize: '12.5px', fontWeight: 600, color: text, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.nome}</div>
                        <div style={{ fontSize: '11px', color: muted, marginBottom: '6px' }}>{c.cidade}, {c.estado}</div>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {c.ambientes.slice(0, 2).map(a => (
                            <span key={a} style={{ fontSize: '10px', color: '#A9784F', backgroundColor: 'rgba(169,120,79,0.1)', borderRadius: '4px', padding: '1px 5px' }}>{a}</span>
                          ))}
                          {c.ambientes.length > 2 && <span style={{ fontSize: '10px', color: muted }}>+{c.ambientes.length - 2}</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: muted, marginTop: '6px' }}>Último: {c.ultimoContato}</div>
                        {c.motivoPerda && (
                          <div style={{ marginTop: '5px', fontSize: '10.5px', fontWeight: 600, color: '#B4553F' }}>
                            Motivo: {MOTIVO_LABEL[c.motivoPerda]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'tabela' && (
        <div style={{ backgroundColor: cardBg, border: `1px solid ${border}`, borderRadius: '16px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: darkMode ? 'rgba(231,225,216,0.03)' : '#F4F1EC' }}>
                <th style={thStyle}>Cliente</th>
                <th style={thStyle}>Cidade</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Origem</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Projetos</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Valor total</th>
                <th style={thStyle}>Último contato</th>
                <th style={thStyle}>Etapa</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const etapaCor = FUNIL_COLORS[c.etapa] || '#A9784F'
                return (
                  <tr key={c.id} onClick={() => setSelectedCliente(c)} style={{ cursor: 'pointer', transition: 'background 0.12s' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = darkMode ? 'rgba(231,225,216,0.03)' : 'rgba(169,120,79,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{c.nome}</td>
                    <td style={tdStyle}>{c.cidade}</td>
                    <td style={tdStyle}><span style={{ fontSize: '11px', fontWeight: 600, color: muted, backgroundColor: darkMode ? 'rgba(231,225,216,0.06)' : '#F4F1EC', borderRadius: '4px', padding: '2px 6px' }}>{c.estado}</span></td>
                    <td style={{ ...tdStyle, fontSize: '12px', color: muted }}>{c.origem}</td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{c.projetos}</td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontWeight: 700, color: c.valorTotal > 0 ? '#A9784F' : muted }}>{c.valorTotal > 0 ? brl(c.valorTotal) : '—'}</td>
                    <td style={{ ...tdStyle, fontSize: '12px', color: muted }}>{c.ultimoContato}</td>
                    <td style={tdStyle}><span style={{ fontSize: '11.5px', fontWeight: 700, color: etapaCor, backgroundColor: `${etapaCor}14`, borderRadius: '20px', padding: '3px 10px', whiteSpace: 'nowrap' }}>{c.etapa}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Profile panel */}
      {selectedCliente && (
        <ClienteProfile
          cliente={selectedCliente}
          onClose={() => setSelectedCliente(null)}
          onMarkLost={() => setPerdaTarget(selectedCliente)}
          darkMode={darkMode}
        />
      )}

      {/* Perda modal */}
      {perdaTarget && (
        <PerdaModal
          cliente={perdaTarget}
          onConfirm={handleMarkLost}
          onCancel={() => setPerdaTarget(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  )
}

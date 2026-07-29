import { useState } from 'react'
import { useCountUp } from '../hooks/useCountUp'

// ── Types ─────────────────────────────────────────────────────────────────────

type KanbanProject = {
  id: string
  client: string
  type: 'Cozinha' | 'Quarto' | 'Escritório' | 'Sala' | 'Banheiro'
  value: number
  responsible: string
  responsibleInitials: string
  progress: number
  dueDate: string
  daysLeft: number
  delayed: boolean
  stage: string
  nextTask: string
  image: string
}

type Alert = {
  id: string
  icon: React.ReactNode
  color: string
  bg: string
  message: string
  detail: string
}

type CapacitySector = {
  name: string
  occupancy: number
}

// ── Data ──────────────────────────────────────────────────────────────────────

const kanbanStages = [
  'Orçamento',
  'Medição',
  'Projeto',
  'Aprovação',
  'Produção',
  'Montagem',
  'Concluído',
]

const kanbanProjects: KanbanProject[] = [
  {
    id: '1',
    client: 'Ana Paula Ribeiro',
    type: 'Cozinha',
    value: 38500,
    responsible: 'Marcos Silva',
    responsibleInitials: 'MS',
    progress: 25,
    dueDate: '14 ago',
    daysLeft: 17,
    delayed: false,
    stage: 'Produção',
    nextTask: 'Aguardar corrediças do fornecedor',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '2',
    client: 'Bruno Fernandes',
    type: 'Escritório',
    value: 22800,
    responsible: 'Carla Nunes',
    responsibleInitials: 'CN',
    progress: 60,
    dueDate: '28 jul',
    daysLeft: -2,
    delayed: true,
    stage: 'Montagem',
    nextTask: 'Instalar nichos superiores',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '3',
    client: 'Camila Torres',
    type: 'Quarto',
    value: 31200,
    responsible: 'Felipe Ramos',
    responsibleInitials: 'FR',
    progress: 10,
    dueDate: '22 ago',
    daysLeft: 25,
    delayed: false,
    stage: 'Projeto',
    nextTask: 'Enviar render para aprovação',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '4',
    client: 'Diego Martins',
    type: 'Cozinha',
    value: 45000,
    responsible: 'Marcos Silva',
    responsibleInitials: 'MS',
    progress: 75,
    dueDate: '31 jul',
    daysLeft: 1,
    delayed: false,
    stage: 'Montagem',
    nextTask: 'Fixar tampo em granito',
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '5',
    client: 'Elena Souza',
    type: 'Sala',
    value: 18700,
    responsible: 'Carla Nunes',
    responsibleInitials: 'CN',
    progress: 0,
    dueDate: '10 set',
    daysLeft: 43,
    delayed: false,
    stage: 'Orçamento',
    nextTask: 'Aguardar retorno do cliente',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '6',
    client: 'Fábio Oliveira',
    type: 'Escritório',
    value: 29400,
    responsible: 'Felipe Ramos',
    responsibleInitials: 'FR',
    progress: 40,
    dueDate: '5 ago',
    daysLeft: 8,
    delayed: false,
    stage: 'Aprovação',
    nextTask: 'Cliente assinar contrato',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '7',
    client: 'Giovanna Lima',
    type: 'Banheiro',
    value: 14200,
    responsible: 'Marcos Silva',
    responsibleInitials: 'MS',
    progress: 90,
    dueDate: '29 jul',
    daysLeft: -1,
    delayed: true,
    stage: 'Concluído',
    nextTask: 'Entregar documentação final',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=180&h=120&fit=crop&auto=format',
  },
  {
    id: '8',
    client: 'Henrique Alves',
    type: 'Quarto',
    value: 26900,
    responsible: 'Carla Nunes',
    responsibleInitials: 'CN',
    progress: 15,
    dueDate: '18 ago',
    daysLeft: 21,
    delayed: false,
    stage: 'Medição',
    nextTask: 'Confirmar visita técnica',
    image: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=180&h=120&fit=crop&auto=format',
  },
]

const alertIcon = (color: string, path: React.ReactNode) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
)

const alerts: Alert[] = [
  {
    id: '1',
    icon: alertIcon('#C89A3C', <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>),
    color: '#C89A3C',
    bg: 'rgba(200,154,60,0.08)',
    message: 'Aguardando aprovação do cliente',
    detail: 'Fábio Oliveira — proposta enviada há 3 dias',
  },
  {
    id: '2',
    icon: alertIcon('#B4553F', <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>),
    color: '#B4553F',
    bg: 'rgba(180,85,63,0.08)',
    message: 'Material não comprado — risco de parada',
    detail: 'Corrediças Blum para cozinha Ana Paula',
  },
  {
    id: '3',
    icon: alertIcon('#B4553F', <><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></>),
    color: '#B4553F',
    bg: 'rgba(180,85,63,0.08)',
    message: 'Pagamento atrasado',
    detail: 'Bruno Fernandes — R$ 11.400 vencido há 5 dias',
  },
  {
    id: '4',
    icon: alertIcon('#C89A3C', <><polygon points="3,11 22,2 13,21 11,13 3,11" /></>),
    color: '#C89A3C',
    bg: 'rgba(200,154,60,0.08)',
    message: 'Medição pendente',
    detail: 'Henrique Alves — agendada para ontem, sem confirmação',
  },
  {
    id: '5',
    icon: alertIcon('#B4553F', <><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></>),
    color: '#B4553F',
    bg: 'rgba(180,85,63,0.08)',
    message: 'Produção parada por falta de material',
    detail: 'MDF Eucatex 18mm — estoque zerado',
  },
  {
    id: '6',
    icon: alertIcon('#C89A3C', <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>),
    color: '#C89A3C',
    bg: 'rgba(200,154,60,0.08)',
    message: 'Orçamento sem retorno há 5 dias',
    detail: 'Elena Souza — sala de estar R$ 18.700',
  },
  {
    id: '7',
    icon: alertIcon('#B4553F', <><polyline points="22,7 13.5,15.5 8.5,10.5 2,17" /><polyline points="16,7 22,7 22,13" /></>),
    color: '#B4553F',
    bg: 'rgba(180,85,63,0.08)',
    message: 'Margem abaixo do esperado',
    detail: 'Escritório Diego Martins — 21% vs meta de 34%',
  },
]

const capacitySectors: CapacitySector[] = [
  { name: 'Corte', occupancy: 88 },
  { name: 'Col. de borda', occupancy: 62 },
  { name: 'Usinagem', occupancy: 75 },
  { name: 'Montagem', occupancy: 95 },
  { name: 'Pintura', occupancy: 44 },
  { name: 'Expedição', occupancy: 57 },
  { name: 'Instalação', occupancy: 80 },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

function AnimatedKPI({
  label,
  value,
  unit,
  prefix,
  suffix,
  sub,
  color,
  delay,
  darkMode,
}: {
  label: string
  value: number
  unit?: string
  prefix?: string
  suffix?: string
  sub?: string
  color?: string
  delay?: number
  darkMode: boolean
}) {
  const displayValue = useCountUp(value, 1400, delay ?? 0)

  return (
    <div
      style={{
        backgroundColor: darkMode ? '#1E1B18' : '#FBFAF7',
        border: `1px solid ${darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'}`,
        borderRadius: '16px',
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 8px 24px rgba(20,18,16,0.08)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'none'
      }}
    >
      {/* Subtle wood accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: color || 'linear-gradient(90deg, #A9784F, #C79A6E)',
          borderRadius: '16px 16px 0 0',
        }}
      />
      <span
        style={{
          fontSize: '10.5px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#8A857D',
          marginTop: '4px',
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
        {prefix && (
          <span
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: darkMode ? '#C79A6E' : '#A9784F',
            }}
          >
            {prefix}
          </span>
        )}
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '32px',
            fontWeight: 700,
            color: color === '#B4553F' ? '#B4553F' : darkMode ? '#FBFAF7' : '#141210',
            lineHeight: 1,
          }}
        >
          {unit === 'k'
            ? `${(displayValue / 1000).toFixed(0)}`
            : displayValue.toString()}
        </span>
        {(unit || suffix) && (
          <span
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: darkMode ? '#C79A6E' : '#A9784F',
              marginLeft: '2px',
            }}
          >
            {unit === 'k' ? ' mil' : suffix}
          </span>
        )}
      </div>
      {sub && (
        <span style={{ fontSize: '12px', color: '#8A857D', lineHeight: 1.4 }}>{sub}</span>
      )}
    </div>
  )
}

function KanbanColumn({
  stage,
  projects,
  darkMode,
}: {
  stage: string
  projects: KanbanProject[]
  darkMode: boolean
}) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const typeColors: Record<string, string> = {
    Cozinha: '#A9784F',
    Quarto: '#5A7EA0',
    Escritório: '#4E7C59',
    Sala: '#8A6BAC',
    Banheiro: '#7A8A6A',
  }

  return (
    <div
      style={{
        minWidth: '212px',
        maxWidth: '212px',
        flexShrink: 0,
      }}
    >
      {/* Column header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
          padding: '0 2px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#8A857D',
          }}
        >
          {stage}
        </span>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color: darkMode ? 'rgba(251,250,247,0.4)' : '#8A857D',
            backgroundColor: darkMode ? 'rgba(231,225,216,0.06)' : '#F4F1EC',
            borderRadius: '20px',
            padding: '1px 7px',
          }}
        >
          {projects.length}
        </span>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {projects.length === 0 && (
          <div
            style={{
              height: '80px',
              border: `1.5px dashed ${darkMode ? 'rgba(231,225,216,0.1)' : '#E7E1D8'}`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '11px', color: '#8A857D' }}>Vazio</span>
          </div>
        )}
        {projects.map(project => {
          const isHovered = hoveredCard === project.id
          return (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: darkMode ? '#1E1B18' : '#FBFAF7',
                border: `1px solid ${project.delayed ? 'rgba(180,85,63,0.4)' : darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'}`,
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                transform: isHovered ? 'translateY(-3px)' : 'none',
                boxShadow: isHovered
                  ? '0 12px 28px rgba(20,18,16,0.12)'
                  : project.delayed
                    ? '0 0 0 1px rgba(180,85,63,0.15)'
                    : 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '88px', overflow: 'hidden', backgroundColor: '#E7E1D8' }}>
                <img
                  src={project.image}
                  alt={`${project.type} ${project.client}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Type badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: '7px',
                    left: '7px',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#FBFAF7',
                    backgroundColor: typeColors[project.type] || '#A9784F',
                    borderRadius: '6px',
                    padding: '2px 7px',
                    letterSpacing: '0.04em',
                  }}
                >
                  {project.type}
                </span>
                {/* Delayed badge */}
                {project.delayed && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '7px',
                      right: '7px',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#FBFAF7',
                      backgroundColor: '#B4553F',
                      borderRadius: '6px',
                      padding: '2px 7px',
                    }}
                  >
                    Atrasado
                  </span>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '10px 12px 12px' }}>
                <div
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: darkMode ? '#FBFAF7' : '#141210',
                    marginBottom: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {project.client}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: darkMode ? '#C79A6E' : '#A9784F',
                    marginBottom: '8px',
                  }}
                >
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(project.value)}
                </div>

                {/* Progress */}
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      height: '4px',
                      backgroundColor: darkMode ? 'rgba(231,225,216,0.1)' : '#F4F1EC',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${project.progress}%`,
                        background: project.delayed
                          ? '#B4553F'
                          : project.progress > 80
                            ? '#4E7C59'
                            : 'linear-gradient(90deg, #A9784F, #C79A6E)',
                        borderRadius: '2px',
                        transition: 'width 0.8s ease',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '4px',
                    }}
                  >
                    <span style={{ fontSize: '10.5px', color: '#8A857D' }}>{project.progress}% concluído</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        color: project.daysLeft < 0 ? '#B4553F' : project.daysLeft <= 3 ? '#C89A3C' : '#8A857D',
                        fontWeight: 500,
                      }}
                    >
                      {project.daysLeft < 0
                        ? `${Math.abs(project.daysLeft)}d atrasado`
                        : project.daysLeft === 0
                          ? 'Hoje'
                          : `${project.daysLeft}d`}
                    </span>
                  </div>
                </div>

                {/* Footer row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #A9784F, #C79A6E)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        fontWeight: 700,
                        color: '#FBFAF7',
                        flexShrink: 0,
                      }}
                    >
                      {project.responsibleInitials}
                    </div>
                    <span style={{ fontSize: '11px', color: '#8A857D' }}>{project.responsible.split(' ')[0]}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#8A857D' }}>{project.dueDate}</span>
                </div>

                {/* Next task on hover */}
                {isHovered && (
                  <div
                    style={{
                      marginTop: '9px',
                      paddingTop: '9px',
                      borderTop: `1px solid ${darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'}`,
                      fontSize: '11px',
                      color: darkMode ? '#C79A6E' : '#A9784F',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '5px',
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '1px', flexShrink: 0 }}>
                      <polyline points="9,18 15,12 9,6" />
                    </svg>
                    {project.nextTask}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CapacityBar({ sector, darkMode }: { sector: CapacitySector; darkMode: boolean }) {
  const color =
    sector.occupancy >= 90 ? '#B4553F' : sector.occupancy >= 75 ? '#C89A3C' : '#4E7C59'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: '12px', color: darkMode ? '#C5C0B8' : '#141210', fontWeight: 500 }}>
          {sector.name}
        </span>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: color,
          }}
        >
          {sector.occupancy}%
        </span>
      </div>
      <div
        style={{
          height: '8px',
          backgroundColor: darkMode ? 'rgba(231,225,216,0.08)' : '#F4F1EC',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${sector.occupancy}%`,
            backgroundColor: color,
            borderRadius: '4px',
            transition: 'width 1s ease',
          }}
        />
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Overview({ darkMode }: { darkMode: boolean }) {
  const bg = darkMode ? '#141210' : '#F4F1EC'
  const cardBg = darkMode ? '#1E1B18' : '#FBFAF7'
  const cardBorder = darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'
  const textPrimary = darkMode ? '#FBFAF7' : '#141210'
  const textMuted = '#8A857D'

  const projectsByStage = kanbanStages.reduce<Record<string, KanbanProject[]>>((acc, stage) => {
    acc[stage] = kanbanProjects.filter(p => p.stage === stage)
    return acc
  }, {})

  return (
    <div
      style={{
        backgroundColor: bg,
        minHeight: '100%',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      {/* ── KPIs ───────────────────────────────────────────────────────── */}
      <section>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '14px',
          }}
        >
          <AnimatedKPI
            label="Projetos em andamento"
            value={12}
            sub="3 com prazo próximo"
            delay={0}
            darkMode={darkMode}
          />
          <AnimatedKPI
            label="Em produção"
            value={186000}
            prefix="R$"
            unit="k"
            sub="↑ 12% vs mês anterior"
            delay={80}
            darkMode={darkMode}
          />
          <AnimatedKPI
            label="Entregas esta semana"
            value={4}
            sub="2 confirmadas, 2 pendentes"
            delay={160}
            darkMode={darkMode}
          />
          <AnimatedKPI
            label="Risco de atraso"
            value={2}
            sub="Atenção necessária"
            color="#B4553F"
            delay={240}
            darkMode={darkMode}
          />
          <AnimatedKPI
            label="Margem média"
            value={34}
            suffix="%"
            sub="Meta: 35% · Atingindo quase"
            delay={320}
            darkMode={darkMode}
          />
          <AnimatedKPI
            label="A receber em 30 dias"
            value={214000}
            prefix="R$"
            unit="k"
            sub="5 faturas pendentes"
            delay={400}
            darkMode={darkMode}
          />
        </div>
      </section>

      {/* ── Kanban ─────────────────────────────────────────────────────── */}
      <section>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              fontWeight: 600,
              color: textPrimary,
              margin: 0,
            }}
          >
            Operação ao Vivo
          </h2>
          <span style={{ fontSize: '12px', color: textMuted }}>
            {kanbanProjects.length} projetos · atualizado agora
          </span>
        </div>

        <div
          style={{
            overflowX: 'auto',
            paddingBottom: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '14px',
              minWidth: 'max-content',
            }}
          >
            {kanbanStages.map(stage => (
              <KanbanColumn
                key={stage}
                stage={stage}
                projects={projectsByStage[stage] || []}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom row: Alerts + Capacity + AI ────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px 300px',
          gap: '18px',
          alignItems: 'start',
        }}
      >
        {/* Alerts */}
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: '18px',
            padding: '20px 22px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '16px',
                fontWeight: 600,
                color: textPrimary,
                margin: 0,
              }}
            >
              Precisa da sua atenção
            </h3>
            <span
              style={{
                fontSize: '11px',
                backgroundColor: 'rgba(180,85,63,0.1)',
                color: '#B4553F',
                borderRadius: '20px',
                padding: '2px 9px',
                fontWeight: 600,
              }}
            >
              {alerts.length} alertas
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {alerts.map(alert => (
              <div
                key={alert.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '10px 12px',
                  backgroundColor: alert.bg,
                  borderRadius: '10px',
                  borderLeft: `3px solid ${alert.color}`,
                }}
              >
                <span style={{ marginTop: '1px', flexShrink: 0 }}>{alert.icon}</span>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: textPrimary, marginBottom: '2px' }}>
                    {alert.message}
                  </div>
                  <div style={{ fontSize: '11.5px', color: textMuted }}>{alert.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capacity */}
        <div
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: '18px',
            padding: '20px 22px',
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '16px',
              fontWeight: 600,
              color: textPrimary,
              margin: '0 0 16px',
            }}
          >
            Capacidade Semanal
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {capacitySectors.map(sector => (
              <CapacityBar key={sector.name} sector={sector} darkMode={darkMode} />
            ))}
          </div>

          <div
            style={{
              marginTop: '16px',
              paddingTop: '14px',
              borderTop: `1px solid ${cardBorder}`,
              display: 'flex',
              gap: '14px',
            }}
          >
            {[
              { color: '#4E7C59', label: 'Normal' },
              { color: '#C89A3C', label: 'Alta' },
              { color: '#B4553F', label: 'Crítica' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    backgroundColor: item.color,
                  }}
                />
                <span style={{ fontSize: '11px', color: textMuted }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight */}
        <div
          style={{
            backgroundColor: darkMode ? '#1A1612' : '#141210',
            border: '1px solid rgba(169,120,79,0.3)',
            borderRadius: '18px',
            padding: '22px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Wood shimmer overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(105deg, transparent 40%, rgba(201,154,110,0.07) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 4s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          {/* Subtle grain texture overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(92deg, transparent, transparent 2px, rgba(169,120,79,0.03) 2px, rgba(169,120,79,0.03) 4px)',
              pointerEvents: 'none',
              borderRadius: '18px',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #A9784F 0%, #C79A6E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FBFAF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" opacity="0.3" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#C79A6E',
                  }}
                >
                  Insight de IA
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(251,250,247,0.35)', marginTop: '1px' }}>
                  atualizado há 4 min
                </div>
              </div>
            </div>

            {/* Insight text */}
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '15px',
                fontStyle: 'italic',
                color: 'rgba(251,250,247,0.88)',
                lineHeight: 1.6,
                margin: '0 0 16px',
              }}
            >
              "Três projetos correm risco de atraso esta semana. O pedido da Ana Paula depende da chegada das corrediças Blum, e o fornecedor ainda não confirmou a entrega."
            </p>

            {/* Divider */}
            <div style={{ height: '1px', backgroundColor: 'rgba(169,120,79,0.2)', marginBottom: '14px' }} />

            {/* Secondary insight */}
            <p
              style={{
                fontSize: '12.5px',
                color: 'rgba(251,250,247,0.55)',
                lineHeight: 1.6,
                margin: '0 0 14px',
              }}
            >
              Montagem está com 95% de ocupação. Considere redistribuir a equipe do Projeto Giovanna para apoio.
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Atraso', 'Estoque', 'Capacidade'].map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: '#C79A6E',
                    backgroundColor: 'rgba(169,120,79,0.15)',
                    border: '1px solid rgba(169,120,79,0.25)',
                    borderRadius: '20px',
                    padding: '3px 9px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

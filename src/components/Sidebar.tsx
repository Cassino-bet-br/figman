import { useState } from 'react'

type NavItem = {
  id: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    id: 'overview',
    label: 'Visão Geral',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'orders',
    label: 'Pedidos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    id: 'quotes',
    label: 'Orçamentos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" />
      </svg>
    ),
  },
  {
    id: 'clients',
    label: 'Clientes',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'measurements',
    label: 'Medições',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20M2 12l4-4M2 12l4 4M22 12l-4-4M22 12l-4 4" />
        <path d="M12 2v4M12 18v4" />
      </svg>
    ),
  },
  {
    id: 'stock',
    label: 'Estoque & Compras',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 'financial',
    label: 'Financeiro',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'production',
    label: 'Produção',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 'architects',
    label: 'Arquitetos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3,11 22,2 13,21 11,13 3,11" />
      </svg>
    ),
  },
  {
    id: 'schedule',
    label: 'Agenda',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: 'portal',
    label: 'Portal do Cliente',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'site',
    label: 'Site Institucional',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

type SidebarProps = {
  activeItem: string
  onItemClick: (id: string) => void
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ activeItem, onItemClick, collapsed, onToggle }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <aside
      style={{
        width: collapsed ? '68px' : '220px',
        minWidth: collapsed ? '68px' : '220px',
        backgroundColor: '#141210',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        transition: 'width 0.25s ease, min-width 0.25s ease',
        overflow: 'hidden',
        zIndex: 20,
        flexShrink: 0,
      }}
    >
      {/* Logo + Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? '20px 0' : '20px 16px',
          borderBottom: '1px solid rgba(231,225,216,0.08)',
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #A9784F 0%, #C79A6E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#FBFAF7',
                  lineHeight: 1,
                }}
              >
                M
              </span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#FBFAF7',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                Marcenaria
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#8A857D',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '1px',
                }}
              >
                Mobile
              </div>
            </div>
          </div>
        )}

        {collapsed && (
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #A9784F 0%, #C79A6E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '18px',
                color: '#FBFAF7',
              }}
            >
              M
            </span>
          </div>
        )}

        {!collapsed && (
          <button
            onClick={onToggle}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8A857D',
              padding: '4px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FBFAF7')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = '#8A857D')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        {collapsed && (
          <button
            onClick={onToggle}
            style={{
              position: 'absolute',
              top: '20px',
              right: '-1px',
              background: '#141210',
              border: '1px solid rgba(231,225,216,0.12)',
              cursor: 'pointer',
              color: '#8A857D',
              padding: '2px 3px',
              borderRadius: '0 4px 4px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.opacity = '1'
              el.style.color = '#FBFAF7'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.opacity = '0'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto', overflowX: 'hidden' }}>
        {navItems.map(item => {
          const isActive = activeItem === item.id
          const isHovered = hoveredItem === item.id

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: collapsed ? '10px 0' : '10px 16px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: isActive
                  ? 'linear-gradient(90deg, #A9784F 0%, #C79A6E 100%)'
                  : isHovered
                    ? 'rgba(169,120,79,0.1)'
                    : 'none',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? '#FBFAF7' : isHovered ? '#C79A6E' : '#8A857D',
                fontSize: '13.5px',
                fontWeight: isActive ? 500 : 400,
                borderRadius: collapsed ? '0' : '0 8px 8px 0',
                marginRight: collapsed ? '0' : '8px',
                transition: 'background 0.15s, color 0.15s',
                whiteSpace: 'nowrap',
                position: 'relative',
              }}
              title={collapsed ? item.label : undefined}
            >
              <span style={{ flexShrink: 0, display: 'flex' }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer / User */}
      <div
        style={{
          padding: collapsed ? '14px 0' : '14px 16px',
          borderTop: '1px solid rgba(231,225,216,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: '10px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C79A6E 0%, #A9784F 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 600,
            color: '#FBFAF7',
            flexShrink: 0,
          }}
        >
          RC
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: 500, color: '#FBFAF7', lineHeight: 1.3 }}>
              Ricardo Costa
            </div>
            <div style={{ fontSize: '11px', color: '#8A857D', marginTop: '1px' }}>Gerente</div>
          </div>
        )}
      </div>
    </aside>
  )
}

import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Overview from './components/Overview'
import Pedidos from './components/Pedidos'
import Orcamentos from './components/Orcamentos'
import Clientes from './components/Clientes'
import Estoque from './components/Estoque'
import Financeiro from './components/Financeiro'
import Agenda from './components/Agenda'
import Medicao from './components/Medicao'
import PortalCliente from './components/PortalCliente'
import Site from './components/Site'

const pageTitles: Record<string, string> = {
  overview: 'Visão Geral',
  orders: 'Pedidos',
  quotes: 'Orçamentos',
  clients: 'Clientes',
  measurements: 'Medições',
  stock: 'Estoque & Compras',
  financial: 'Financeiro',
  production: 'Produção',
  architects: 'Arquitetos',
  schedule: 'Agenda',
  portal: 'Portal do Cliente',
}

function PlaceholderPage({ title, darkMode }: { title: string; darkMode: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '12px' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #A9784F 0%, #C79A6E 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FBFAF7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 12h8M12 8v8" />
        </svg>
      </div>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: darkMode ? '#FBFAF7' : '#141210', margin: 0 }}>{title}</p>
      <p style={{ fontSize: '13px', color: '#8A857D', margin: 0 }}>Esta tela será implementada em breve.</p>
    </div>
  )
}

function DarkPage({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: '100%', background: '#0B0C0E' }}>{children}</div>
}

export default function App() {
  const [view, setView] = useState<'site' | 'system'>('site')
  const [activeItem, setActiveItem] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const bg = darkMode ? '#141210' : '#F4F1EC'

  if (view === 'site') {
    return (
      <div style={{ position: 'relative' }}>
        <Site />
        <button
          onClick={() => setView('system')}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 100,
            padding: '12px 20px',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #A9784F 0%, #C79A6E 100%)',
            color: '#FBFAF7',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            boxShadow: '0 6px 20px rgba(20,18,16,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Acessar Sistema
        </button>
      </div>
    )
  }

  const handleItemClick = (id: string) => {
    if (id === 'site') {
      setView('site')
      return
    }
    setActiveItem(id)
  }

  const renderPage = () => {
    switch (activeItem) {
      case 'overview': return <Overview darkMode={darkMode} />
      case 'orders': return <Pedidos darkMode={darkMode} />
      case 'quotes': return <Orcamentos darkMode={darkMode} />
      case 'clients': return <Clientes darkMode={darkMode} />
      case 'measurements': return <DarkPage><Medicao /></DarkPage>
      case 'stock': return <DarkPage><Estoque /></DarkPage>
      case 'financial': return <DarkPage><Financeiro /></DarkPage>
      case 'schedule': return <DarkPage><Agenda /></DarkPage>
      case 'portal': return <DarkPage><PortalCliente /></DarkPage>
      default: return <PlaceholderPage title={pageTitles[activeItem] || ''} darkMode={darkMode} />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: bg, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar
        activeItem={activeItem}
        onItemClick={handleItemClick}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <TopBar
          title={pageTitles[activeItem] || 'Visão Geral'}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(d => !d)}
        />
        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

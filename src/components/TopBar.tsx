import { useState } from 'react'

type TopBarProps = {
  title: string
  darkMode: boolean
  onToggleDark: () => void
}

export default function TopBar({ title, darkMode, onToggleDark }: TopBarProps) {
  const [searchFocused, setSearchFocused] = useState(false)
  const [hasNotif, setHasNotif] = useState(true)

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header
      style={{
        backgroundColor: darkMode ? '#1E1B18' : '#F4F1EC',
        borderBottom: `1px solid ${darkMode ? 'rgba(231,225,216,0.08)' : '#E7E1D8'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        height: '62px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        gap: '20px',
      }}
    >
      {/* Left: title + date */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', minWidth: 0 }}>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            fontSize: '20px',
            color: darkMode ? '#FBFAF7' : '#141210',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h1>
        <span
          style={{
            fontSize: '12px',
            color: '#8A857D',
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
          }}
        >
          {today}
        </span>
      </div>

      {/* Right: search + actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: darkMode ? 'rgba(251,250,247,0.06)' : '#FBFAF7',
            border: `1px solid ${searchFocused ? '#A9784F' : darkMode ? 'rgba(231,225,216,0.1)' : '#E7E1D8'}`,
            borderRadius: '10px',
            padding: '7px 12px',
            width: searchFocused ? '240px' : '180px',
            transition: 'width 0.2s ease, border-color 0.15s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A857D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder="Buscar projeto, cliente..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '13px',
              color: darkMode ? '#FBFAF7' : '#141210',
              width: '100%',
              fontFamily: "'Inter', sans-serif",
            }}
          />
          <kbd
            style={{
              fontSize: '10px',
              color: '#8A857D',
              backgroundColor: darkMode ? 'rgba(231,225,216,0.08)' : '#F4F1EC',
              border: `1px solid ${darkMode ? 'rgba(231,225,216,0.12)' : '#E7E1D8'}`,
              borderRadius: '4px',
              padding: '1px 5px',
              fontFamily: "'Inter', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            ⌘K
          </kbd>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          title={darkMode ? 'Modo claro' : 'Modo escuro'}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            backgroundColor: darkMode ? 'rgba(251,250,247,0.06)' : '#FBFAF7',
            border: `1px solid ${darkMode ? 'rgba(231,225,216,0.1)' : '#E7E1D8'}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: darkMode ? '#C79A6E' : '#8A857D',
            transition: 'background 0.15s, color 0.15s',
          }}
        >
          {darkMode ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Bell */}
        <button
          onClick={() => setHasNotif(false)}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '9px',
            backgroundColor: darkMode ? 'rgba(251,250,247,0.06)' : '#FBFAF7',
            border: `1px solid ${darkMode ? 'rgba(231,225,216,0.1)' : '#E7E1D8'}`,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: darkMode ? '#C79A6E' : '#8A857D',
            position: 'relative',
            transition: 'background 0.15s',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {hasNotif && (
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#B4553F',
                border: `2px solid ${darkMode ? '#1E1B18' : '#F4F1EC'}`,
              }}
            />
          )}
        </button>

        {/* Novo Orçamento */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            backgroundColor: '#141210',
            color: '#FBFAF7',
            border: 'none',
            borderRadius: '10px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            whiteSpace: 'nowrap',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#2a2520')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#141210')}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo Orçamento
        </button>
      </div>
    </header>
  )
}

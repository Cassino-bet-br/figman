import { useState, useEffect, useRef } from 'react'
import logoSrc from '../imports/images.png'

const WHATSAPP_URL = 'https://wa.me/5541999999999?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20orçamento.'

const NAV_LINKS = [
  { label: 'INÍCIO', href: '#inicio' },
  { label: 'PROJETOS', href: '#projetos' },
  { label: 'SOBRE', href: '#sobre' },
  { label: 'PROCESSO', href: '#processo' },
  { label: 'CONTATO', href: '#contato' },
]

const GALLERY = [
  {
    label: 'Cozinha',
    url: 'https://images.unsplash.com/photo-1683629357963-adf2b1fa9ad9?w=800&h=600&fit=crop&auto=format',
    tall: false,
  },
  {
    label: 'Closet',
    url: 'https://images.unsplash.com/photo-1672137233327-37b0c1049e77?w=800&h=1000&fit=crop&auto=format',
    tall: true,
  },
  {
    label: 'Home Office',
    url: 'https://images.unsplash.com/photo-1772475385509-93fd87a2d4ba?w=800&h=1000&fit=crop&auto=format',
    tall: true,
  },
  {
    label: 'Sala',
    url: 'https://images.unsplash.com/photo-1648881806148-e5c51179c826?w=800&h=600&fit=crop&auto=format',
    tall: false,
  },
  {
    label: 'Dormitório',
    url: 'https://images.unsplash.com/photo-1649361811423-a55616f7ab11?w=800&h=600&fit=crop&auto=format',
    tall: false,
  },
  {
    label: 'Área Gourmet',
    url: 'https://images.unsplash.com/photo-1771888703722-ee7ad9143a67?w=800&h=600&fit=crop&auto=format',
    tall: false,
  },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Briefing', desc: 'Entendemos suas necessidades, estilo de vida e expectativas para criar a solução ideal.' },
  { num: '02', title: 'Projeto 3D', desc: 'Desenvolvemos a visualização completa do ambiente com materiais e acabamentos reais.' },
  { num: '03', title: 'Produção', desc: 'Fabricação com madeiras selecionadas e ferragens de alto padrão em nossa marcenaria.' },
  { num: '04', title: 'Instalação', desc: 'Montagem realizada por nossa equipe técnica, com entrega e acabamento perfeitos.' },
]

function LogoMark({ size = 36, light = false }: { size?: number; light?: boolean }) {
  return (
    <img
      src={logoSrc}
      alt="MARCENARIA MOBILE — Logo"
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        filter: light ? 'invert(1)' : 'none',
      }}
    />
  )
}

function GalleryItem({ item }: { item: typeof GALLERY[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{
        gridRow: item.tall ? 'span 2' : 'span 1',
        backgroundColor: '#D8D4CE',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={item.url}
        alt={item.label}
        className="w-full h-full object-cover"
        style={{
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          minHeight: item.tall ? '480px' : '260px',
        }}
      />
      <div
        className="absolute inset-0 flex items-end"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(17,17,17,0.72) 0%, transparent 60%)'
            : 'linear-gradient(to top, rgba(17,17,17,0.3) 0%, transparent 50%)',
          transition: 'background 0.4s ease',
        }}
      >
        <span
          className="w-full px-5 py-4 text-sm font-medium tracking-widest uppercase"
          style={{
            fontFamily: 'var(--font-sans)',
            color: '#F4F1EC',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          {item.label}
        </span>
      </div>
    </div>
  )
}

export default function Site() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ fontFamily: 'var(--font-sans)', backgroundColor: '#F4F1EC', color: '#111111' }}>

      {/* ── HEADER ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? 'rgba(17,17,17,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(244,241,236,0.08)' : 'none',
          transition: 'background-color 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 32px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <LogoMark size={38} light />
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                letterSpacing: '0.18em',
                color: '#F4F1EC',
                fontWeight: 400,
              }}
            >
              MARCENARIA MOBILE
            </span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="hidden md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: 'rgba(244,241,236,0.75)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F4F1EC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,241,236,0.75)')}
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: '#F4F1EC',
                backgroundColor: '#A9784F',
                padding: '10px 22px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'background-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C4956A')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#A9784F')}
            >
              ORÇAMENTO
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="flex md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: '24px',
                  height: '1.5px',
                  backgroundColor: '#F4F1EC',
                  display: 'block',
                  transition: 'transform 0.2s, opacity 0.2s',
                  transform:
                    mobileMenuOpen && i === 0
                      ? 'translateY(6.5px) rotate(45deg)'
                      : mobileMenuOpen && i === 2
                        ? 'translateY(-6.5px) rotate(-45deg)'
                        : 'none',
                  opacity: mobileMenuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: 'rgba(17,17,17,0.98)',
              padding: '24px 32px 32px',
              borderTop: '1px solid rgba(244,241,236,0.08)',
            }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  letterSpacing: '0.16em',
                  color: 'rgba(244,241,236,0.8)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(244,241,236,0.06)',
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                marginTop: '24px',
                textAlign: 'center',
                padding: '14px',
                backgroundColor: '#A9784F',
                color: '#F4F1EC',
                textDecoration: 'none',
                fontSize: '11px',
                letterSpacing: '0.14em',
                fontWeight: 600,
              }}
            >
              SOLICITAR ORÇAMENTO
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        id="inicio"
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '600px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1771270731051-9cfbb7222946?w=1600&h=900&fit=crop&auto=format"
          alt="Ambiente planejado sofisticado com madeira escura e iluminação ambiente"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.45) 50%, rgba(17,17,17,0.25) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 32px 88px',
            width: '100%',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: '#A9784F',
              marginBottom: '20px',
              fontWeight: 500,
            }}
          >
            PR · SC — MÓVEIS PLANEJADOS PREMIUM
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              fontWeight: 600,
              color: '#F4F1EC',
              lineHeight: 1.05,
              maxWidth: '700px',
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            Móveis que<br />
            <em style={{ fontStyle: 'italic', color: '#F4F1EC' }}>elevam</em> seu<br />
            espaço.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              color: 'rgba(244,241,236,0.7)',
              marginBottom: '40px',
              fontWeight: 300,
              letterSpacing: '0.02em',
            }}
          >
            Personalização e rigor técnico em cada detalhe · PR | SC
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#projetos"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                color: '#111111',
                backgroundColor: '#F4F1EC',
                padding: '16px 36px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'background-color 0.25s, color 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#A9784F'
                e.currentTarget.style.color = '#F4F1EC'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F4F1EC'
                e.currentTarget.style.color = '#111111'
              }}
            >
              VER PROJETOS
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                color: 'rgba(244,241,236,0.75)',
                padding: '16px 0',
                textDecoration: 'none',
                fontWeight: 500,
                borderBottom: '1px solid rgba(244,241,236,0.3)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F4F1EC'
                e.currentTarget.style.borderColor = '#A9784F'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(244,241,236,0.75)'
                e.currentTarget.style.borderColor = 'rgba(244,241,236,0.3)'
              }}
            >
              SOLICITAR ORÇAMENTO
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '40px',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '48px',
              backgroundColor: 'rgba(244,241,236,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#A9784F',
                animation: 'scrollLine 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section
        style={{
          backgroundColor: '#111111',
          padding: '72px 32px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '0',
          }}
        >
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="3" width="10" height="10" stroke="#A9784F" strokeWidth="1.5" />
                  <rect x="15" y="3" width="10" height="10" stroke="#A9784F" strokeWidth="1.5" />
                  <rect x="3" y="15" width="10" height="10" stroke="#A9784F" strokeWidth="1.5" />
                  <rect x="15" y="15" width="10" height="10" stroke="#A9784F" strokeWidth="1.5" />
                </svg>
              ),
              title: 'PROJETO SOB MEDIDA',
              desc: 'Cada ambiente é único. Desenvolvemos soluções personalizadas que respeitam arquitetura, rotina e estilo.',
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="10" stroke="#A9784F" strokeWidth="1.5" />
                  <path d="M9 14l3.5 3.5 6.5-7" stroke="#A9784F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              title: 'RIGOR TÉCNICO',
              desc: 'Materiais certificados, cortes precisos e processos controlados do projeto à entrega final.',
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 22L14 6l8 16" stroke="#A9784F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 17h10" stroke="#A9784F" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
              title: 'ACABAMENTO IMPECÁVEL',
              desc: 'Ferragens europeias, superfícies tratadas e detalhes que elevam o padrão de cada peça.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: '52px 48px',
                borderLeft: i > 0 ? '1px solid rgba(244,241,236,0.07)' : 'none',
              }}
            >
              <div style={{ marginBottom: '24px' }}>{item.icon}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  color: '#F4F1EC',
                  fontWeight: 600,
                  marginBottom: '14px',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  color: 'rgba(244,241,236,0.5)',
                  lineHeight: 1.75,
                  fontWeight: 300,
                  maxWidth: '280px',
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALERIA ── */}
      <section id="projetos" style={{ backgroundColor: '#F4F1EC', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '64px' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.24em',
                color: '#A9784F',
                marginBottom: '12px',
                fontWeight: 500,
              }}
            >
              PORTFÓLIO
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Projetos
            </h2>
          </div>

          {/* Masonry grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'auto',
              gap: '6px',
            }}
            className="gallery-grid"
          >
            {GALLERY.map((item) => (
              <GalleryItem key={item.label} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section
        id="sobre"
        style={{
          backgroundColor: '#111111',
          padding: '120px 32px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.24em',
                color: '#A9784F',
                marginBottom: '20px',
                fontWeight: 500,
              }}
            >
              SOBRE NÓS
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 600,
                color: '#F4F1EC',
                lineHeight: 1.1,
                marginBottom: '28px',
                letterSpacing: '-0.01em',
              }}
            >
              Transformamos projetos<br />
              <em style={{ fontStyle: 'italic' }}>em móveis.</em>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                color: 'rgba(244,241,236,0.6)',
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: '40px',
                maxWidth: '440px',
              }}
            >
              Com anos de experiência em marcenaria de alto padrão, combinamos o rigor técnico da produção industrial à sensibilidade do trabalho artesanal. Cada móvel é pensado para durar décadas e envelhecer com beleza.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                color: '#111111',
                backgroundColor: '#F4F1EC',
                padding: '16px 36px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'background-color 0.25s, color 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#A9784F'
                e.currentTarget.style.color = '#F4F1EC'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F4F1EC'
                e.currentTarget.style.color = '#111111'
              }}
            >
              FALE CONOSCO
            </a>
          </div>

          <div
            style={{
              position: 'relative',
              aspectRatio: '4/5',
              overflow: 'hidden',
              backgroundColor: '#1A1A1A',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1683629357935-f3f4777ddf41?w=800&h=1000&fit=crop&auto=format"
              alt="Cozinha planejada com acabamento premium"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(17,17,17,0.7), transparent)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: '#A9784F',
                padding: '10px 18px',
              }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.16em', color: '#F4F1EC', fontWeight: 600 }}>
                PR · SC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESSO ── */}
      <section id="processo" style={{ backgroundColor: '#F4F1EC', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ marginBottom: '72px' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.24em',
                color: '#A9784F',
                marginBottom: '12px',
                fontWeight: 500,
              }}
            >
              COMO TRABALHAMOS
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Processo
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0',
            }}
            className="process-grid"
          >
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.num}
                style={{
                  padding: '0 40px 0 0',
                  borderLeft: i > 0 ? '1px solid #D8D4CE' : 'none',
                  paddingLeft: i > 0 ? '40px' : '0',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '48px',
                    color: '#D8D4CE',
                    fontWeight: 400,
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: '20px',
                  }}
                >
                  {step.num}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    letterSpacing: '0.14em',
                    color: '#111111',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  {step.title.toUpperCase()}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13.5px',
                    color: '#8A8A8A',
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA WHATSAPP ── */}
      <section
        id="contato"
        style={{
          backgroundColor: '#F4F1EC',
          padding: '0 32px 100px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            backgroundColor: '#EDEAE4',
            padding: '80px 64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '40px',
          }}
          className="cta-inner"
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.24em',
                color: '#A9784F',
                marginBottom: '12px',
                fontWeight: 500,
              }}
            >
              PRONTO PARA COMEÇAR?
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 600,
                color: '#111111',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              Vamos planejar<br />
              <em style={{ fontStyle: 'italic' }}>seu espaço?</em>
            </h2>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              letterSpacing: '0.14em',
              color: '#F4F1EC',
              backgroundColor: '#25D366',
              padding: '18px 40px',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'background-color 0.25s, transform 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1DB954'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#25D366'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            CHAMAR NO WHATSAPP
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          backgroundColor: '#111111',
          padding: '60px 32px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '40px',
            alignItems: 'center',
          }}
          className="footer-grid"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <LogoMark size={40} light />
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  color: '#F4F1EC',
                  fontWeight: 400,
                }}
              >
                MARCENARIA MOBILE
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  color: '#8A8A8A',
                  marginTop: '2px',
                }}
              >
                PARANÁ · SANTA CATARINA
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: '#8A8A8A',
              }}
            >
              © 2026 MARCENARIA MOBILE
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <a
              href="https://instagram.com/mobile.exclusivos"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#8A8A8A',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#A9784F')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8A8A')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @mobile.exclusivos
            </a>
          </div>
        </div>

        <div
          style={{
            maxWidth: '1280px',
            margin: '40px auto 0',
            borderTop: '1px solid rgba(244,241,236,0.06)',
            paddingTop: '32px',
            display: 'flex',
            gap: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.16em',
                color: 'rgba(244,241,236,0.3)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(244,241,236,0.7)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244,241,236,0.3)')}
            >
              {l.label}
            </a>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 40px !important;
          }
          .process-grid > div {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid #D8D4CE;
            padding-top: 32px !important;
          }
          .process-grid > div:nth-child(-n+2) {
            border-top: none;
            padding-top: 0 !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 24px !important;
          }
          .footer-grid > div:last-child {
            text-align: center !important;
          }
          .cta-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 52px 36px !important;
          }
        }

        @media (max-width: 600px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-grid > div {
            grid-row: span 1 !important;
          }
          .hidden.md\\:flex {
            display: none !important;
          }
        }

        .hidden { display: none; }
        @media (min-width: 768px) {
          .hidden.md\\:flex { display: flex !important; }
          .flex.md\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  )
}

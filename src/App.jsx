import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Team from './components/Team'
import Gallery from './components/Gallery'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  // Ativa o scroll suave (Lenis) — desativado se o usuário preferir menos movimento
  useSmoothScroll()

  return (
    <>
      {/* Pular para o conteúdo (acessibilidade) */}
      <a
        href="#sobre"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:border focus:border-accent focus:bg-bg focus:px-5 focus:py-3 focus:font-sans focus:text-[11px] focus:uppercase focus:tracking-widest focus:text-accent"
      >
        Pular para o conteúdo
      </a>

      <Header />

      {/* overflow-x: clip impede que o deslocamento inicial das animações
          de entrada gere rolagem horizontal (não afeta position: sticky/fixed) */}
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Services />
        <Team />
        <Gallery />
        <Booking />
        <Contact />
      </main>

      <Footer className="overflow-x-clip" />
      <WhatsAppFloat />
    </>
  )
}

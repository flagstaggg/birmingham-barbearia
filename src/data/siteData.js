/* ============================================================================
 * SITE DATA — Birmingham Barbearia
 * ----------------------------------------------------------------------------
 * TODO o conteúdo editável do site está NESTE arquivo.
 * Troque aqui: WhatsApp, Calendly, endereço, horários, redes sociais,
 * serviços, equipe, imagens e todos os textos das seções.
 * ========================================================================== */

// Imagens placeholder do Unsplash (barbearia / barbearos).
// TROQUE PELAS FOTOS REAIS: basta substituir a URL mantendo o mesmo formato.
const IMG = {
  // Hero — imagem escura de ambiente (o vídeo é opcional, veja hero.video)
  hero:
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=80',
  // Vídeo opcional em loop silencioso (.mp4). Deixe null para usar só a imagem.
  heroVideo: null,
  // Sobre — ambiente
  about:
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
  // Equipe — retratos com fundo escuro (tratados em preto e branco via CSS)
  team: {
    rafael:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    lucas:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    diego:
      'https://images.unsplash.com/photo-1615109398623-88346a601842?auto=format&fit=crop&w=800&q=80',
    thiago:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80',
  },
  // Galeria — cortes, barba e ambiente (fotos escuras)
  gallery: [
    {
      src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=80',
      alt: 'Ritual de barba com toalha quente e vapor',
      caption: 'Ritual de barba com toalha quente',
    },
    {
      src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1400&q=80',
      alt: 'Corte executado com máquina e finalização',
      caption: 'Corte — precisão na máquina',
    },
    {
      src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1400&q=80',
      alt: 'Interior da barbearia em tons escuros e madeira',
      caption: 'A sala — luz baixa e madeira',
    },
    {
      src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1400&q=80',
      alt: 'Barbeiro desenhando a linha da barba com navalha',
      caption: 'Barba — linha desenhada à mão',
    },
    {
      src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=80',
      alt: 'Tesoura e navalha sobre a bancada de trabalho',
      caption: 'Ferramentas descansadas sobre a bancada',
    },
    {
      src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1400&q=80',
      alt: 'Barbeiro durante o atendimento no salão escuro',
      caption: 'O ofício, sem pressa',
    },
    {
      src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1400&q=80',
      alt: 'Pincéis de barbearia organizados em suporte',
      caption: 'Seleção de pincéis e produtos',
    },
    {
      src: 'https://images.unsplash.com/photo-1590540179852-2110a54f813a?auto=format&fit=crop&w=1400&q=80',
      alt: 'Detalhe do atendimento com escovação do cabelo',
      caption: 'Detalhe que faz a diferença',
    },
  ],
}

// ---------------------------------------------------------------------------
// WHATSAPP
// ---------------------------------------------------------------------------
// FORMATO OBRIGATÓRIO: código do país + DDD + número, somente números.
// Ex.: Santa Catarina (48) => 5548999999999  <- TROQUE AQUI
export const WHATSAPP_NUMBER = '5548999999999'

// Mensagem padrão pré-preenchida ao clicar nos botões de WhatsApp.
export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Gostaria de agendar um horário na Birmingham Barbearia.'

// ---------------------------------------------------------------------------
// CALENDLY
// ---------------------------------------------------------------------------
// Link da agenda online.
// TROQUE pelo link real, por exemplo:
// https://calendly.com/codewithharry/30min
export const CALENDLY_URL = 'https://calendly.com/birmingham-barbearia/corte-barba'

// ---------------------------------------------------------------------------
// NEGÓCIO
// ---------------------------------------------------------------------------
export const business = {
  name: 'Birmingham Barbearia',
  shortName: 'Birmingham',
  tagline: 'Barbearia Premium',
  // Telefone exibido no site (apenas apresentação).
  phoneDisplay: '(48) 99999-9999',
  instagram: 'https://www.instagram.com/birminghambarbearia/',
  instagramHandle: '@birminghambarbearia',
  email: 'contato@birminghambarbearia.com.br',
  address: {
    street: 'Rua Exemplo, 123 — Centro',
    city: 'Criciúma',
    state: 'SC',
    zip: '88800-000',
    country: 'Brasil',
  },
  // Link do mapa. Use o link de compartilhamento do Google Maps do endereço real.
  mapEmbedUrl:
    'https://www.google.com/maps?q=Rua%20Exemplo%2C%20123%20-%20Centro%2C%20Crici%C3%BAma%20-%20SC&output=embed',
  mapLinkUrl: 'https://www.google.com/maps/search/?api=1&query=Crici%C3%BAma+-+SC',
  hours: [
    { days: 'Segunda a Sexta', time: '09:00 — 20:00' },
    { days: 'Sábado', time: '09:00 — 18:00' },
    { days: 'Domingo', time: 'Fechado' },
  ],
  // Destaques exibidos na seção Sobre.
  highlights: [
    { value: '+12', label: 'Anos de casa' },
    { value: '+18 mil', label: 'Atendimentos' },
    { value: '4', label: 'Barbeiros' },
  ],
}

// ---------------------------------------------------------------------------
// NAVEGAÇÃO
// ---------------------------------------------------------------------------
export const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Agendar', href: '#agendar' },
  { label: 'Contato', href: '#contato' },
]

// ---------------------------------------------------------------------------
// HERO
// ---------------------------------------------------------------------------
export const hero = {
  eyebrow: 'Criciúma — Santa Catarina',
  title: 'A arte do cuidado masculino',
  subtitle:
    'Cortes executados com técnica, barba tratada em ritual e um ambiente pensado para o seu tempo.',
  primaryCta: 'Agendar horário',
  secondaryCta: 'Conhecer serviços',
  image: IMG.hero,
  // Vídeo opcional (mp4, loop silencioso). null = usa apenas a imagem.
  video: IMG.heroVideo,
  imageAlt: 'Interior da Birmingham Barbearia iluminado em tons escuros',
}

// ---------------------------------------------------------------------------
// SOBRE
// ---------------------------------------------------------------------------
export const about = {
  eyebrow: 'A Casa',
  title: 'Onde o detalhe faz a diferença',
  image: IMG.about,
  imageAlt: 'Bancada da barbearia com ferramentas alinhadas',
  paragraphs: [
    'A Birmingham nasceu da convicção de que cuidar da aparência não é vaidade — é um gesto de respeito por si mesmo. Fundada em Criciúma, a casa reúne a precisão da barbearia clássica às técnicas contemporâneas de cuidado.',
    'Cada detalhe é pensado: a temperatura da toalha, o tempo entre uma etapa e outra, a conversa enquanto o trabalho acontece. Recebemos cada cliente como quem entra na nossa própria sala de estar.',
    'Um espaço restrito, música baixa, luz baixa. Nada de ruído. Nada de pressa. Apenas trabalho bem feito.',
  ],
  signature: 'Birmingham Barbearia',
}

// ---------------------------------------------------------------------------
// SERVIÇOS
// ---------------------------------------------------------------------------
export const services = {
  eyebrow: 'Serviços',
  title: 'O que fazemos',
  intro:
    'Trabalho manual, técnica apurada e produtos selecionados. Cada serviço tem seu tempo próprio — e ele nunca é acelerado.',
  items: [
    {
      name: 'Corte clássico',
      description: 'Consulta, lavagem, corte à tesoura ou máquina e finalização.',
      duration: '40 min',
      price: 'R$ 70',
    },
    {
      name: 'Corte + barba',
      description: 'O combo da casa: corte completo, barba esculpida e acabamento na navalha.',
      duration: '70 min',
      price: 'R$ 110',
    },
    {
      name: 'Barba com toalha quente',
      description: 'Toalha aquecida, óleo, esfoliação e finalização.',
      duration: '40 min',
      price: 'R$ 75',
    },
    {
      name: 'Pigmentação',
      description: 'Preenchimento de falhas e definição de linha com pigmento aplicado.',
      duration: '50 min',
      price: 'R$ 90',
    },
    {
      name: 'Sobrancelha',
      description: 'Design e alinhamento com pinça, preservando o traço natural.',
      duration: '15 min',
      price: 'R$ 25',
    },
    {
      name: 'Hidratação capilar',
      description: 'Esfoliação, máscara térmica e finalização.',
      duration: '30 min',
      price: 'R$ 60',
    },
    {
      name: 'Pacote Premium',
      description: 'Corte, barba, pigmentação, sobrancelha e hidratação. O serviço completo.',
      duration: '2 h',
      price: 'R$ 220',
      featured: true,
    },
  ],
}

// ---------------------------------------------------------------------------
// EQUIPE
// ---------------------------------------------------------------------------
export const team = {
  eyebrow: 'Equipe',
  title: 'Os profissionais da casa',
  intro: 'Quatro profissionais, quatro especialidades. Escolha o seu.',
  members: [
    {
      name: 'Rafael Nunes',
      role: 'Master Barber',
      specialty: 'Cortes clássicos e navalhado',
      bio: 'Décadas de ofício e o hábito de ouvir antes de cortar.',
      image: IMG.team.rafael,
    },
    {
      name: 'Lucas Prado',
      role: 'Barbeiro',
      specialty: 'Degradê e design de linha',
      bio: 'Precisão milimétrica em contornos e acabamento.',
      image: IMG.team.lucas,
    },
    {
      name: 'Diego Ramos',
      role: 'Barbeiro',
      specialty: 'Barba em ritual',
      bio: 'Referência da casa no trabalho com toalha quente e navalha.',
      image: IMG.team.diego,
    },
    {
      name: 'Thiago Menezes',
      role: 'Barbeiro',
      specialty: 'Pigmentação e grisalho',
      bio: 'Cuida da cor com técnica e produto de qualidade.',
      image: IMG.team.thiago,
    },
  ],
}

// ---------------------------------------------------------------------------
// GALERIA
// ---------------------------------------------------------------------------
export const gallery = {
  eyebrow: 'Galeria',
  title: 'O trabalho falando por si',
  intro: 'Toque em qualquer foto para ampliar.',
  items: IMG.gallery,
}

// ---------------------------------------------------------------------------
// AGENDAMENTO
// ---------------------------------------------------------------------------
export const booking = {
  eyebrow: 'Agendamento',
  title: 'Reserve seu horário',
  intro:
    'Escolha a forma que preferir: fale direto com a recepção pelo WhatsApp ou consulte a nossa agenda online e reserve o melhor horário em segundos.',
  whatsappCard: {
    title: 'Agende pelo WhatsApp',
    description:
      'Atendimento pessoal, confirmação imediata e a liberdade de escolher o melhor horário com a nossa equipe.',
    buttonLabel: 'Agendar pelo WhatsApp',
    notes: [
      'Resposta em poucos minutos durante o horário comercial',
      'Consultas com hora marcada, sem filas',
      'Remarcação facilitada',
    ],
  },
  calendlyCard: {
    title: 'Ou reserve pela agenda online',
    description: 'Escolha o dia e o horário disponível direto no calendário abaixo.',
  },
}

export { IMG }

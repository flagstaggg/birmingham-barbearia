# Birmingham Barbearia

Site institucional (single page) da **Birmingham Barbearia** — barbearia premium em Criciúma, SC.
Dark, sofisticado e pensado para converter visitas em agendamentos pelo **WhatsApp** ou pelo **Calendly**.

> **Nota sobre o nome:** "Birmingham" aqui é apenas a marca da barbearia. O site não tem nenhuma
> referência visual ou textual à cidade de Birmingham (Inglaterra).

---

## Como rodar

```bash
npm install     # instala as dependências
npm run dev     # sobe o site em http://localhost:5173
npm run build   # gera a versão de produção em /dist
npm run preview # testa a versão de produção localmente
```

Requisitos: Node.js 18 ou superior.

---

## Onde trocar tudo

**Todo o conteúdo editável do site está em um único arquivo:**
[`src/data/siteData.js`](src/data/siteData.js)

### Número do WhatsApp

No topo do arquivo:

```js
export const WHATSAPP_NUMBER = '5548999999999'
```

Formato: **código do país + DDD + número, somente números**.
Para Santa Catarina (DDD 48): `55` + `48` + `9 dígitos` = `5548999999999`.

A mensagem padrão dos botões fica logo abaixo:

```js
export const WHATSAPP_DEFAULT_MESSAGE =
  'Olá! Gostaria de agendar um horário na Birmingham Barbearia.'
```

Esse número é usado em **todos** os pontos de contato: botão da seção de
agendamento, botão flutuante, rodapé, card de telefone e no envio do formulário.

### Link do Calendly

```js
export const CALENDLY_URL = 'https://calendly.com/birmingham-barbearia/corte-barba'
```

Troque pelo link real da agenda (no Calendly: **Share → Embed**).
Enquanto o link for o de exemplo, o site exibe um aviso amigável com botão
alternativo para o WhatsApp, em vez de tentar carregar uma agenda inexistente.

As cores do calendário seguem a paleta do site e ficam no topo do componente
[`src/components/Booking.jsx`](src/components/Booking.jsx):

```js
const calendlyTheme = {
  backgroundColor: '#0D0D0D',
  textColor: '#F5F1E8',
  primaryColor: '#C9A961',
}
```

> O visual final do calendário também depende das configurações de tema da
> própria conta Calendly do cliente.

### Endereço, telefone e horários

No objeto `business`:

```js
export const business = {
  phoneDisplay: '(48) 99999-9999',
  instagram: 'https://www.instagram.com/birminghambarbearia/',
  address: { street: '...', city: 'Criciúma', state: 'SC', zip: '...' },
  mapEmbedUrl: '...',   // link do mapa (iframe)
  mapLinkUrl:  '...',   // link "Como chegar"
  hours: [ { days: 'Segunda a Sexta', time: '09:00 — 20:00' } ],
}
```

Para gerar o `mapEmbedUrl` correto: abra o Google Maps → compartilhar →
**Copiar link**. O endereço do mapa também aparece nos dados estruturados
(JSON-LD) do `index.html` — lembre-se de manter os dois em sincronia.

### Serviços, equipe e galeria

Todos no mesmo arquivo:

- `services.items` — nome, descrição, duração e preço de cada serviço
- `team.members` — nome, cargo, especialidade, descrição e foto
- `gallery.items` — fotos com `src`, `alt` e `caption`
- `about`, `hero`, `booking` — todos os textos das seções
- `navLinks` — itens do menu

### Fotos

As imagens atuais são placeholders do Unsplash. Para usar as fotos reais,
basta substituir as URLs mantendo o mesmo formato:

```js
'https://sua-cdn.com/sua-foto.jpg?auto=format&fit=crop&w=1400&q=80'
```

Recomendado: imagens **escuras** para combinar com a paleta. As fotos da equipe
ficam em preto e branco automaticamente (e ganham cor no hover).

**Vídeo do Hero (opcional):** adicione a URL de um `.mp4` curto e silencioso:

```js
hero: {
  video: 'https://sua-cdn.com/hero.mp4',
  // se o vídeo falhar, o site volta para a imagem automaticamente
}
```

### Cores

As variáveis estão no topo de [`src/styles/index.css`](src/styles/index.css):

```css
:root {
  --bg: #0d0d0d;                        /* fundo principal */
  --surface: #1a1a1a;                   /* cards e seções alternadas */
  --accent: #c9a961;                    /* dourado envelhecido */
  --text: #f5f1e8;                      /* creme */
  --text-muted: rgba(245, 241, 232, 0.65);
  --line: rgba(201, 169, 97, 0.25);     /* linhas e divisores */
}
```

Elas são consumidas pelo Tailwind através de [`tailwind.config.js`](tailwind.config.js)
como `bg-bg`, `bg-surface`, `text-accent`, `text-text`, `text-muted` e `border-line`.
**Trocar essas 6 linhas muda o site inteiro.**

> Se mudar a altura do header, ajuste também `--header-height` (mesmo arquivo),
> que controla a compensação das âncoras ao clicar no menu.

### SEO

Em [`index.html`](index.html): `title`, `meta description`, Open Graph, canonical,
`lang="pt-BR"` e os dados estruturados JSON-LD do tipo `HairSalon`.
Antes de publicar, atualize **domínio, telefone e endereço** tanto no JSON-LD
quanto no `siteData.js`.

---

## Estrutura

```
birmingham-barbearia/
├─ index.html              SEO, Open Graph, JSON-LD, favicon
├─ public/favicon.svg      Letra "B" em dourado sobre fundo escuro
└─ src/
   ├─ main.jsx
   ├─ App.jsx              Ordem das seções
   ├─ data/siteData.js     ★ TODO O CONTEÚDO EDITÁVEL
   ├─ styles/index.css     Variáveis de cor e estilos base
   ├─ lib/
   │  ├─ smoothScroll.js   Lenis + navegação por âncoras
   │  └─ whatsapp.js       Montagem dos links wa.me
   ├─ hooks/               useSmoothScroll, useScrolled, useScrollSpy
   └─ components/
      ├─ Header.jsx        Header fixo + menu mobile em tela cheia
      ├─ Hero.jsx          Tela de abertura
      ├─ About.jsx         Sobre + números da casa
      ├─ Services.jsx      Lista em formato de cardápio
      ├─ Team.jsx          Equipe (fotos em P&B)
      ├─ Gallery.jsx       Carrossel Swiper + lightbox
      ├─ Booking.jsx       WhatsApp + Calendly
      ├─ Contact.jsx       Contato, mapa e formulário
      ├─ Footer.jsx
      ├─ WhatsAppFloat.jsx Botão flutuante
      ├─ Button.jsx        primary | outline | compact | link
      ├─ Reveal.jsx        Animação de entrada (Reveal)
      ├─ SectionTitle.jsx  Cabeçalho padrão de seção
      ├─ Ornament.jsx      Ornamento separador
      ├─ Logo.jsx
      ├─ MapEmbed.jsx
      └─ ContactForm.jsx   react-hook-form + zod
```

## Tecnologias

React 18 · Vite · Tailwind CSS · Framer Motion · Lenis · Swiper ·
yet-another-react-lightbox · lucide-react · react-hook-form + zod ·
react-calendly · react-intersection-observer

## Acessibilidade e performance

- HTML semântico (`header`, `nav`, `main`, `section`, `footer`), `aria-label` nos
  botões de ícone e foco visível em toda a navegação por teclado.
- Respeita `prefers-reduced-motion`: sem scroll suave nem animações de entrada
  quando o usuário pede menos movimento no sistema.
- Sem rolagem horizontal em nenhuma largura (testado em 375px, 768px e 1440px).
- Imagens com `loading="lazy"`, `alt` descritivo e dimensões definidas para evitar
  layout shift. Apenas a imagem do Hero é carregada de imediato.
- Link "Pular para o conteúdo" para leitores de tela e navegação por teclado.

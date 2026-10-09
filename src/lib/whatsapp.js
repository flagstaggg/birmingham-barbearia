import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '../data/siteData'

/**
 * Monta o link wa.me com a mensagem já preenchida.
 * A mensagem é enviada codificada (encodeURIComponent) para que acentos,
 * quebras de linha e emojis funcionem no WhatsApp.
 */
export function buildWhatsAppLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  const text = message?.trim() || WHATSAPP_DEFAULT_MESSAGE
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

/** Monta a mensagem do formulário de contato já preenchida. */
export function buildContactMessage({ name, phone, service, message }) {
  const lines = [
    `Olá! Meu nome é ${name}.`,
    '',
    `Gostaria de agendar um horário na Birmingham Barbearia.`,
    `Telefone: ${phone}`,
    service ? `Serviço desejado: ${service}` : null,
    message ? `Mensagem: ${message}` : null,
    '',
    'Aguardo a confirmação. Obrigado!',
  ].filter((line) => line !== null)

  return lines.join('\n')
}

/** Abre o WhatsApp em nova aba. */
export function openWhatsApp(message) {
  window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
}

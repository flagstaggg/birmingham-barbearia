import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle2 } from 'lucide-react'

import Button from './Button'
import { services } from '../data/siteData'
import { buildContactMessage, openWhatsApp } from '../lib/whatsapp'

// Esquema de validação — mensagens em pt-BR
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome completo.')
    .max(80, 'O nome é muito longo.'),
  phone: z
    .string()
    .trim()
    .min(8, 'Informe um telefone válido.')
    .regex(
      /^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
      'Telefone inválido. Ex.: (48) 99999-9999'
    ),
  service: z
    .string()
    .min(1, 'Escolha o serviço desejado.')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .max(500, 'A mensagem pode ter no máximo 500 caracteres.')
    .optional()
    .or(z.literal('')),
})

// Campos base para manter o estilo consistente
const inputBase =
  'w-full border-b border-line bg-transparent px-0 py-3 font-sans text-sm font-light text-text placeholder:text-text/35 transition-colors duration-400 focus:border-accent focus:outline-none'

const labelBase =
  'block font-sans text-[10px] uppercase tracking-widest text-muted transition-colors duration-400 peer-focus:text-accent'

/**
 * Formulário de contato. Ao enviar, abre o WhatsApp com os dados preenchidos
 * já montados na mensagem (sem back-end).
 */
export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { name: '', phone: '', service: '', message: '' },
  })

  const onSubmit = (data) => {
    openWhatsApp(buildContactMessage(data))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Nome e telefone */}
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Nome completo
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            className={inputBase}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-xs text-accent">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelBase}>
            Telefone / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(48) 99999-9999"
            className={inputBase}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-2 text-xs text-accent">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Serviço desejado */}
      <div>
        <label htmlFor="service" className={labelBase}>
          Serviço desejado
        </label>
        <select
          id="service"
          defaultValue=""
          className={`${inputBase} cursor-pointer`}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? 'service-error' : undefined}
          {...register('service')}
        >
          <option value="">Selecione um serviço</option>
          {services.items.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name} — {item.price}
            </option>
          ))}
          <option value="Outro">Outro / não sei ainda</option>
        </select>
        {errors.service && (
          <p id="service-error" className="mt-2 text-xs text-accent">
            {errors.service.message}
          </p>
        )}
      </div>

      {/* Mensagem */}
      <div>
        <label htmlFor="message" className={labelBase}>
          Mensagem <span className="normal-case tracking-normal">(opcional)</span>
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Conte brevemente o que procura"
          className={`${inputBase} resize-none`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-xs text-accent">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <Button type="submit" icon={Send} iconPosition="right">
          Enviar pelo WhatsApp
        </Button>

        {isSubmitSuccessful && (
          <p
            className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-muted"
            role="status"
          >
            <CheckCircle2 size={15} strokeWidth={1.25} className="text-accent" aria-hidden="true" />
            Mensagem aberta no WhatsApp
          </p>
        )}
      </div>
    </form>
  )
}

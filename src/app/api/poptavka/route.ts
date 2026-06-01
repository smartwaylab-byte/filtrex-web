import { NextRequest, NextResponse } from 'next/server'
import { getResend, CONTACT_EMAIL } from '@/lib/resend'
import { z } from 'zod'

const schema = z.object({
  company: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  product: z.string().optional(),
  volume: z.string().optional(),
  liquid: z.string().optional(),
  message: z.string().min(5),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })

  const { company, name, email, phone, product, volume, liquid, message } = parsed.data

  const resend = getResend()
  await resend.emails.send({
    from: 'web@filtrex.cz',
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Nová poptávka z webu – ${company}`,
    html: `
      <h2>Nová poptávka z webu filtrex.cz</h2>
      <p><strong>Firma:</strong> ${company}</p>
      <p><strong>Kontaktní osoba:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
      ${product ? `<p><strong>Produkt:</strong> ${product}</p>` : ''}
      ${volume ? `<p><strong>Objem filtrace:</strong> ${volume}</p>` : ''}
      ${liquid ? `<p><strong>Filtrovaná tekutina:</strong> ${liquid}</p>` : ''}
      <hr/>
      <p><strong>Popis požadavku:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  })

  return NextResponse.json({ ok: true })
}

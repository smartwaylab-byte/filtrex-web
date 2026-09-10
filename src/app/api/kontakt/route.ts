import { NextRequest, NextResponse } from 'next/server'
import { getResend, CONTACT_EMAIL } from '@/lib/resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().min(2),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })

  const { name, email, phone, country, message } = parsed.data

  const resend = getResend()
  const { error } = await resend.emails.send({
    from: 'web@filtrex.cz',
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Nová zpráva z kontaktního formuláře – ${name}`,
    html: `
      <h2>Nová zpráva z webu filtrex.cz</h2>
      <p><strong>Jméno:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
      <p><strong>Země:</strong> ${country}</p>
      <hr/>
      <p><strong>Zpráva:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  })

  if (error) {
    console.error('Resend error (kontakt):', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

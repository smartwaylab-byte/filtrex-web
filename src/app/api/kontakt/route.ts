import { NextRequest, NextResponse } from 'next/server'
import { resend, CONTACT_EMAIL } from '@/lib/resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })

  const { name, email, phone, message } = parsed.data

  await resend.emails.send({
    from: 'web@filtrex.cz',
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Nová zpráva z kontaktního formuláře – ${name}`,
    html: `
      <h2>Nová zpráva z webu filtrex.cz</h2>
      <p><strong>Jméno:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
      <hr/>
      <p><strong>Zpráva:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  })

  return NextResponse.json({ ok: true })
}

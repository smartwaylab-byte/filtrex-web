import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { resend, CONTACT_EMAIL } from '@/lib/resend'
import Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    await resend.emails.send({
      from: 'objednavky@filtrex.cz',
      to: CONTACT_EMAIL,
      subject: `Nová objednávka #${session.id.slice(-8).toUpperCase()}`,
      html: `
        <h2>Nová objednávka z webu</h2>
        <p><strong>ID:</strong> ${session.id}</p>
        <p><strong>Zákazník:</strong> ${session.customer_details?.name ?? '–'}</p>
        <p><strong>Email:</strong> ${session.customer_details?.email ?? '–'}</p>
        <p><strong>Celková částka:</strong> ${((session.amount_total ?? 0) / 100).toLocaleString('cs-CZ')} Kč</p>
        <p><a href="https://dashboard.stripe.com/payments/${session.payment_intent}">Zobrazit v Stripe</a></p>
      `,
    })
  }

  return NextResponse.json({ received: true })
}

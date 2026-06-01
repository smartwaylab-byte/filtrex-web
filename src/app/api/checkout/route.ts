import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/store/cart'

export async function POST(req: NextRequest) {
  const { items }: { items: CartItem[] } = await req.json()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  const lineItems = items
    .filter((item) => item.stripePriceId && item.stripePriceId !== 'price_DOPLNIT')
    .map((item) => ({
      price: item.stripePriceId,
      quantity: item.quantity,
    }))

  if (lineItems.length === 0) {
    return NextResponse.json(
      { error: 'Žádný produkt nemá nastavenou cenu. Kontaktujte nás pro cenovou nabídku.' },
      { status: 400 }
    )
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: `${baseUrl}/kosik/dekujeme?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/kosik`,
    locale: 'cs',
  })

  return NextResponse.json({ url: session.url })
}

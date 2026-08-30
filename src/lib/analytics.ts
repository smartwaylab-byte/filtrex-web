'use client'

/**
 * GA4 „key event" napojený na odeslání formulářů (poptávka / kontakt).
 *
 * V GA4 property „Filtrex-web" je událost `qualify_lead` označená jako klíčová
 * událost (konverze). Posílá se POUZE po potvrzené úspěšné odpovědi z API
 * (`res.ok` z /api/poptavka resp. /api/kontakt), nikdy jen při kliknutí na
 * tlačítko Odeslat – ať se do konverzí nezapočítají nepovedené pokusy.
 *
 * Volání je bezpečné i bez GA (adblock, chybějící souhlas s cookies, výpadek
 * skriptu): pokud gtag ani dataLayer neexistují, tiše se nic nestane a odeslání
 * formuláře to nijak neovlivní.
 *
 * GA je na webu načtená přes `@next/third-parties/google` (`<GoogleAnalytics>`
 * v `src/components/cookies/CookieConsent.tsx`), což je čistá gtag.js integrace –
 * inicializační skript definuje globální `window.gtag` a `window.dataLayer`.
 *
 * Pozn.: události `close_convert_lead` a `purchase` se dějí mimo web
 * (telefonické doladění, uzavření zakázky) a označují se ručně, ne z tohoto kódu.
 */

type QualifyLeadParams = {
  /** Odkud poptávka přišla – v GA4 se dá rozlišit přes parametr `form_location`. */
  form_location: 'poptavka' | 'kontakt'
  /** Vyplněno, když poptávka vznikla z konkrétního produktu / z košíku. */
  product_name?: string
}

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void
  dataLayer?: unknown[]
}

export function trackQualifyLead(params: QualifyLeadParams): void {
  if (typeof window === 'undefined') return

  const payload = {
    form_location: params.form_location,
    ...(params.product_name ? { product_name: params.product_name } : {}),
  }

  try {
    const w = window as GtagWindow
    let sent = false

    // Primární cesta: globální gtag() – init skript `@next/third-parties`
    // ho definuje hned (dřív než se vůbec načte externí gtag/js), takže když
    // je GA na stránce, tahle větev vždy projde.
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'qualify_lead', payload)
      sent = true
    } else if (Array.isArray(w.dataLayer)) {
      // Fallback pro případ, že by gtag() nebyl k dispozici, ale dataLayer ano.
      w.dataLayer.push({ event: 'qualify_lead', ...payload })
      sent = true
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(
        sent
          ? '[GA4] qualify_lead odeslán:'
          : '[GA4] qualify_lead – GA není načtená, event se nepošle:',
        payload,
      )
    }
  } catch {
    // Analytika nesmí za žádných okolností shodit odeslání formuláře.
  }
}

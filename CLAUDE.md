@AGENTS.md

# Filtrex Web – stav projektu

## Technologie

- Next.js 16.2.6 (App Router, Turbopack)
- Tailwind CSS
- next-intl v3 (6 jazyků: cs, en, de, es, it, pl)
- Zustand (košík, persist do localStorage)
- Stripe (platby – zatím bez API klíče)
- Sanity v3 (blog – zatím bez project ID)
- Resend (emaily – zatím bez API klíče)
- Vercel (nasazení: https://filtrex-web.vercel.app)
- GitHub: https://github.com/smartwaylab-byte/filtrex-web

## Co je hotové

### Infrastruktura
- [x] Next.js projekt s App Routerem a Turbopackem
- [x] i18n routing: `localePrefix: 'as-needed'`, `localeDetection: false`, default locale `cs`
- [x] Middleware (`src/proxy.ts`) – Next.js 16 konvence, named export `proxy`
- [x] Nasazení na Vercel (CLI: `npx vercel --prod`)
- [x] GitHub repozitář (`smartwaylab-byte/filtrex-web`)

### Stránky
- [x] Homepage (`/`) – hero, o firmě, produkty, reference, CTA
- [x] Produkty listing (`/produkty`)
- [x] Produktový detail (`/produkty/[slug]`) – výběr kusů, přidat do košíku
- [x] Košík (`/kosik`) – zobrazení položek, úprava množství, checkout
- [x] Reference (`/reference`) – 12 zákazníků, 5 zemí
- [x] Aktuality (`/aktuality`) – napojeno na Sanity, fallback při chybějícím API
- [x] Kontakt (`/kontakt`) – formulář s validací
- [x] Poptávka (`/poptavka`) – formulář s validací
- [x] Sanity Studio (`/studio`)

### Produkty (v `src/lib/products.ts`)
- [x] FILTREX D18 20/20 – slug: `filtrex-d18-2020`, obrázky: d18-1.jpg, d18-2.jpg
- [x] RIFTELEN N15 – slug: `riftelen-n15`, obrázek: riftelen-n15.png
- [x] FILTREX D11 40/40 – slug: `filtrex-d11-4040`, `inDevelopment: true`, bez obrázku

### Košík a objednávky
- [x] Zustand store (`src/store/cart.ts`) s persist do localStorage
- [x] Výběr počtu kusů na stránce produktu (+ / − tlačítka)
- [x] API route `/api/checkout` (Stripe – lazy init, funguje bez klíče)
- [x] API route `/api/webhook` (Stripe webhook → email přes Resend)
- [x] API route `/api/kontakt` (Resend – lazy init)
- [x] API route `/api/poptavka` (Resend – lazy init)

### Překlady (6 jazyků)
- [x] `src/messages/{cs,en,de,es,it,pl}.json` – kompletní překlady všech sekcí

## Co zbývá dodělat

### API klíče (nutné pro ostrý provoz)
- [ ] **Stripe** – nastavit `STRIPE_SECRET_KEY` a `STRIPE_WEBHOOK_SECRET` v Vercel → Settings → Environment Variables
- [ ] **Stripe** – vytvořit produkty/ceny v Stripe Dashboard a doplnit `stripePriceId` do `src/lib/products.ts`
- [ ] **Resend** – nastavit `RESEND_API_KEY` v Vercel (emaily z kontaktního formuláře a poptávky)
- [ ] **Sanity** – spustit `npx sanity init`, vyplnit `NEXT_PUBLIC_SANITY_PROJECT_ID` a `NEXT_PUBLIC_SANITY_DATASET`
- [ ] **BASE URL** – nastavit `NEXT_PUBLIC_BASE_URL` na skutečnou doménu

### Design a barvy
- [ ] Ověřit firemní barvy (zelená #15803d / Tailwind `green-700` – zatím odhadnuto)
- [ ] Logo – doplnit skutečné SVG logo do `src/components/layout/Header.tsx` (zatím textový placeholder)
- [ ] Favicon – doplnit do `public/`
- [ ] Hero sekce – zvážit přidání fotografie nebo videa pozadí
- [ ] Fonty – ověřit s klientem (zatím Inter)

### Obsah
- [ ] Ceny produktů – doplnit reálné ceny nebo ponechat "Cena na dotaz"
- [ ] FILTREX D11 40/40 – doplnit obrázek až bude k dispozici
- [ ] Popis produktů – ověřit s klientem (texty z PDF podkladů)
- [ ] Reference – doplnit případně loga zákazníků
- [ ] Footer – ověřit IČO a DIČ firmy
- [ ] Obchodní podmínky a GDPR stránky (zatím prázdné placeholdery)

### Technické
- [ ] Sanity schéma – spustit `npx sanity init` pro blog
- [ ] Vlastní doména – napojit na Vercel
- [ ] OG image – doplnit pro sdílení na sociálních sítích
- [x] Analytics – Vercel Analytics (nasazeno) + Google Analytics 4 (`@next/third-parties`, `GoogleAnalytics` komponenta v `src/app/[locale]/layout.tsx`, ID v `NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- [ ] GA4 – založit property na analytics.google.com, doplnit `NEXT_PUBLIC_GA_MEASUREMENT_ID`, nasdílet přístup klientovi (mimo kód, ručně přes Google účet klienta)

## Poznámky pro vývoj

### Env proměnné (`.env.local` – není v gitu)
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
CONTACT_EMAIL=kopecny@filtrex.cz
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_BASE_URL=https://filtrex.cz
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

### Nasazení
```powershell
# Dev server
npm run dev

# Nasadit na Vercel
npx vercel --prod
```

### Důležité konvence (Next.js 16)
- Middleware = `src/proxy.ts` s named exportem `proxy` (ne `middleware.ts`)
- Async Server Components: používat `await getTranslations()` z `next-intl/server`, ne hook `useTranslations`
- Route params jsou Promise: `const { slug } = await params`
- Stripe a Resend jsou lazy-init (funkce `getStripe()`, `getResend()`) – neinicializují se při buildu

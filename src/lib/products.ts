export type Product = {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  price: number
  currency: string
  stripePriceId: string
  images: string[]
  parameters: { label: string; value: string }[]
  inDevelopment?: boolean
  category: 'filter' | 'membrane' | 'accessory'
}

export const products: Product[] = [
  {
    id: 'filtrex-d18-2020',
    slug: 'filtrex-d18-2020',
    name: 'FILTREX D18 20/20',
    shortDescription: 'Deskový filtr pro filtraci rostlinných olejů a kosmetiky z nerezové oceli.',
    description: `Deskový filtr FILTREX D18 20/20 je průmyslový filtr z nerezové oceli určený pro filtraci rostlinných olejů, kosmetiky a dalších potravinářských tekutin. Využívá nanovlákennou filtrační membránu RIFTELEN N15 pro dosažení vysoké čistoty filtrovaného produktu.

Variabilní počet desek umožňuje přizpůsobit filtrační plochu konkrétním potřebám výroby. Hygienické provedení z nerezové oceli splňuje požadavky potravinářského průmyslu.`,
    price: 0,
    currency: 'CZK',
    stripePriceId: 'price_DOPLNIT',
    images: ['/products/d18-1.jpg', '/products/d18-2.jpg'],
    parameters: [
      { label: 'Počet nerezových desek', value: 'variabilní 6 až 20' },
      { label: 'Filtrační plocha', value: '0,18 – 0,69 m²' },
      { label: 'Pracovní tlak', value: '0 – 2,5 baru' },
      { label: 'Výkon', value: '5 – 25 litrů / hodinu' },
      { label: 'Materiál', value: 'nerezová ocel' },
      { label: 'Použití', value: 'rostlinné oleje, kosmetika, potravinářství' },
    ],
    category: 'filter',
  },
  {
    id: 'riftelen-n15',
    slug: 'riftelen-n15',
    name: 'RIFTELEN N15',
    shortDescription: 'Nanovlákenná filtrační membrána pro deskové filtry FILTREX.',
    description: `RIFTELEN® N15 je nanovlákenná filtrační membrána vyvinutá speciálně pro deskové filtry FILTREX D18 20/20. Membrána je chráněna užitným vzorem 31084.

Výhody oproti klasické filtrační tkanině:
– Výrazně menší tlaková ztráta – zvyšuje výkon deskového filtru
– Šetrnější k filtrované tekutině – umožňuje filtraci při nižším tlaku
– Větší prodyšnost – možnost vytlačení zbytkové tekutiny vzduchem po vytvoření filtračního koláče
– Hydrofobní povrch – lépe se čistí
– Nižší plošná hmotnost

Dostupná ve variantě N15–5 (zádržnost 5 µm) a N15–12 (zádržnost 12 µm).`,
    price: 0,
    currency: 'CZK',
    stripePriceId: 'price_DOPLNIT',
    images: ['/products/riftelen-n15.png'],
    parameters: [
      { label: 'Typ', value: 'nanovlákenná filtrační membrána' },
      { label: 'Kompatibilita', value: 'FILTREX D18 20/20' },
      { label: 'Použití', value: 'rostlinné oleje, kosmetika' },
      { label: 'Technologie', value: 'nanovlákno' },
      { label: 'Varianta N15–5', value: 'zádržnost 5 µm, hmotnost 185 g/m²' },
      { label: 'Varianta N15–12', value: 'zádržnost 12 µm, hmotnost 181 g/m²' },
      { label: 'Ochrana', value: 'Užitný vzor 31084' },
    ],
    category: 'membrane',
  },
  {
    id: 'filtrex-d11-4040',
    slug: 'filtrex-d11-4040',
    name: 'FILTREX D11 40/40',
    shortDescription: 'Deskový filtr větší kapacity – ve vývoji, dostupný koncem roku.',
    description: 'Deskový filtr FILTREX D11 40/40 je připravován jako výkonnější varianta pro větší objemy filtrace. Bude dostupný koncem tohoto roku.',
    price: 0,
    currency: 'CZK',
    stripePriceId: '',
    images: [],
    parameters: [],
    inDevelopment: true,
    category: 'filter',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export default function CopyrightPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Copyright</h1>
      <p className="text-sm text-gray-500 mb-10">Filtrex s.r.o.</p>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Webové stránky www.filtrex.cz a veškerý jejich obsah — včetně textů, fotografií, grafiky, technické dokumentace,
          log a dalších materiálů — jsou chráněny autorským zákonem (zákon č. 121/2000 Sb.) a dalšími předpisy
          na ochranu duševního vlastnictví.
        </p>
        <p>
          Majetková autorská práva k obsahu webu vykonává společnost Filtrex s.r.o.,
          Lanškrounská 37, 568 02 Svitavy, IČO: 15034313.
        </p>
        <p>
          Jakékoli kopírování, šíření, zveřejňování nebo jiné užití obsahu těchto stránek —
          ať celku, nebo jeho části — je bez předchozího písemného souhlasu společnosti Filtrex s.r.o. zakázáno.
        </p>
        <p>
          Pro dotazy týkající se užití obsahu nás kontaktujte na{' '}
          <a href="mailto:info@filtrex.cz" className="text-brand hover:text-brand-dark">info@filtrex.cz</a>.
        </p>

        <p className="text-sm text-gray-500 border-t border-gray-200 pt-6 mt-10">
          © {new Date().getFullYear()} Filtrex s.r.o. Všechna práva vyhrazena.
        </p>
      </div>
    </div>
  )
}

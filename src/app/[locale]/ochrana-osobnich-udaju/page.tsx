export default function OchranaOsobnichUdajuPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Zásady ochrany osobních údajů</h1>
      <p className="text-sm text-gray-500 mb-10">Filtrex s.r.o. &nbsp;|&nbsp; Účinné od: 1. 7. 2025 &nbsp;|&nbsp; Verze: 1.0</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Správce osobních údajů</h2>
          <p className="mb-3">
            Správcem osobních údajů ve smyslu čl. 4 odst. 7 Nařízení Evropského parlamentu a Rady (EU) 2016/679
            o ochraně fyzických osob v souvislosti se zpracováním osobních údajů (dále jen „GDPR") je:
          </p>
          <address className="not-italic bg-gray-50 rounded-xl p-5 border border-gray-200 text-sm space-y-1">
            <p className="font-semibold text-gray-900">Filtrex s.r.o.</p>
            <p>Lanškrounská 37, 568 02 Svitavy, Česká republika</p>
            <p>IČO: 15034313 &nbsp;|&nbsp; DIČ: CZ15034313</p>
            <p>E-mail: <a href="mailto:info@filtrex.cz" className="text-brand hover:text-brand-dark">info@filtrex.cz</a></p>
            <p>Telefon: <a href="tel:+420777134829" className="text-brand hover:text-brand-dark">+420 777 134 829</a></p>
          </address>
          <p className="mt-3">
            Společnost Filtrex s.r.o. nejmenovala pověřence pro ochranu osobních údajů (DPO), neboť jí tato povinnost
            nevzniká. Ve věcech ochrany osobních údajů kontaktujte výše uvedený e-mail.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Jaké osobní údaje zpracováváme</h2>
          <p className="mb-3">
            Prostřednictvím poptávkového formuláře na webových stránkách www.filtrex.cz zpracováváme následující osobní
            údaje, které nám sdělíte dobrovolně:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-3">
            <li>jméno a příjmení (nebo název společnosti a kontaktní osoba),</li>
            <li>e-mailová adresa,</li>
            <li>telefonní číslo,</li>
            <li>obsah zprávy / poptávky.</li>
          </ul>
          <p className="mb-3">
            Automaticky při návštěvě webu zpracováváme také technické údaje: IP adresu a základní informace o zařízení
            a prohlížeči (prostřednictvím serveru Vercel, viz oddíl 5).
          </p>
          <p>
            Nepožadujeme ani nezpracováváme zvláštní kategorie osobních údajů (citlivé údaje) ve smyslu čl. 9 GDPR.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Účel a právní základ zpracování</h2>

          <h3 className="font-semibold text-gray-800 mt-4 mb-1">a) Vyřízení poptávky a předsmluvní jednání</h3>
          <p className="mb-1 text-sm text-gray-600">
            Právní základ: čl. 6 odst. 1 písm. b) GDPR – zpracování je nezbytné pro provedení opatření přijatých
            před uzavřením smlouvy na žádost subjektu údajů.
          </p>
          <p className="mb-4">
            Zpracováváme kontaktní a identifikační údaje za účelem odpovědi na vaši poptávku, přípravy cenové nabídky
            a uzavření případné smlouvy.
          </p>

          <h3 className="font-semibold text-gray-800 mb-1">b) Plnění smlouvy</h3>
          <p className="mb-1 text-sm text-gray-600">Právní základ: čl. 6 odst. 1 písm. b) GDPR.</p>
          <p className="mb-4">
            Po uzavření smlouvy zpracováváme vaše údaje za účelem plnění smluvních závazků (dodání produktů, fakturace,
            zákaznická podpora).
          </p>

          <h3 className="font-semibold text-gray-800 mb-1">c) Plnění právních povinností</h3>
          <p className="mb-1 text-sm text-gray-600">Právní základ: čl. 6 odst. 1 písm. c) GDPR.</p>
          <p className="mb-4">
            Osobní údaje na účetních dokladech uchováváme po dobu stanovenou daňovými a účetními předpisy (zpravidla 10 let).
          </p>

          <h3 className="font-semibold text-gray-800 mb-1">d) Oprávněný zájem správce</h3>
          <p className="mb-1 text-sm text-gray-600">Právní základ: čl. 6 odst. 1 písm. f) GDPR.</p>
          <p>
            Pro ochranu práv a oprávněných zájmů společnosti (např. vymáhání pohledávek) po dobu promlčecích lhůt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Doba uchování osobních údajů</h2>
          <ul className="list-disc list-inside space-y-2 pl-2 mb-3">
            <li>Poptávky, které nevedly k uzavření smlouvy: <strong>1 rok</strong> od odeslání poptávky</li>
            <li>Údaje ze smluv: po dobu trvání smluvního vztahu a <strong>4 roky</strong> po jeho skončení</li>
            <li>Daňové doklady a účetní záznamy: <strong>10 let</strong> dle zákona o účetnictví</li>
            <li>Serverové logy (Vercel): maximálně <strong>30 dní</strong>, pokud není v nastavení projektu určeno jinak</li>
          </ul>
          <p>Po uplynutí doby uchování jsou osobní údaje bezpečně vymazány nebo anonymizovány.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Zpracovatelé a příjemci osobních údajů</h2>
          <p className="mb-4">
            Vaše osobní údaje neprodáváme ani nepředáváme třetím stranám za účelem marketingu.
            Osobní údaje zpracovávají na naši žádost následující zpracovatelé:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-900">Zpracovatel</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-900">Co zajišťuje</th>
                  <th className="text-left p-3 border border-gray-200 font-semibold text-gray-900">Sídlo / GDPR základ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 align-top font-medium">Vercel Inc.</td>
                  <td className="p-3 border border-gray-200 align-top">Hosting webových stránek, serverové logy, doručení poptávkového formuláře, měření návštěvnosti webu (Vercel Analytics)</td>
                  <td className="p-3 border border-gray-200 align-top">USA – standardní smluvní doložky dle čl. 46 GDPR (DPA uzavřen)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border border-gray-200 align-top font-medium">GitHub Inc. (Microsoft)</td>
                  <td className="p-3 border border-gray-200 align-top">Správa zdrojového kódu a nasazení aplikace (osobní údaje z formuláře sem neputují přímo)</td>
                  <td className="p-3 border border-gray-200 align-top">USA – standardní smluvní doložky dle čl. 46 GDPR</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 align-top font-medium">Websupport s.r.o.</td>
                  <td className="p-3 border border-gray-200 align-top">Doménový registrátor, e-mailový server (přijímá zprávy z poptávkového formuláře)</td>
                  <td className="p-3 border border-gray-200 align-top">SR / EU – GDPR plná aplikace</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Se všemi zpracovateli mimo EU máme uzavřeny standardní smluvní doložky (SCC) dle čl. 46 odst. 2 písm. c) GDPR,
            které zajišťují přiměřenou ochranu osobních údajů při přenosu do třetích zemí.
          </p>
          <p className="mt-3">
            Osobní údaje mohou být dále zpřístupněny: účetnímu poradci (v rozsahu nutném pro fakturaci)
            a orgánům veřejné moci (na základě zákonné povinnosti).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Vaše práva v oblasti ochrany osobních údajů</h2>
          <ul className="space-y-2">
            <li><strong>Právo na přístup (čl. 15 GDPR)</strong> – máte právo získat potvrzení, zda zpracováváme vaše osobní údaje, a přístup k nim.</li>
            <li><strong>Právo na opravu (čl. 16 GDPR)</strong> – máte právo na opravu nepřesných nebo doplnění neúplných údajů.</li>
            <li><strong>Právo na výmaz (čl. 17 GDPR)</strong> – máte právo na výmaz osobních údajů, pokud není jejich zpracování dále nezbytné.</li>
            <li><strong>Právo na omezení zpracování (čl. 18 GDPR)</strong> – máte právo požadovat omezení zpracování v zákonem stanovených případech.</li>
            <li><strong>Právo na přenositelnost údajů (čl. 20 GDPR)</strong> – máte právo obdržet své údaje ve strukturovaném, běžně používaném formátu.</li>
            <li><strong>Právo vznést námitku (čl. 21 GDPR)</strong> – máte právo vznést námitku proti zpracování na základě oprávněného zájmu.</li>
            <li><strong>Právo podat stížnost</strong> – máte právo podat stížnost k Úřadu pro ochranu osobních údajů (<a href="https://www.uoou.cz" className="text-brand hover:text-brand-dark">www.uoou.cz</a>), Pplk. Sochora 27, 170 00 Praha 7.</li>
          </ul>
          <p className="mt-4">
            Pro uplatnění svých práv nás kontaktujte na{' '}
            <a href="mailto:info@filtrex.cz" className="text-brand hover:text-brand-dark">info@filtrex.cz</a>.
            Na vaši žádost odpovíme bez zbytečného odkladu, nejpozději do 30 dní od doručení.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Soubory cookies</h2>
          <div className="bg-brand-light border border-brand/20 rounded-xl p-5">
            <p>
              Tento web používá pouze technicky nezbytné cookies zajišťované platformou Vercel. Tyto cookies nevyžadují
              váš souhlas a nelze je vypnout, protože jsou nezbytné pro správné fungování stránek. Web nepoužívá
              analytické ani marketingové cookies.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Zabezpečení osobních údajů</h2>
          <p className="mb-3">
            Přijali jsme technická a organizační opatření k ochraně osobních údajů před neoprávněným přístupem,
            ztrátou nebo zničením:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>šifrování přenosu dat (protokol HTTPS/TLS),</li>
            <li>hosting na platformě Vercel s vlastními bezpečnostními standardy,</li>
            <li>přístup k osobním údajům mají pouze oprávněné osoby,</li>
            <li>zdrojový kód je spravován prostřednictvím soukromého repozitáře na GitHubu.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Změny těchto zásad</h2>
          <p>
            Tyto Zásady ochrany osobních údajů mohou být průběžně aktualizovány. Aktuální verze je vždy dostupná
            na www.filtrex.cz. Datum poslední aktualizace je uveden v záhlaví tohoto dokumentu.
          </p>
        </section>

        <p className="text-sm text-gray-500 border-t border-gray-200 pt-6 mt-10">
          Filtrex s.r.o., Svitavy, červenec 2025
        </p>
      </div>
    </div>
  )
}

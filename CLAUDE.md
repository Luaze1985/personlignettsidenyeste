# larserik-nettside — agentkontekst

Statisk nettside for Lars Erik Brekne Johnsen. Autoritativt design: `DESIGN.md`.
Brukerreise og innholdsgrenser: `SPEC.md`. Status: `docs/issue9/README.md`.

## Arbeidsprosess

1. Les `git status --short`, søk målrettet med rg, og bevar andre lokale endringer.
   `CHEATSHEET.md` er en eksisterende uversjonert brukerfil.
2. Bruk produksjonsfilene `index.html`, `css/style.css`, `js/navigation.js`.
   Endret design beskrives først i `DESIGN.md`. Følg prototypeporten der;
   et allerede godkjent, konkret designvalg krever ikke et nytt retningsintervju.
3. Kjør bygg, designlint og relevante tester. Hele pakken før levering.
4. Lever på arbeidsgren/PR. Merge til main og produksjonsdeploy krever eksplisitt
   godkjenning. Push til main kan utløse automatisk Netlify-produksjonsbygg.

## Struktur og innhold

- Inngang: hovedbudskap, kontakt og mindre lenke til kurs/foredrag.
- `#arbeidsbenken`: leveranser, fire arbeidssteg og passer/passer ikke.
- `#om`: introduksjon og foredragsbilde; temaene har `#kurs-og-foredrag`.
- `#erfaring`: fire synlige dokumenterte bevis og én detaljliste.
- `#kontakt`: Vis e-post og dagens LinkedIn-kanaler.

Legg nye dokumenterte omtaler i listen under `#erfaring`; foredragstemaer
under `#kurs-og-foredrag`. Nye likestilte seksjoner er ikke standardvalget.

Kommunestillingen er bakgrunn, ikke fokus eller salg mot offentlig sektor.
Ikke gjeninnfør nåværende/fremtidig arbeidsgiver i presentasjon eller JSON-LD.
Historiske kildebelagte kommunereferanser kan beholdes. Pris, leverandør/org.nr.,
rolleavklaring, datapraksis og resultat-eksempel er uavklart, se `ISSUES.md` N-6.
Ikke finn på fakta, resultater, garantier eller kundegodkjenninger.

Skriv norsk bokmål, kort og ærlig. Bruk KI, unntatt i engelske titler.
Ingen hypeord, skygger, gradienter, ikonfont, CDN eller nye runtime-rammeverk.
Lucide inline-SVG og lisens i `icons/LICENSE.txt`; nummerering i arbeidssteg.

## Ferdigkriterier

- PASS/FAIL: `npm run build` gir kun eksplisitt tillatte offentlige filer i dist.
- PASS/FAIL: `npx designmd lint DESIGN.md` har 0 feil og 0 advarsler.
- PASS/FAIL: `npm test` består med faktisk rapportert nettleser og begrensninger.
- PASS/FAIL: Desktop/mobil, tastatur, navigasjon uten JS og kontakt er kontrollert.
  Faktisk nettleserzoom og ekte brukere rapporteres separat fra automatiske tester.

Med lokal Chrome i PowerShell: `$env:PLAYWRIGHT_CHANNEL='chrome'; npm test`.
Ingen interne dokumenter, prototyper eller originalbilder skal publiseres i dist.

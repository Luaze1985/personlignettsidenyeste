# PR #10 — gjennomføring 31. oktober 2026

Retning B og brukerpanelendringene fra main 5ff17d0 er samordnet med en
merge-commit e23b935. Delt historikk er ikke omskrevet. Denne runden følger
Lars sin godkjente forbedringsplan og presisering om målgruppen.

## Resultat

- Hovedbudskap og kontakt før metadata på mobil; venstrekolonne beholdt på desktop.
- Færre gjentakelser, forståelige leveranser og direkte inngang til kurs/foredrag.
- Lucide SVG-er lokalt, minst 14 px menytekst og 16 px vanlig innholdstekst.
- Meny, SVG-klikk, Escape/fokus, aktiv seksjon, skip-link og kontakt uten JS.
- Bokmål, navngitte seksjoner, semantisk 404, metadata, CSP og HSTS-kontroll.
- Kommunestilling/arbeidsgiver er tatt ut av presentasjon og metadata.
  Historisk omtale beholdes; offentlig sektor er ikke salgsmålgruppe.

## Før, prototype og etter

| Bredde | Før (e7a5835) | Prototype | Etter |
| --- | --- | --- | --- |
| Desktop 1440 px | [Før](before-2026-10-31-desktop.png) | [Prototype](prototype-2026-10-31-desktop.png) | [Etter](after-2026-10-31-desktop.png) |
| Mobil 390 × 844 px | [Før](before-2026-10-31-mobile.png) | [Prototype](prototype-2026-10-31-mobile.png) | [Etter](after-2026-10-31-mobile.png) |

Desktop før/etter er hele siden, mobilbildene viser første skjermflate.
Prototypen ble vist og kontrollert før produksjonsarbeidet; den bygde på
allerede godkjent retning. Kastkoden ryddes bort; bilder og beslutninger beholdes.
[Klikkbar plan og begrunnelser](forbedringsplan-2026-10-31.html) viser før/etter
som forenklet flyt, ikke en pikselpresis gjengivelse av hele produksjonssiden.

## Kontroller kjørt 31. oktober 2026

| Kontroll | Resultat |
| --- | --- |
| npm run build | 18 eksplisitt tillatte produksjonsfiler |
| designmd lint DESIGN.md | 0 feil, 0 advarsler |
| PLAYWRIGHT_CHANNEL=chrome npm test | 51/51 bestått |
| Axe WCAG 2 A/AA, 2.1 AA og 2.2 AA | Ingen påviste brudd i de to testede tilstandene |
| Lenkesjekk | 41 mål: 39 godkjent, 0 brutte, 2 LinkedIn-advarsler |
| Reflow | 180, 360, 390, 760, 980 og 1440 CSS px uten horisontal overflow |
| Visuell kontroll | Nye desktop- og mobilbilder vurdert |

Før menyendringen feilet fire nye tester på eksisterende atferd. Etter
implementering bestod funksjonskontrollene. En første sandbox-kjøring av
HTTP-testene var miljøblokkert; kjøringen med lokal nettverkstilgang bestod.
Header-testene bruker en lokal server som gjengir Netlify-konfigurasjonen;
de er ikke i seg selv en kontroll av alle live CDN-headere.

## Begrensninger og åpne fakta

- Faktisk 200 % nettleserzoom er **ikke** kontrollert. Nettleserverktøyets
  URL-policy blokkerte åpning av lokal fil. Smal CSS-viewport er separat reflowbevis.
- Ekte brukere er **ikke** testet. [Opplegg for 2–3 personer](brukerkontroll.md)
  er klart; ingen er kontaktet. Det tidligere panelet er simulert og gir hypoteser.
- LinkedIn svarte 999 og 403; de to målene er uverifiserte.
- Pris, leverandør/org.nr., rolleavklaring, datapraksis og ett godkjent eksempel
  er fortsatt uavklart. Ingen nye slike påstander eller offentlige plassholdere.
- npm audit meldte 2 high-varsler i eksisterende design.md/zod-utviklingskjede,
  ingen automatisk fix. Ingen runtime-pakker kopieres til dist. Se ISSUES.md DEV-01.

## Drift og levering

Read-only Netlify-kontroll 31. oktober bekreftet produksjonsdeploy
6ae1dce8d8745b165915b66b fra main 5ff17d0, publisert 28. oktober,
state=ready og manual_deploy=false. Drift/DNS er ikke endret.
PR #10 oppdateres på eksisterende arbeidsgren, uten merge eller produksjonsdeploy.

## Kilder og beslutninger

- [Sak #9](https://github.com/Luaze1985/personlignettsidenyeste/issues/9),
  [PR #10](https://github.com/Luaze1985/personlignettsidenyeste/pull/10) og
  [main-endring 28. oktober](https://github.com/Luaze1985/personlignettsidenyeste/commit/5ff17d0dadb0057c91cc371ef3fde969dc185f21).
- [Simulert panel, metode og begrensninger](https://github.com/Luaze1985/brukerrad/blob/main/docs/forste-test.md).
- [Figma: visuelt hierarki](https://www.figma.com/resource-library/what-is-visual-hierarchy/).
  Ingen konkret Figma-fil er vurdert eller endret.
- [Lucide-proveniens og blob-SHA-er](lucide-sources.md); lisens i icons/LICENSE.txt.
- [Digi Agder om demonstrasjonen](https://digiagder.no/digitaliseringsministeren-imponert-over-teknologisamarbeidet-i-agder).
  Omtale beholdes uten direkte sitat eller udokumenterte resultatpåstander.

Tidligere 42/42-resultat fra 23. oktober er historikk, ikke bevis for denne runden.
Gjeldende statusoversikt for GitHub #1–#9 og backlog ligger i ISSUES.md.

## Uavhengig kodegjennomgang

`code-review` ble kjørt med separate Standards- og Spec-gjennomganger mot
e7a5835. Spec fant 0 avvik. Standards fant utskriftskontrast og et motstridende
mobilavsnitt; begge er rettet. Oppfølging fant også hvit detaljoverskrift ved
utskrift; den er rettet og inkludert i regresjonstesten. Ingen gjenstående
kodefunn fra disse gjennomgangene. Zoom, ekte brukere og ubekreftede fakta
er fortsatt åpne manuelle/faktiske kontrollpunkter.

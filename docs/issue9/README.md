# Endringssak #9 – beslutning og kontroll

## Valgt retning

Brukeren valgte 23. oktober 2026 retning B: sterkere rutenett, redaksjonell
venstrekolonne og tydelige skillelinjer. Forsidens viktigste handling er å
beskrive én arbeidsoppgave og ta kontakt. Kurs og foredrag har en synlig,
mindre inngang. Tekst uten konkret belegg er skrevet nøkternt.

## Før og etter

| Bredde | Før (main ved oppstart) | Etter (arbeidsgrenen) |
| --- | --- | --- |
| 1440 px | [Før, desktop](before-desktop.png) | [Etter, desktop](after-desktop.png) |
| 390 px | [Før, mobil](before-mobile.png) | [Etter, mobil](after-mobile.png) |

Bildene viser det øvre utsnittet av siden. De dokumenterer layoutvalget, ikke
alle seksjoner eller alle interaksjoner.

## Innholdsvurdering

| Før | Nå | Begrunnelse |
| --- | --- | --- |
| Påstander om tidsbesparelse og effekt | Nøktern beskrivelse av mulig arbeid og faglig kontroll | Tall og virkning manglet konkret belegg. |
| Ubekreftede oppdragsnavn | Tatt ut av publikumsrettet tekst | Kundenavn krever kilde eller tidligere godkjenning. |
| Direkte sitat tillagt Karianne Tung | Kildebelagt omtale av møtet, uten direkte sitat | Kilden dokumenterer demonstrasjonen, men ikke den tidligere ordlyden. |
| Kontakt som sen handling | Tydelig handling i første skjermbilde | Støtter valgt besøksflyt. |

Kilde for omtalen av møtet:
[Digi Agder](https://digiagder.no/digitaliseringsministeren-imponert-over-teknologisamarbeidet-i-agder).

## Kontroll

- `npm run build`: bestått; 17 tillatte produksjonsfiler.
- `designmd lint DESIGN.md`: 0 feil, 0 advarsler.
- Playwright: 42 av 42 tester bestått i lokal Chrome.
- Lenker i siste kjøring: 38 kontrollert; 37 gyldige svar, 1 advarsel om
  blokkert automatisk tilgang (LinkedIn), 0 bekreftet brutte. HR Norge ga
  tidsavbrudd i tidligere kjøringer, men svarte i den siste.
- Visuell kontroll: 1440, 390 og 360 CSS px og 195 CSS px som simulering av
  200 % zoom på 390 px. Ingen horisontal scrolling i disse målingene.
  Simuleringen er ikke en måling med nettleserens faktiske zoomfunksjon.

Før publisering må den konkrete ordlyden og referanseutvalget godkjennes i
sak #9. Dette dokumentet og skjermbildene er grunnlag for den vurderingen.

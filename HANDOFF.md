# Neste arbeidsøkt — 31. oktober 2026

Arbeidet ligger på `design/finpuss-og-oppdatert-innhold-2026`, til PR #10.
Main 5ff17d0 er integrert med merge, uten å omskrive delt historikk.
Lokal uversjonert `CHEATSHEET.md` er brukerens fil og skal ikke tas med i commit.

## Gjennomført

- Mobil viser hovedbudskap og kontakt før kompakt rollefelt. Ingen gjentatte merker.
- Direkte inngang til kurs/foredrag, forklaring av MVP og avgrenset agenthjelp.
- Lokale Lucide SVG-er, større meny og tekst, tastatur/fokus og navigasjon uten JS.
- Kommunestilling og arbeidsgiver er tatt ut av presentasjon og metadata.
  Historisk kildebelagt omtale beholdes. Offentlig sektor er ikke salgsmålgruppe.
- Fire dokumenterte bevis, semantikk, metadata, CSP form-action og HSTS-test.
- Bygg og designlint bestod. Hele Playwright-pakken: 50/50 i Chrome.
  Lenker: 41 mål, 39 godkjent, 0 brutte, 2 uverifiserte LinkedIn-mål.

## Gjenstår før endelig publiseringsvurdering

- Faktisk 200 % nettleserzoom: ikke utført; nettleserverktøyets URL-policy
  blokkerte åpning av lokal side. Viewport-/reflow-tester er separate bevis.
- 2–3 ekte målgruppepersoner: se `docs/issue9/brukerkontroll.md`; ikke gjennomført.
- Avklar pris, leverandør/org.nr., rolleavklaring, datapraksis og ett godkjent eksempel.
  Ikke legg inn telefon eller nye fakta uten uttrykkelig grunnlag.
- Se PR og Netlify preview. Merge og produksjon krever Lars sin godkjenning.

## Drift

Netlify bekreftet 31. oktober et ready-produksjonsbygg fra main 5ff17d0,
publisert 28. oktober (`manual_deploy=false`). Eldre DNS-/manuell CLI-beskrivelse
var foreldet. DNS eller Netlify-innstillinger er ikke endret i denne runden.

Les `docs/issue9/README.md` for nye skjermbilder, testgrunnlag og avgrensninger.

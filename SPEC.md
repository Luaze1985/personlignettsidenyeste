# Design-spec — ryddig Arbeidsbenk-forside

Personlig nettside for **Lars Erik Brekne Johnsen**. Siden skal vise to sider av samme arbeid uten å virke som to forskjellige merkevarer:

1. Besøkende skal forstå én konkret, trygg arbeidsflyt med KI.
2. Besøkende skal raskt finne erfaring, faglig tyngde og dokumenterte lenker.

## Produksjonsstruktur

- `index.html` — innhold og semantisk sidestruktur
- `css/style.css` — Arbeidsbenken-designsystemet fra `DESIGN.md`
- `js/navigation.js` — aktiv seksjon, mobilmeny og skjult e-post

## Sidehistorie

1. **Header** — profilbilde, navn og fire navigasjonsmål: Arbeidsflyt, Om, Erfaring, Kontakt.
2. **Inngang** — «Mennesker først. Teknologi som virker.» Balansert hero med personlig profilkort, etterfulgt av to arbeidsspor: «Dette hjelper jeg med» (Sparring, MVP og agenter) og «Dette bygger det på» (HMS, HR og erfaring).
3. **Arbeidsbenken** — tre kjerneleveranser (Sparring & MVP, Agenter i arbeidsflyt, Videreutvikling & forbedring) og metodikken avklare → prøve → kontrollere → velge, med passer/passer ikke og CTA.
4. **Om og foredrag** — introduksjon med forankring i HMS, HR og kunnskapsarbeid, foredragsbilde og tre spissede foredrags- og kurstemaer.
5. **Erfaring og referanser** — prioriterte bevis på mørk flate (sitat fra Karianne Tung og dokumentert tidsbesparelse); øvrig dokumentasjon i én detaljvisning.
6. **Kontakt** — en innbydende og friksjonsfri kontaktvei for sparring, MVP og foredrag.

Det skal ikke finnes egne, likeverdige seksjoner for media, tjenester, innsikt og foredrag. Innholdet er bevart, men samlet der det gir mest mening.

## Innhold og tone

- Norsk bokmål. Kort, ærlig og konkret.
- Bruk «KI», ikke «AI», med unntak for engelske titler.
- KI lager struktur og utkast; fagpersonen vurderer, godkjenner og har ansvar.
- Ikke bruk buzzord, garanterte resultater eller oppdiktede referanser.
- Dokumenterte lenker bevares selv om de flyttes til detaljvisning.

## Design og tilgjengelighet

- `DESIGN.md` er autoritativt for farger, typografi og komponenter.
- Newsreader brukes for faglige overskrifter, systemfont for hovedbudskap og monospace for etiketter.
- Ingen skygger, gradienter, verktøyikoner, tretekstur eller startup-estetikk.
- Må fungere uten horisontal scrolling ved 360 px og ved simulert 200 % zoom.
- Alle interaktive elementer skal ha synlig tastaturfokus.
- Behold profilbildet og foredragsbildet når de gir tillit.

## Kvalitetsporter

1. Kjør `design.md lint DESIGN.md`.
2. Kjør hele testpakken med `npm test`.
3. Kontroller desktop og mobil visuelt.
4. Kontroller fokus, reduced motion og lenker.
5. Ikke commit, push eller deploy uten separat godkjenning.

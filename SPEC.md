# Design-spec — ryddig Arbeidsbenk-forside

Personlig nettside for **Lars Erik Brekne Johnsen**. Siden skal gjøre to ting uten å virke som to forskjellige merkevarer:

1. Håndverksbedrifter skal forstå én konkret, trygg arbeidsflyt med KI.
2. Større virksomheter og referansesjekkere skal raskt finne erfaring, faglig tyngde og dokumenterte lenker.

## Produksjonsstruktur

- `index.html` — innhold og semantisk sidestruktur
- `css/style.css` — Arbeidsbenken-designsystemet fra `DESIGN.md`
- `js/navigation.js` — aktiv seksjon, mobilmeny og skjult e-post

## Sidehistorie

1. **Header** — profilbilde, navn og fire navigasjonsmål: Arbeidsflyt, Erfaring, Om, Kontakt.
2. **Inngang** — «Mennesker først. Teknologi som virker.», én primærhandling og to målgruppeinnganger.
3. **Arbeidsbenken** — startpakken forklart som avklare → prøve → kontrollere → velge, med passer/passer ikke og én CTA.
4. **Erfaring og referanser** — fire prioriterte bevis på mørk flate; øvrig dokumentasjon i én detaljvisning.
5. **Om, foredrag og kontakt** — profil, foredragstemaer, foredragsbilde og kontakt som én rolig avslutning.

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

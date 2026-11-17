# Plan og status

Sist oppdatert 17.11.2026. Beslutninger: `docs/DECISIONS.md`.

## Gjort

- Svart-hvitt-design etter Figma, «Slik jobber jeg» med grønt/gult/rødt,
  Om og Erfaring samlet, podkastblokk med tre hovedepisoder.
- Smakebit-komponent laget som prototype (`prototypes/podkast-smakebit.html`).
- Brukerråd 17.11 (`docs/brukerrad-2026-11-17.md`): tydeligere knapp, kortere podkast og
  medieliste, mørkere dempet tekst og større tekst i sonekortet.
- Tjenestefakta 17.11 (`docs/to-questionnaire-tjenestefakta.md`): omfang og varighet inne i
  tjenestesetningene, foredragslengde, svartid og «pris avtales» i kontakt, foretak og org.nr.
  i bunnteksten.
- E-postadressen er skjult bak «Vis e-postadresse» og står ikke i klartekst i noen publisert fil.
- PR #13 er merget til main (b334424) og publisert på breknejohnsen.no 17.11.2026.
  89 Playwright-tester og designlint var grønne.
- Issue #1–#9 og #12 er lukket. #8 og #12 er lukket som «ikke planlagt».

## Neste

1. Lars velger sitat, tidskode og lenker til Smakebit. Da flyttes komponenten inn i
   `index.html`, og testen i `tests/sections.spec.js` oppdateres.
2. Gjenstår i N-6: datapraksis/personvern og ett godkjent kundeeksempel. Lister Nyskaping
   nevnes ikke før Lars sier ja.
3. Den automatiske rotasjonen i «Slik jobber jeg» har ingen pauseknapp. Vurder om
   den trenger en, eller om den skal stoppe etter én runde (WCAG 2.2.2).
4. Manuelt: faktisk 200 % zoom og 2–3 ekte brukere (`docs/issue9/brukerkontroll.md`).
5. Valgfritt: kjør brukerrådet på nytt mot produksjon for å se om pris- og kontaktfunnene
   er borte. Den skjulte e-posten kan gi samme klage som 28.10.

# Plan og status

Sist oppdatert 17.11.2026. Beslutninger: `docs/DECISIONS.md`.

## Gjort

- Svart-hvitt-design etter Figma, «Slik jobber jeg» med grønt/gult/rødt,
  Om og Erfaring samlet, podkastblokk med tre hovedepisoder.
- Bygg, designlint og 81 Playwright-tester bestått (se PR-beskrivelsen).
- Smakebit-komponent laget som prototype (`prototypes/podkast-smakebit.html`).

## Neste

1. Lars ser over og godkjenner PR-en, og bestemmer om den skal merges til main.
   Merge til main publiserer til produksjon via Netlify.
2. Lars velger sitat, tidskode og lenker til Smakebit. Da flyttes komponenten inn i
   `index.html`, og testen i `tests/sections.spec.js` oppdateres.
3. Den automatiske rotasjonen i «Slik jobber jeg» har ingen pauseknapp. Vurder om
   den trenger en, eller om den skal stoppe etter én runde (WCAG 2.2.2).
4. Manuelt: faktisk 200 % zoom og 2–3 ekte brukere (`docs/issue9/brukerkontroll.md`).
5. Issues #1–#9 og #12 kan lukkes eller oppdateres når PR-en er merget.

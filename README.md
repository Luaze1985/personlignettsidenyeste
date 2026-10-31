# Lars Erik Brekne Johnsen — personlig nettside

Statisk nettside med HTML, CSS, litt JavaScript og lokale SVG-ikoner. Ingen
runtime-avhengigheter. `npm run build` kopierer bare tillatte produksjonsfiler
til `dist/`; interne dokumenter, prototyper og originalbilder publiseres ikke.

## Arbeid lokalt

- Installer utviklingsverktøy med `npm ci`.
- Åpne `index.html` i nettleseren for enkel inspeksjon.
- Kjør `npm run build`, `npx designmd lint DESIGN.md` og `npm test`.
- Playwright bruker normalt sin installerte Chromium. Med lokal Chrome i
  PowerShell: `$env:PLAYWRIGHT_CHANNEL='chrome'; npm test`.

## Innhold og design

`index.html` har inngang → Arbeidsbenken → om/kurs og foredrag → erfaring →
kontakt. `css/style.css` følger `DESIGN.md`; `js/navigation.js` håndterer meny,
aktiv seksjon og e-postvisning. Newsreader ligger i `fonts/`, og Lucide-lisensen
ligger i `icons/LICENSE.txt`. Se `SPEC.md` før endring av brukerreisen.

Kommunestillingen er bakgrunn, ikke profil eller salg mot offentlig sektor.
Nye oppdrags-, pris- og resultatpåstander krever dokumentasjon eller bekreftelse.

## GitHub og Netlify

Repo: [personlignettsidenyeste](https://github.com/Luaze1985/personlignettsidenyeste).
[PR #10](https://github.com/Luaze1985/personlignettsidenyeste/pull/10) samler
forbedringene. `netlify.toml` angir bygg og `dist/` som publiseringsmappe.
Netlify bekreftet 31. oktober 2026 et Git-basert produksjonsbygg fra main
5ff17d0, publisert 28. oktober, med status ready. PR-grenen har deploy preview.
Push til PR-grenen skal ikke likestilles med produksjonspublisering.
Merge til main og eksplisitt produksjonsdeploy krever egen godkjenning.

Aktuell status, bilder og begrensninger: `docs/issue9/README.md`.
Åpne oppgaver: `ISSUES.md`. Neste arbeidsøkt: `HANDOFF.md`.

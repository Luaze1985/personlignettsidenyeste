# Beslutninger

Nyeste først. Eldre beslutninger står i `DESIGN.md`, `ISSUES.md` og `docs/issue9/README.md`.

## 17.11.2026 (etter brukerråd)

- **Lars godkjente alle fire forslagene fra brukerrådet.** Punkt 1–3 er gjort:
  - Knappen heter «Send meg en arbeidsoppgave».
  - E-postadressen vises direkte som `mailto:`-knapp. Kopieringsknappen lages bare med
    JavaScript. «Vis e-postadresse» og rot13-skjulingen er fjernet; adressen sto allerede i
    JSON-LD og `<noscript>`.
  - Podkasten viser bare nummer, lengde, tittel og lenker. Medielisten viser fire omtaler
    (Fagbladet, kode24, NRK, Digi Agder); de fire andre ligger fortsatt i `<details>`.
  - Dempet tekst er `#3d3d3d` (var `#555555`), og teksten i sonekortet er minst 16 px.
- **Punkt 4 (format og varighet) venter** på fakta fra Lars. Ingenting er funnet på.

## 17.11.2026

- **Farger i «Slik jobber jeg» beholdes.** Grønt, gult og rødt med svak gradient er
  det eneste fargeunntaket på siden. Dette erstatter kravet om 100 % svart-hvitt i
  `.scratch/nettside-forbedring-2026/spec.md` (15.11, kl. 09:36). Besluttet av Lars.
- **Stegbåndet og «Passer når / passer ikke når» forblir fjernet.** Lars endret ikke
  kodens tilstand fra 15.11 (spørsmålet gjaldt også disse; han svarte bare om Smakebit).
- **Smakebit skal inn i podkastblokken, men innholdet defineres av Lars senere.**
  Komponenten (kodetegnet lydbølge, sitat, tidskode, lenker) ligger som prototype i
  `prototypes/podkast-smakebit.html`. Den publiseres ikke før sitat, tidskode og
  lenker er bestemt, fordi offentlige plassholdere ikke er tillatt.
- **Ingen innebygd spiller.** Smakebiten bruker ingen lydfil eller iframe; CSP er uendret.

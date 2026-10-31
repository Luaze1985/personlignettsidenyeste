# Gjeldende status og backlog — 31. oktober 2026

Dette er nåværende oversikt. Historisk detaljert backlog er bevart i
`docs/issue9/backlog-before-2026-10-31.md`; eldre foreslåtte linjenumre,
WCAG-tolkninger og DNS-status der er ikke gjeldende dokumentasjon.

## GitHub-sakene

| Sak | Status i kode | Oppfølging |
| --- | --- | --- |
| #1 Forenkle inngangen | Gjennomført, videreført med godkjent kontakt-CTA | Fjernet gjentatte merker |
| #2 Foredragsbildets plassering/utsnitt | Gjennomført | Desktop og mobil kontrollert |
| #3 Kvalitetsport | Automatiske kontroller bestått | Faktisk zoom og ekte brukere gjenstår |
| #4 Arbeidsflyt som hovedinngang | Gjennomført | Kontakt er primær handling |
| #5 Om og foredrag med bilde | Gjennomført | Eksisterende 4:3-utsnitt beholdt |
| #6 Erfaring nederst | Gjennomført | Fire synlige bevis og én detaljliste |
| #7 Samlet visuell kvalitetsport | Automatiske kontroller og skjermbilder levert | Zoom/brukerkontroll gjenstår |
| #8 Grafisk uttrykk | Retning B videreført | Lucide til handlinger |
| #9 Finpuss og vei til oppdrag | Implementert i PR #10 | Merge/publisering ikke godkjent |
| #11 Brukerpanelendringer | Integrert fra main 5ff17d0 | Panelet er simulert, ikke ekte brukerdata |

Dette er en kodeoversikt, ikke påstand om at GitHub-sakene er lukket.

## Kvalitet og teknisk backlog

| ID | Status | Grunnlag eller neste steg |
| --- | --- | --- |
| UU-01, UU-02, SEC-01 | Videreført | Fokuskontrast, e-postfokus og CSP-hash kontrolleres |
| UU-03–UU-07 | Gjennomført | Navn, ny-fane-varsel, meny, skip-link og bokmål |
| UU-08–UU-10 | Gjennomført | Menyflate/-ramme, seksjonsnavn og main på 404 |
| UU-11 | Gjennomført | Axe på 390/1440 px med åpne detaljer og vist e-post |
| SEC-02, SEC-03 | Gjennomført | form-action none og HSTS-regresjonssjekk |
| DEBT-01 | Rettet | Historisk audit presiserer eksisterende CSP-hash |
| SEC-04–SEC-06 | Utsatt | Øvrig headerherding, data:-vurdering og security.txt |
| ROAD-02–ROAD-05 | Utsatt | Materiell, kalender, ressursside og booking |
| ROAD-06 | Gammel blokkering avklart | Netlify rapporterer ready produksjonsbygg; ikke endre DNS på gammelt grunnlag |
| DEV-01 | Åpen, separat | npm audit: eksisterende design.md/zod-kjede har 2 high-varsler; ikke produksjonskode |

## N-6 — innholdsavklaring

Endringene fra 28. oktober er bevart: KI forklares, foredrag er synlig,
inngangslenker er understreket, og kontakt forklarer hva man kan skrive om.
Kilden er et simulert panel (`Luaze1985/brukerrad`, `docs/forste-test.md`).
Persona-telling er ikke målte konverteringstall eller uavhengige brukertester.

Lars presiserte 31. oktober: Kommunestilling skal ikke være i fokus;
siden skal ikke selge ham inn mot offentlig sektor. Arbeidsgiver er derfor
fjernet fra presentasjonen og JSON-LD, mens historiske omtaler beholdes.

Følgende er fortsatt uavklart og skal ikke fylles ut ved gjetting:

- Pris/prismodell og hva første kontakt innebærer.
- Leverandørnavn, organisasjonsnummer og avklaring mot kommunestillingen.
- Faktisk praksis for personopplysninger og eventuelle databehandleravtaler.
- Ett godkjent, anonymisert eksempel med dokumentert resultat.

«Vis e-post» beholdes. Telefon, bookingsystem og nye offentlige fakta krever
et eget grunnlag. Ingen offentlige plassholdere er lagt inn.

## Gjenstående kontroll

- Faktisk 200 % nettleserzoom, separat fra beståtte viewport-tester.
- Kort test med 2–3 ekte målgruppepersoner; opplegg i `docs/issue9/brukerkontroll.md`.
- Separat merge-/publiseringsgodkjenning etter gjennomgang av PR #10.

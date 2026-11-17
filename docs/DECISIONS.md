# Beslutninger

Nyeste først. Eldre beslutninger står i `DESIGN.md`, `ISSUES.md` og `docs/issue9/README.md`.

## 17.11.2026 (spørreskjema om tjenestefakta)

Svarene står i `docs/to-questionnaire-tjenestefakta.md`. Lars bestemte:

- **Sparring** er 2–3 møter over tid.
- **Prototype** tar 1–2 uker og gir en testversjon.
- **Agenter** er løpende hjelp.
- **Foredrag** er 30–60 minutter.
- **Etter e-post:** svar innen to arbeidsdager, og første samtale er uforpliktende.
- **Pris:** «Pris avtales etter første samtale».
- **Kontakt:** ingen telefon og ingen booking.
- **Firma:** enkeltpersonforetaket kan publiseres. Org.nr. 936 978 010 er funnet i Enhetsregisteret, og Lars bekreftet det («Ja, legg inn»). Det står i bunnteksten, ikke i JSON-LD, fordi `Person` ikke har et felt for eget foretak og `worksFor` er utelatt med vilje.
- **Rolle:** bijobben er avklart med arbeidsgiveren.
- **Kundecase:** det finnes ingen godkjent kundecase. Snekkere og håndverkere nevnes ikke på siden, fordi DESIGN.md sier at Lars ikke skal fremstå som ren håndverkskonsulent.
- **Lister Nyskaping** nevnes ikke før Lars sier ja.
- **Personvern:** datapraksis er fortsatt åpen.
- **Design går foran tekstmengde.** Lars: «Du må skrive på en sånn måte at det ikke blir støyete.» Omfang og varighet står derfor inne i den ene setningen per tjeneste og i foredragsingressen. Det er ingen egne halvfete linjer.

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

# Issues – larserik-nettside

**Hoved-PRD:** `SPEC.md` §8 (Fremtid / roadmap) + §2b («Løft håndverket»-doktrine).
**Prinsipp:** alt arver designsystemet; hver oppgave er en vertikal skive med kjørbar verdi; lavt vedlikehold foran alt.
**Status:** lokal issue-liste (GitHub opprettes senere av Lars). Rekkefølge: **F-1 → F-5 → F-2 → F-3 → F-4.**

---

## Roadmap (fra PRD §8)

### F-1 — Ekstraher designsystem til delt `style.css`
*Tracer bullet · ingen avhengighet · blokkerer F-2, F-3, F-4*

Beviser multi-side-arkitekturen. Uten den dupliseres stil på hver ny side.

**Definition of Done**
- [ ] `:root`-variabler, `@font-face` og felles komponent-CSS flyttet fra `index.html` til `style.css`.
- [ ] `index.html` lenker `<link rel="stylesheet" href="style.css">`.
- [ ] Siden ser **pixel-identisk** ut som før (visuell diff = null).
- [ ] Font-preload beholdt i `<head>`.
- [ ] Fungerer lokalt og på Netlify (relative stier).

**Status 2026-07-05 (verifisert i kode):** CSS ligger allerede eksternt i `css/style.css` (`:root`, `@font-face`, komponent-CSS). `index.html` har ingen `<style>`-blokk, lenker stilarket (linje 30) og beholder font-preload i `<head>` (linje 27–28). F-1 fremstår **oppfylt** – gjenstår kun en formell før/etter visuell diff for å hake av «pixel-identisk». Blokkerer i praksis ikke lenger F-2/F-3/F-4.

---

### F-5 — Beslutnings-spike: mekanisme for «opplasting av materiell»
*Billig · tas tidlig · informerer F-3 · ingen avhengighet*

«Opplasting» drar mot auth/CMS/lagring, som kolliderer med «ingen byggverktøy, lavt vedlikehold». Avklares før noe bygges.

**Definition of Done**
- [ ] Kort beslutningsnotat (ADR-stil) i `docs/` eller ny seksjon i `SPEC.md`.
- [ ] Vurderer minst: (a) «legg filer i repo + lenk dem» (null infra), (b) Netlify CMS/Forms, (c) headless CMS.
- [ ] Velger mekanisme som respekterer lavt-vedlikehold-prinsippet.
- [ ] **Ingen produksjonskode før valg er tatt.**

---

### F-2 — Statisk «Kommende foredrag»-side (kalender MVP)
*Blokkert av F-1*

Roadmap-kalenderen, tolket som «vis kommende foredrag» (booking = F-4, senere).

**Definition of Done**
- [ ] Ny `kommende.html` arver `style.css`.
- [ ] Viser liste over kommende foredrag: dato, tittel, sted, valgfri lenke.
- [ ] Lenket fra hovedmenyen (og evt. fra Foredrag-seksjonen i `index.html`).
- [ ] Responsiv; stables på mobil.
- [ ] Tom-tilstand håndtert («Ingen kommende akkurat nå – ta kontakt for booking»).
- [ ] Oppdatering = redigere én liste i én fil.

---

### F-3 — Ressurs-/undervisningsside
*Blokkert av F-1 · informeres av F-5*

Materiell andre kan bruke som referanse til undervisning.

**Definition of Done**
- [ ] Ny `ressurser.html` arver `style.css`.
- [ ] Liste av ressurser: tittel, kort beskrivelse, lenke/nedlasting.
- [ ] **Tydelig bruksrett/lisens per ressurs** (andre skal kunne bruke den).
- [ ] Lenket fra hovedmenyen; responsiv; tom-tilstand.

---

### F-4 — Booking / ledige datoer
*Stretch · blokkert av F-2 · lav prioritet*

Eksplisitt utsatt.

**Definition of Done (skisse – detaljeres når aktuelt)**
- [ ] Enten enkel «kontakt for disse datoene»-liste, eller integrert bookingtjeneste (avklares).
- [ ] Arver designsystemet.

---

## Nær-term / løpende (utenfor roadmap-PRD)

### Kodereview (gjennomført 2026-07-04, uavhengig subagent)
Rettet i `index.html`: lagt til `<main>`-landmark + skip-lenke · 4 `outline:none` → synlig 2px fokusring (WCAG 2.2) · `<header>` flyttet ut av `.container` (full-bredde hårstrek) · inline-stiler → klasser · `classList.add` · `scroll-padding-top` 7rem · `details > ul` topp-luft. Restpunkt: se N-5.

### N-1 — Favicon (monogram)
- [x] `favicon.svg` (monogram «LE», aksentfarge) + `<link rel="icon">` i `index.html`. Fjerner `favicon.ico`-404. **(gjort)**

### N-2 — Manglende/feil artikkel-URLer — **løst mot CV-ens lenkeliste**
Kilde: `...\Jobb-søk\cv-lars-erik hoved.pdf` (PDF-annotasjoner = autoritative URLer).
- [x] **HR Norge «Veien til digital effektivisering»**: rettet fra gjettet kort-URL til full dyplenke (gammel var trolig 404).
- [x] **Samfunnsviterne**: forside → dyplenke til arrangementet.
- [x] **LinkedIn-artikkel (Miriam Dagnew)**: lagt inn som ekte lenke.
- [x] **HR Norge-webinar (Facebook)**: lagt inn på foredragslinja. *(Flagg: Facebook-lenke – fjern hvis du heller vil.)*
- [x] **Lawai**: justert til `www.lawai.no` (matcher CV).
- [ ] *Valgfritt:* CV har også en Digin LinkedIn-post (omtale av Tech Talks Agder, nov 2025) som ikke er lagt inn – si ifra om du vil ha den under Arrangementer.
- [x] *Valgfritt:* live-verifiser at de nye eksterne URL-ene svarer 200 (Verifisert automatisk med Playwright-lenkesjekk).

### N-5 — A11y: annonsering av «åpner i ny fane» (løst)
De ~15 eksterne `.ext`-lenkene har fått programmatisk «ny fane»-melding for skjermlesere via `<span class="sr-only"> (åpner i ny fane)</span>`.

### N-3 — Troverdighets-stripe: to åpne redaksjonelle valg (løst)
- [x] Bekreft: **Fædrelandsvennen** holdes ute av stripa (Bekreftet av bruker: holdes ute da det var eget debattinnlegg).
- [ ] Bekreft: **Universitetet i Innlandet** (lenket/datert) vs **UiA** (lokal gjenkjennelse) i stripa (Beholdt UInnlandet).

### N-4 — Deploy + domene
- [x] Deployet «Løft håndverket»-versjonen til produksjon på Netlify-siten `larserik` (site-id `1fdc5c75-4698-4e5c-9f93-37c392133afb`) via CLI. Live: `https://larserik.netlify.app`. Docs blokkert (404 på `*.md`).
- [x] Lagt `breknejohnsen.no` + `www.breknejohnsen.no` til som egendomene på siten (via `netlify api updateSite`).
- [ ] **Gjenstår (kun Lars):** DNS hos Domeneshop → A `@` = `75.2.60.5`, CNAME `www` = `larserik.netlify.app`. Deretter auto-SSL.
- [ ] *Senere:* koble lokalt git-repo til Netlify (`Luaze1985/larserik-nettside`) for push-basert deploy i stedet for manuell CLI. (Mappa er nå et lokalt git-repo, men ikke koblet til Netlify-utløst deploy ennå.)

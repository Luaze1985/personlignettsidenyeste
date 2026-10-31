# Plan: svart-hvitt-design fra Figma inn i PR #10

*31.10.2026 · gren `design/finpuss-og-oppdatert-innhold-2026` · Figma desktop `3:149`, mobil `3:266`*

## Hva Figma endrer (mot dagens kode)

| Område | I dag | Figma |
| :-- | :-- | :-- |
| Farger | Varm papir `#f3efe6`, oksidrød aksent `#8a3f2b` | Hvitt, svart `#111`, lys grå flate, ingen aksent |
| Header | Lite profilbilde + navn + undertittel | Bare navn i Newsreader, fire menypunkter |
| Første skjerm | H1 + to «stier»-kort | H1 + ingress, svart knapp «Beskriv én arbeidsoppgave» og lenken «Kurs og foredrag», stort rundt portrett |
| Ny stripe | – | «Omtalt hos / på fagscenen»: NRK, HR Norge, Tech Talks Agder, DigiViken (alle fire er dokumentert i `#erfaring` i dag) |
| `#arbeidsbenken` | Kort/bokser | Tre nummererte linjer (Sparring, prototype, agenter) + svart bånd med fire steg |
| `#om` / foredrag | Én seksjon | Delt: foredrag (bilde + tre temaer) på grå flate, og «Om» som ren tekst |
| `#kontakt` | Lys | Svart flate, hvit knapp «Vis e-post» + LinkedIn |

Skrifttyper er uendret: Newsreader til titler og systemfont til brødtekst. Det gir ingen nye fonter og ingen CDN.

## Det som beholdes (krav fra handoff og CLAUDE.md)

- Innhold: «Passer / passer ikke», alle dokumenterte omtaler og lenker i `#erfaring` og alle ankere (`#arbeidsbenken`, `#om`, `#kurs-og-foredrag`, `#erfaring`, `#kontakt`). Figma forenkler bort noe av dette. Det blir liggende i koden, men med Figma-stil.
- Funksjon: menyen med Escape og fokusretur, skip-link, navigasjon og e-post uten JS, `prefers-reduced-motion`, Lucide inline-SVG.
- Sikkerhet: Skriptet i `<head>` (`classList.add("js")`) endres **ikke**. Da gjelder CSP-hashen i `netlify.toml` fortsatt. Testen verifiserer dette.

## Rekkefølge (TDD)

1. **Rødt:** Nye og justerte Playwright-tester:
   - stripen «Omtalt hos» finnes, og hvert navn finnes også i `#erfaring` (ingen udokumenterte påstander)
   - primærknappen peker til `#kontakt`
   - kontaktseksjonen har mørk bakgrunn og lys tekst
   - CSP-hashen stemmer med det faktiske inline-skriptet

   Kjør testene og bekreft at de feiler.
2. **DESIGN.md først:** Nye tokens i svart-hvitt og oppdatert beskrivelse. Kjør `npx designmd lint DESIGN.md` til resultatet er 0/0. `DARK_MODE.md` og `AUDIT_REPORT.md` nevner den gamle aksenten `#5a6b7c`. De markeres som historiske eller oppdateres.
3. **HTML** (`index.html`): header, første skjerm, stripe, arbeidsbenk, delt om/foredrag, mørk kontakt.
4. **CSS** (`css/style.css`): tokens og layout for desktop og mobil (mobil `3:266`: portrett under knappene, stegene stablet).
5. **Grønt:** `npm run build` med bare tillatte filer i dist, designlint, `$env:PLAYWRIGHT_CHANNEL='chrome'; npm test` (51+ tester, inkludert axe-kontrast).
6. **Visuell sammenligning:** skjermbilder av desktop og mobil mot Figma, og test av tastatur og navigasjon uten JS.
7. **Review:** code-review-agent, deretter oppdatering av PR #10 med skjermbilder og faktiske testtall. Ingen merge og ingen produksjonsdeploy.

## Beslutninger (Lars, 31.10.2026)

1. **Aksentfarge:** Oksidrødt fjernes helt. Fokusring og lenker blir svarte med tydelig understrek.
2. **Portrett:** Det lages en optimalisert svart-hvitt-versjon av `images/Profil.jpg`, som legges i produksjons-allowlisten.
3. **Innhold:** «Passer / passer ikke» og hele erfaringslisten beholdes, men med ny stil (linjer, ikke bokser).

## Tillegg: fagbladartikler, utgivere og sitater (Lars, 31.10.2026)

**Hva:** En ny blokk, «I fagpressen», under `#erfaring`. Den ligger rett etter stripen «Omtalt hos». Hver artikkel får en linje i Figma-stil uten boks:

`UTGIVER · publikasjon` → artikkeltittel → eventuelt ett kort sitat → lenke

**Beslutning:** Blokken bruker de fem artiklene som allerede er på siden. Den får **ett** fremhevet sitat i stor Newsreader-skrift. De andre artiklene vises med utgiver og tittel, uten sitat.

**Artikler i blokken** (kontrollert 31.10.2026, se `docs/kilder-fagpresse.md`):
- Fagbladet (Fagforbundet): «Lars Erik er KI-guru i kommunen …». **Ny**, og må også legges inn i detaljlisten.
- kode24 (Aller Media): «Slik løser de 40-årskrisen»
- AIavisen: «Min KI-reise» (eget innlegg)
- Fædrelandsvennen, debattinnlegg: «Vi har fått KI-verktøykassen …» (medforfatter)
- HR Norge: «Veien til digital effektivisering» (krever medlemskap)
- Dagbladet: ikke funnet. Venter på svar fra Lars (kanskje kode24).
- Lawai er en leverandørblogg. Den vises bare i detaljlisten.

**Fremhevet sitat:** «KI er en folkebevegelse, og den er åpen for alle». Kilde: kode24, 24.03.2026.

**Regler, fordi vi ikke finner på fakta:**
- Utgiver, tittel og dato hentes fra selve artikkelsiden. Det kildeloggføres i `docs/kilder-fagpresse.md` med lenke og dato for kontroll.
- Sitater brukes bare når de er ordrett hentet fra artikkelen, korte (én setning) og sagt av Lars eller om arbeidet hans. Sitatet får anførselstegn og kilde. Er det tvil om ordlyden, brukes ingen sitat.
- Lenker uten svar eller bak betalingsmur flagges. De publiseres ikke med sitat.
- Detaljlisten beholdes. Blokken løfter fram et utvalg, den erstatter ikke listen.

**Tester (rødt først):**
- Hver artikkel i blokken har utgiver, tittel og lenke.
- Hvert `<blockquote>` har `cite` og en synlig kilde.
- Hver lenke i blokken finnes også i detaljlisten. Da kommer ingen nye udokumenterte omtaler inn.

## Rettelse til forrige råd

Skyøkten sa at CLAUDE.md låser aksentfargen `#5a6b7c`. Det stemmer ikke. Gjeldende `DESIGN.md` bruker oksidrødt `#8a3f2b`, og CLAUDE.md har ingen slik regel. `#5a6b7c` finnes bare i de eldre filene `DARK_MODE.md` og `AUDIT_REPORT.md`.

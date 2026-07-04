# Lars Erik Brekne Johnsen – Personlig nettside

## Prosjekt

Én statisk HTML-fil (`index.html`) med inline CSS og minimal vanilla-JS (aktiv-meny + subtil fade-in, ingen rammeverk). Selv-hostet skrift i `fonts/` (Newsreader, OFL). Ingen byggverktøy. Klar til å åpnes direkte i en nettleser eller deployes via Netlify / GitHub Pages / hva som helst.

## Filer som betyr noe

- `index.html` – hele nettsiden (innhold + stil + litt JS)
- `images/Profil.jpg` – profilbilde (sort-hvitt, rundt)
- `fonts/*.woff2` – selv-hostet Newsreader (display/navn). OFL-lisens i `fonts/OFL.txt`.

Alt annet kan ignoreres.

## Hvem er Lars

Lars Erik Brekne Johnsen er HMS-rådgiver i Kristiansand kommune. Han jobber med å gjøre kunstig intelligens (KI) praktisk og trygt for offentlig sektor. Ikke utvikler – bindeledd mellom fag, folk og tekniske miljøer. Medgrunnlegger av KI-geriljaen, et nettverk for erfaringsdeling om KI på tvers av offentlig og privat sektor. Har vært på NRK, holdt foredrag for HR Norge, Samfunnsviterne, Tech Talks Agder m.fl.

Kontakt: larserik.bn@gmail.com
LinkedIn-profil: https://www.linkedin.com/in/lars-erik-brekne-johnsen/
KI Geriljaen (LinkedIn-gruppe): https://www.linkedin.com/groups/11818031/

## Seksjoner i index.html

| Seksjon | id | Innhold |
|---------|-----|---------|
| Header | – | Profilbilde, navn, undertittel, navigasjon (sticky) |
| Inngangslinje | – | Verdiløfte + to knapper + troverdighets-stripe |
| Om meg | `#om` | 4 avsnitt + attribuert sitat-blokk (KI-geriljaen, VIBS) |
| Tjenester | `#tjenester` | 4 klikkbare kort (rådgivning, kurs/foredrag, KI-agenter, coaching) |
| Tilnærming | `#tilnaerming` | Kunnskapsbasert KI + sammenleggbart Q&A |
| Foredrag og erfaring | `#foredrag` | Liste med årstall, referanser, booking |
| Innsikt og media | `#innsikt` | NRK TV/radio (glyfer), medieomtale (8), kronikker (2), arrangementer (4) |
| Kontakt | `#kontakt` | E-post, telefon, LinkedIn, KI-geriljaen |

## Designregler – «Løft håndverket» (2026)

**Behold sjelen (hardt – aldri bryt):**
- Minimalistisk, nesten nakent. Mye luft. Rolig.
- Kun gråtone + én aksentfarge: `#5a6b7c` (dempet blå-grå). Aldri klar blå, aldri andre farger.
- Hårstrek-linjer (1px), ingen skygger, ingen gradienter.
- Bokser: tynn ramme, ingen bakgrunnsfarge.
- Ingen hero-banner, ingen store fargeflater. «Arkitektens skisseblokk» – ikke «tech startup».
- Responsivt: stablede bokser på mobil.

**Tillat løftet (kun dette – ikke finn på mer):**
- Selv-hostet Newsreader (serif) til navn/seksjonstitler/sitat. Systemfont på brødtekst.
- Subtil fade-in ved scroll – kun forsterkning: innhold synlig uten JS, respekterer `prefers-reduced-motion`.
- Gråtonede NRK-glyfer (inline SVG) – kun på TV-/radio-boksene.
- Sitat-blokk (attribuert) og tekst-troverdighetsstripe.

Se `SPEC.md` for full doktrine + roadmap (inkl. fremtidige sider: kalender, ressursside).

## Tone i all tekst

- Norsk bokmål. Kort. Ærlig.
- Skriv som en klok kollega, ikke en konsulent.
- Aldri bruk: "banebrytende", "revolusjonerende", "cutting-edge", "game-changer", "sømløs", "helhetlig løsning", "ta kontroll over fremtiden", "transformér organisasjonen din".
- Bruk "KI" (kunstig intelligens), ikke "AI", i norsk tekst. Unntak: engelske titler/arrangementer beholder "AI".

## Slik oppdaterer du

Alt innhold og stil er i `index.html`. Vanlige oppgaver:

**Legg til foredrag:** Ny `<li>` i `<ul class="simple-list">` under `#foredrag`.
**Legg til medieomtale:** Ny `<li>` i artikkel-listen under `#innsikt`.
**Legg til NRK/video-klipp:** Ny klikkbar `<a>` med `<div class="video-placeholder">` i video-grid under `#innsikt`.
**Endre Om meg:** Rediger `<p>`-tagger i `#om`.
**Ny tjeneste:** Ny `<div class="box">` i `.grid-3` under `#tjenester`.

Etter endring: commit og push. Hvis GitHub Pages er aktivert, oppdateres siden automatisk innen ~1 minutt.

## Slash-kommandoer (research-agenter)

Ligger i `.claude/commands/`. Kall dem i Claude Code for å søke, verifisere og oppdatere siden:

| Kommando | Gjør |
|----------|------|
| `/media [tema]` | Søker web etter ny presseomtale/podkast, legger inn i #innsikt |
| `/foredrag [navn]` | Søker foredrag/arrangementer, verifiserer årstall, oppdaterer #foredrag |
| `/kronikk [tittel]` | Søker etter kronikker/fagartikler, legger inn under #innsikt |
| `/profil [vinkling]` | Henter LinkedIn/kilder, foreslår ny Om meg-tekst |
| `/referanse <kunde>` | Legger til kunde/oppdrag under #foredrag |
| `/innlegg [tema]` | Skriver LinkedIn-innlegg (endrer ikke siden) |
| `/legg-til <innhold>` | Generell: legger innhold i riktig seksjon |

Alle research-kommandoer skal VERIFISERE fakta mot kilde og aldri dikte opp. Ubekreftet innhold flagges til brukeren, ikke publiseres.

## Workflow

```
Bruker sier hva som skal endres
  → Rediger index.html
  → git add index.html
  → git commit -m "beskrivende melding"
  → git push
  → Siden oppdateres automatisk
```

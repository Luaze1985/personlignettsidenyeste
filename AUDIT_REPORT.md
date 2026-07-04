# Rapport: UX/UI, Innholdsstøy og Lenkeverifisering for index.html

Denne rapporten oppsummerer funnene fra en grundig teknisk og visuell revisjon av nettsiden `index.html` utført i juli 2026. Revisjonen har blitt gjennomført ved hjelp av spesialiserte KI-agenter (UX/UI-arkitekt, innholdsanalytiker, og QA-tester) samt automatiserte Playwright-tester for å verifisere alle lenker.

---

## 📋 1. Hovedtall og Status

| Område | Status | Viktigste funn |
| :--- | :---: | :--- |
| **UX & Estetikk** | **Meget god** | Følger den minimalistiske "arkitektens skisseblokk"-stilen trofast. Gråtoner og én aksentfarge (`#5a6b7c`) er brukt konsekvent. |
| **A11y (Universell utforming)** | **Kan forbedres** | God fargekontrast (4.84:1) og skip-lenke på plass. Mangler hover/fokus-ring på enkelte lenker, samt skjermleser-varsling om eksterne faner. |
| **Innholdsstøy & Flyt** | **Kan forbedres** | En del redundans: 8 kontaktlenker på en kort side, duplisert tekst om "KI-agenter", og NRK-innslaget er lenket/referert 5 ganger. |
| **Lenkesjekk (Playwright)** | **2 advarsler** | Av 43 sjekkede lenker er 41 helt OK. 1 lenke (NRK TV) er 404 (utløpt), og 1 (LinkedIn) blokkerer roboter (falsk positiv). |

---

## 🔍 2. Detaljerte Funn og Anbefalte Tiltak

### A. Døde lenker (Playwright-verifisering)
Playwright-skriptet (`tests/link-checker.spec.js`) testet alle 43 lenker i `index.html`.
* **NRK TV-innslag (404 Not Found):**
  * **Lenke:** `https://tv.nrk.no/se?v=DKSL98052025&t=306s` (under "Video og radio")
  * **Status:** 404 (Siden er avpublisert av NRK).
  * **Anbefaling:** Siden dette er en utgått TV-sending, bør den enten fjernes eller erstattes med en lenke til den tilhørende NRK-artikkelen (`https://www.nrk.no/sorlandet/halverte-arbeidsuka-med-ki-1.17257802`) som fortsatt er aktiv (status 200).
* **LinkedIn-profil (999 Request Denied):**
  * **Lenke:** `https://www.linkedin.com/in/lars-erik-brekne-johnsen/`
  * **Status:** Falsk positiv (LinkedIns robotbeskyttelse returnerer 999 to automatiserte verktøy). Ingen tiltak nødvendig.
* **Lokale filer og interne ankre:** Alle lokale filer (`favicon.svg`, preloaded skrifter) og interne ankre (`#om`, `#tjenester` osv.) er 100% intakte.

### B. Brukeropplevelse (UX) & Designsystem
Nettsiden har et sterkt visuelt særpreg og et rent design, men har noen mindre inkonsekvenser:
* **Faux Bold (Syntetisert fet skrift):**
  * `summary.qa` bruker `font-weight: 500`. Siden Newsreader-fonten kun lastes i `400` og `600`, tvinges nettleseren til å tegne en kunstig bold-effekt. 
  * **Anbefaling:** Endre til `font-weight: 600` for å bruke den faktiske innlastede fonten.
* **Manglende fokus- og hover-stiler:**
  * Lenker i `.booking-note` og `.contact-links` mangler egne hover- eller fokus-effekter og faller tilbake på ukomfortable standardstiler.
  * **Anbefaling:** Legg til enkle, stilrene CSS-overganger som understreker lenkene ved hover/fokus i tråd med aksentfargen.
* **Uoverensstemmelse i SPEC.md:**
  * Dokumentasjonen nevner et portrettbilde-placeholder i "Om meg", men HTML-en bruker en sitatblokk (pull-quote). Vi anbefaler å oppdatere `SPEC.md` for å matche den faktiske siden.

### C. Universell Utforming (WCAG 2.2 Level AA)
* **Ekstern lenke-varsel:**
  * Siden har 16 eksterne lenker med `target="_blank"`, men bare 2 av dem (NRK TV/Radio) opplyser skjermlesere om at de åpnes i ny fane.
  * **Anbefaling:** Legg inn en usynlig hjelpetekst `<span class="sr-only"> (åpner i ny fane)</span>` på alle eksterne lenker.
* **Landemerker for skjermlesere:**
  * `<summary>`-elementene fungerer som seksjonsoverskrifter i trekkspillmenyer, men er ikke kodet som overskrifter.
  * **Anbefaling:** Legg til `role="heading" aria-level="3"` på alle `<summary>`-elementer slik at skjermleserbrukere kan navigere direkte til dem.
* **HTML syntaksfeil:**
  * Kommentaren på linje 7 bruker `->` (`synlig->skjult`). Dette er ugyldig HTML-kommentarsyntaks som kan forvirre eldre nettlesere. Bør endres til `→`.

### D. Innholdsstøy og Redundans
Siden lider under en del repetisjon som kan strammes inn for et mer profesjonelt inntrykk:
* **Overflødig kontakt-mas (8 e-postlenker):**
  * Det å ha direkte `mailto:`-lenker på alle fire tjenestekortene, pluss to "booking-noter", pluss i intro og footer, virker overveldende.
  * **Anbefaling:** 
    1. Fjern de to frittstående `<p class="booking-note">`-setningene under *Tjenester* og *Foredrag*. De tilfører ikke ny verdi.
    2. Gjør de 4 tjenestekortene om fra klikkbare e-postlenker (`a.box`) til statiske informasjonskort (`div.box`). Hoved-CTA i intro og kontaktinformasjon i footer er mer enn nok for å fange opp henvendelser.
* **Tekstduplisering:**
  * Setningen om "deterministiske KI-agenter" og hvordan man "jobber smartere som kunnskapsarbeider" står nesten ordrett både i "Om meg" og under tjenestekortet for kunnskapsarbeid.
  * **Anbefaling:** Omformuler setningen i "Om meg" for bedre flyt og mindre repetisjon.
* **Overdreven NRK-repetisjon:**
  * NRK-saken refereres til 5 steder. Vi bør fjerne de to dupliserte lenkene fra den lange medieomtalelisten, da saken allerede er fremhevet visuelt med egne TV- og Radio-bokser rett over.
* **Accordion-innstilling:**
  * Seksjonen `Medieomtale og artikler (8)` starter som `open` (utfoldet). Dette gjør siden unøvendig lang. Vi anbefaler å fjerne `open` slik at alle trekkspill starter lukket og siden fremstår mer kompakt.

---

## 🛠️ 3. Konkrete Kildekode-endringer (Proposed Diffs)

Nedenfor er de foreslåtte kodeendringene i `index.html` for å gjennomføre denne oppryddingen.

### CSS Justeringer (Hover, Fokus, Font-vekt)
```css
/* summary.qa endres til font-weight 600 */
summary.qa { 
    font-family: var(--font-display); 
    text-transform: none; 
    letter-spacing: 0; 
    font-size: 1.2rem; 
    font-weight: 600; /* endret fra 500 */
    color: var(--text-color); 
}

/* Hover- og fokus-effekt på gjenværende kontaktlenker i teksten */
.booking-note a {
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s, color 0.2s;
}
.booking-note a:hover, .booking-note a:focus-visible {
    text-decoration-color: var(--accent-color);
    color: var(--accent-color);
}
.booking-note a:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
}

/* Footer-lenker hover-effekt */
.contact-links a {
    color: var(--text-color); 
    text-underline-offset: 4px; 
    font-size: 0.95rem;
    text-decoration: underline;
    text-decoration-color: var(--accent-color);
    transition: text-decoration-color 0.2s, color 0.2s;
}
.contact-links a:hover {
    color: var(--accent-color);
    text-decoration-color: var(--accent-color);
}
.contact-links a:focus-visible { 
    outline: 2px solid var(--accent-color); 
    outline-offset: 2px; 
}
```

### Struktur og Innhold (index.html)

1. **Kommentar-fiks (linje 7):**
   ```html
   <!-- Sett js-klasse foer first paint, slik at fade-in ikke blinker synlig → skjult. -->
   ```

2. **Omformulering i "Om meg" for å unngå tekstduplisering (linje 311):**
   ```html
   <p>Jeg trives best med folk – enda bedre enn foran datamaskinen. Så selv om jeg jobber mye med KI, handler det egentlig om mennesker og hvordan vi løser oppgaver sammen. Min rolle er å hjelpe deg med å kombinere smarte tekniske verktøy med gode arbeidsmetoder som styrker hele teamet.</p>
   ```

3. **Gjør tjenestekortene statiske og fjern unødvendig booking-setning (linje 317-336):**
   ```html
   <div class="grid-3">
       <div class="box">
           <h3>Rådgivning – effektivitet og kvalitet</h3>
           <p>Jeg går inn i virksomheten din og finner hvor du kan spare tid og heve kvalitet – uten å miste menneskene i det. Trygg bruk, GDPR og EU AI Act der det trengs.</p>
       </div>
       <div class="box">
           <h3>Kurs og foredrag</h3>
           <p>Praktisk KI i arbeidshverdagen, rett på det som gir verdi. For alle bransjer – ikke bare offentlig sektor.</p>
       </div>
       <div class="box">
           <h3>Kunnskapsarbeid og KI-agenter</h3>
           <p>Du får både deterministiske KI-agenter og hvordan du selv jobber smartere som kunnskapsarbeider – med tips til hvordan teamet kan dra nytte av det.</p>
       </div>
       <div class="box">
           <h3>Coaching – individuelt og i grupper</h3>
           <p>Ofte stopper det opp: du vet at KI kan hjelpe, men kommer ikke i gang – eller mister motivasjonen. Jeg hjelper deg videre, én-til-én eller i team – med personlige systemer, motivasjon og konkrete steg.</p>
       </div>
   </div>
   <!-- Linjen under fjernes helt for å redusere e-postmas: -->
   <!-- <p class="booking-note">Kurs, rådgivning, coaching og foredrag – ta kontakt.</p> -->
   ```

4. **Korriger NRK TV-lenken til den fungerende NRK-artikkelen (linje 374):**
   ```html
   <a class="media-link" href="https://www.nrk.no/sorlandet/halverte-arbeidsuka-med-ki-1.17257802" target="_blank" rel="noopener" aria-label="Se NRK Sørlandet TV-reportasje: Halverte arbeidsuka med KI (åpner i ny fane)">
   ```

5. **Fjern de to dupliserte NRK-lenkene fra trekkspillmenyen og lukk den (linje 407-418):**
   ```html
   <details> <!-- Fjernet 'open' slik at den starter lukket -->
       <summary role="heading" aria-level="3">Medieomtale og artikler (6)</summary> <!-- Endret fra (8) -->
       <ul class="simple-list">
           <!-- De to første NRK-lenkene er fjernet da de er dekket av video/radio-boksene over -->
           <li><a class="link ext" href="https://www.nrk.no/sorlandet/lanserer-ki-veileder_-_-haper-den-gir-konkrete-rad-1.17453716" target="_blank" rel="noopener">NRK Sørlandet – Lanserer KI-veileder: Håper den gir konkrete råd<span class="sr-only"> (åpner i ny fane)</span></a></li>
           <li><a class="link ext" href="https://www.kode24.no/artikkel/slik-loser-de-40-arskrisen/259601" target="_blank" rel="noopener">kode24 – Slik løser de 40-årskrisen<span class="sr-only"> (åpner i ny fane)</span></a></li>
           ...
       </ul>
   </details>
   ```

6. **Fjern duplisering av Tech Talks Agder (linje 432):**
   * Siden den allerede ligger under "Foredrag og erfaring", kan den fjernes fra listen over arrangementer for å unngå dobbeltføring.

---

## 🚀 4. Konklusjon

Ved å gjennomføre disse endringene vil nettsiden fremstå betydelig renere (mindre "rot"), mer profesjonell og tillitsvekkende, samtidig som den blir 100% universelt utformet for skjermlesere og tastaturnavigasjon.

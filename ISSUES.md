# Saksliste og Teknisk Backlog — larserik-nettside

**Hoved-PRD & Doktrine:** `SPEC.md` («Løft håndverket» & §8 Fremtid/Roadmap) og `DESIGN.md` (Autoritativt designsystem).  
**Kvalitets- og sikkerhetsmål:** 100 % etterlevelse av WCAG 2.1 AA / WCAG 2.2, kompromissløs Content Security Policy (CSP Level 3), herdede HTTP-responsheadere og null regresjoner i Playwright-testpakken (`npm test`).  
**Sist revidert:** 19. august 2026 (Etter grundig sikkerhets-, UU/WCAG- og testsuite-revisjon).

---

## 1. Prioriteringsoversikt

| ID | Prioritet | Kategori | Tittel | Status |
|---|---|---|---|---|
| **[UU-01]** | **🔴 P1 (Høy)** | Universell Utforming | Fokusmarkering mangler kontrast på mørk bakgrunn (WCAG 1.4.11 / 2.4.11) | ✅ Løst (2026-08-19) |
| **[UU-02]** | **🔴 P1 (Høy)** | Universell Utforming | Tastaturfokus tapes ved klikk på «Vis e-post» (WCAG 2.4.3 / 2.1.1) | ✅ Løst (2026-08-19) |
| **[SEC-01]** | **🔴 P1 (Høy)** | Sikkerhet / Test | Automatisk test for CSP SHA-256 hash-samsvar for inline-skript | ✅ Løst (2026-08-19) |
| **[UU-03]** | **🟡 P2 (Middels)** | Universell Utforming | `aria-label="Til toppen"` overstyrer Lars Eriks navn i header-logoen (WCAG 2.5.3) | Åpen |
| **[UU-04]** | **🟡 P2 (Middels)** | Universell Utforming | Manglende «åpner i ny fane»-skjermleservarsel (`.sr-only`) i referanselisten (WCAG 3.2.5) | Åpen |
| **[UU-05]** | **🟡 P2 (Middels)** | Universell Utforming | Mobilmenyen mangler `Escape`-lukking og dynamisk `aria-label` (WCAG 2.1.1 / 4.1.2) | Åpen |
| **[UU-06]** | **🟡 P2 (Middels)** | Universell Utforming | Skip-link målstabilitet: `<main id="main">` mangler `tabindex="-1"` (WCAG 2.4.1) | Åpen |
| **[UU-07]** | **🟡 P2 (Middels)** | Universell Utforming | Endre HTML-språkkode fra generisk `lang="no"` til spesifikk `lang="nb"` (WCAG 3.1.1) | Åpen |
| **[SEC-02]** | **🟡 P2 (Middels)** | Sikkerhet | Manglende eksplisitt `form-action 'self'` i Content-Security-Policy | Åpen |
| **[SEC-03]** | **🟡 P2 (Middels)** | Sikkerhet / Test | Legg til HSTS (`Strict-Transport-Security`) assertion i testpakken | Åpen |
| **[ROAD-02]** | **🟡 P2 (Middels)** | Roadmap (F-5) | Beslutnings-spike: Ressurs- og materiellhåndtering uten backend/CMS | Planlagt |
| **[ROAD-03]** | **🟡 P2 (Middels)** | Roadmap (F-2) | Statisk «Kommende foredrag»-side (`kommende.html`) | Planlagt |
| **[ROAD-04]** | **🟡 P2 (Middels)** | Roadmap (F-3) | Ressurs- og undervisningsside (`ressurser.html`) | Planlagt |
| **[ROAD-06]** | **🟡 P2 (Middels)** | Drift / DevOps (N-4) | Domeneshop DNS-oppsett og auto-SSL for `breknejohnsen.no` | Venter på Lars |
| **[UU-08]** | **🟢 P3 (Lav)** | Universell Utforming | Svak rammekontrast på mobil-hamburgermeny (`.nav-toggle`) (WCAG 1.4.11) | Åpen |
| **[UU-09]** | **🟢 P3 (Lav)** | Universell Utforming | Manglende navngitte landemerker (`aria-labelledby`) på hovedseksjoner (WCAG 1.3.1) | Åpen |
| **[UU-10]** | **🟢 P3 (Lav)** | Universell Utforming | Manglende semantisk `<main>`-landemerke i `404.html` (WCAG 1.3.1) | Åpen |
| **[UU-11]** | **🟢 P3 (Lav)** | Testautomatisering | Integrasjon av `@axe-core/playwright` for automatisert UU-testing | Åpen |
| **[SEC-04]** | **🟢 P3 (Lav)** | Sikkerhet | Utvidelse av `Permissions-Policy` for moderne nettleser-API-er | Åpen |
| **[SEC-05]** | **🟢 P3 (Lav)** | Sikkerhet | Vurdering av innstramming fra `img-src 'self' data:` til kun `'self'` | Åpen |
| **[SEC-06]** | **🟢 P3 (Lav)** | Sikkerhet | Etablering av standard `.well-known/security.txt` (RFC 9116) | Åpen |
| **[DEBT-01]** | **🟢 P3 (Lav)** | Teknisk gjeld | Dokumentasjonsavvik i `security_audit.md` angående inline-skript | Åpen |
| **[ROAD-05]** | **🟢 P3 (Lav)** | Roadmap (F-4) | Booking / ledige datoer (utsatt etter F-2) | Utsatt |

---

## 2. 🔴 P1 — Høy prioritet (Kritiske mangler som må utbedres først)

### [UU-01] Fokusmarkering mangler kontrast på mørk bakgrunn
- **Prioritet:** 🔴 P1 (Høy)
- **Kategori:** Universell Utforming (WCAG 2.1 AA / WCAG 2.2: SC 1.4.11 Ikke-tekstlig kontrast & SC 2.4.11 Fokusutseende)
- **Berørte filer og linjenumre:** `css/style.css:9`, `css/style.css:68-85` (Erfaring/referanser), `css/style.css:94-100` (Kontaktpanel)
- **Problembeskrivelse:**  
  I `css/style.css:9` er den globale fokusindikatoren satt til:
  ```css
  a:focus-visible, button:focus-visible, summary:focus-visible { outline: 3px solid var(--red); outline-offset: 4px; }
  ```
  Fargen `--red` (`#8a3f2b`, relativ luminance $L \approx 0.091$) har en kontrast på **6.49:1** mot den lyse bakgrunnen `--paper` (`#f3efe6`), noe som er godt innenfor kravet.  
  Imidlertid er bakgrunnen i seksjonene `.trust-section` (`#erfaring`) og `.contact-panel` (`#kontakt`) satt til `--ink` (`#1d211f`, relativ luminance $L \approx 0.015$). Kontrastforholdet mellom fokusringen (`#8a3f2b`) og bakgrunnen (`#1d211f`) er kun **2.18 : 1**.  
  Dette bryter WCAG SC 1.4.11, som krever minimum **3.0 : 1** kontrast mot tilstøtende farger for visuelle fokusindikatorer. Tastaturnavigerende brukere med nedsatt syn vil ha store problemer med å se hvor fokus befinner seg i mørke seksjoner.
- **Konkret anbefalt tiltak:**  
  Legg til en overstyring i `css/style.css` for alle interaktive elementer i mørke seksjoner som benytter `--accent-on-dark` (`#dfa692`, relativ luminance $L \approx 0.450$, målt kontrast **7.75 : 1** mot `#1d211f`):
  ```css
  .trust-section a:focus-visible,
  .trust-section summary:focus-visible,
  .contact-panel a:focus-visible,
  .contact-panel button:focus-visible {
      outline-color: var(--accent-on-dark);
  }
  ```

---

### [UU-02] Tastaturfokus tapes ved klikk på «Vis e-post»
- **Prioritet:** 🔴 P1 (Høy)
- **Kategori:** Universell Utforming (WCAG 2.1 AA: SC 2.4.3 Fokusrekkefølge & SC 2.1.1 Tastatur)
- **Berørte filer og linjenumre:** `js/navigation.js:73-80`, `index.html:114`
- **Problembeskrivelse:**  
  Kontaktseksjonen i `index.html` har en knapp `<button class="contact-email-btn" id="reveal-email">Vis e-post</button>`.  
  I `js/navigation.js:79` håndteres klikkhendelsen med å erstatte knappen med en ny `<a>`-lenke i DOM:
  ```javascript
  emailBtn.parentNode.replaceChild(link, emailBtn);
  ```
  Når et element som har aktivt tastaturfokus slettes fra DOM uten at fokus eksplisitt flyttes videre, nullstiller nettleseren fokus til toppen av siden (`document.body`).  
  Tastaturbrukere og skjermleserbrukere opplever at de brått kastes ut av kontaktseksjonen og må tabbe gjennom hele nettsiden på nytt for å nå den fremviste e-postlenken.
- **Konkret anbefalt tiltak:**  
  Kall `link.focus()` umiddelbart etter at det nye elementet er satt inn i DOM i `js/navigation.js`:
  ```javascript
  emailBtn.parentNode.replaceChild(link, emailBtn);
  link.focus();
  ```

---

### [SEC-01] Automatisk test for CSP SHA-256 hash-samsvar for inline-skript
- **Prioritet:** 🔴 P1 (Høy)
- **Kategori:** Sikkerhet / Testautomatisering (Content Security Policy Level 3 & Regresjonsvern)
- **Berørte filer og linjenumre:** `netlify.toml:116`, `index.html:14`, `tests/header-validator.spec.js`
- **Problembeskrivelse:**  
  `netlify.toml:116` deklarerer `script-src 'self' 'sha256-WZRJfWvsnNCPcxzZwvyhovnZGqhZaC+8gPGPRbx6wTk='` for å tillate det inline anti-FOUC-skriptet i `index.html:14` (`document.documentElement.classList.add("js");`).  
  Dersom noen endrer eller formaterer om denne linjen i `index.html` (f.eks. legger til et linjeskift, anførselstegn eller mellomrom), vil SHA-256-hashen endres. Nettleseren vil da nekte å kjøre skriptet i produksjon under CSP.  
  Per i dag finnes det ingen statisk eller automatisert test som beregner SHA-256-hashen av inline-skript i kildekoden og validerer den mot CSP-deklarasjonen i `netlify.toml` før deploy.
- **Konkret anbefalt tiltak:**  
  Legg til en ny test i `tests/header-validator.spec.js` som programmatisk leser `index.html`, ekstraherer innholdet i alle inline `<script>`-blokker (uten `type="application/ld+json"`), hasher innholdet med `crypto.createHash('sha256').update(content).digest('base64')` og asserter at den genererte hashen eksisterer i `netlify.toml` sin `Content-Security-Policy`:
  ```javascript
  test('TC-2.9: Inline script SHA-256 hash matches netlify.toml CSP directive', () => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    const match = html.match(/<script(?![^>]*type=["']application\/ld\+json["'])>([\s\S]*?)<\/script>/i);
    expect(match).not.toBeNull();
    const scriptContent = match[1];
    const hash = crypto.createHash('sha256').update(scriptContent).digest('base64');
    expect(configuredHeaders['content-security-policy']).toContain(`'sha256-${hash}'`);
  });
  ```

---

## 3. 🟡 P2 — Middels prioritet (Viktige forbedringer og neste iterasjon)

### [UU-03] `aria-label="Til toppen"` overstyrer Lars Eriks navn i header-logoen
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Universell Utforming (WCAG 2.1 AA: SC 2.5.3 Navn i etikett / Label in Name & SC 2.4.4 Formål med lenke)
- **Berørte filer og linjenumre:** `index.html:25`
- **Problembeskrivelse:**  
  I `index.html:25` har logoen/hjemlenken i headeren:
  ```html
  <a class="profile-group" href="#top" aria-label="Til toppen">
      <img class="profile-pic" src="images/profil-480.jpg" alt="Lars Erik Brekne Johnsen" width="64" height="64">
      <span class="profile-text"><strong class="site-name">Lars Erik Brekne Johnsen</strong><small>KI, effektivitet og kvalitet</small></span>
  </a>
  ```
  `aria-label="Til toppen"` overstyrer fullstendig den synlige teksten "Lars Erik Brekne Johnsen" og undertittelen for skjermlesere.  
  1. Skjermleserbrukere hører kun "Til toppen, lenke", og mister informasjonen om hvem nettstedet tilhører.  
  2. Brukere av stemmestyringsverktøy (som sier "Klikk Lars Erik") vil oppleve at kommandoen feiler fordi det tilgjengelige navnet (accessible name) ikke inneholder den synlige teksten (brudd på WCAG 2.5.3).
- **Konkret anbefalt tiltak:**  
  Endre `aria-label` til å inkludere det synlige navnet, eller fjern `aria-label` og la tilgjengelig navn beregnes naturlig:
  ```html
  <a class="profile-group" href="#top" aria-label="Lars Erik Brekne Johnsen – Til toppen">
  ```

---

### [UU-04] Manglende «åpner i ny fane»-skjermleservarsel i referanselisten
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Universell Utforming (WCAG 2.1 AA: SC 3.2.5 Forutsigbar endring & SC 2.4.4)
- **Berørte filer og linjenumre:** `index.html:71-89`
- **Problembeskrivelse:**  
  Under `<details class="reference-details">` i `#erfaring` ligger 17 eksterne lenker med `target="_blank" rel="noopener"` (f.eks. NRK, HR Norge, Tech Talks Agder, DigiViken osv.).  
  Ingen av disse 17 lenkene inneholder skjermleserteksten `<span class="sr-only"> (åpner i ny fane)</span>`. Dette står i kontrast til kontaktseksjonen (linje 115–116) og bryter prosjektstandarden definert i `ISSUES.md` (sak N-5).  
  Blinde og svaksynte skjermleserbrukere får dermed intet forhåndsvarsel om at aktivering av lenken vil åpne et nytt nettleservindu/fane.
- **Konkret anbefalt tiltak:**  
  Legg til `<span class="sr-only"> (åpner i ny fane)</span>` på alle 17 `<a>`-tagger med `target="_blank"` i linje 71–89 i `index.html`. Eksempel:
  ```html
  <li><a href="https://www.nrk.no/sorlandet/halverte-arbeidsuka-med-ki-1.17257802" target="_blank" rel="noopener">NRK Sørlandet — Halverte arbeidsuka med KI<span class="sr-only"> (åpner i ny fane)</span></a></li>
  ```

---

### [UU-05] Mobilmenyen mangler `Escape`-lukking og dynamisk `aria-label`
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Universell Utforming (WCAG 2.1 AA: SC 2.1.1 Tastatur, SC 1.4.13 Innhold ved peking eller fokus & SC 4.1.2 Navn, rolle, verdi)
- **Berørte filer og linjenumre:** `index.html:26`, `js/navigation.js:37-61`
- **Problembeskrivelse:**  
  1. I `index.html:26` er menyknappen deklarert med et statisk `aria-label="Åpne meny"`. Når menyen åpnes og tilstanden endres til `aria-expanded="true"`, forblir `aria-label` uendret som "Åpne meny" i stedet for å oppdateres til "Lukk meny".  
  2. Når menyen er åpen på mobilvisning, finnes det ingen lytter for standard `Escape`-tast for å lukke menyen og returnere fokus til menyknappen.
- **Konkret anbefalt tiltak:**  
  I `js/navigation.js`, utvid `toggle`-logikken til å oppdatere `aria-label` dynamisk og håndtere `Escape`:
  ```javascript
  toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Lukk meny' : 'Åpne meny');
      toggle.textContent = isOpen ? '\u2715' : '\u2630';
  });

  document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Åpne meny');
          toggle.textContent = '\u2630';
          toggle.focus();
      }
  });
  ```

---

### [UU-06] Skip-link målstabilitet: `<main id="main">` mangler `tabindex="-1"`
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Universell Utforming (WCAG 2.1 AA: SC 2.4.1 Hoppe over blokker / Bypass Blocks)
- **Berørte filer og linjenumre:** `index.html:22`, `index.html:31`
- **Problembeskrivelse:**  
  `index.html:22` har skip-linken `<a class="skip-link" href="#main">Hopp til innhold</a>`. Målet er `<main id="main">`.  
  Uten `tabindex="-1"` på `<main>` vil enkelte nettlesere og skjermlesere (spesielt Safari med VoiceOver på macOS/iOS) kun scrolle visuelt til elementet, mens det faktiske tastaturfokuset forblir i headeren. Neste trykk på `Tab` starter da navigeringen fra toppen av siden i stedet for fra første interaktive element i `<main>`.
- **Konkret anbefalt tiltak:**  
  1. Legg til `tabindex="-1"` på `<main id="main">` i `index.html:31`:
     ```html
     <main id="main" tabindex="-1">
     ```
  2. Legg til `main:focus { outline: none; }` i `css/style.css` slik at fokusflyttingen ikke skaper en uønsket visuell ramme rundt hele hovedblokken ved skip-link-aktivering.

---

### [UU-07] Endre HTML-språkkode fra generisk `lang="no"` til spesifikk `lang="nb"`
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Universell Utforming / Standarder (WCAG 2.1 AA: SC 3.1.1 Språk på siden)
- **Berørte filer og linjenumre:** `index.html:2`, `404.html:2`
- **Problembeskrivelse:**  
  Dokumentene bruker `<html lang="no">`. ISO-koden `no` er et makrospråk som omfatter både bokmål, nynorsk og samisk.  
  UU-tilsynet, W3C og moderne skjermlesere (NVDA, JAWS, VoiceOver) anbefaler å angi den spesifikke språkkoden `nb` (norsk bokmål) for å garantere at talesyntesen velger riktig fonetisk ordbok og uttaleregler. OpenGraph-metadata på linje 13 bruker allerede `og:locale="nb_NO"`.
- **Konkret anbefalt tiltak:**  
  Endre linje 2 i `index.html` og `404.html` fra:
  ```html
  <html lang="no">
  ```
  til:
  ```html
  <html lang="nb">
  ```

---

### [SEC-02] Manglende eksplisitt `form-action 'self'` i Content-Security-Policy
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Sikkerhet (Content Security Policy Level 2 / Level 3 Herding)
- **Berørte filer og linjenumre:** `netlify.toml:116`
- **Problembeskrivelse:**  
  `netlify.toml:116` definerer en streng CSP med `default-src 'self'`.  
  I henhold til W3C CSP Level 2 og Level 3 spesifikasjonen arver direktivet `form-action` **ikke** fra `default-src`. Dersom et `<form>` injiseres via en tredjepartskomponent, browser extension eller fremtidig kode, vil nettleseren tillate at skjemaet sender data til en hvilken som helst ekstern URL.  
  Å deklarere `form-action 'self'` (eller `form-action 'none'`) gir essensiell "defense-in-depth" mot uautorisert datalekkasje via skjemaer.
- **Konkret anbefalt tiltak:**  
  Legg til `form-action 'self';` i CSP-strengen i `netlify.toml:116`:
  ```toml
  Content-Security-Policy = "default-src 'self'; script-src 'self' 'sha256-WZRJfWvsnNCPcxzZwvyhovnZGqhZaC+8gPGPRbx6wTk='; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'; form-action 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
  ```

---

### [SEC-03] Legg til HSTS (`Strict-Transport-Security`) assertion i testpakken
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Sikkerhet / Testautomatisering
- **Berørte filer og linjenumre:** `tests/header-validator.spec.js` (Tier 1 Header-validering), `netlify.toml:114`
- **Problembeskrivelse:**  
  `netlify.toml:114` har konfigurert:
  ```toml
  Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
  ```
  Testsuiten i `tests/header-validator.spec.js` tester i dag `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` og `Content-Security-Policy` (TC-1.1 til TC-1.5), men mangler en dedikert test assertion for HSTS.  
  Dersom HSTS utilsiktet fjernes eller endres under fremtidig refaktorisering av `netlify.toml`, vil testsuiten fortsette å passere grønt uten å fange opp mangelen.
- **Konkret anbefalt tiltak:**  
  Legg til `TC-1.6` i `tests/header-validator.spec.js`:
  ```javascript
  test('TC-1.6: Strict-Transport-Security (HSTS) is configured with 2-year max-age and preload', () => {
    const hsts = configuredHeaders['strict-transport-security'];
    expect(hsts).toBeDefined();
    expect(hsts).toContain('max-age=63072000');
    expect(hsts).toContain('includeSubDomains');
    expect(hsts).toContain('preload');
  });
  ```

---

### [ROAD-02] Beslutnings-spike: Ressurs- og materiellhåndtering (F-5)
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Roadmap / Arkitektur & Skalerbarhet
- **Berørte filer og linjenumre:** `SPEC.md` (§8), eventuelt `docs/adr-materiell.md`
- **Problembeskrivelse:**  
  Behov for å distribuere foredragslysbilder, maler og kursmateriell til kursdeltakere og fagmiljøer.  
  Materiellhåndtering ("opplasting") drar ofte mot databaser, CMS eller autentisering, noe som kolliderer med prosjektets kjernefilosofi: *null unødvendig infrastruktur, null runtime-avhengigheter, lavest mulig vedlikehold*.  
  Det kreves en formell beslutning (ADR) før F-3 bygges.
- **Konkret anbefalt tiltak:**  
  Gjennomfør en kort analyse og dokumenter valg i `SPEC.md`:
  - *Alternativ A:* Statiske PDF/ZIP-filer lagret direkte i `resources/` i repoet og distribuert via Netlify CDN (anbefalt MVP).
  - *Alternativ B:* Ekstern fildeling via dedikert skylagring (f.eks. Google Drive / OneDrive).
  - *Alternativ C:* Headless CMS / Netlify CMS (forkastes pga. unødvendig kompleksitet).

---

### [ROAD-03] Statisk «Kommende foredrag»-side (`kommende.html`) (F-2)
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Roadmap / Funksjonalitet
- **Berørte filer og linjenumre:** `kommende.html` (ny fil), `css/style.css`, `index.html`
- **Problembeskrivelse:**  
  Behov for å vise en oversikt over fremtidige kurs, foredrag og workshops uten å innføre en dynamisk backend eller database.
- **Konkret anbefalt tiltak:**  
  Opprett `kommende.html` som arver `css/style.css` og designsystemet fra `DESIGN.md`. Implementer en enkel liste (dato, arrangør, tittel, sted, lenke) med fallbak/tom-tilstand ("Ingen oppsatte åpne foredrag akkurat nå – ta kontakt for booking").

---

### [ROAD-04] Ressurs- og undervisningsside (`ressurser.html`) (F-3)
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Roadmap / Funksjonalitet
- **Berørte filer og linjenumre:** `ressurser.html` (ny fil), `css/style.css`, `index.html`
- **Problembeskrivelse:**  
  Fagpersoner og kursdeltakere etterspør veiledere, sjekklister for KI-innføring og undervisningsmateriell som kan gjenbrukes lovlig og praktisk.
- **Konkret anbefalt tiltak:**  
  Opprett `ressurser.html` med tydelig lisens- og opphavsrettmerking (f.eks. CC-BY 4.0 / Åpen kilde) for alt nedlastbart materiell, basert på beslutningen i F-5.

---

### [ROAD-06] Domeneshop DNS-oppsett og auto-SSL for `breknejohnsen.no` (N-4)
- **Prioritet:** 🟡 P2 (Middels)
- **Kategori:** Drift / DevOps / Domenekonfigurasjon
- **Ansvarlig:** Lars Erik
- **Problembeskrivelse:**  
  Nettstedet er ferdig konfigurert på Netlify (`larserik.netlify.app`), og egendomenene `breknejohnsen.no` og `www.breknejohnsen.no` er registrert på Netlify-siten. DNS-pekere hos Domeneshop må fullføres for at trafikk skal rutes riktig med automatisk Let's Encrypt SSL-sertifikat.
- **Konkret anbefalt tiltak:**  
  1. Logg inn i kontrollpanelet hos Domeneshop for `breknejohnsen.no`.
  2. Sett A-post for `@` (apex) til `75.2.60.5` (Netlify Load Balancer IP).
  3. Sett CNAME-post for `www` til `larserik.netlify.app.`.
  4. Verifiser i Netlify Domains at SSL-sertifikat utstedes automatisk.

---

## 4. 🟢 P3 — Lav prioritet (Forbedringer, teknisk gjeld og hygiene)

### [UU-08] Svak rammekontrast på mobil-hamburgermeny (`.nav-toggle`)
- **Prioritet:** 🟢 P3 (Lav)
- **Kategori:** Universell Utforming (WCAG 2.1 AA: SC 1.4.11 Ikke-tekstlig kontrast)
- **Berørte filer og linjenumre:** `css/style.css:114`
- **Problembeskrivelse:**  
  Hamburgermeny-knappen på mobil (`.nav-toggle`) har rammen `border: 1px solid var(--line);`.  
  Fargen `--line` (`#b9b2a5`, relativ luminance $L \approx 0.450$) mot bakgrunnen `--paper` (`#f3efe6`, $L \approx 0.866$) gir en kontrast på kun **1.83 : 1**.  
  Kravet i WCAG 1.4.11 for komponentrammer og grensesnittelementer er $\ge 3.0 : 1$. Svaksynte brukere på mobil kan ha vanskelig for å oppfatte knappens omriss som et klikkbart element.
- **Konkret anbefalt tiltak:**  
  Endre rammefargen på `.nav-toggle` til `var(--muted)` (`#555b57`, kontrast **6.06 : 1**) eller `var(--ink)`:
  ```css
  .nav-toggle {
      border: 1px solid var(--muted);
  }
  ```

---

### [UU-09] Manglende navngitte landemerker (`aria-labelledby`) på hovedseksjoner
- **Prioritet:** 🟢 P3 (Lav)
- **Kategori:** Universell Utforming (WCAG 2.1 AA: SC 1.3.1 Informasjon og relasjoner)
- **Berørte filer og linjenumre:** `index.html:42, 59, 94, 110`
- **Problembeskrivelse:**  
  Seksjonene `<section id="arbeidsbenken">`, `<section id="erfaring">`, `<section id="om">` og `<aside id="kontakt">` fungerer som HTML5-regioner, men mangler `aria-labelledby` pekende til seksjonsoverskriftene (`<h2>`).  
  I skjermlesernes rotormeny (landemerkeliste) vil seksjonene enten ignoreres eller kun listes som unavngitte regioner.
- **Konkret anbefalt tiltak:**  
  Koble seksjonene til overskriftene ved å tildele overskriftene `id` og referere via `aria-labelledby`:
  ```html
  <section id="arbeidsbenken" aria-labelledby="arbeidsbenken-title">
      ...
      <h2 id="arbeidsbenken-title">Kutt tidstyvene. Få mer tid til faget.</h2>
  ```

---

### [UU-10] Manglende semantisk `<main>`-landemerke i `404.html`
- **Prioritet:** 🟢 P3 (Lav)
- **Kategori:** Universell Utforming (WCAG 2.1 AA: SC 1.3.1 Informasjon og relasjoner)
- **Berørte filer og linjenumre:** `404.html:12-17`
- **Problembeskrivelse:**  
  Feilsiden `404.html` omslutter innholdet i en generisk `<div class="error-page">` uten et semantisk `<main>`-element.
- **Konkret anbefalt tiltak:**  
  Endre `<div>` til `<main class="error-page">`:
  ```html
  <body>
      <main class="error-page">
          <div class="error-code">404</div>
          <h1 class="error-title">Denne siden finnes ikke</h1>
          <p class="error-text">Beklager – siden du leter etter er flyttet, slettet eller har aldri eksistert.</p>
          <a class="error-link" href="/">Tilbake til forsiden</a>
      </main>
  </body>
  ```

---

### [UU-11] Integrasjon av `@axe-core/playwright` for automatisert UU-testing
- **Prioritet:** 🟢 P3 (Lav)
- **Kategori:** Testautomatisering / UU-kvalitetssikring
- **Berørte filer og linjenumre:** `package.json`, `tests/a11y-axe.spec.js` (ny testfil)
- **Problembeskrivelse:**  
  Manuell revisjon har avdekket subtile UU-feil. For å garantere at ingen fremtidige innholds- eller stilendringer introduserer nye WCAG-brudd, bør en automatisert tilgjengelighetsskanner integreres i den eksisterende Playwright-riggen.
- **Konkret anbefalt tiltak:**  
  Installer `@axe-core/playwright` som `devDependencies` og legg til en testfil `tests/a11y-axe.spec.js` som kjører `new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()`.

---

### [SEC-04] Utvidelse av `Permissions-Policy` for moderne nettleser-API-er
- **Prioritet:** 🟢 P3 (Lav)
- **Kategori:** Sikkerhet (Header-herding)
- **Berørte filer og linjenumre:** `netlify.toml:115`
- **Problembeskrivelse:**  
  Den nåværende `Permissions-Policy`-headeren blokkerer 9 vanlige sensor- og enhets-API-er. Ytterligere moderne nettleserfunksjoner kan eksplisitt deaktiveres for å hindre misbruk og datainnsamling.
- **Konkret anbefalt tiltak:**  
  Utvid `Permissions-Policy` i `netlify.toml:115` med:
  ```toml
  Permissions-Policy = "accelerometer=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), xr-spatial-tracking=()"
  ```

---

### [SEC-05] Vurdering av innstramming fra `img-src 'self' data:` til kun `'self'`
- **Prioritet:** 🟢 P3 (Lav)
- **Kategori:** Sikkerhet (CSP-minimalisering)
- **Berørte filer og linjenumre:** `netlify.toml:116`
- **Problembeskrivelse:**  
  `img-src` tillater for øyeblikket `data:`-URI-er. Alle bilder på nettstedet (`images/profil-480.jpg`, `images/foredrag-vartagder-1240.jpg`, `favicon.svg`) lastes som vanlige filer fra samme opprinnelse.
- **Konkret anbefalt tiltak:**  
  Dersom det verifiseres at ingen CSS eller skript benytter inline base64 data-URI-bilder, kan `data:` fjernes fra `img-src` i `netlify.toml:116` for å stramme inn CSP ytterligere.

---

### [SEC-06] Etablering av standard `.well-known/security.txt` (RFC 9116)
- **Prioritet:** 🟢 P3 (Lav)
- **Kategori:** Sikkerhet / Informasjonsdeling
- **Berørte filer og linjenumre:** `.well-known/security.txt` (ny fil), `scripts/build-site.js:8`
- **Problembeskrivelse:**  
  Standardisert mekanisme (RFC 9116) for at sikkerhetsforskere og etiske hackere kan kontakte domeneeieren ved funn av sårbarheter.
- **Konkret anbefalt tiltak:**  
  Opprett `.well-known/security.txt` med:
  ```text
  Contact: mailto:larserik.bn@gmail.com
  Expires: 2027-12-31T23:59:59.000Z
  Preferred-Languages: nb, no, en
  Canonical: https://breknejohnsen.no/.well-known/security.txt
  ```
  Legg filen til i allowlisten i `scripts/build-site.js`.

---

### [DEBT-01] Dokumentasjonsavvik i `security_audit.md` angående inline-skript
- **Prioritet:** 🟢 P3 (Lav)
- **Kategori:** Teknisk gjeld / Dokumentasjonssynkronisering
- **Berørte filer og linjenumre:** `security_audit.md:23-29`, `index.html:14`, `netlify.toml:116`
- **Problembeskrivelse:**  
  `security_audit.md` hevder under Finding 1 at alle inline-skript er fullstendig fjernet og at CSP bruker `script-src 'self'` med null unntak. I realiteten ble anti-FOUC-skriptet (`document.documentElement.classList.add("js");`) beholdt i `<head>` med en gyldig SHA-256 hash i CSP.
- **Konkret anbefalt tiltak:**  
  Oppdater `security_audit.md` slik at teksten reflekterer at anti-FOUC-skriptet tillates via SHA-256 hash i CSP i tråd med beste praksis for ytelse og unngåelse av visuell flimring.

---

### [ROAD-05] Booking / ledige datoer (F-4)
- **Prioritet:** 🟢 P3 (Lav)
- **Kategori:** Roadmap / Funksjonalitet
- **Berørte filer og linjenumre:** `kommende.html` / `index.html`
- **Problembeskrivelse:**  
  Eventuell integrasjon av ekstern bookingkalender (f.eks. Cal.com / Calendly) eller enkel forespørselsliste for ledige kursdatoer.
- **Konkret anbefalt tiltak:**  
  Eksplisitt utsatt. Vurderes først etter at F-2 («Kommende foredrag») er ferdigstilt og i aktiv drift.

---

## 5. 🗺️ Roadmap & Løpende oppgaver (Historikk & Status)

### Roadmap (fra PRD §8)
- **F-1 — Ekstraher designsystem til delt `style.css`:**  
  *Status:* **Fullført / Løst.** CSS er flyttet til `css/style.css`. `index.html` og `404.html` lenker til stilarket.
- **F-2 — Statisk «Kommende foredrag»-side (kalender MVP):**  
  *Status:* Planlagt som **[ROAD-03]** (P2).
- **F-3 — Ressurs- og undervisningsside:**  
  *Status:* Planlagt som **[ROAD-04]** (P2).
- **F-4 — Booking / ledige datoer:**  
  *Status:* Utsatt som **[ROAD-05]** (P3).
- **F-5 — Beslutnings-spike: mekanisme for opplasting/deling av materiell:**  
  *Status:* Planlagt som **[ROAD-02]** (P2).

### Nær-term / Løpende oppgaver (utenfor roadmap-PRD)
- **N-1 — Favicon (monogram «LE»):**  
  *Status:* **Fullført.** `favicon.svg` og `apple-touch-icon.png` er etablert og validert.
- **N-2 — Manglende/feil artikkel-URL-er:**  
  *Status:* **Fullført.** Verifisert mot CV-ens lenkeliste. Automatisk validert med `tests/link-checker.spec.js` (36 lenker).
- **N-3 — Troverdighets-stripe redaksjonelle valg:**  
  *Status:* **Fullført.** Fædrelandsvennen holdt ute (eget debattinnlegg); Universitetet i Innlandet beholdt.
- **N-4 — Deploy + domene (`breknejohnsen.no`):**  
  *Status:* Planlagt som **[ROAD-06]** (P2). Netlify-oppsett er klart, venter på Domeneshop DNS fra Lars.
- **N-5 — Skjermleservarsel om «åpner i ny fane»:**  
  *Status:* Delvis løst i bunntekst. Oppfølging for 17 gjenstående lenker i referanselisten håndteres under **[UU-04]** (P2).

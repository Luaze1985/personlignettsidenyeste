# Kartlegging og vurdering av visuelle elementer for breknejohnsen.no
*Gjennomført 13. november 2026 i forbindelse med GitHub-sak #12*

## 1. Formål og avgrensning
Dette notatet vurderer systematisk alle elementer på `breknejohnsen.no` for å avklare hvor et visuelt eller interaktivt innslag etter **Solvera-prinsippet (*grunnlag → bearbeiding → faglig kontroll*)** gjør tilbudet umiddelbart lettere å forstå.

**Viktige rammer:**
- Eksisterende tekst og overskrifter i `index.html` endres **ikke**.
- Spesifikke bransjer eller målgrupper (som fagforeninger, håndverkere eller HR) nevnes **ikke** på den offentlige nettsiden. De har kun fungert som interne «lesebriller» under vurderingen for å sikre at formuleringer og eksempler treffer et bredt, praktisk arbeidsliv.
- Designet skal strengt følge `DESIGN.md` (svart-hvitt `#111111` og `#ffffff`, Newsreader til overskrifter, systemfont til brødtekst, skarpe hjørner, 1px hårstreker, ingen unødige rammeverk, videoer eller tunge biblioteker).

---

## 2. Systematisk vurdering av alle 11 elementer på dagens side

| Nr | Seksjon / Element | Dagens form | Anbefalt format | Begrunnelse og prioritering | Prioritet |
|:---|:---|:---|:---|:---|:---:|
| 1 | **Hero** («Mennesker først...») | H1, ingress, to handlinger og rundt portrett | **Behold tekst + stillbilde** | Teksten er kort og avvæpnende. Portrettet gir personlig tillit. En video eller bakgrunnsanimasjon bak teksten vil skape støy og distrahere fra handlingen «Beskriv én arbeidsoppgave». | Lav |
| 2 | **Omtalt hos (stripe)** | Én linje med fire lenker (NRK, HR Norge, Tech Talks Agder, DigiViken) | **Behold enkel tekststripe** | Fungerer optimalt som en nøktern tillitsmarkør rett under heroen. Ingen animasjon nødvendig. | Lav |
| 3 | **Sparring** (Tjeneste 01) | Tittel + kort forklarende avsnitt | **Behold tekst** (dekkes av felles Arbeidsbenk-visning) | Teksten er kort. Å lage en separat visning her vil fragmentere listen. | Lav |
| 4 | **En liten prototype** (Tjeneste 02) | Tittel + kort forklarende avsnitt | **Behold tekst** (dekkes av felles Arbeidsbenk-visning) | Forklares best sammen med helheten i Arbeidsbenken. | Lav |
| 5 | **Agenter i arbeidsflyten** (Tjeneste 03) | Tittel + kort forklarende avsnitt | **Behold tekst** (dekkes av felles Arbeidsbenk-visning) | Teksten «samle kilder, sortere og lage utkast» er presis, men begrepet trenger et praktisk bevis under. | Lav |
| 6 | **Arbeidsbenken: Stegbånd 01–04** (Avklare, Prøve, Kontrollere, Velge) | Svart bånd med fire ord i linje | **Ny interaktiv/stegvis demonstrasjon (Solvera-flyt)** | **Hovedgrep 1:** Båndet er i dag fire nakne ord. Her oppstår den største gevinsten ved å vise trinnvis: *Rånotater inn → KI-strukturert utkast → Faglig kontrollpunkt der et menneske korrigerer en feil*. Fjerner all mystikk rundt «agenter» og «prototyper». | **Høy** |
| 7 | **Passer når / Passer ikke når** | To kolonner med kulepunkter | **Behold tekst** | Teksten («Faglig kontroll er viktigere enn fart», «Dere vil at KI skal ta faglige beslutninger alene») er sidens sterkeste etiske anker. Formidler best som rolig tekst. | Lav |
| 8 | **Kurs & foredrag** | Foredragsbilde fra Arendalsuka + tre temaer | **Valgfri utvidet detaljvisning (Hovedgrep 2)** | Tema 3 (*Kvalitet, kontroll og agenter*) kan med fordel vise et lite, statisk diagram eller klikkbart eksempel på et kontrollpunkt for arrangører som lurer på hva deltakerne faktisk lærer. | **Middels** |
| 9 | **Om** («Fag, folk og teknologi») | To korte avsnitt + lenke til erfaring | **Behold tekst** | Statsviter- og HMS-bakgrunnen forklares best nøkternt i tekst. En video her vil virke selvsentrert og bryte den redaksjonelle roen. | Lav |
| 10 | **Erfaring og omtaler** | Sitat fra kode24, presse- og detaljliste | **Behold tekst og sitat** | Dokumenterte kilder (Fagbladet, NRK, etc.) bærer all nødvendig troverdighet i seg selv. | Lav |
| 11 | **Kontakt** | Hjelpespørsmål + «Vis e-postadresse» og LinkedIn | **Behold enkel tekstflate** | Hjelpespørsmålene senker terskelen. Skjema eller video frarådes i tråd med CSP og enkel drift. | Lav |

---

## 3. De to anbefalte visuelle grepene

### Hovedgrep 1: Interaktiv Arbeidsbenk (koblet til Stegbåndet)
- **Plassering:** Rett under eller integrert i Stegbåndet 01–04 i `#arbeidsbenken`.
- **Hva besøkende ser:**
  - *Før interaksjon (standard):* Viser et allment råutgangspunkt (stikkord/notater) og en knapp for å se hvordan KI og fagperson samhandler.
  - *Under interaksjon:* Brukeren kan klikke gjennom stegene:
    1. **Kilder / rådata inn:** Ustrukturerte notater fra en travel hverdag.
    2. **KI-utkast (sekunder etter):** Maskinen grovsorterer, lager tabell eller utkast – men legger inn en typisk for skråsikker antakelse.
    3. **Faglig kontrollpunkt:** Fagpersonen griper inn, stryker/korrigerer feilantakelsen og sikrer kvaliteten.
  - *Etter interaksjon:* Brukeren ser det ferdige, kvalitetssikrede resultatet.
- **Teknisk format:** Ren HTML/CSS med minimal JS (eller ren CSS tab/details-løsning), 0 bytes videofiler, fullt tilgjengelig med tastatur og synlig tekst dersom JS er avslått.
- **Estimat:** ~15–20 kB kode/ressurser, null løpende vedlikehold, null videohosting.

### Hovedgrep 2: Eksempel-triptyk under Kurs & foredrag (Tema: Kvalitet og kontroll)
- **Plassering:** Som en sammenleggbar eller integrert illustrasjon under kurstemaet *«Kvalitet, kontroll og agenter»*.
- **Hva besøkende ser:** En ren, grafisk triptyk (tre sammenhengende ruter med 1px hårstrek) som viser formelen kurset lærer bort: `Avgrens oppgaven` ➔ `Bruk KI til førsteutkast` ➔ `Etabler ufravikelige kontrollpunkter`.
- **Teknisk format:** Ren HTML/CSS med Newsreader/monospace-typografi i tråd med `DESIGN.md`.

---

## 4. Manus og storyboards for de tre allmenne eksemplene

De tre eksemplene krever ingen forkunnskaper, nevner ingen bestemte bransjer, og appellerer like sterkt til tillitsvalgte, håndverkere, ledere og saksbehandlere:

### Eksempel A: Møtenotater → Oppfølging (Grovsortering vs. enighet)
1. **Rådata inn:**
   > *«Drøfting hybridkontor 14. mai. Kari: vil ha fleksibilitet for pendlerne. Per: må sikre bemanning i ekspedisjonen tirsdager. Forslag om 3 dager oppmøte ble luftet mot slutten. Neste møte: 28. mai.»*
2. **KI-utkast:**
   > Status: 3 aksjonspunkter opprettet.  
   > *Sammendrag:* «Møtet vedtok å innføre tre faste oppmøtedager i uken fra høsten.» *(Feilaktig antakelse: forvekslet et diskusjonsinnspill med et formelt vedtak).*
3. **Faglig kontrollpunkt (Menneskelig korreksjon):**
   > *Fagpersonen retter:* «Stopp. Forslaget om 3 dager var et uforpliktende innspill, ikke et vedtak. Rett til: 'Uavklart spørsmål; tas opp som drøftingssak 28. mai.' Godkjent for utsendelse.»

---

### Eksempel B: Notater fra befaring/oppdrag → Tilbud (Lokalkunnskap redder bunnlinjen)
1. **Rådata inn:**
   > *«Befaring bakgård. Skifte 3 store vinduer i 2. etasje. Kunde vil ha aluminiumsbelagt tre. Trang bakgård, stillas trengs. Ønsker pris før helgen.»*
2. **KI-utkast:**
   > Generert tilbudsbrev med ryddige poster, HMS-forutsetninger for stillas, og standard timeestimat: *Montering 16 timer*.
3. **Faglig kontrollpunkt (Menneskelig korreksjon):**
   > *Fagpersonen retter:* «Porten inn til bakgården er bare 80 cm bred – stillas og heis må bæres inn for hånd. Øk montasje til 22 timer og legg inn 4 ukers leveringstid på aluminiumskledning. Nå er tilbudet trygt å sende.»

---

### Eksempel C: Spredte rutinedokumenter → Veileder (Personvern og lovverk)
1. **Rådata inn:**
   > Utdrag fra fire eldre retningslinjer, tre notater om sykefraværsoppfølging og gjeldende kontaktliste for bedriftshelsetjeneste.
2. **KI-utkast:**
   > Strukturert utkast til en 2-siders sjekkliste for oppfølging.  
   > *Feilaktig forslag:* KI foreslår å opprette en åpen fellesmappe for deling av helseattester for å spare tid.
3. **Faglig kontrollpunkt (Menneskelig korreksjon):**
   > *Fagpersonen retter:* «Ulovlig forslag. Helseopplysninger kan aldri ligge i åpne mapper. Erstatt punktet med henvisning til lukket fagsystem og taushetsplikt. Lagre veileder.»

---

## 5. Konklusjon og neste steg
- **Anbefaling for sak #12:** Gå videre med **Hovedgrep 1 (Interaktiv Arbeidsbenk-prototype)** bygget på de tre allmenne eksemplene A, B og C.
- **Neste trygge steg (Oppgave 02 i `.scratch/`):** Bygg den selvstendige HTML-prototypen i `prototypes/arbeidsbenk-visuell-2026.html` etter `DESIGN.md`-tokens, uten å endre produksjonsfilene.

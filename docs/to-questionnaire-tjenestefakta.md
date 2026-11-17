# Spørreskjema: Fakta om tjenestene før de skrives på nettsiden

**Formål:** Brukerrådet 17.11.2026 (`docs/brukerrad-2026-11-17.md`) fant tre ting som stopper
besøkende: pris mangler, de vet ikke hvem som står bak, og de vet ikke hva de får. Dette kan ikke
løses med design. Svarene her avgjør hva som kan publiseres i `#arbeidsbenken`, `#kurs-og-foredrag`
og `#kontakt`, og hva som må stå uten (`ISSUES.md` N-6).
**Fra:** Claude (agent i larserik-nettside)
**Til:** Lars Erik Brekne Johnsen
**Estimert tidsbruk:** 10–15 minutter. Stikkord holder. «Vet ikke ennå» og «ikke publiser» er gyldige svar.

## Kontekst

Panelet er simulert (KI-personer, ikke ekte brukere), men de samme tre manglene kom opp både 28.10
og 17.11. Alle seks nevnte pris og kontakt. Fem av seks savnet varighet, format og et konkret
eksempel. Ingenting av dette skal gjettes, så siden står slik den er til du har svart.

Tjenestene på siden i dag:

- **01 Sparring:** «Vi avgrenser en konkret oppgave og undersøker hvor KI kan være nyttig.»
- **02 En liten prototype:** «Vi prøver en avgrenset løsning før dere vurderer om det er verdt å gå videre.»
- **03 Agenter i arbeidsflyten:** «Avgrenset hjelp til å samle kilder, sortere informasjon og lage utkast.»
- **Kurs og foredrag:** tre temaer, ingen lengde eller format.

## Svar fra Lars 17.11.2026

Lars svarte i chatten ved å klikke på alternativer. Det han skrev selv, står i anførselstegn.

| # | Spørsmål | Svar | Konsekvens for siden |
|---|---|---|---|
| 1 | Sparring | 2–3 møter over tid | «Et kort forløp med 2–3 møter.» |
| 2 | Prototype | 1–2 uker, testversjon | «På 1–2 uker får dere en testversjon og et kort notat om hva som virket.» |
| 3 | Agenter | Løpende hjelp | Beskrives som samarbeid over tid med jevnlig oppfølging. |
| 4 | Foredrag | Foredrag 30–60 min | Én linje i `#kurs-og-foredrag`. Workshop og kurs er ikke valgt. |
| 5 | Etter e-post | Svar innen 2 arbeidsdager, uforpliktende første samtale | Linje under e-postknappen. |
| 6 | Pris | «Pris avtales» | «Pris avtales etter første samtale.» Ingen tall. |
| 7 | Pris per sektor | Ikke spurt (falt bort med svar 6) | Ingenting. |
| 8 | Firmaform | Enkeltpersonforetak, kan publiseres | Bunntekst og JSON-LD. |
| 9 | Org.nr. | «du finner det på org sider» | Funnet i Enhetsregisteret, se under. **Lars må bekrefte at det er riktig foretak.** |
| 10 | Arbeidsgiver | Avklart | Tjenestene kan beskrives som de er. |
| 11 | Flere kontaktveier | Nei, e-post holder | Ingen endring. CSP endres ikke. |
| 12 | Eksempel | «jeg jobber for snekkere og håndverkere, i tillegg er jeg innleid konsulent for Lister Nyskaping, og jobber med bedrifter nå» | Ingen godkjent kundecase. Målgruppen (håndverksbedrifter) kan nevnes. **Lister Nyskaping nevnes ikke før Lars sier ja til det.** |
| 13 | Personvern | Ikke ennå | Ingenting. N-6 står åpen på dette punktet. |

**Treff i Enhetsregisteret** (data.brreg.no, søk på «Brekne Johnsen», 17.11.2026):
BREKNE JOHNSEN, org.nr. 936 978 010, enkeltpersonforetak i Kristiansand, registrert 26.01.2026,
næringskode «Annen undervisning ellers». Registeret oppgir ikke innehaver i dette oppslaget,
så det er ikke bekreftet at foretaket er Lars sitt.

## Del A: Format og varighet (brukerråd-forslag 4)

### 1. Hvordan foregår en sparring, og hvor lenge varer den?
*Hvorfor dette betyr noe i praksis: Gir én setning under «Sparring», for eksempel «Ett møte på
1–2 timer, digitalt eller fysisk». Uten svar står beskrivelsen som i dag.*

> [Svarfelt]

### 2. Hva er en «liten prototype» hos deg: omtrent hvor lang tid, og hva får kunden levert?
*Hvorfor dette betyr noe i praksis: Panelet spurte hva man sitter igjen med. Svaret avgjør om
vi kan skrive for eksempel «2–3 uker, du får en fungerende testversjon og et notat».*

> [Svarfelt]

### 3. Hva innebærer «Agenter i arbeidsflyten» i praksis: engangsoppsett, opplæring eller løpende hjelp?
*Hvorfor dette betyr noe i praksis: Avgjør om tjenesten beskrives som et prosjekt med slutt
eller som et samarbeid over tid.*

> [Svarfelt]

### 4. Hvor lange er foredragene og kursene dine, og hvilke formater tilbyr du (foredrag, workshop, halvdag)?
*Hvorfor dette betyr noe i praksis: Gir en linje i `#kurs-og-foredrag`, for eksempel
«Foredrag 30–60 min, workshop halv dag».*

> [Svarfelt]

### 5. Hva skjer etter at noen har sendt deg en e-post? (svartid, første samtale, kostnad for den)
*Hvorfor dette betyr noe i praksis: Gjør det tryggere å ta kontakt. Svaret kan stå rett under
e-postknappen, for eksempel «Jeg svarer innen to arbeidsdager. Første samtale er uforpliktende.»*

> [Svarfelt]

## Del B: Pris

### 6. Vil du vise pris på siden?
*Hvorfor dette betyr noe i praksis: Alle seks i panelet savnet pris. Velg én.*

- [ ] Ja, faste priser per tjeneste
- [ ] Ja, «fra»-pris eller prisspenn
- [ ] Bare prismodell (for eksempel timepris eller fastpris per oppdrag), uten tall
- [ ] Nei, skriv «pris avtales etter første samtale»
- [ ] Ikke bestemt ennå

> [Svarfelt: eventuelle tall eller formulering]

### 7. Er prisen forskjellig for offentlig sektor, organisasjoner og næringsliv?
*Hvorfor dette betyr noe i praksis: Avgjør om pris kan vises som én linje eller må forklares.
Merk: siden skal ikke selge deg inn mot offentlig sektor.*

> [Svarfelt]

## Del C: Hvem står bak

### 8. Hvilket firma eller hvilken rolle fakturerer du fra (enkeltpersonforetak, AS, eller ikke etablert)?
*Hvorfor dette betyr noe i praksis: Panelet savnet firmanavn og org.nr. Svaret avgjør om dette kan
stå i bunnteksten og i JSON-LD.*

> [Svarfelt]

### 9. Kan organisasjonsnummer og firmanavn publiseres?
*Hvorfor dette betyr noe i praksis: Org.nr. er offentlig, men det knytter siden til et konkret
foretak. Hvis det må avklares mot kommunestillingen først, lar vi det stå åpent.*

- [ ] Ja: ______________
- [ ] Ikke ennå (må avklares først)
- [ ] Nei

### 10. Er bijobben avklart med arbeidsgiveren, og er det noe siden ikke må love av den grunn?
*Hvorfor dette betyr noe i praksis: Avgjør om noen tjenester eller kunder må utelates. Ingenting
om arbeidsgiver publiseres. Dette er bare for at teksten ikke lover noe du ikke kan holde.*

> [Svarfelt]

### 11. Vil du vise flere kontaktveier enn e-post og LinkedIn (telefon, booking-lenke)?
*Hvorfor dette betyr noe i praksis: Telefon og booking senker terskelen, men en booking-tjeneste
kan kreve ny avhengighet og endring i CSP. Svaret avgjør om det er verdt det.*

- [ ] Telefon: ______________
- [ ] Booking-lenke (for eksempel Calendly)
- [ ] Nei, e-post og LinkedIn holder

## Del D: Eksempel og personvern

### 12. Har du ett gjennomført oppdrag som kan beskrives på siden, og har kunden godkjent det?
*Hvorfor dette betyr noe i praksis: Ett ekte eksempel gjør det tydeligere hva man får. Uten
skriftlig godkjenning skrives ingenting om kunder eller resultater.*

- [ ] Ja, med navn (godkjent)
- [ ] Ja, anonymisert (for eksempel «en fagforening i Agder»)
- [ ] Ikke ennå

> [Svarfelt: kort beskrivelse, hva som ble gjort, og hva kunden satt igjen med]

### 13. Hvordan håndterer du personopplysninger og kundedata i oppdrag (KI-tjenester du bruker, databehandleravtale)?
*Hvorfor dette betyr noe i praksis: Står åpent i N-6. Avgjør om siden kan si noe om datapraksis.
Uten svar sier den ingenting.*

> [Svarfelt]

## Annet vi burde vite?

Noe du vil at siden skal si, eller absolutt ikke si, om tjenestene?

> [Svarfelt]

---

**Når skjemaet er fylt ut:** lim svarene inn i chatten. Da skrives tekstene etter TDD, siden testes,
beslutningene føres i `docs/DECISIONS.md`, og N-6 i `ISSUES.md` oppdateres. Ingenting publiseres
før du godkjenner merge.

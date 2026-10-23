# Design-spec — ryddig Arbeidsbenk-forside

## Valgt retning for endringssak #9

Brukeren valgte 23. oktober 2026 **retning B – sterkere grafisk identitet** fra
`prototypes/design-retninger-2026.html` som utgangspunkt for videre arbeid med
PR #10. Dette er et valg av visuell retning, ikke godkjenning av prototypens
tekstpåstander, navigasjon eller produksjonskode. De konkrete valgene for
besøkshandling, innhold og kontaktvei er dokumentert nedenfor.
Brukeren valgte deretter at gridets hovedhandling skal være å **beskrive én
arbeidsoppgave og ta kontakt**. Kurs og foredrag skal ha en tydelig, mindre
inngang. Sterke påstander uten konkret belegg skal skrives om nøkternt.

### Byggbar delspesifikasjon for PR #10 (ready-for-agent)

**Problem:** Forsiden skal vise hva Lars kan hjelpe med og gjøre det lett å ta
kontakt om én konkret arbeidsoppgave. Kurs og foredrag skal fortsatt være
enkle å finne. Dagens PR-tekst gir flere udokumenterte løfter.

**Visuell løsning:** Bruk retning B som referanse for klarere rutenett,
redaksjonell venstrekolonne, presise skillelinjer og et rolig typografisk
hierarki. Behold den statiske arkitekturen, eksisterende profil- og
foredragsbilder, hovedseksjonene og navigasjonsmålene. Ikke kopier prototypens
tekster eller innfør booking, skjema, sporing eller eksterne avhengigheter.
`DESIGN.md` oppdateres før nye stiler innføres.

**Besøksflyt:** Første og tydeligste handling er å beskrive én arbeidsoppgave
og gå til kontaktseksjonen. Kurs og foredrag har en synlig, mindre inngang som
leder til den eksisterende seksjonen. Kontakt skjer via dagens e-postvisning
eller LinkedIn. Knappetekst skal ikke antyde en bookingfunksjon.

**Innholdsgrense:** Skriv om udokumenterte effektmål, prisutsagn og garantier
til konkrete, nøkterne beskrivelser. Navn på kunder, oppdrag og resultater
skal bare beholdes som offentlig påstand når kilden eller tidligere godkjenning
kan vises. Uavklarte navn tas ut av publikumsrettet tekst. Bruk KI i norsk
tekst og bevar prinsippet om faglig kontroll og menneskelig ansvar.

**Tilgjengelighet:** Hjemlenkens tilgjengelige navn skal inneholde det synlige
navnet «Lars Erik Brekne Johnsen» (UU-03). Mobilmeny, tastaturfokus,
redusert bevegelse og eksisterende lenker skal fortsatt fungere.

**Testgrense:** Automatiske tester kontrollerer bygg, offentlige filgrenser,
lenker/ankere, tilgjengelig navn og mobilbredde. Visuell vurdering gjøres
manuelt på 1440 px, 390 px og 360 px samt ved simulert 200 % zoom. Tester
som krever `localhost` kan bare godkjennes når de faktisk kan kjøre i miljøet.

**Ferdig når:**

1. PASS/FAIL: Retning B er synlig i produksjons-HTML/CSS uten horisontal
   scrolling på 390 og 360 px, og `DESIGN.md` beskriver samme løsning.
2. PASS/FAIL: Én arbeidsoppgave er primær kontaktvei; kurs/foredrag har en
   tydelig sekundær inngang; begge ankerlenker treffer riktig seksjon.
3. PASS/FAIL: Ingen nye udokumenterte effekt-, pris- eller leveransegarantier
   står i `index.html`, og hjemlenkens navn inneholder det synlige navnet.
4. PASS/FAIL: Faktisk bygg, lint og relevante kjørbare tester er rapportert
   med resultat og miljøbegrensninger; PR-en beskriver risiko og åpne valg.

Personlig nettside for **Lars Erik Brekne Johnsen**. Siden skal vise to sider av samme arbeid uten å virke som to forskjellige merkevarer:

1. Besøkende skal forstå én konkret, trygg arbeidsflyt med KI.
2. Besøkende skal raskt finne erfaring, faglig tyngde og dokumenterte lenker.

## Produksjonsstruktur

- `index.html` — innhold og semantisk sidestruktur
- `css/style.css` — Arbeidsbenken-designsystemet fra `DESIGN.md`
- `js/navigation.js` — aktiv seksjon, mobilmeny og skjult e-post

## Sidehistorie

1. **Header** — profilbilde, navn og fire navigasjonsmål: Arbeidsflyt, Om, Erfaring, Kontakt.
2. **Inngang** — «Mennesker først. Teknologi som virker.» Todelt hero med redaksjonell venstrekolonne, tydelig kontaktvalg og en mindre lenke direkte til kurs og foredrag, etterfulgt av to arbeidsspor: «Dette hjelper jeg med» (Sparring, MVP og agenter) og «Dette bygger det på» (HMS, HR og erfaring).
3. **Arbeidsbenken** — tre kjerneleveranser (Sparring & MVP, Agenter i arbeidsflyt, Videreutvikling & forbedring) og metodikken avklare → prøve → kontrollere → velge, med passer/passer ikke og CTA.
4. **Om og foredrag** — introduksjon med forankring i HMS, HR og kunnskapsarbeid, foredragsbilde og tre spissede foredrags- og kurstemaer.
5. **Erfaring og referanser** — prioriterte, kildebelagte eksempler på mørk flate; øvrig dokumentasjon i én detaljvisning. Direkte sitater og effektmål krever egen dokumentasjon.
6. **Kontakt** — en innbydende og friksjonsfri kontaktvei for sparring, MVP og foredrag.

Det skal ikke finnes egne, likeverdige seksjoner for media, tjenester, innsikt og foredrag. Innholdet er bevart, men samlet der det gir mest mening.

## Innhold og tone

- Norsk bokmål. Kort, ærlig og konkret.
- Bruk «KI», ikke «AI», med unntak for engelske titler.
- KI lager struktur og utkast; fagpersonen vurderer, godkjenner og har ansvar.
- Ikke bruk buzzord, garanterte resultater eller oppdiktede referanser.
- Dokumenterte lenker bevares selv om de flyttes til detaljvisning.

## Design og tilgjengelighet

- `DESIGN.md` er autoritativt for farger, typografi og komponenter.
- Newsreader brukes for hovedbudskap, navn og faglige overskrifter; systemfont for brødtekst og monospace for etiketter.
- Ingen skygger, gradienter, verktøyikoner, tretekstur eller startup-estetikk.
- Må fungere uten horisontal scrolling ved 360 px og ved simulert 200 % zoom.
- Alle interaktive elementer skal ha synlig tastaturfokus.
- Behold profilbildet og foredragsbildet når de gir tillit.

## Kvalitetsporter

1. Kjør `design.md lint DESIGN.md`.
2. Kjør hele testpakken med `npm test`.
3. Kontroller desktop og mobil visuelt.
4. Kontroller fokus, reduced motion og lenker.
5. Ikke commit, push eller deploy uten separat godkjenning.

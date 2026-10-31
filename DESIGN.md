---
version: alpha
name: Arbeidsbenken
description: "Redaksjonelt rutenett for breknejohnsen.no med tydelig kontaktvei og rolig typografisk hierarki."
colors:
  primary: "#1d211f"
  on-primary: "#ffffff"
  neutral: "#f3efe6"
  surface: "#fbfaf6"
  surface-dim: "#e9e3d8"
  on-surface: "#1d211f"
  on-surface-variant: "#555b57"
  outline: "#cfc7ba"
  accent: "#8a3f2b"
  on-accent: "#ffffff"
  accent-on-dark: "#dfa692"
  on-dark-muted: "#e7e3dc"
  dark-surface: "#2a302d"
  dark-outline: "#59605c"
  link: "#713322"
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 4.6rem
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: -0.03em
  display-md:
    fontFamily: Newsreader
    fontSize: 2.4rem
    fontWeight: 600
    lineHeight: 1.04
  headline-md:
    fontFamily: Newsreader
    fontSize: 1.55rem
    fontWeight: 600
    lineHeight: 1.12
  body-md:
    fontFamily: system-ui
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: system-ui
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: ui-monospace
    fontSize: 0.72rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.1em
  quote:
    fontFamily: Newsreader
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.35
spacing:
  xs: 0.45rem
  sm: 0.85rem
  md: 1.5rem
  lg: 3.5rem
  xl: 5.5rem
rounded:
  none: 0px
  image: 0.2rem
  full: 9999px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
  button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 0.8rem
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.none}"
    padding: 0.8rem
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 1.5rem
  card-muted:
    backgroundColor: "{colors.surface-dim}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.none}"
    padding: 1.5rem
  trust-panel:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark-muted}"
  dark-rule:
    backgroundColor: "{colors.dark-outline}"
    height: 1px
  proof-inset:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.accent-on-dark}"
  metadata:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label}"
  inline-link:
    textColor: "{colors.link}"
  rule:
    backgroundColor: "{colors.outline}"
    height: 1px
---

# Arbeidsbenken

Designsystem for [breknejohnsen.no](https://breknejohnsen.no/). Retningen bygger videre på «Mennesker først. Teknologi som virker.» og den eksisterende personlige profilen. Den endrer karakter og komposisjon, ikke hvem Lars er.

## Overview

**Et redaksjonelt arbeidsark.** Et gjennomgående rutenett, tynne skillelinjer og en smal venstre kolonne gir innholdet fast leseretning. Typografien er tydelig, mens flatene er rolige. Første handling leder besøkende til å beskrive én arbeidsoppgave og ta kontakt. Kurs og foredrag får en synlig, mindre inngang.

Siden viser to sider av samme arbeid uten å splitte identiteten:

1. Praktisk arbeidsflyt: konkret hjelp til å gjøre én oppgave lettere, med fagpersonen i kontroll.
2. Erfaring og foredrag: media, fagscener og bakgrunn som viser hvordan arbeidet er forankret.

Eksisterende innhold, lenker og «Mennesker først» er stabile, men skal samles i færre, mer lesbare deler. Visuelt hierarki, luft og komposisjon gjør forskjellen.

## Prototypeport før produksjonskode

Ved hver brukerbestilte kodeendring skal det først lages en tydelig merket, midlertidig prototype med `prototype`-skillen. For synlige endringer i innhold, layout, bilder eller interaksjon skal prototypen vises i visningsverktøyet på minst desktop (1440 px) og mobil (390 px), og brukeren velger retning før produksjonsfilene endres. For rene logikk- eller funksjonsendringer skal prototypen vise relevant tilstand og oppførsel. Prototypen slettes etter at beslutningen er tatt; beslutningen beholdes i ticket eller spesifikasjon.

## Colors

- **Primary (#1d211f):** Kullsort med grønn undertone. Brukes til hovedtekst, mørke troverdighetsflater og struktur.
- **Neutral (#f3efe6):** Varm papirbakgrunn.
- **Surface (#fbfaf6):** Lyst arbeidsark for kort og innholdsblokker.
- **Surface-dim (#e9e3d8):** Dempet papirflate for sekundære områder.
- **Accent (#8a3f2b):** Oksidrød. Brukes sparsomt til handlinger, nummerering og aktive markører.
- **Link (#713322):** Mørkere aksent som består kontrastkrav på lys bakgrunn.
- **Outline (#cfc7ba):** Tynn, presis rutenettlinje på lyse flater.

Ingen andre profilfarger. Ingen gradienter, skygger, tretekstur, varseltape eller kunstig «rust».

## Typography

Tre roller:

- **Newsreader:** Hovedbudskap, navn, seksjonstitler, sitater og faglige overskrifter. Stor hero gir et redaksjonelt tyngdepunkt.
- **Systemfont:** Brødtekst og handlingsknapper. Kort og direkte.
- **Ui-monospace/system monospace:** Kun små etiketter, nummerering og arbeidsmarkører.

Brødtekst skal normalt være minst 16 px med linjehøyde 1.6 eller mer. Maksimal lesebredde er 66 tegn.

## Layout

- **Container:** Maks 1180 px, sentrert. Innholdet deles av synlige horisontale linjer.
- **Hero:** Todelt rutenett på desktop: en smal, redaksjonell venstrekolonne med rolle, fagfelt og sted; en bred høyrekolonne for overskrift, kort forklaring og handlinger. Profilbildet beholdes i toppfeltet. Ingen egen profilkortflate i hero. På mobil kommer hovedbudskap og handlinger først; rolle, fagfelt og base vises kompakt etterpå. DOM-rekkefølgen følger mobilens leseretning.
- **Handlinger:** «Beskriv én arbeidsoppgave» er primær vei til kontakt. Kurs og foredrag er en sekundær vei til eksisterende seksjon. Primærknappen skal ha tydeligere farge og plassering.
- **Sidestruktur:** Fem deler etter headeren: inngang, Arbeidsbenken, om/foredrag med bilde, erfaring/referanser og kontakt. Ikke lag nye likeverdige seksjoner uten å fjerne eller samle noe annet.
- **Arbeidsbenken:** Leveranser og arbeidssteg ligger i presise matriser med 1 px skillelinjer, uten mellomrom som får feltene til å se ut som løsrevne kort. Leseretning for metodikken: avklare → prøve → kontrollere → velge. Etter arbeidsstegene kommer «passer når / passer ikke når» og én CTA.
- **Om og foredrag:** Kommer rett etter Arbeidsbenken. På desktop står introduksjonen og foredragsbildet side om side; på mobil kommer bildet før introduksjonen. Foredragsbildet bruker det stramme svart-hvitt-utsnittet fra Arendalsuka i 4:3-format i en rolig redaksjonell innramming.
- **Erfaring:** Fire synlige bevis på mørk flate etter om/foredrag. Dokumenterte lenker som ikke er primærbevis ligger i én `<details>`-liste.
- **To arbeidsspor:** To korte felt etter hero: «Gjør én arbeidsoppgave lettere» og «Kurs og foredrag». Praktisk hjelp får sterkere vekt. Kurs og foredrag peker direkte til `#kurs-og-foredrag`. Ingen merker som gjentar leveransene.
- **Mobil:** Alt stables. Hovedbudskap, første handling og målgruppevalg skal være synlig uten horisontal scrolling, også ved 200 % zoom.

Breakpoints: 980 px og 760 px. Ved 760 px eller mindre stables venstrekolonnen over hovedinnholdet, og matriser blir én kolonne. Sjekk 390 px, 360 px og 200 % zoom uten horisontal scrolling.

## Elevation & Depth

Flat design. Dybde skapes gjennom papirtoner, typografisk skala, hårstreker og mørke troverdighetsflater. `box-shadow`, gradienter og `drop-shadow()` er forbudt.

## Shapes

Skarpe hjørner er standard. Profilbildet kan være rundt i headeren. Innholdsbilder kan ha 0.2 rem avrunding; øvrige komponenter bruker 0 px.

## Components

### Knapper

Minstehøyde og minste klikkflate for menyknappen er 44 px. Menytekst er minst 14 px; vanlig innholdstekst er minst 16 px. Primærknappen er oksidrød med hvit tekst og blir kullsort ved hover. Sekundærknappen er lys med 1 px kullsort ramme. Ingen skalering eller skygge.

### Arbeidssteg

Fire trinn deler en sammenhengende matrise med 1 px linjer og omtrent 1.5 rem innvendig luft. De nummereres med monospace-etikett. Ikke bruk flere kortrekker for tjenester og innsikt ved siden av denne flyten.

### Arbeidsspor

To felt med samme konstruksjon og tydelig lenke. De skal vise praktisk hjelp og faglig bakgrunn i samme personlige profil, ikke to separate målgrupper eller merkevarer.

### Troverdighetsflate

Media, statsrådbesøk, utvalgte referanser og oppdrag samles på én mørk flate. Fire bevis er synlige; resten bor i `<details>`. Typografien og lenkene skal fortsatt være lesbare og nøkterne; ingen logo-vegg.

### Accordion

1 px linjer, monospace-etikett og Lucide pluss/minus. Standard HTML `<details>` beholdes med tastaturoppførsel uten JavaScript.

## Do's and Don'ts

- **Do** behold eksisterende innhold, lenker og «Mennesker først».
- **Do** bruk få rutenett, nummerering og synlige arbeidssteg.
- **Do** la praktisk arbeidsflyt og faglig bakgrunn ha hver sin tydelige inngang.
- **Do** bruk Newsreader som kontrast, ikke som eneste uttrykk.
- **Do** skriv «KI» i norsk tekst.
- **Don't** gjør Lars til en ren håndverkskonsulent.
- **Don't** bruk verktøyikoner, tretekstur, varseltape eller byggeplass-stockfoto.
- **Don't** bruk skygger, gradienter, pilleknapper eller startup-estetikk.
- **Don't** gjenta samme tjeneste, erfaring eller foredrag i flere seksjoner.
- **Don't** fjern dokumenterte referanser for å gjøre siden kortere; legg dem heller i detaljvisning.
- **Don't** bruk buzzord eller garanterte resultatpåstander.

## Ikoner og tilgjengelighet — 31. oktober 2026

Lucide er eneste ikonfamilie. Lokale inline-SVG-er bruker 24 × 24 viewBox,
2 px strek, avrundede linjeender og `currentColor`. Normal størrelse er 20 px.
Meny bruker menu/x, handlinger arrow-right, eksterne lenker external-link,
e-post mail og detaljer plus/minus. Dekorative SVG-er har `aria-hidden="true"`
og `focusable="false"`. Lisens beholdes i `icons/LICENSE.txt`.

Nummerering beholdes i arbeidsstegene. Ingen dekorative verktøy-/KI-ikoner.
Mørke flater bruker #dfa692 for lenker/fokus, #e7e3dc for dempet tekst,
#2a302d for innfelt flate og #59605c for skillelinjer.

Navigasjon er synlig uten JavaScript. Med JavaScript kan mobilmenyen åpnes
og lukkes; Escape returnerer fokus til menyknappen. Aktiv seksjon markeres
med `aria-current="location"`. Alle hovedankere tar høyde for sticky header.

## Profil og målgruppe

Kommunestillingen er bakgrunn og skal ikke dominere siden. Lars markedsføres
ikke mot offentlig sektor. Nåværende eller fremtidig arbeidsgiver står ikke i
presentasjonen eller strukturerte metadata. Dokumentert kommunal erfaring kan
beholdes som historisk referanse. Dette følger Lars sin presisering 31. oktober.

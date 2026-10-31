---
version: alpha
name: Arbeidsbenken
description: "Redaksjonelt rutenett for breknejohnsen.no med tydelig kontaktvei og rolig typografisk hierarki."
colors:
  primary: "#111111"
  on-primary: "#ffffff"
  neutral: "#ffffff"
  surface: "#ffffff"
  surface-dim: "#f2f2f2"
  on-surface: "#111111"
  on-surface-variant: "#555555"
  outline: "#d9d9d9"
  accent: "#111111"
  on-accent: "#ffffff"
  accent-on-dark: "#ffffff"
  on-dark-muted: "#d4d4d4"
  dark-surface: "#1f1f1f"
  dark-outline: "#6b6b6b"
  link: "#111111"
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

Svart-hvitt-retning fra Figma ([desktop 3:149](https://www.figma.com/design/WTecHNclgVZX56cl6fsGDL?node-id=3-149), mobil 3:266), valgt av Lars 31. oktober 2026. Oksidrødt er fjernet helt.

- **Primary (#111111):** Nær svart. Hovedtekst, primærknapp, stegbånd og kontaktflate.
- **Neutral / Surface (#ffffff):** Hvit side og hvite innholdsflater.
- **Surface-dim (#f2f2f2):** Lys grå for avgrensede bånd, for eksempel «Omtalt hos» og foredrag.
- **On-surface-variant (#555555):** Dempet tekst. Består AA også på #f2f2f2.
- **Accent / Link (#111111):** Det finnes ingen egen aksentfarge. Handlinger skilles med vekt, understrek, fylt svart flate og pil.
- **Outline (#d9d9d9):** Tynn skillelinje på lyse flater.

Ingen andre farger. Fotografier vises i svart-hvitt. Ingen gradienter, skygger, tretekstur eller varseltape.

## Typography

Tre roller:

- **Newsreader:** Hovedbudskap, navn, seksjonstitler, sitater og faglige overskrifter. Stor hero gir et redaksjonelt tyngdepunkt.
- **Systemfont:** Brødtekst og handlingsknapper. Kort og direkte.
- **Ui-monospace/system monospace:** Kun små etiketter, nummerering og arbeidsmarkører.

Brødtekst skal normalt være minst 16 px med linjehøyde 1.6 eller mer. Maksimal lesebredde er 66 tegn.

## Layout

- **Container:** Maks 1180 px, sentrert. Innholdet deles av synlige horisontale linjer.
- **Header:** Bare navnet i Newsreader til venstre og fire menypunkter til høyre: Arbeid, Om, Foredrag og Kontakt. Ingen profilbilde i headeren. En tynn hårstrek skiller headeren fra innholdet.
- **Hero (Figma 4:50 / 4:143):** På desktop står hovedbudskapet til venstre og et stort rundt portrett (`images/profil-portrett-800.jpg`, maks 472 px) til høyre. Under portrettet står navn og «Kristiansand». Det er ingen rollekolonne og ingen stikort. På mobil kommer etikett, overskrift, ingress og handlinger først, og deretter portrettet. DOM-rekkefølgen følger mobilens leseretning.
- **Handlinger:** «Beskriv én arbeidsoppgave» er primær vei til kontakt (svart knapp, full bredde på mobil). «Kurs og foredrag» er en tekstlenke med pil til `#kurs-og-foredrag`.
- **Sidestruktur:** Etter headeren kommer inngang, «Omtalt hos», 01 Arbeidsbenken, 02 Kurs og foredrag, 03 Om, 04 Erfaring og omtaler og til slutt Kontakt. Seksjonene nummereres i etiketten («02 / Kurs & foredrag»). Menyen følger Figma (Arbeid, Om, Foredrag, Kontakt). `navigation.js` sorterer seksjonene etter plassering på siden, så aktiv markering stemmer selv om menyrekkefølgen avviker. Ikke lag nye likeverdige seksjoner uten å fjerne eller samle noe annet.
- **Arbeidsbenken (Figma 4:85):** Etiketten «01 / Dette hjelper jeg med». Overskrift og ingress står til venstre, og tre nummererte tjenestelinjer til høyre (Sparring, En liten prototype, Agenter i arbeidsflyten), skilt med hårstreker. Under kommer et svart bånd med bare nummer og navn: avklare → prøve → kontrollere → velge. Til slutt «passer når / passer ikke når». Prinsippet «KI lager struktur og utkast, fagpersonen vurderer og har ansvaret» står bare i ingressen. Flyten forklares bare i båndet, og oppfordringen til kontakt står i hero og i kontaktdelen. Ikke gjenta dem (designkritikk 31.10.2026).
- **Kurs og foredrag (Figma 4:108):** Lys grå flate over hele bredden. Foredragsbildet (svart-hvitt fra Arendalsuka, 4:3, uten ramme) står til venstre. Til høyre står etikett, overskrift, ingress, tre temaer med kort forklaring og tekstlenken «Ta kontakt om foredrag». På mobil kommer bildet først.
- **Om (Figma 4:121):** Ren tekst på hvit flate: etikett, overskriften «Jeg liker å gjøre kompliserte ting brukbare.», ett avsnitt og tekstlenken «Se erfaring og omtaler» til `#erfaring`.
- **Omtalt hos (Figma 4:78):** Lys grå stripe rett etter hero med navnene NRK, HR Norge, Tech Talks Agder og DigiViken, uten logoer. Hvert navn lenker til `#erfaring` og skal være dokumentert der.
- **Erfaring:** Lys seksjon med etiketten «04 / Erfaring og omtaler». Den har ett fremhevet, ordrett sitat (`<figure>` med `<blockquote cite>` og `<figcaption>`) og én samlet liste, «I media og på fagscener», med utgiver, tittel eller beskrivelse og type/dato. Ingen separat bevisliste og ingen andre sitatstiler. Leverandørblogger står bare i `<details>`. Kilder står i `docs/kilder-fagpresse.md`. Alle lenker i listen skal også finnes i `<details>`.
- **Mobil:** Alt stables. Hovedbudskap, første handling og målgruppevalg skal være synlig uten horisontal scrolling, også ved 200 % zoom.
- **Kontakt (Figma 4:130):** Svart flate over hele bredden, som går rett over i svart bunntekst. Den har etiketten «Kontakt», en stor overskrift, kort tekst med tre stikkord om hva en henvendelse om en arbeidsoppgave bør inneholde, en hvit «Vis e-postadresse»-knapp (full bredde på mobil) og begge LinkedIn-lenkene.

Breakpoints: 980 px og 760 px. Ved 760 px eller mindre kommer hovedbudskap og handlinger før den kompakte rollekolonnen, og matriser blir én kolonne. Sjekk 390 px, 360 px og 200 % zoom uten horisontal scrolling.

## Elevation & Depth

Flat design. Dybde skapes gjennom hvit og lys grå flate, typografisk skala, hårstreker og mørke troverdighetsflater. `box-shadow`, gradienter og `drop-shadow()` er forbudt.

## Shapes

Skarpe hjørner er standard. Portrettet i hero er rundt. Innholdsbilder kan ha 0.2 rem avrunding; øvrige komponenter bruker 0 px.

## Components

### Knapper

Minstehøyde og minste klikkflate for menyknappen er 44 px. Menypunktene har minst 44 px høy klikkflate også på desktop. Menytekst er minst 14 px, og etiketter (store bokstaver) er minst 12,8 px; vanlig innholdstekst er minst 16 px. Primærknappen er svart med hvit tekst. Ved hover blir den hvit med svart ramme. På mørk flate er primærknappen hvit med svart tekst. Sekundærknappen er lys med 1 px kullsort ramme. Ingen skalering eller skygge.

### Arbeidssteg

Fire trinn ligger på ett sammenhengende svart bånd med nummer i dempet grå og navn i Newsreader. Ingen forklaring under. På mobil stables de. Ikke bruk kortrekker for tjenester ved siden av denne flyten.

### Erfaring og omtaler

Media, statsrådbesøk og fagscener samles i én lys liste med hårstreker etter ett fremhevet sitat. Resten ligger i `<details>`. Typografien og lenkene skal være lesbare og nøkterne. Ingen logovegg.

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
Mørke flater bruker #ffffff for lenker og fokus, #d4d4d4 for dempet tekst,
#1f1f1f for innfelt flate og #6b6b6b for skillelinjer. Fokusringen er 3 px
heltrukken i tekstfargen med 4 px avstand, slik at den er synlig uten aksentfarge.

Navigasjon er synlig uten JavaScript. Med JavaScript kan mobilmenyen åpnes
og lukkes; Escape returnerer fokus til menyknappen. Aktiv seksjon markeres
med `aria-current="location"`. Alle hovedankere tar høyde for sticky header.

## Profil og målgruppe

Kommunestillingen er bakgrunn og skal ikke dominere siden. Lars markedsføres
ikke mot offentlig sektor. Nåværende eller fremtidig arbeidsgiver står ikke i
presentasjonen eller strukturerte metadata. Dokumentert kommunal erfaring kan
beholdes som historisk referanse. Dette følger Lars sin presisering 31. oktober.

---
version: alpha
name: Arbeidsbenken
description: "Robust, redaksjonelt designsystem for breknejohnsen.no – en moderne arbeidsbok uten håndverksklisjeer."
colors:
  primary: "#1d211f"
  on-primary: "#ffffff"
  neutral: "#f3efe6"
  surface: "#fbfaf6"
  surface-dim: "#e9e3d8"
  on-surface: "#1d211f"
  on-surface-variant: "#555b57"
  outline: "#b9b2a5"
  accent: "#8a3f2b"
  on-accent: "#ffffff"
  link: "#713322"
typography:
  display-lg:
    fontFamily: system-ui
    fontSize: 5.2rem
    fontWeight: 750
    lineHeight: 0.94
    letterSpacing: -0.045em
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
    fontSize: 0.95rem
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

**En moderne arbeidsbok.** Uttrykket er konkret, robust og presist, med synlige arbeidssteg og få, tydelige overleveringer mellom innhold. Det skal føles som et sted der arbeid blir sortert og forstått – ikke som en teknologiplattform, konsulentmal eller byggeplass.

Siden betjener to besøksbehov uten å splitte identiteten:

1. Håndverksbedrifter skal raskt kjenne igjen praktisk arbeidsflythjelp og faglig kontroll.
2. Referansesjekkere og større virksomheter skal raskt finne media, erfaring, foredrag og faglig bredde.

Eksisterende innhold, lenker og «Mennesker først» er stabile, men skal samles i færre, mer lesbare deler. Visuelt hierarki, luft og komposisjon gjør forskjellen.

## Colors

- **Primary (#1d211f):** Kullsort med grønn undertone. Brukes til hovedtekst, mørke troverdighetsflater og struktur.
- **Neutral (#f3efe6):** Varm papirbakgrunn.
- **Surface (#fbfaf6):** Lyst arbeidsark for kort og innholdsblokker.
- **Surface-dim (#e9e3d8):** Dempet papirflate for sekundære områder.
- **Accent (#8a3f2b):** Oksidrød. Brukes sparsomt til handlinger, nummerering og aktive markører.
- **Link (#713322):** Mørkere aksent som består kontrastkrav på lys bakgrunn.
- **Outline (#b9b2a5):** Tydelig, men rolig arbeidslinje.

Ingen andre profilfarger. Ingen gradienter, skygger, tretekstur, varseltape eller kunstig «rust».

## Typography

Tre roller:

- **Systemfont, tung:** Hovedbudskapet. Stor, direkte og mindre høytidelig enn en ren serif-hero.
- **Newsreader:** Navn, seksjonstitler, sitater og faglige overskrifter. Gir menneskelig og redaksjonell kontrast.
- **Ui-monospace/system monospace:** Kun små etiketter, nummerering og arbeidsmarkører.

Brødtekst skal normalt være minst 16 px med linjehøyde 1.6 eller mer. Maksimal lesebredde er 66 tegn.

## Layout

- **Container:** Maks 1180 px, sentrert.
- **Hero:** Bred arbeidsflate med stor overskrift, én primærhandling og separat handlingskolonne.
- **Sidestruktur:** Fire deler etter headeren: inngang, Arbeidsbenken, erfaring/referanser og om/foredrag/kontakt. Ikke lag nye likeverdige seksjoner uten å fjerne eller samle noe annet.
- **Arbeidsbenken:** Én leseretning: avklare → prøve → kontrollere → velge. Etter arbeidsstegene kommer «passer når / passer ikke når» og én CTA.
- **Erfaring:** Fire synlige bevis på mørk flate. Dokumenterte lenker som ikke er primærbevis ligger i én `<details>`-liste.
- **Målgruppeinngang:** To felt etter hero; håndverksbedrifter er den primære inngangen, større virksomheter peker mot erfaring og foredrag.
- **Mobil:** Alt stables. Hovedbudskap, første handling og målgruppevalg skal være synlig uten horisontal scrolling, også ved 200 % zoom.

Breakpoints: 980 px og 768 px.

## Elevation & Depth

Flat design. Dybde skapes gjennom papirtoner, typografisk skala, hårstreker og mørke troverdighetsflater. `box-shadow`, gradienter og `drop-shadow()` er forbudt.

## Shapes

Skarpe hjørner er standard. Profilbildet kan være rundt i headeren. Innholdsbilder kan ha 0.2 rem avrunding; øvrige komponenter bruker 0 px.

## Components

### Knapper

Minstehøyde 44 px. Primærknappen er oksidrød med hvit tekst og blir kullsort ved hover. Sekundærknappen er lys med 1 px kullsort ramme. Ingen skalering eller skygge.

### Arbeidssteg

Fire trinn har lys papirflate, 1 px ramme og 1.5 rem padding. De nummereres med monospace-etikett. Ikke bruk flere kortrekker for tjenester og innsikt ved siden av denne flyten.

### Målgruppefelt

To felt med samme konstruksjon og tydelig lenke. De skal vise to innganger til samme personlige profil, ikke to separate merkevarer.

### Troverdighetsflate

Media, statsrådbesøk, utvalgte referanser og oppdrag samles på én mørk flate. Fire bevis er synlige; resten bor i `<details>`. Typografien og lenkene skal fortsatt være lesbare og nøkterne; ingen logo-vegg.

### Accordion

1 px linjer, monospace-etikett og tydelig pluss/minus. Standard HTML `<details>` beholdes.

## Do's and Don'ts

- **Do** behold eksisterende innhold, lenker og «Mennesker først».
- **Do** bruk få rutenett, nummerering og synlige arbeidssteg.
- **Do** la håndverksbedrifter og større virksomheter finne hver sin tydelige inngang.
- **Do** bruk Newsreader som kontrast, ikke som eneste uttrykk.
- **Do** skriv «KI» i norsk tekst.
- **Don't** gjør Lars til en ren håndverkskonsulent.
- **Don't** bruk verktøyikoner, tretekstur, varseltape eller byggeplass-stockfoto.
- **Don't** bruk skygger, gradienter, pilleknapper eller startup-estetikk.
- **Don't** gjenta samme tjeneste, erfaring eller foredrag i flere seksjoner.
- **Don't** fjern dokumenterte referanser for å gjøre siden kortere; legg dem heller i detaljvisning.
- **Don't** bruk buzzord eller garanterte resultatpåstander.

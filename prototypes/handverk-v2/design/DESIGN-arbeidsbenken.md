---
version: alpha
name: Arbeidsbenken
description: "Robust og oppgavenær variant med verkstedbok, rutenett og arbeidssteg."
colors:
  primary: "#1d211f"
  on-primary: "#ffffff"
  neutral: "#f3efe6"
  surface: "#fbfaf6"
  muted: "#5d625e"
  outline: "#b9b2a5"
  accent: "#8a3f2b"
typography:
  display:
    fontFamily: system-ui
    fontSize: 4.8rem
    fontWeight: 750
    lineHeight: 0.94
    letterSpacing: -0.045em
  headline:
    fontFamily: Newsreader
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.05
  body:
    fontFamily: system-ui
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.58
  label:
    fontFamily: ui-monospace
    fontSize: 0.72rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.1em
rounded:
  none: 0px
spacing:
  xs: 0.45rem
  sm: 0.85rem
  md: 1.5rem
  lg: 3.5rem
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: 0.8rem
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: 1.25rem
  metadata:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  rule:
    backgroundColor: "{colors.outline}"
    height: 1px
---

## Overview

En moderne arbeidsbok: konkret, robust og presis. Siden skal føles laget for arbeid som flyttes mellom felt, kontor og kunde, uten å etterligne byggeplass eller verktøy.

## Colors

Varmt papir og kullsort gir ro. Oksidrød er eneste tydelige aksent og brukes sparsomt til handling og aktive markører.

## Typography

Kraftig systemfont bærer hovedbudskapet. Newsreader brukes som menneskelig kontrast i seksjonstitler. Monospace brukes kun til nummerering og metadata.

## Layout

Bred container, tydelig kolonneraster og nummererte arbeidssteg. Tettere enn dagens side, men med store pauser mellom hovedkapitlene.

## Elevation & Depth

Flat. Dybde skapes med linjer, papirtoner og overlappende rutenett, aldri skygger.

## Shapes

Skarpe hjørner og presise rammer. Portrett kan fortsatt være rundt i identitetsfeltet.

## Components

Arbeidssteg, referansestripe, tekstkort og tydelig primærknapp. Lenker er alltid understreket.

## Do's and Don'ts

Bruk arbeidsnotatets orden og sporbarhet. Ikke bruk verktøyikoner, tretekstur, varseltape eller rusteffekter.

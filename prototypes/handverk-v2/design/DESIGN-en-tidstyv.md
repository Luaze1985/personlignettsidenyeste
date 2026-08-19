---
version: alpha
name: En tidstyv
description: "Konsentrert og selvsikker variant med stor typografi og markerte informasjonsblokker."
colors:
  primary: "#101311"
  on-primary: "#ffffff"
  neutral: "#f5f4ee"
  surface: "#ffffff"
  muted: "#555d58"
  outline: "#adb3ae"
  accent: "#315c46"
typography:
  display:
    fontFamily: system-ui
    fontSize: 5.8rem
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: -0.055em
  headline:
    fontFamily: system-ui
    fontSize: 2.2rem
    fontWeight: 750
    lineHeight: 1
  body:
    fontFamily: system-ui
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: system-ui
    fontSize: 0.74rem
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: 0.08em
rounded:
  none: 0px
spacing:
  xs: 0.5rem
  sm: 0.9rem
  md: 1.75rem
  lg: 4rem
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: 0.9rem
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: 1.5rem
  metadata:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  rule:
    backgroundColor: "{colors.outline}"
    height: 1px
---

## Overview

Konsentrert, tydelig og moderne. Uttrykket prioriterer én tanke om gangen, men beholder hele Lars-profilen og alle troverdighetsbevisene.

## Colors

Nesten sort og kremhvit gir høy kontrast. Dempet grønn signaliserer fremdrift uten å ligne en programvarestartup.

## Typography

Stor, tung systemtypografi gir fremstående karakter. Kortere linjer og få typografiske nivåer skaper direkte lesning.

## Layout

Store blokker, veksling mellom full bredde og smale tekstfelt, og en markert todeling mellom tilbud og dokumentasjon.

## Elevation & Depth

Flat. Kontrastflater og harde seksjonsskifter erstatter skygger og effekter.

## Shapes

Skarpe hjørner og store rektangulære flater. Ingen piller eller dekorative former.

## Components

Stor hero, én fremhevet tjenesteblokk, kompakt referanseindeks, tydelige lenker og kraftig kontaktblokk.

## Do's and Don'ts

Bruk størrelse og kontrast med disiplin. Ikke reduser innholdet til én startpakke eller skjul den brede profilen.

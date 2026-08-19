---
version: alpha
name: Fagpersonen
description: "Redaksjonell og personlig variant med portrett, serif og mye luft."
colors:
  primary: "#18202a"
  on-primary: "#ffffff"
  neutral: "#f8f6f1"
  surface: "#ffffff"
  muted: "#59616a"
  outline: "#c9c8c2"
  accent: "#49657a"
typography:
  display:
    fontFamily: Newsreader
    fontSize: 5.5rem
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: -0.045em
  headline:
    fontFamily: Newsreader
    fontSize: 2.35rem
    fontWeight: 600
    lineHeight: 1.02
  body:
    fontFamily: system-ui
    fontSize: 1.02rem
    fontWeight: 400
    lineHeight: 1.68
  label:
    fontFamily: system-ui
    fontSize: 0.72rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.11em
rounded:
  none: 0px
  portrait: 9999px
spacing:
  xs: 0.5rem
  sm: 1rem
  md: 2rem
  lg: 5rem
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: 0.85rem
  portrait:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.portrait}"
    width: 14rem
  metadata:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  accent-rule:
    backgroundColor: "{colors.accent}"
    height: 2px
  rule:
    backgroundColor: "{colors.outline}"
    height: 1px
---

## Overview

En personlig faglig publikasjon. Lars, ståstedet og dømmekraften er den fremstående karakteren, mens tjenestene og referansene organiseres som redaksjonelle kapitler.

## Colors

Varm hvit, dyp blåsort og dempet stålblå. Paletten skal oppleves trygg og menneskelig, ikke teknologisk.

## Typography

Newsreader dominerer overskrifter, sitater og navnet. Systemfont gir rolig og lesbar brødtekst.

## Layout

Smalere tekstmål, asymmetrisk portrettintro og store vertikale pauser. Referanser behandles som redaksjonell dokumentasjon, ikke logo-vegg.

## Elevation & Depth

Ingen skygger. Foto, typografisk skala og blankrom gir dybde.

## Shapes

Rundt profilportrett; øvrige elementer har skarpe hjørner og åpne kanter.

## Components

Manifest, portrettintro, sitat, kapittelrekker, referanseliste og diskret handling.

## Do's and Don'ts

La mennesket og fagligheten være tydeligst. Ikke gjør siden til et magasin med dekorative elementer uten funksjon.

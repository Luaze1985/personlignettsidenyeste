# Design-spec og handoff – larserik-nettside

Personlig nettside for **Lars Erik Brekne Johnsen** – KI-rådgiver, foredragsholder og coach.
Denne filen beskriver koden, designet og hvordan du jobber videre – bl.a. med Google Stitch.

---

## 1. Hva koden er

- **Struktur:** `index.html` (HTML), `css/style.css` (CSS) og `js/navigation.js` (JavaScript for navigasjon).
- **Profilbilde:** `images/Profil.jpg`.
- **Foredragsbilde:** `images/foredrag-vartagder-snitt-bw.jpg`, et ekte gråtoneutsnitt plassert mellom Tilnærming og Foredrag.
- **Lettvekt og portabelt:** Kan hostes hvor som helst (GitHub Pages, Netlify, Cloudflare Pages) uten behov for Node-byggesystem i produksjon.
- **JavaScript:** ~15 linjer i `js/navigation.js` for å markere aktiv seksjon (IntersectionObserver) og animere reveal-elementer. Pluss et lite inline-skript i `<head>` for fade-in og CSS-deteksjon.

---

## 2. Designsystem

**Farger**
| Rolle | Verdi |
|-------|-------|
| Bakgrunn | `#ffffff` |
| Tekst | `#1a1a1a` |
| Dempet tekst | `#555555` |
| Aksent (dempet blå-grå) | `#5a6b7c` |
| Hairline / rammer | `#e2e2e2` |

**Typografi**
- **Display/navn:** selv-hostet **Newsreader** (rolig editorial serif, OFL-lisens), `fonts/*.woff2`. Kun til navn, seksjonstitler og sitat. Systemfont-stack som fallback i `font-family`.
- **Brødtekst:** systemfont-stack (`-apple-system, Segoe UI, Roboto, …`). 16px, vekt 400, linjehøyde 1.6, maks 66 tegn bred.
- Overskrifter: `h2` er små, uppercase, aksentfarget, med tynn underlinje (systemfont – bevisst kontrast til serif-navnet).

**Prinsipper**
- Minimalistisk, «arkitektens skisseblokk». Mye luft.
- Tynne 1px-linjer. INGEN skygger, INGEN gradienter, INGEN «tech-startup»-preg. Bevegelse er tillatt som **subtil fade-in ved scroll** – men kun som forsterkning (innhold synlig uten JS) og alltid med respekt for `prefers-reduced-motion`.
- Bokser: tynn ramme, ingen bakgrunnsfarge.
- Responsivt: stablede bokser på mobil.

**Komponenter**
- Sticky header (profilbilde + navn + meny). Statisk på mobil.
- Inngangslinje med to knapper ([Se tjenester] [Ta kontakt]).
- Klikkbare tjeneste-kort (rutenett).
- Sammenleggbare bolker (`<details>`) i Innsikt og én i Tilnærming.
- Lenker med ekstern-markør (↗).
- **Troverdighets-stripe** (tekstnavn) høyt på siden – media/scener dekket i innholdet.
- **Profilbilde** i «Om meg».
- **NRK-glyfer** (inline SVG, gråtone) på TV- og radio-boksene – kun der.

**Løft håndverket – doktrine (2026)**

*Behold sjelen (hardt – aldri bryt):* kun gråtone + `#5a6b7c`; ingen skygger/gradienter; hårstrek-linjer; mye luft; rolig; aldri «tech-startup»/mal-preg; norsk bokmål; «KI» ikke «AI».

*Tillat løftet (kun dette):* én selv-hostet overskriftsfont (Newsreader); subtil fade-in ved scroll (reduced-motion- og no-JS-trygg); gråtonede NRK-glyfer; sitat-blokk; tekst-troverdighetsstripe.

Alt annet «imponerende» avvises med mindre det passer *begge* listene.

---

## 3. Sidestruktur (seksjoner)

1. **Header** – profilbilde, navn, undertittel, meny (sticky)
2. **Inngangslinje** – kort verdiløfte + to CTA-knapper
3. **Media** (`#media`) – NRK TV/radio, møte med Karianne Tung og utvalgt omtale
4. **Tjenester** (`#tjenester`) – tre kompakte tilbud
5. **Innsikt** (`#innsikt`) – tre korte perspektiver med utvalgte lenker
6. **Om meg** (`#om`) – to korte avsnitt og profilbilde
7. **Tilnærming** (`#tilnaerming`) – tre korte prinsipper
8. **Foredragsbilde** – gråtonebilde fra Vårtagder før foredragstemaene
9. **Foredrag** (`#foredrag`) – tre hovedtemaer og sammenleggbar liste med utvalgte eksempler og omtale
10. **Kontakt** (`#kontakt`) – e-post og LinkedIn, uten telefonnummer

---

## 4. Tone i tekst
- Norsk bokmål. Kort, ærlig, «rett på hva som gir verdi».
- Bruk «KI» ikke «AI» (unntatt engelske titler).
- Aldri buzzwords: «banebrytende», «revolusjonerende», «sømløs», «helhetlig løsning» osv.

---

## 5. Jobbe videre med Google Stitch

Google Stitch (stitch.withgoogle.com) lager UI-design fra **tekst-prompt** eller **bilde** – ikke fra rå HTML. Du bruker den til å utforske nye layouter/varianter, og eksporterer så til Figma eller kode.

**Slik gjør du:**
1. Ta et skjermbilde av dagens side (eller bruk en Claude Code lager til deg).
2. Gå til Stitch → nytt prosjekt → last opp skjermbildet som referanse, ELLER lim inn prompten under.
3. Iterer i Stitch. Eksporter til kode/Figma når du er fornøyd.
4. Ta det tilbake hit: lim inn Stitch-outputen i en Claude Code-sesjon på dette repoet, så fletter jeg det inn i `index.html` og beholder innhold/lenker.

**Ferdig prompt å lime inn i Google Stitch:**

> Lag en minimalistisk, rolig personlig nettside for en norsk KI-rådgiver og foredragsholder.
> Stil: nesten nakent, sort-hvitt med én dempet blå-grå aksent (#5a6b7c). Tynne 1px hairline-rammer, ingen skygger, ingen gradienter, ingen animasjoner, ingen ikoner fra ikon-bibliotek. «Arkitektens skisseblokk», ikke tech-startup. Systemfont, liten skriftstørrelse, mye luft.
> Struktur (én lang side): sticky header med lite rundt profilbilde til venstre + navn + horisontal meny; kort verdiløfte-linje med to tynne knapper; «Media» med NRK TV/radio øverst og omtale av møte med Karianne Tung; «Tjenester» som tre kompakte tilbud; «Innsikt» med tre korte perspektiver; «Om meg» med portrett; «Tilnærming» med tre prinsipper; et ekte gråtonebilde fra foredrag før «Foredrag»; «Foredrag» med tre hovedtemaer og sammenleggbare utvalgte lenker; «Kontakt» nederst med e-post og LinkedIn.
> Responsivt: bokser stables på mobil. Norsk bokmål. Rolig, ærlig tone – ingen salgsfraser.

---

## 6. Jobbe videre uten Stitch (anbefalt for innhold)

I en Claude Code-sesjon på dette repoet finnes ferdige kommandoer (se `CLAUDE.md`):
`/media`, `/foredrag`, `/kronikk`, `/profil`, `/referanse`, `/innlegg`, `/legg-til`.
De søker web, verifiserer fakta og oppdaterer riktig seksjon.

**Foredragsbilde:** `images/foredrag-vartagder-snitt-bw.jpg` er et ekte, gråtonebehandlet bilde med utsnitt av Lars under foredrag. Det ligger visuelt mellom Tilnærming og Foredrag.

---

## 7. Repo og hosting
- **Repo:** github.com/Luaze1985/larserik-nettside
- **Arbeidsbranch:** `claude/build-lars-website-gPnRO`
- **Hosting:** `netlify.toml` finnes (statisk, ingen build). Netlify dekker hele behovet: gratis, koblet til repoet, auto-deploy ved push, og lar deg legge til flere sider senere. Ikke bygg dette om på nytt uten grunn. (Endelig hosting-oppsett bekreftes av Lars.)

---

## 8. Fremtid / roadmap (ikke nå)

Bygges **ikke** nå – dokumentert her så enkeltside-arkitekturen ikke maler oss inn i et hjørne. Prioritet nummer én er lavt vedlikehold: å endre lenker/info skal ta sekunder.

| Fremtid | Hvordan (når det blir aktuelt) |
|---------|-------------------------------|
| **Kalender** – vis kommende foredrag (evt. booking/ledige datoer senere) | Egen enkel side, arver designsystemet |
| **Ressurs-/undervisningsside** – materiell andre kan bruke som referanse | Egen side, samme stil |
| **Opplasting av materiell** | Vurder CMS/Netlify-funksjon *først når behovet er reelt* |

Prinsipp: nye features legges som **egne, enkle sider med arvet designsystem** (`:root`-variablene løftes til delt `style.css` den dagen side nr. 2 finnes) – ikke som et rammeverk vi drar inn nå.

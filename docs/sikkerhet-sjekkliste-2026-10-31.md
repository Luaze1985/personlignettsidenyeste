# Sikkerhetssjekkliste: larserik-nettside

*31.10.2026. Grunnlag: `C:\Users\larse\Documents\verktoy\sikkerhet` (kunnskapsgrunnlag `bok_2026_07`, sikkerhetsmotor v0.3). Kontrollert på grenen `design/finpuss-og-oppdatert-innhold-2026` (HEAD `07a4394`).*

## Hvordan listen er laget

1. **Prosjekttype A** («Enkel nettside uten brukerkontoer eller database», `project-types.json`). Typen krever kapittel 1, 3, 6 og 9, og har to egne spørsmål.
2. Fra kapittel 15, «Prosjektsjekkliste før lansering», er punktene som gjelder en statisk side tatt med.
3. Sikkerhetsmotoren er kjørt med `validate` mot repoet. Den leste bare metadata og kjørte ingen skript.

**Status:**
- ✅ = oppfylt, med belegg.
- ⚠️ = svakhet eller åpent punkt.
- ➖ = gjelder ikke (ingen innlogging, database eller skjemaer).

## Type A: obligatoriske kapitler

### Kap. 1 og 6: Hemmeligheter i koden
| # | Punkt | Status | Belegg |
| :-- | :-- | :-- | :-- |
| 1 | Søk etter key, secret, password og token | ✅ | `git grep` fant ordet bare som «design tokens» i `AGENTS.md`, `design-*.html` og `docs/plan-…`. Ingen nøkler. |
| 2 | API-nøkler direkte i kodefil | ✅ | Siden bruker ingen API-er og har ingen nøkler. |
| 3 | Samme nøkler siden testing | ➖ | Ingen nøkler. |
| 4 | Ingen nøkler på GitHub, i dag eller i tidligere versjoner | ✅ | Mønstersøk i alle 76 commits (`sk-`, `AKIA`, `ghp_`, `github_pat_`, `xox*-`, `AIza`, private nøkler, `nfp_`) ga 0 treff. Ingen `.env` er sporet, og `.gitignore` dekker `.env`. |
| 5 | Fjernet nøkkel er også byttet hos tjenesten | ➖ | Ingen nøkler er fjernet. |

### Kap. 3: Slopsquatting (pakker)
| # | Punkt | Status | Belegg |
| :-- | :-- | :-- | :-- |
| 1 | Liste over alle pakker | ✅ | Bare tre utviklingspakker: `@playwright/test`, `@axe-core/playwright` og `@google/design.md`. Ingen runtime-pakker i `dist`. |
| 2 | Hver pakke finnes på npmjs.com | ✅ | `npm view` bekrefter alle tre (1.61.1, 4.14.0, 0.4.0). |
| 3 | Reelle brukere og vedlikehold | ✅ | 4, 5 og 3 vedlikeholdere. Playwright og axe-core er store, etablerte prosjekter. `@google/design.md` er ung (0.x). |
| 4 | `npm audit` | ⚠️ | **2 høye** sårbarheter: `zod` via `@google/design.md` (minnebruk ved store samlinger). Bare utviklingsverktøy, ikke publisert. Samme som DEV-01 i `ISSUES.md`. |

### Kap. 9: Manglende grunnbeskyttelse
| # | Punkt | Status | Belegg |
| :-- | :-- | :-- | :-- |
| 1 | Forsøksgrense på innlogging | ➖ | Ingen innlogging. |
| 2 | CSP, X-Frame-Options, X-Content-Type-Options | ✅ | `netlify.toml` for `/*`: streng CSP (`script-src 'self'` + én sha256-hash, `form-action 'none'`, `object-src 'none'`, `frame-ancestors 'none'`), `X-Frame-Options: DENY`, `nosniff`, `strict-origin-when-cross-origin`, `Permissions-Policy` og HSTS med preload. Dekket av `tests/header-validator.spec.js`. |
| 3 | CSRF på skjemaer | ➖ | Ingen skjemaer i `dist` (0 `<form>`). |
| 4 | Tofaktor for brukere | ➖ | Ingen brukere. **Se kap. 15 om 2FA på Netlify og GitHub.** |
| 5 | Varsling ved unormale innloggingsforsøk | ➖ | Ingen innlogging. |

### Egne spørsmål for type A
| Spørsmål | Status | Belegg |
| :-- | :-- | :-- |
| Sender et kontaktskjema noe til en tredjepart, og valideres det på serveren? | ➖ | Ingen skjema. Kontakt går via e-postlenke og LinkedIn. |
| Laster siden skript fra en ekstern kilde? | ✅ | Ingen eksterne `script`, `link`, `img` eller `iframe` (den eneste http-lenken i `<head>` er `rel="canonical"`). CSP tillater bare `'self'`. Ingen inline-handlere, `javascript:`, `innerHTML` eller `eval`. |

## Kap. 15: Før lansering (punkter som gjelder)
| Punkt | Status | Merknad |
| :-- | :-- | :-- |
| Bedt KI-en eksplisitt om sikker kode | ✅ | Prosjektregler i `CLAUDE.md` og `AGENTS.md`, sikkerhetstester skrevet først. |
| Andre enn deg har sett gjennom koden | ⚠️ | Bare KI-gjennomgang (Claude-agent). **Ingen uavhengig menneskelig gjennomgang er dokumentert.** Motoren gir REVIEW på dette (SEC-013). |
| Pakker bekreftet på npm | ✅ | Se kap. 3. |
| Nøkler i koden, i dag eller tidligere | ✅ | Se kap. 6. |
| Brukertekst escaped / ikke `innerHTML` | ✅ | Ingen brukertekst. JS bruker `createElement` og `textContent`. |
| Sikkerhetsheadere | ✅ | Se kap. 9. |
| Avhengigheter festet til eksakte versjoner | ⚠️ | `package.json` bruker `^`-områder for alle tre. `package-lock.json` låser i praksis, men oppgraderinger kan gli inn ved `npm install`. Gjelder bare utviklingsverktøy. |

## Funn fra sikkerhetsmotoren (`validate`, beslutning REVIEW)

| Regel | Funn | Vurdering |
| :-- | :-- | :-- |
| SEC-013 | Ingen uavhengig menneskelig gjennomgang dokumentert | Riktig. Bør gjøres før merge til `main`. |
| SEC-014 | Månedlig oppdatering av kunnskapsgrunnlaget er ikke dokumentert siste 45 dager | Gjelder sikkerhetsmappen, ikke nettsiden. |
| GATE-CODE-VERSION | Ingen commit-SHA bundet til vurderingen | Formalitet. Denne listen gjelder `07a4394`. |
| GATE-SCANNER-COVERAGE | Ingen ekstern skanner (avhengigheter/secrets) | Riktig. Mønstersøket over er manuelt, ikke et dedikert verktøy. |

Motoren klassifiserte siden som type «B, A». **B er feil:** siden har ingen brukerkontoer, og det ble oppgitt eksplisitt (`hasUserAccounts: false`). Det ser ut som en svakhet i motorens klassifisering.

## Svakheter og anbefalte tiltak

| Alvor | Funn | Tiltak |
| :-- | :-- | :-- |
| Middels | Ingen menneskelig gjennomgang før lansering | Be én person se gjennom PR #10 før merge. |
| Middels | Ingen ekstern skanner | Kjør for eksempel `gitleaks` (secrets) og `npm audit` i CI. «Neste trygge steg» i sikkerhetsmappen anbefaler én Trivy-adapter. |
| Lav | `zod` (høy) via `@google/design.md` | Bare utviklingsverktøy. Oppdater når `design.md` får ny versjon, eller vurder `overrides` for `zod`. |
| Lav | E-postadressen står i klartekst i JSON-LD | Skjulingen bak knappen hjelper lite mot innsamling. Dette er et kjent og bevisst valg (kommentar i `navigation.js`). Fjern `email` fra JSON-LD hvis spam blir et problem. |
| Lav | `^`-versjoner i `package.json` | Vurder eksakte versjoner, eller `npm ci` i alle løp, slik at låsefilen styrer. |
| Info | Tofaktor på kontoene som kan endre siden (GitHub, Netlify, domene/DNS) | Ikke kontrollert. Bekreft at 2FA er på. Dette er den reelle angrepsflaten for en statisk side. |

## Hva som ikke er kontrollert
- Faktiske headere fra produksjonsdomenet. Kontrollert er bare `netlify.toml` og en lokal testserver.
- 2FA og tilganger på GitHub, Netlify og domeneregistrar.
- Ekstern skanner (Trivy/gitleaks). Ikke installert eller kjørt.

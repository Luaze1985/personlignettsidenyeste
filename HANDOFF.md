# Handoff / status – larserik-nettside

Sist oppdatert: 2026-07-04

## Kort status
Nettsiden er redesignet («Løft håndverket») og er **LIVE** på https://larserik.netlify.app.
Domenet `breknejohnsen.no` er lagt til på Netlify-siten. **Gjenstår kun DNS hos Domeneshop.**

## Det ENE som gjenstår (enkelt)
Fortell domenet at det skal peke på Netlify:
1. Logg inn på **domene.shop** → `breknejohnsen.no` → **Manage DNS**.
2. Endre to rader:
   - `@`  → `75.2.60.5`  (type **A**)
   - `www` → `larserik.netlify.app`  (type **CNAME**)
3. **Lagre.** Ikke rør rader merket **MX** / e-post.

Etterpå kommer siden opp på https://breknejohnsen.no, og Netlify lager SSL automatisk (minutter–timer).
Verifiser med: slår `breknejohnsen.no` opp på `75.2.60.5` og laster `https://breknejohnsen.no`?

## ⚠️ VIKTIG før neste deploy
`netlify.toml` fikk nylig en streng CSP (`default-src 'self'`). Den **blokkerer inline CSS og JS** i `index.html` → siden blir ustylet/ødelagt ved neste publisering.
- Live nå er OK (ble deployet FØR CSP-en kom inn).
- Før neste `netlify deploy`: enten legg til `'unsafe-inline'` for `script-src`/`style-src`, bruk hash/nonce, eller flytt CSS/JS ut i egne filer.

## Nøkkelfakta
- Netlify-site: `larserik` (larserik.netlify.app), site-id `1fdc5c75-4698-4e5c-9f93-37c392133afb`, team `luaze1985` («Role play»).
- Netlify: `custom_domain = breknejohnsen.no`, alias `www.breknejohnsen.no` (satt via API).
- Deploy: manuell CLI (`netlify deploy --site <id> --prod`). Mappa er IKKE et git-repo lokalt ennå.
- Registrar: **Domeneshop AS** (WHMCS-portal, support-pin 71082044). Navnetjenere: `*.groupdnsservice.com`.
- Domenet peker nå på parkerings-IP `151.249.121.9` (skal bli `75.2.60.5`).
- Backlog/roadmap: se `ISSUES.md`. Designdoktrine: `SPEC.md` §2b.

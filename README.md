# larserik-nettside

Personlig nettside for **Lars Erik Brekne Johnsen** – KI-rådgiver, foredragsholder og coach.

## Hva dette er

Én statisk HTML-fil (`index.html`) med inline CSS og litt JavaScript. Ingen byggverktøy, ingen avhengigheter. Åpnes direkte i nettleser eller hostes hvor som helst.

## Filer

| Fil | Innhold |
|-----|---------|
| `index.html` | Hele nettsiden (innhold + stil) |
| `images/Profil.jpg` | Profilbilde |
| `images/foredrag-vartagder-snitt-bw.jpg` | Gråtonebilde fra foredrag, plassert før Foredrag-seksjonen |
| `CLAUDE.md` | Prosjektkontekst + slash-kommandoer for Claude Code |
| `SPEC.md` | Designspec og handoff (inkl. Google Stitch-prompt) |
| `HANDOFF.md` | Kortversjon |
| `netlify.toml` | Hosting-konfig (statisk, ingen build) |

## Kjøre lokalt

Åpne `index.html` i en nettleser. Det er alt.

## Publisering

Koblet til Netlify: hver push til produksjonsbranchen oppdaterer siden automatisk.
Se `SPEC.md` for detaljer.

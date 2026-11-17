# Brukerråd 17.11.2026: PR #13 mot forrige kjøring

Merking: **[F]** = fakta, kontrollert. **[S]** = simulert panel, altså hypoteser og ikke målinger. **[V]** = min vurdering.

## Metode [F]

- Verktøy: [Luaze1985/brukerrad](https://github.com/Luaze1985/brukerrad), den ekte koden (`runReview`).
- Side: forhåndsvisningen av PR #13, `https://deploy-preview-13--larserik.netlify.app/`.
- Oppgave: «Finn ut hva tjenesten er, hva den koster, og hvordan du tar kontakt». Samme som 28.10.
- Panel: de samme seks fiktive personene (`config/personas-breknejohnsen.yaml`), 2 runder.
- 17 skjermbilder (6 PC, 11 mobil). 69 sitater og 20 skjermhenvisninger er sjekket, ingen ble ikke funnet.
- Som 28.10 ble hvert modellkall besvart av en subagent i Claude Code, ikke av Claude API. API-kostnad: 0.
- Sammenligningen er mot kjøringen 28.10 av breknejohnsen.no, før PR #11.

## Tall, før → etter [S]

| | 28.10 | 17.11 |
|---|---|---|
| Ville fortsatt («ja») | 0 | 1 |
| Usikker / nei | 5 / 1 | 4 / 1 |
| Snitt sentiment runde 1 | -0,13 | -0,07 |
| Ga opp (feltet fylt ut) | 6 | 6 |

Endringene er små og kan være tilfeldige. Ingen kjørte samme panel to ganger for å måle variasjon.

## Det som fortsatt stopper folk [S]

1. **Pris mangler** (6 av 6, som sist). Ingen fra-pris, prisspenn eller prismodell.
2. **Kontakten er tungvint** (6 av 6). E-posten skjules bak «Vis e-postadresse», og det finnes ingen telefon,
   booking, firmanavn eller org.nr.
3. **Uklart hvem det passer for og hva man får** (5 av 6). De savner varighet, format, hva man sitter igjen
   med og ett konkret eksempel.

Punkt 1–3 er de samme som 28.10. De er åpne punkter i `ISSUES.md` N-6 (pris, leverandør/org.nr.,
rolleavklaring, resultat-eksempel) og krever fakta fra Lars. Ingen av dem kan løses med design alene. [V]

## Nytt i denne runden [S]

- **Grønt, gult og rødt gir tillit** (6 av 6). Det er sidens eneste fargeinnslag og fanger blikket.
  Én syntes skriften inni er liten. Dette erstatter firestegsbåndet, som 5 likte 28.10.
- **«Beskriv én arbeidsoppgave» ser ut som et skjema** (5 av 6), men blar bare ned til kontakt.
- **Podkast og medieliste er for lange** (6 av 6) og skyver kontakt langt ned, særlig på mobil
  («tre fulle skjermer med lenker før kontakt»).
- **Grå brødtekst oppleves blek** (6 av 6), særlig på grå flate. [F] Axe-testen gir ingen kontrastbrudd,
  så dette gjelder opplevd lesbarhet og ikke WCAG AA.
- **Foredragsbildet fra Arendalsuka gir tillit** (4 av 6).
- **Kommunestillingen** er ikke lenger et tema. Den var oppe hos 5 av 6 den 28.10.

## Kontroll av visuelle funn [F]

- «Portrettet tar nesten en hel skjerm på mobil»: **overdrevet**. Portrettet fyller omtrent halve mobil 2,
  etter etikett, overskrift, ingress og begge handlingene. Det er likevel stort.
- «Hamburgermenyen er lite synlig» (2 av 6): ☰ har ramme og ligger øverst til høyre. Svakt funn.
- Resten stemmer med skjermbildene.

## Forslag i prioritert rekkefølge [V]

Uten nye fakta, kan gjøres i design:

1. Gjør knappen tydelig. Gi den en tekst som sier hva den gjør, for eksempel «Send meg en arbeidsoppgave».
   Eller vis e-postadressen direkte i kontaktdelen og la knappen kopiere den.
2. Kort ned podkast og medieliste: én linje per episode, og vis 3–4 omtaler med resten i `<details>`.
   Da kommer kontakt tidligere på mobil.
3. Gjør brødteksten mørkere (for eksempel `#555` → `#3d3d3d`) og skriften i sonekortet større.
4. Legg til én setning om format og varighet per tjeneste, for eksempel «Sparring: ett møte på 1–2 timer».
   Dette krever bare fakta som Lars allerede har.

Krever beslutning eller fakta fra Lars (N-6): pris eller prismodell, telefon og org.nr., og ett ekte
eksempel med godkjenning.

## Begrensninger [F]

- Alle personer er fiktive og laget av samme modellfamilie som svarte. Funnene er hypoteser.
- I runde 2 ble én svarfil rettet etter at den ble skrevet. Koden kan ha lest den første versjonen.
  Den er gyldig JSON.
- Ekte brukere er fortsatt ikke testet (`docs/issue9/brukerkontroll.md`).
- Rådata ligger lokalt i Brukerråd-klonen (`arkiv/deploy-preview-13--larserik.netlify.app/`) og er ikke
  committet i brukerrad-repoet.

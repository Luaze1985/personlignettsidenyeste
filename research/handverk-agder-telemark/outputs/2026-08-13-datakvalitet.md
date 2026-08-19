# Datakvalitet: bedriftsutvalg

**Kontrollert:** 13. august 2026  
**Grunnlag:** [PROSPEKTUTVALG.csv](../PROSPEKTUTVALG.csv) og Brønnøysundregistrenes åpne Enhetsregister.

## Resultat

| Kontroll | Resultat |
|---|---:|
| Datarader | 36 |
| Unike organisasjonsnumre | 36 av 36 |
| Organisasjonsnummer samsvarer med Brreg-respons | 36 av 36 |
| Aktive foretak uten registrert sletting eller konkurs | 36 av 36 |
| Registrert antall ansatte samsvarer | 36 av 36 |
| Størrelsesintervall | 5–28 ansatte |
| Agder, avledet fra kommunenummer 42xx | 19 |
| Telemark, avledet fra kommunenummer 40xx | 17 |
| Foretak utenfor de to fylkene | 0 |

Kontrollen ble kjørt direkte mot `brreg_url` for hver rad. Proff og virksomhetenes nettsteder er bare brukt til kryssjekk av fagområde og synlig virksomhet, ikke som registerfasit.

## Avgrensning

- Utvalget dokumenterer at virksomheten finnes, er aktiv, ligger i riktig region og har ønsket størrelse.
- Det dokumenterer ikke en faktisk tidstyv, kjøpsvilje, systembruk eller interesse for KI.
- Feltet `arbeidsflyt_hypotese` er derfor merket som hypotese og må prøves i samtale.
- Ansatte-tall og virksomhetsstatus kan endres. Registerkontrollen skal kjøres på nytt før senere prioritering eller kontakt.
- Filen inneholder ikke personnavn, private telefonnumre eller e-postadresser.

## Kildelenker i markedsanalysen

De 20 unike kildelenkene i [MARKEDSANALYSE.md](../MARKEDSANALYSE.md) ble kontrollert 13. august 2026:

- 19 svarte med HTTP 200;
- XL-BYGGs proffkurs-side svarte med HTTP 429 under kontrollen, altså ratebegrensning — ikke en bekreftet død lenke;
- ingen lenker svarte med 404.

Dette bekrefter at sidene var tilgjengelige ved kontroll, men er ikke en uavhengig bekreftelse av aktørenes egne effekt- eller produktpåstander.

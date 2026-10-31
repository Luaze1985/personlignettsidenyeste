# Kilder: fagpresse (kontrollert 31.10.2026)

Kontrollert med WebFetch. Verktøyet gir et sammendrag og ikke rå HTML, så hvert sitat **må** kontrolleres ordrett mot den rå siden før publisering. Det gjøres i bygget, med `curl` og `rg` mot artikkelteksten.

| Utgiver | Publikasjon / type | Tittel | Dato | Forfatter | Betalingsmur | Lars' rolle |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| Aller Media | kode24 (fagmedium for utviklere) | Slik løser de 40-årskrisen | 24.03.2026 | Heather Ørbeck Eliassen | Nei | Hovedperson, intervjuet |
| AIavisen AS | AIavisen (red. Adam Tzur) | Min KI-reise | oppdatert 13.04.2026 | Lars Erik Brekne Johnsen | Nei | Forfatter |
| Fædrelandsvennen | Debattinnlegg | Vi har fått KI-verktøykassen – vi må lære å bruke den sammen | 03.07.2025 | Rafoss, Sundbø, Brekne Johnsen | Nei | Medforfatter |
| Fagforbundet | Fagbladet (nett) | Lars Erik er KI-guru i kommunen. Dette vil han aldri bruke teknologien til | 22.09.2026 (oppdatert 24.09) | Ingeborg V. Rangul | Nei | Hovedperson, intervjuet |
| HR Norge (forening) | Fagartikkel, red. | Veien til digital effektivisering | 09.05.2025 | HR Norge red. | **Ja, krever medlemskap** | Omtalt, ingen sitater synlige |
| Lawai (selskap) | Bedriftsblogg | Halverte arbeidsuka med bruk av kunstig intelligens | 24.10.2025 | Sofie Øvrebø | Nei | Intervjuet |

## Sitatkandidater (Lars' egne ord)

- kode24: «Det viktigste er ikke å mestre – det er å tørre å prøve noe man ikke kan»
- kode24: «KI er en folkebevegelse, og den er åpen for alle»
- Lawai: «Det er når de som kan faget kommer inn, at vi virkelig får KI til å svinge.»
- Lawai: «Du må ikke prakke det på folk. De må oppleve mestringsfølelsen selv.»
- AIavisen (eget innlegg): «For dette verktøyet finner også på ting.»
- Fædrelandsvennen (medforfattet): «Festtaler har vi hatt nok av.» Debattinnlegget har tre forfattere, så det er ikke Lars' sitat alene.

- Fagbladet: «Vi må fortsatt lese, finne kilder og høre på folk.»
- Fagbladet: «KI kan gi raskere utkast, bedre struktur og mer oversikt.»

**Valgt sitat (Lars, 31.10.2026):** kode24: «KI er en folkebevegelse, og den er åpen for alle»

### Kontroll mot rå HTML (curl, 31.10.2026)

| Kilde | Tittel (og:title) | Publisert (JSON-LD) | Funn |
| :-- | :-- | :-- | :-- |
| kode24 | Slik løser de 40-årskrisen | 2026-03-24 | Sitatet står ordrett som første ledd av «– KI er en folkebevegelse, og den er åpen for alle – det finnes pensjonister som sitter og koder på kvelden, sier Johnsen.» Forfatter: Heather Ørbeck Eliassen. Ordet «Dagbladet» finnes ikke på siden, og «Aller Media» står bare i en skriptkommentar. Siden viser derfor bare «kode24». |
| Fagbladet | Lars Erik er KI-guru i kommunen. Dette vil han aldri bruke teknologien til | 2026-09-22 | Bunnteksten lenker til Fagforbundet. |
| AIavisen | Min KI-reise | 2026-04-13 | Ingen merknader. |
| Fædrelandsvennen | Vi har fått KI-verktøykassen – vi må lære å bruke den sammen | 2025-07-03 | `/i/` omdirigerer til `/o/`, lenken virker. |
| HR Norge | Veien til digital effektivisering | 2025-05-09 | Bak betalingsmur (medlemskap). Den synlige ingressen nevner Lars ved navn og sier at han deler erfaringer med hvordan KI kan tilpasses ulike jobbroller. Derfor står den som «Omtale». |

Lars bekreftet 31.10.2026 at «Dagbladet» var kode24-saken.

## Merknader

- Fagbladet ligger også under en annen URL og tittel: `fagbladet.no/nyheter/ki-kan-kutte-moter-men-ikke-erstatte-folk/752959` («Slik bruker Kristiansand kommune KI til færre møter og bedre samarbeid»). Det er samme artikkel-ID. Vi lenker til URL-en med «KI-guru», og testen må akseptere omdirigering.
- **Dagbladet:** Søket fant ingen artikkel. kode24 er Dagbladets fagmedium for utviklere (Aller Media), så «Dagbladet» kan bety kode24-saken. Lars bekrefter, eller sender lenken.

- Alle artiklene presenterer Lars som ansatt i Kristiansand kommune. På nettsiden vises bare tittel og utgiver, ikke rollen fra artikkelen. Kommunestillingen er bakgrunn, ikke fokus (CLAUDE.md).
- Lawai er en leverandørblogg, ikke fagpresse. Den ligger i detaljlisten, men vises ikke under «I fagpressen».
- Lawai staver navnet «Jonsen» i ingressen. Det er ikke vår feil, men vi lenker uten å gjenta skrivemåten.
- HR Norge er bak betalingsmur. Den vises med utgiver og tittel og får merket «krever medlemskap».

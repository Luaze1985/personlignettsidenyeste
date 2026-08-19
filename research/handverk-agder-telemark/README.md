# Markedsopplegg: håndverk i Agder og Telemark

Dette er den faste arbeidsmappen for å lære markedet før Lars endrer nettside, lager kampanje eller tar kontakt. Den er laget for små byggrelaterte håndverksbedrifter, vanligvis med 5–30 ansatte, i Agder og Telemark.

## Målet

Avdekke én konkret arbeidsoppgave der Lars kan hjelpe en bedrift med bedre flyt uten å selge et nytt fagsystem:

> Håndverket bestemmer. KI gjør forarbeidet.

Startpakken skal kartlegge én tidstyv, bygge én trygg KI-støttet arbeidsflyt og overlevere en enkel rutine. Pris avtales etter samtale.

## Det vi vet – og det som må testes

**Kildebelagt grunnlag:** Små byggbedrifter møter dokumentasjons-, HMS-, tilbuds-/anbuds- og kapasitetsutfordringer. Markedet har allerede mange fagsystemer for tilbud, prosjekt, timer, HMS og fakturering. Se [KILDER.md](KILDER.md).

**Arbeidshypotese:** Den beste inngangen er sannsynligvis én av disse overgangene: befaring til kundesammendrag, henvendelse til tilbud, eller dokumentasjon til overlevering.

**Må testes:** Hvilken overgang som faktisk stjeler tid, hvilke ord eierne bruker, og om de vil betale for startpakken. Det avgjøres gjennom fem korte samtaler før nettsidetekst eller betalt markedsføring låses.

## Slik kjører vi sprinten

1. Start de tre researchrollene i [AGENTBRIEFS.md](AGENTBRIEFS.md) parallelt.
2. La synteseagenten kvalitetssjekke, sammenligne og oppdatere markedsnotatet. Påstander uten lenke eller med uklar kilde skal ut.
3. Velg fem samtalekandidater fra [PROSPEKTUTVALG.csv](PROSPEKTUTVALG.csv). Bruk [INTERVJUGUIDE.md](INTERVJUGUIDE.md). Ingen agent tar kontakt eller sender noe.
4. Oppdater hypotesen etter samtalene. Minst tre av fem må kjenne igjen samme tidstyv og forstå tilbudet uten forklaring før vi endrer nettsiden.
5. Velg én første arena: Kristiansand Byggmesterforening, Byggmesterforbundet Telemark, Byggfag Opplæringskontoret Telemark eller en regional proffsamling hos byggevarehandel.
6. Først når budskapet har respons, vurderes egne innlegg, faglig case og deretter små, betalte tester.

## Beslutningsgrunnlaget

- [MARKEDSANALYSE.md](MARKEDSANALYSE.md) – konkurrenter, behov, markedsgap og prioriterte kanaler.
- [PROSPEKTUTVALG.csv](PROSPEKTUTVALG.csv) – kildebelagt virksomhetsutvalg, ikke en kontaktliste.
- [STARTPAKKE.md](STARTPAKKE.md) – avgrenset leveranse for én arbeidsflyt.
- [BUDSKAPSBANK.md](BUDSKAPSBANK.md) – posisjonering, overskrifter, CTA-er og testhypoteser.
- [SAMTALEPLAN.md](SAMTALEPLAN.md) og [INTERVJUGUIDE.md](INTERVJUGUIDE.md) – fem læringssamtaler og beslutningsport.

## Faste roller

| Rolle | Eier | Leveranse | Rytme etter sprint |
|---|---|---|---|
| Konkurransespeider | Tilbud og posisjonering | Konkurrentkart og pris-/løfteendringer | Månedlig |
| Kanalspeider | Arenaer og målgruppens språk | Prioritert kanalliste og nye arrangementer | Månedlig |
| Prospektspeider | Regionale virksomheter | Kvalifisert bedriftsutvalg, ikke personleads | Månedlig |
| Synteseagent | Kvalitet og beslutning | Én kort markedspuls med anbefalt neste test | Etter de tre andre |

## Regler som ikke kan brytes

- Bruk Brønnøysundregistrenes åpne Enhetsregister som grunndata. Proff og nettsteder brukes bare til manuell kontroll.
- Lagre organisasjonsnummer, kilde-URL og tidspunkt for hvert bedriftsfunn. Ikke lagre private kontaktopplysninger.
- Skill alltid mellom dokumentert fakta, agentens tolkning og en hypotese som må testes.
- Ikke kontakt bedrifter, publiser innhold, betal for annonser eller endre nettsiden uten at Lars ber om det i en egen oppgave.
- KI kan støtte tekst, struktur og oppsummeringer. Teknisk/faglig vurdering og godkjenning ligger alltid hos fagpersonen.

## Månedlig markedspuls

Kjør den lokale kommandoen `/handverk-puls` eller bruk prompten i [AGENTBRIEFS.md](AGENTBRIEFS.md). Leveransen skal bare inneholde nytt siden forrige runde:

- nye eller vesentlig endrede konkurrenttilbud;
- nye arrangementer og bransjearenaer;
- 5–10 nye eller oppdaterte bedriftskandidater;
- én anbefalt ting Lars bør teste eller lære den måneden.

Legg hver kjøring under [outputs](outputs/README.md) med dato i filnavnet.

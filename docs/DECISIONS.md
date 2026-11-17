# Beslutninger

Nyeste først. Eldre beslutninger står i `DESIGN.md`, `ISSUES.md` og `docs/issue9/README.md`.

## 17.11.2026

- **Farger i «Slik jobber jeg» beholdes.** Grønt, gult og rødt med svak gradient er
  det eneste fargeunntaket på siden. Dette erstatter kravet om 100 % svart-hvitt i
  `.scratch/nettside-forbedring-2026/spec.md` (15.11, kl. 09:36). Besluttet av Lars.
- **Stegbåndet og «Passer når / passer ikke når» forblir fjernet.** Lars endret ikke
  kodens tilstand fra 15.11 (spørsmålet gjaldt også disse; han svarte bare om Smakebit).
- **Smakebit skal inn i podkastblokken, men innholdet defineres av Lars senere.**
  Komponenten (kodetegnet lydbølge, sitat, tidskode, lenker) ligger som prototype i
  `prototypes/podkast-smakebit.html`. Den publiseres ikke før sitat, tidskode og
  lenker er bestemt, fordi offentlige plassholdere ikke er tillatt.
- **Ingen innebygd spiller.** Smakebiten bruker ingen lydfil eller iframe; CSP er uendret.

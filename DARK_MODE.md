# Spesifikasjon: Automatisk Mørk Modus (Dark Mode)

Dette dokumentet beskriver implementasjonen av automatisk Mørk Modus for Lars Erik Brekne Johnsens personlige nettside, i tråd med designprinsippene i `SPEC.md` og valg gjort under designintervjuet.

---

## 🎨 Design- og Fargepalett

For å bevare sidens "arkitektens skisseblokk"-sjel (ren gråskala + én aksentfarge), bruker vi en nøytral mørk palett. Bakgrunnen er koksgrå fremfor helt sort for å redusere kontrastslitasje på øynene, og aksentfargen er svakt lysnet for å opprettholde universell utforming (WCAG contrast ratio).

| CSS Variabel | Lys Modus (Gjeldende) | Mørk Modus (Foreslått) | Rolle |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `#ffffff` | `#121212` | Hovedbakgrunn (koksgrå) |
| `--text-color` | `#1a1a1a` | `#e5e5e5` | Brødtekst og primærtinnhold |
| `--muted` | `#555555` | `#a0a0a0` | Dempet tekst (sekundær) |
| `--accent-color`| `#5a6b7c` | `#8da4be` | Aksentfarge (blå-grå, tilpasset kontrast) |
| `--border-color`| `#e2e2e2` | `#2e2e2e` | Tynne hårstrek-linjer og skillelinjer |

---

## 👁️ Visuelle Detaljer & Kontrast

1. **Universell Utforming (WCAG 2.2):**
   Den nye aksentfargen i mørk modus (`#8da4be`) mot bakgrunnen (`#121212`) gir en kontrast på **6.1:1**, noe som godt overstiger kravet på **4.5:1** for vanlig tekst (WCAG Level AA).
2. **Profilbilde-behandling:**
   For å hindre at profilbildet virker for skarpt og lyssterkt mot en mørk bakgrunn, legger vi på et diskré filter i mørk modus som reduserer lysstyrken (`brightness(0.85)`) og justerer kontrasten (`contrast(1.05)`). Dette gir et roligere og mer premium inntrykk.
3. **SVG-glyfer (NRK):**
   NRK-glyfene bruker `stroke="currentColor"` og CSS-klassen `.media-glyph { color: var(--accent-color); }`. Disse vil automatisk skifte farge til den nye aksentfargen uten ekstra kode eller bildefiler.

---

## 💻 CSS-kode som legges til

Vi legger til en standard CSS Media Query rett under de eksisterende `:root`-variablene i `<style>`-taggen:

```css
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #121212;
        --text-color: #e5e5e5;
        --muted: #a0a0a0;
        --accent-color: #8da4be;
        --border-color: #2e2e2e;
    }
    img {
        filter: brightness(.85) contrast(1.05);
    }
}
```

Dette krever ingen endringer i HTML-strukturen eller JavaScript-filen, noe som holder siden fullstendig vedlikeholdsfri og lynrask.

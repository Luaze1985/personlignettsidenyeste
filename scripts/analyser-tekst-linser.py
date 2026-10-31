#!/usr/bin/env python3
"""
Tekst- og budskapsanalysator for larserik-nettside basert på Linser-teamet.
Kjører linsene:
  1. L1_fagarbeider (Praktisk nytte, jordnærhet)
  2. L2_leder (Offentlig sektor, referanser, etikk)
  3. L3_klarspraak (Kompakthet, aktivt språk)
  4. L4_skeptiker (Floskelfritt, sannhet, null buzzord)
"""

import sys
import re
from pathlib import Path
import html

try:
    import yaml
except ImportError:
    yaml = None

# Paths
WORKSPACE_ROOT = Path(__file__).resolve().parent.parent
HTML_FILE = WORKSPACE_ROOT / "index.html"
LENSES_YAML = Path(r"C:\Users\larse\Documents\Interne prosjekter\Linser\lenser\data\tekstlinser_nettside.yml")

FORBIDDEN_BUZZWORDS = [
    "banebrytende", "revolusjonerende", "cutting-edge", "game-changer",
    "sømløs", "helhetlig løsning", "ta kontroll over fremtiden",
    "transformér organisasjonen din", "disruptiv", "magisk", "garantert gevinst"
]

def extract_sections(html_content: str) -> dict:
    """Ekstraherer ren tekst fra de definerte seksjonene i index.html."""
    sections = {}
    
    # 1. Hero
    hero_match = re.search(r'<div id="top"[^>]*>(.*?)</div>\s*<div class="container audience-gate"', html_content, re.DOTALL)
    if hero_match:
        sections["Hero (#top)"] = clean_html(hero_match.group(1))

    # 2. Audience Gate
    gate_match = re.search(r'<div class="container audience-gate"[^>]*>(.*?)</div>\s*<section id="arbeidsbenken"', html_content, re.DOTALL)
    if gate_match:
        sections["Målgruppe-inngang (.audience-gate)"] = clean_html(gate_match.group(1))

    # 3. Arbeidsbenken
    bench_match = re.search(r'<section id="arbeidsbenken"[^>]*>(.*?)</section>', html_content, re.DOTALL)
    if bench_match:
        sections["Arbeidsbenken (#arbeidsbenken)"] = clean_html(bench_match.group(1))

    # 4. Erfaring
    exp_match = re.search(r'<section id="erfaring"[^>]*>(.*?)</section>', html_content, re.DOTALL)
    if exp_match:
        sections["Erfaring og referanser (#erfaring)"] = clean_html(exp_match.group(1))

    # 5. Om meg & Foredrag
    om_match = re.search(r'<section id="om"[^>]*>(.*?)</section>', html_content, re.DOTALL)
    if om_match:
        sections["Om og foredrag (#om)"] = clean_html(om_match.group(1))

    return sections

def clean_html(raw_html: str) -> str:
    """Fjerner HTML-tags og normaliserer mellomrom."""
    text = re.sub(r'<script.*?</script>', '', raw_html, flags=re.DOTALL)
    text = re.sub(r'<style.*?</style>', '', text, flags=re.DOTALL)
    text = re.sub(r'<br\s*/?>', '\n', text)
    text = re.sub(r'</?(h[1-6]|p|li|div|blockquote|figcaption|aside|section)[^>]*>', '\n', text)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = html.unescape(text)
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    return '\n'.join(lines)

def deterministic_scan(text: str) -> dict:
    """Rask sjekk av ordmengde, buzzord og setningslengder."""
    words = re.findall(r'\b\w+\b', text.lower())
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if s.strip()]
    
    buzzwords_found = [bw for bw in FORBIDDEN_BUZZWORDS if bw in text.lower()]
    ai_vs_ki = len(re.findall(r'\bAI\b', text)) # KI vs AI
    
    avg_sentence_len = len(words) / max(len(sentences), 1)
    
    return {
        "word_count": len(words),
        "sentence_count": len(sentences),
        "avg_sentence_len": round(avg_sentence_len, 1),
        "buzzwords_found": buzzwords_found,
        "ai_count": ai_vs_ki,
    }

def generate_lens_prompt(section_name: str, section_text: str) -> str:
    """Lager en ferdig prompt for LLM-linseevaluering."""
    return f"""
Du er en nøytral tekstanalyse-rigg som skal evaluere følgende tekstseksjon fra https://breknejohnsen.no/:

### SEKSJON: {section_name}
\"\"\"
{section_text}
\"\"\"

Evaluer teksten nådeløst gjennom disse 4 linsene:

1. **L1_fagarbeider (Fagarbeideren / Håndverkeren):**
   - Forstår målgruppen på 5 sekunder hva dette sparer dem for?
   - Snakker Lars som en klok kollega, fri for konsulenttåke?
   - Er det respekt for fagkunnskapen?

2. **L2_leder (Offentlig leder / Referansesjekkeren):**
   - Viser teksten trygghet, etikk og personvern?
   - Er referansene (NRK, Kristiansand kommune, DigiViken, NITO) solide og troverdige?

3. **L3_klarspraak (Klarspråk & Kompakt):**
   - Er teksten stram, kort og uten fyllord?
   - Er språket aktivt og direkte?

4. **L4_skeptiker (Skeptikeren / Floskelsjekk):**
   - Er teksten 100 % fri for 'sleezy' salgsord, hypede påstander og falske løfter?
   - Er det tydelig at KI er et verktøy, ikke magi?

FORMAT FOR HVER LINSE:
- **Score (0-100)** [Terskel: 80-85]
- **Status:** [BESTÅTT / TIL REVISJON]
- **Styrker:** (1-2 korte punkter)
- **Svakheter / Trekk:** (1-2 korte punkter hvis aktuelt)
- **Konkret forbedringsforslag:** (Kort tekstforslag ved behov)
"""

def main():
    if not HTML_FILE.exists():
        print(f"Feil: Fant ikke {HTML_FILE}")
        sys.exit(1)
        
    html_text = HTML_FILE.read_text(encoding="utf-8")
    sections = extract_sections(html_text)
    
    print("=" * 60)
    print("  LINSER FOR TEKSTANALYSE — LARSERIK-NETTSIDE")
    print("=" * 60)
    print(f"Linsedefinisjoner: {LENSES_YAML}")
    print(f"Analyserer index.html ({len(sections)} seksjoner funnet)\n")
    
    for name, content in sections.items():
        print(f"--- Seksjon: {name} ---")
        stats = deterministic_scan(content)
        print(f"Ord: {stats['word_count']} | Setninger: {stats['sentence_count']} | Snittlengde: {stats['avg_sentence_len']} ord/setning")
        if stats['buzzwords_found']:
            print(f"⚠️ ADVARSEL: Buzzord funnet: {stats['buzzwords_found']}")
        else:
            print("✓ Ingen forbudte buzzord funnet.")
        print("-" * 60)
        print("Utdrag av analysert tekst:")
        for line in content.split('\n')[:4]:
            print(f"  {line}")
        print("...\n")

if __name__ == "__main__":
    main()

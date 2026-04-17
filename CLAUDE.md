# CLAUDE.md – Zentrale Arbeitsanleitung

**Lies diese Datei zuerst.** Sie ersetzt jeden Onboarding-Dialog und hält den Token-Verbrauch klein.

---

## 1. Projekt in einem Satz
Jekyll-Portfolio auf GitHub Pages. Quelle der Wahrheit für Kacheln: `_data/projects.yml`. Kein Build-Schritt – Pages rendert direkt aus dem Branch.

## 2. Pfade
| Pfad | Zweck |
|---|---|
| `_data/projects.yml` | **Single source of truth** aller Projekt-Kacheln |
| `assets/images/projects/` | Icons/Screenshots (max 500 KB pro Datei) |
| `assets/media/audio/` | MP3s für Musik-Karten |
| `index.html` | Landing, rendert `site.data.projects` |
| `_layouts/` | Jekyll Templates |
| `README.md`, `ANLEITUNG.md`, `MEDIA-GUIDE.md`, `SCHNELLSTART.md` | Doku – **muss zu `projects.yml` konsistent sein** |

## 3. Schema `projects.yml`
```yaml
- name: "Titel"
  description: "Ein Satz, ~140 Zeichen"
  type: project|music|image|video|pdf|text
  image: "/My-table-of-contents-/assets/images/projects/<slug>-desktop.<ext>"
  image_mobile: "..."        # optional
  audio: "..."               # nur type=music
  url: "https://..."
  tags: ["..."]
  category: AI|Code|Tools|Music|Art|Education|Data|Business
  featured: true|false       # genau 9 featured = true
  size: small|medium|large
  open_source: true|false
```

## 4. Workflow-Regeln (strikt)

### Branch
Niemals direkt auf `main`. Immer auf dem von der Session vorgegebenen `claude/<topic>-<hash>`.

### Task-Ausführung
1. **Exakt** umsetzen, was verlangt wird – keine Bonus-Features, keine spontanen Refactors.
2. Alle **Abhängigkeiten** mitziehen:
   - Projekt **hinzufügen** → Bild nach `assets/images/projects/` + Eintrag in `projects.yml` + ggf. README-Liste
   - Projekt **entfernen** → Eintrag raus + Bilddateien mit `git rm` löschen
   - **Featured**-Wechsel → nur `featured:` toggeln, sonst nichts
   - **Bild tauschen** → altes `git rm`, neues rein, Pfad in `projects.yml` anpassen
3. **Konsistenz-Check vor jedem Commit** (Abschnitt 7).
4. Auffälligkeiten **nicht on-the-fly fixen** → Parkplatz (Abschnitt 6).

### Bilder
- Quelle: echtes Asset aus dem jeweiligen Projekt-Repo (`public/`, `assets/`, README) bevorzugt.
- Fallback: `https://opengraph.githubassets.com/1/beko2210/<repo>`.
- Format: SVG > PNG > JPG. Hard limit 500 KB – sonst komprimieren oder anderes Asset.
- Dateiname: `<slug>-desktop.<ext>`, optional `-mobile.<ext>`.

### Commits
- Deutsch, kurz, aktiv, max ~70 Zeichen Header.
- Body: was + warum, einzeilig oder Stichpunkte.
- **Keine** Claude-Signatur-Zeile (`https://claude.ai/code/...`) anhängen – Belkis' Stil ist sauber ohne.
- Ein Commit pro logischer Änderung.

### Push
`git push -u origin <branch>`. Kein Force-Push. Keine PR ohne explizite Aufforderung.

## 5. Aktueller Zustand (Cache)
- **109 Projekte** in `projects.yml`, davon **12 featured**.
- **Featured (Reihenfolge im File):** KI-Entdecker, World One 2.0, European Alternatives, GitHub App Store, API Directory, Firstbrain, PrepTrack, Survival Kit, Cricket Brain, Lyra Prompts, QuickBrief, MiroFish DE.
- **Non-Featured** umfasst den vollständigen Bestand aller öffentlichen BEKO2210-Repos (ohne private/archivierte). Bildquelle für massenhaft angelegte Repos: GitHub OpenGraph (`https://opengraph.githubassets.com/1/BEKO2210/<repo>`), extern geladen – nicht lokal abgelegt.
- **Hinweis:** Die frühere „genau 9 featured" Regel wurde auf Wunsch auf **12** angehoben. Konsistenz-Check in §7 entsprechend angepasst.

> Diesen Abschnitt nach jedem strukturellen Change (Projekt hinzu/raus, Featured-Wechsel) aktualisieren.

## 6. 🅿 Parkplatz (Backlog)

Hier kommt alles rein, was auffällt, aber nicht zur laufenden Aufgabe gehört.
Belkis triggert diese Liste **1× pro Woche** via Claude-Routine oder manuell.

**Eintragsformat:**
```
- [ ] YYYY-MM-DD · <kategorie> · <kurze Zeile>
      Detail: <was genau, falls nötig>
      Betrifft: <datei(en)/projekt(e)>
```
Kategorien: `bug` · `feature` · `maintenance` · `consistency` · `perf` · `docs`.

**Abarbeitungs-Regel:** Jeder Parkplatz-Task wird wie ein normaler User-Task behandelt (Abschnitt 4). Nach Erledigung: Haken setzen, Zeile in „Erledigt" verschieben mit Commit-Hash.

### Offen
<!-- Neueste oben. -->

### Erledigt
<!-- Format: - [x] Datum · Kat · Zeile (<commit-hash>) -->
- [x] 2026-04-17 · docs · README/ANLEITUNG/SCHNELLSTART auf Aktualität gebracht nach Projekt-Cleanup (`7bf20d4`)
- [x] 2026-04-17 · consistency · Stale Kommentare in `projects.yml` entfernt (`7bf20d4`)
- [x] 2026-04-17 · perf · KI-Entdecker-Bild von 1,6 MB auf 100 KB komprimiert (`7bf20d4`)

## 7. Konsistenz-Checkliste (vor jedem Commit/Push)
- [ ] YAML valide (keine Tab-Einrückung, Quotes konsistent)
- [ ] Jeder **lokale** `image:`-Pfad in `projects.yml` existiert auf Platte (externe `https://`-URLs sind erlaubt und werden nicht geprüft)
- [ ] Keine Waisen-Bilder in `assets/images/projects/` (ohne YAML-Referenz)
- [ ] Genau **12** Einträge mit `featured: true`
- [ ] README/ANLEITUNG/SCHNELLSTART noch stimmig
- [ ] Commit auf richtigem Branch, Message deutsch + aussagekräftig

Quick-Check aus dem Repo-Root:
```bash
# orphan-check
comm -23 <(ls assets/images/projects | sort) <(grep -oE '[a-z0-9.-]+\.(jpg|png|svg|gif|webp)' _data/projects.yml | sort -u)
# featured count (nur echte YAML-Einträge, nicht Schema-Kommentar)
grep -c '^  featured: true' _data/projects.yml   # Erwartung: 12
```

## 8. Commits & Historie
- Vollständiger Log: `git log --oneline --all`
- Pro Autor: `git shortlog -sn --all`
- Für eine Datei: `git log --follow -- <pfad>`

Keine Log-Auszüge in diese Datei kopieren – rottet.

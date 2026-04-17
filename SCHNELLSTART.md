# ⚡ SCHNELLSTART - In 3 Minuten online!

## 🎯 SCHRITT 1: GitHub Pages aktivieren

1. **Öffne:** https://github.com/BEKO2210/My-table-of-contents-
2. **Klicke:** Settings (oben rechts)
3. **Klicke:** Pages (links in der Sidebar)
4. **Wähle aus:**
   - Branch: `main`
   - Folder: `/ (root)`
5. **Klicke:** Save
6. **Warte:** 2-3 Minuten

## ✅ FERTIG!

Deine Seite ist jetzt live unter:
```
https://BEKO2210.github.io/My-table-of-contents-/
```

---

## 🚀 SCHRITT 2: Dein erstes Projekt hinzufügen

1. **Öffne:** https://github.com/BEKO2210/My-table-of-contents-/blob/main/_data/projects.yml
2. **Klicke:** Stift-Symbol (Edit)
3. **Füge hinzu** (am Ende der Datei):

```yaml
- name: "Mein cooles Projekt"
  description: "Was macht dein Projekt?"
  image: "https://via.placeholder.com/400x300/667eea/ffffff?text=Mein+Projekt"
  url: "https://github.com/BEKO2210"
  tags: ["Cool", "Neu", "2026"]
  featured: true
```

4. **Klicke:** "Commit changes" (grüner Button unten)
5. **Warte:** 1-2 Minuten
6. **Aktualisiere** deine Portfolio-Seite → Projekt ist da! 🎉

---

## 📸 Eigene Bilder verwenden

### Variante A: Externe URL
```yaml
image: "https://beispiel.com/mein-bild.jpg"
```

### Variante B: Bild hochladen
1. Gehe zu: `assets/images/`
2. Klicke: "Add file" → "Upload files"
3. Lade dein Bild hoch (z.B. `mein-projekt.jpg`)
4. In `projects.yml` nutze:
```yaml
image: "/My-table-of-contents-/assets/images/mein-projekt.jpg"
```

### Variante C: Placeholder (am einfachsten)
```yaml
image: "https://via.placeholder.com/400x300/667eea/ffffff?text=Projekt+Name"
```

---

## 🎨 Anpassungen

### Deinen Namen ändern

**Datei:** `_config.yml`

```yaml
title: "Belkis Aslani - Portfolio"
description: "Deine Beschreibung hier"
author: "Belkis Aslani"
```

### Farben ändern

**Datei:** `assets/css/style.css` (Zeile 8)

```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--accent-purple: #667eea;
```

Andere Farben ausprobieren:
- Rot/Pink: `#f5576c`
- Blau: `#4facfe`
- Grün: `#43e97b`
- Orange: `#fa709a`

---

## ❓ PROBLEME?

**Seite zeigt 404?**
→ Warte 3 Minuten und aktualisiere

**Branch nicht gefunden?**
→ Nutze genau: `main`

**Änderungen nicht sichtbar?**
→ Warte 1-2 Minuten nach dem Commit

**Repository privat?**
→ Settings → General → Make public

---

## 📱 TIPP: Am Handy bearbeiten!

Du kannst alles direkt auf GitHub bearbeiten - auch am Handy!

1. Öffne die Datei auf GitHub
2. Klicke auf die 3 Punkte (...)
3. "Edit file"
4. Ändere den Text
5. "Commit changes"

**Kein Editor nötig!** 🎉

---

Das war's! Viel Erfolg mit deinem Portfolio! 💪

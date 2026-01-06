# 🚀 Belkis Aslani - Portfolio

Ein modernes, high-tech Portfolio powered by Jekyll und GitHub Pages.

## ✨ Features

- **Modernes Design**: Gradient-Effekte, Animationen, responsive Layout inspiriert von Google/Apple/Meta
- **Ultra-Thin Header**: Nur 48px hoher Header mit innovativem Slide-out Menü
- **Dark/Light Mode**: Automatischer Theme-Wechsel mit Premium-Styling
- **Home Button**: Schnellnavigation zur Startseite
- **Audio/Video Support**: HTML5 Player für Musik und Videos direkt in Projekten
- **Open Source Tracking**: Automatische Berechnung des Open-Source-Anteils
- **Einfache Verwaltung**: Projekte über YAML-Datei hinzufügen - kein HTML-Code nötig
- **Automatisches Build**: GitHub Pages baut die Seite automatisch
- **High Performance**: Optimiert für schnelle Ladezeiten
- **SEO-optimiert**: Automatische Sitemap und Meta-Tags
- **Mobile-First**: Perfekt auf allen Geräten

## 📁 Projekt-Struktur

```
.
├── _config.yml              # Jekyll Konfiguration
├── _data/
│   └── projects.yml         # HIER PROJEKTE HINZUFÜGEN! ⭐
├── _layouts/
│   └── default.html         # Haupt-Layout mit Header & Dark Mode
├── assets/
│   ├── css/
│   │   └── style.css        # Modernes CSS mit Gradients & Animationen
│   ├── js/
│   │   └── main.js          # Interaktive Features (Dark Mode, Menu, etc.)
│   ├── images/              # Projekt-Bilder & Cover hier ablegen
│   └── media/               # NEUE MEDIA-STRUKTUR ⭐
│       ├── audio/           # MP3, WAV, OGG Dateien
│       ├── videos/          # MP4, WEBM Dateien
│       ├── pdfs/            # PDF Dokumente
│       ├── documents/       # DOCX, XLSX, TXT
│       └── downloads/       # ZIP, RAR, TAR
├── index.html               # Startseite mit Projekt-Grid
├── MEDIA-GUIDE.md           # Komplette Anleitung für Media-Uploads
└── README.md                # Diese Datei
```

## 🎯 So fügst du neue Projekte hinzu

### Schritt 1: Öffne die Projekt-Datei

Gehe zu `_data/projects.yml` und bearbeite die Datei.

### Schritt 2: Füge dein Projekt hinzu

#### **Standard-Projekt** (Web-App, Code-Projekt)

```yaml
- name: "Mein neues Projekt"
  description: "Eine kurze Beschreibung des Projekts"
  type: "project"  # project/music/image/video/pdf/text
  image: "/My-table-of-contents-/assets/images/mein-projekt.jpg"
  image_mobile: "/My-table-of-contents-/assets/images/mein-projekt-mobile.jpg"  # Optional
  url: "https://link-zum-projekt.de"
  tags: ["Tag1", "Tag2", "Tag3"]
  category: "AI"  # AI/Design/Music/Art/Code
  featured: true  # Optional: Projekt wird oben hervorgehoben
  size: "large"  # small/medium/large - Grid-Größe
  open_source: true  # true/false - für Open-Source-Tracking
```

#### **Musik-Projekt** (mit Audio-Player)

```yaml
- name: "Mein Song Titel"
  description: "Beschreibung deines Songs"
  type: "music"
  image: "/My-table-of-contents-/assets/images/cover-mein-song.jpg"
  audio: "/My-table-of-contents-/assets/media/audio/mein-song.mp3"  # ← Audio-Player!
  tags: ["Musik", "Cover", "Genre"]
  category: "Music"
  featured: true
  size: "medium"
  open_source: true
```

#### **Video-Projekt** (mit Video-Player)

```yaml
- name: "Mein Video"
  description: "Beschreibung deines Videos"
  type: "video"
  image: "/My-table-of-contents-/assets/images/video-thumbnail.jpg"
  video: "/My-table-of-contents-/assets/media/videos/mein-video.mp4"  # ← Video-Player!
  tags: ["Video", "Tutorial", "Demo"]
  category: "Art"
  featured: false
  size: "large"
```

### Schritt 3: Media-Dateien hochladen

**WICHTIG:** Pfade müssen **IMMER** mit `/My-table-of-contents-/` beginnen!

- **Bilder/Cover**: Lege in `/assets/images/` ab
- **Audio (MP3, WAV)**: Lege in `/assets/media/audio/` ab
- **Videos (MP4, WEBM)**: Lege in `/assets/media/videos/` ab
- **PDFs**: Lege in `/assets/media/pdfs/` ab

### Schritt 4: Speichern & Committen

```bash
git add .
git commit -m "Neues Projekt hinzugefügt"
git push
```

**Das war's!** GitHub Pages baut die Seite automatisch neu (dauert 1-2 Minuten).

## 🖼️ Projekt-Bilder

### Option 1: Bilder im Repo ablegen (empfohlen)

1. Lege das Bild in `/assets/images/` ab
2. Referenziere es in `projects.yml`:
   ```yaml
   image: "/assets/images/mein-projekt.jpg"
   ```

### Option 2: Externe URLs verwenden

```yaml
image: "https://beispiel.com/bild.jpg"
```

### Option 3: Placeholder verwenden

```yaml
image: "https://via.placeholder.com/400x300/667eea/ffffff?text=Projekt+Name"
```

## 🎵 Audio & Video einbetten

Das Portfolio unterstützt jetzt HTML5 Audio- und Video-Player direkt in Projektkarten!

### Audio-Player hinzufügen

1. **MP3-Datei hochladen**: Lege deine Audiodatei in `/assets/media/audio/`
2. **Audio-Feld in YAML hinzufügen**:
   ```yaml
   - name: "Mein Song"
     description: "Beschreibung"
     type: "music"
     image: "/My-table-of-contents-/assets/images/cover.jpg"
     audio: "/My-table-of-contents-/assets/media/audio/song.mp3"
     tags: ["Musik", "Cover"]
     category: "Music"
   ```
3. **Fertig!** Der HTML5-Player erscheint automatisch in der Projekt-Karte

### Video-Player hinzufügen

1. **Video-Datei hochladen**: Lege deine Videodatei in `/assets/media/videos/`
2. **Video-Feld in YAML hinzufügen**:
   ```yaml
   - name: "Mein Video"
     description: "Beschreibung"
     type: "video"
     image: "/My-table-of-contents-/assets/images/thumbnail.jpg"
     video: "/My-table-of-contents-/assets/media/videos/video.mp4"
     tags: ["Video", "Tutorial"]
     category: "Art"
   ```
3. **Fertig!** Der HTML5-Player wird automatisch gerendert

### Wie funktioniert das technisch?

**In der YAML** (`_data/projects.yml`):
- Du fügst einfach ein `audio:` oder `video:` Feld hinzu
- Pfad zur Media-Datei angeben

**Im Template** (`index.html`):
- Jekyll prüft mit `{% if project.audio %}`, ob ein Audio-Feld existiert
- Wenn JA → HTML5 `<audio controls>` wird gerendert
- Wenn NEIN → Normale Projekt-Karte ohne Player

**Unterstützte Formate:**
- Audio: MP3, WAV, OGG
- Video: MP4, WEBM

Für detaillierte Beispiele siehe `MEDIA-GUIDE.md`

## 📊 Open Source Tracking

Das Portfolio berechnet automatisch den Open-Source-Anteil deiner Projekte!

### So funktioniert's:

1. **Feld hinzufügen** (optional):
   ```yaml
   - name: "Mein Projekt"
     open_source: true  # oder false
   ```

2. **Standard-Wert**: Wenn nicht angegeben, wird `true` angenommen

3. **Automatische Berechnung**:
   - Jekyll zählt alle Projekte mit `open_source: true`
   - Berechnet Prozentsatz: `(open_source_count / total_projects) * 100`
   - Zeigt Ergebnis in Stats-Section und Hero-Card

### Technische Umsetzung (index.html):

```liquid
{% assign total_projects = site.data.projects | size %}
{% assign open_source_count = 0 %}
{% for project in site.data.projects %}
    {% if project.open_source == true or project.open_source == nil %}
        {% assign open_source_count = open_source_count | plus: 1 %}
    {% endif %}
{% endfor %}
{% assign open_source_percentage = open_source_count | times: 100 | divided_by: total_projects %}
```

## 🎨 Anpassungen

### Farben ändern

Bearbeite die CSS-Variablen in `assets/css/style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-purple: #667eea;
    /* ... weitere Farben ... */
}
```

### Name & Beschreibung ändern

Bearbeite `_config.yml`:

```yaml
title: "Dein Name - Portfolio"
description: "Deine Beschreibung"
author: "Dein Name"
```

### Social Links hinzufügen

Bearbeite `_layouts/default.html` und füge weitere Links in der Navigation hinzu.

## 🚀 Lokale Entwicklung

### Voraussetzungen

- Ruby (>= 2.7)
- Bundler

### Installation

```bash
# Dependencies installieren
bundle install

# Lokalen Server starten
bundle exec jekyll serve

# Öffne http://localhost:4000
```

### Live-Reload

Der lokale Server lädt Änderungen automatisch neu. Bearbeite einfach die Dateien und sieh die Änderungen sofort im Browser.

## 📦 Deployment

### GitHub Pages aktivieren

1. Gehe zu **Repository Settings** > **Pages**
2. Wähle **Source**: `Deploy from a branch`
3. Wähle **Branch**: `main` (oder dein Hauptbranch) und **Folder**: `/ (root)`
4. Klicke **Save**

GitHub baut die Seite automatisch und veröffentlicht sie unter:
```
https://BEKO2210.github.io/My-table-of-contents-/
```

### Eigene Domain (optional)

1. Erstelle eine Datei `CNAME` im Root mit deiner Domain:
   ```
   www.deinedomain.de
   ```
2. Konfiguriere DNS bei deinem Domain-Anbieter

## 🛠️ Tech Stack

- **Jekyll**: Static Site Generator
- **GitHub Pages**: Hosting & automatisches Build
- **HTML5**: Semantisches Markup
- **CSS3**: Modern mit Custom Properties, Gradients, Animations
- **JavaScript**: Vanilla JS für Interaktivität
- **Font Awesome**: Icons
- **Google Fonts**: Inter & JetBrains Mono

## 📝 Projekt-Beispiele

### Beispiel 1: Web-Projekt mit Open Source

```yaml
- name: "K.Ai Modell"
  description: "Ein innovatives KI-Modell für kreative Anwendungen"
  type: "project"
  image: "/My-table-of-contents-/assets/images/kai-model.jpg"
  url: "https://github.com/BEKO2210/kai-model"
  tags: ["AI", "Machine Learning", "Python"]
  category: "AI"
  featured: true
  size: "large"
  open_source: true  # ← Zählt zur Open-Source-Statistik
```

### Beispiel 2: Musik-Projekt mit Audio-Player

```yaml
- name: "Papaoutai (Deutsch)"
  description: "Deutsche Cover-Version des Stromae Klassikers"
  type: "music"
  image: "/My-table-of-contents-/assets/images/cover-papaoutai.jpg"
  audio: "/My-table-of-contents-/assets/media/audio/papaoutai-deutsch.mp3"  # ← Audio-Player!
  tags: ["Musik", "Cover", "Deutsch"]
  category: "Music"
  featured: true
  size: "medium"
  open_source: true
```

### Beispiel 3: Normales Projekt ohne Featured

```yaml
- name: "Songtext Generator"
  description: "App zum Generieren und Bearbeiten von Songtexten"
  type: "project"
  image: "/My-table-of-contents-/assets/images/songtext-app.jpg"
  url: "https://github.com/BEKO2210/songtext-app"
  tags: ["Creative", "JavaScript", "Web App"]
  category: "Code"
  featured: false
  size: "medium"
  open_source: true
```

## 🎯 Features im Detail

### Featured Projects

Projekte mit `featured: true` werden oben hervorgehoben mit:
- Größeren Cards
- Speziellem Gradient-Border
- Eigene Section
- Optional: Large/Medium/Small Größe via `size` Parameter

### Ultra-Thin Header (48px)

- **Home Button**: Schnellnavigation zur Startseite (links oben)
- **Slide-out Menu**: Hamburger-Menü mit Overlay für mobile & desktop
- **Dark/Light Mode Toggle**: Automatischer Theme-Wechsel mit Smooth-Transition
- **Ultra-kompakt**: Nur 48px Höhe für maximalen Content-Space

### Audio & Video Player

- **HTML5 Audio**: Füge `audio:` Feld hinzu → Player erscheint automatisch
- **HTML5 Video**: Füge `video:` Feld hinzu → Player erscheint automatisch
- **Responsive**: Player passen sich automatisch an Bildschirmgröße an
- **Controls**: Play/Pause, Lautstärke, Fortschritt

### Open Source Tracking

- Automatische Berechnung des Open-Source-Anteils
- Anzeige in Hero-Card (rechts oben)
- Anzeige in Stats-Section (unten)
- Standard-Wert: `true` (wenn nicht angegeben)

### Tags & Kategorien

- **Tags**: Helfen bei der Kategorisierung und zeigen verwendete Technologien
- **Kategorien**: AI, Design, Music, Art, Code
- Farbkodiert mit Gradient-Effekten

### Responsive Design

Die Seite passt sich automatisch an alle Bildschirmgrößen an:
- **Desktop**: 3-spaltiges Grid
- **Tablet**: 2-spaltiges Grid
- **Mobile**: 1-spaltiges Grid (kein horizontales Scrolling!)

### Animationen & Effekte

- Smooth Scroll mit Scroll-Indikator
- Fade-in beim Scrollen (Reveal-Animationen)
- Hover-Effekte auf Karten mit Shadow-Lift
- Animierte Statistiken (Counter-Animation)
- Floating Gradient Orbs im Hintergrund
- Dark Mode Partikel-Effekt (erhöhte Opacity)
- Role-Carousel im Hero (4 rotierende Rollen)

## 🔧 Troubleshooting

### Build schlägt fehl

- Prüfe die YAML-Syntax in `projects.yml` (Einrückung!)
- Stelle sicher, dass alle Pflichtfelder ausgefüllt sind
- Schau in die GitHub Actions Logs

### Bilder werden nicht angezeigt

**WICHTIG:** Pfade müssen `/My-table-of-contents-/` am Anfang haben!

- ❌ FALSCH: `/assets/images/bild.jpg`
- ✅ RICHTIG: `/My-table-of-contents-/assets/images/bild.jpg`

Weitere Checks:
- Stelle sicher, dass das Bild im Repo hochgeladen ist
- Bei externen URLs: Prüfe, ob die URL erreichbar ist
- Cache leeren (Strg+Shift+R / Cmd+Shift+R)

### Audio/Video wird nicht abgespielt

**Bild lädt, aber kein Player sichtbar?**
- Prüfe, ob `audio:` oder `video:` Feld in YAML existiert
- Pfad muss korrekt sein: `/My-table-of-contents-/assets/media/audio/datei.mp3`

**Player sichtbar, aber kein Sound?**
- Stelle sicher, dass die Datei hochgeladen ist
- Prüfe Browser-Konsole auf Fehler (F12)
- Unterstützte Formate: MP3, WAV, OGG (Audio) / MP4, WEBM (Video)

**Dateigröße beachten:**
- MP3: Max. 10 MB empfohlen
- MP4: Max. 50 MB empfohlen
- Für größere Dateien: Externe Hosting (YouTube, SoundCloud, etc.)

### Seite ist nicht erreichbar

- Prüfe ob GitHub Pages in den Settings aktiviert ist
- Warte 1-2 Minuten nach dem Push (Build-Zeit)
- Prüfe die Actions-Tab für Build-Errors
- Branch muss korrekt sein (claude/jekyll-portfolio-setup-Pid7B)

## 📄 Lizenz

Dieses Portfolio-Template ist frei verwendbar. Passe es nach deinen Wünschen an!

## 💬 Support

Bei Fragen oder Problemen:
- Öffne ein Issue auf GitHub
- Schau in die [Jekyll Dokumentation](https://jekyllrb.com/docs/)
- Besuche die [GitHub Pages Docs](https://docs.github.com/en/pages)

---

**Made with ❤️ by Belkis Aslani**

Powered by Jekyll & GitHub Pages

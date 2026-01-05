# 🚀 Belkis Aslani - Portfolio

Ein modernes, high-tech Portfolio powered by Jekyll und GitHub Pages.

## ✨ Features

- **Modernes Design**: Gradient-Effekte, Animationen, responsive Layout
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
│   └── default.html         # Haupt-Layout
├── assets/
│   ├── css/
│   │   └── style.css        # Modernes CSS mit Gradients & Animationen
│   ├── js/
│   │   └── main.js          # Interaktive Features
│   └── images/              # Projekt-Bilder hier ablegen
├── index.html               # Startseite mit Projekt-Grid
└── README.md                # Diese Datei
```

## 🎯 So fügst du neue Projekte hinzu

### Schritt 1: Öffne die Projekt-Datei

Gehe zu `_data/projects.yml` und bearbeite die Datei.

### Schritt 2: Füge dein Projekt hinzu

```yaml
- name: "Mein neues Projekt"
  description: "Eine kurze Beschreibung des Projekts"
  image: "/assets/images/mein-projekt.jpg"  # oder externe URL
  url: "https://link-zum-projekt.de"
  tags: ["Tag1", "Tag2", "Tag3"]
  featured: true  # Optional: Projekt als Featured markieren
```

### Schritt 3: Speichern & Committen

```bash
git add _data/projects.yml
git commit -m "Neues Projekt hinzugefügt"
git push
```

**Das war's!** GitHub Pages baut die Seite automatisch neu und dein Projekt erscheint.

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

## 📝 Projekt-Beispiel

```yaml
- name: "K.Ai Modell"
  description: "Ein innovatives KI-Modell für kreative Anwendungen"
  image: "/assets/images/kai-model.jpg"
  url: "https://github.com/BEKO2210/kai-model"
  tags: ["AI", "Machine Learning", "Python"]
  featured: true

- name: "Songtext Generator"
  description: "App zum Generieren und Bearbeiten von Songtexten"
  image: "/assets/images/songtext-app.jpg"
  url: "https://github.com/BEKO2210/songtext-app"
  tags: ["Creative", "JavaScript", "Web App"]
  featured: false
```

## 🎯 Features im Detail

### Featured Projects

Projekte mit `featured: true` werden oben hervorgehoben mit:
- Größeren Cards
- Speziellem Gradient-Border
- Eigene Section

### Tags

Tags helfen bei der Kategorisierung und zeigen die verwendeten Technologien.

### Responsive Design

Die Seite passt sich automatisch an alle Bildschirmgrößen an:
- Desktop: 3-spaltiges Grid
- Tablet: 2-spaltiges Grid
- Mobile: 1-spaltiges Grid

### Animationen

- Smooth Scroll
- Fade-in beim Scrollen
- Hover-Effekte auf Karten
- Animierte Statistiken
- Floating Gradient Orbs im Hintergrund

## 🔧 Troubleshooting

### Build schlägt fehl

- Prüfe die YAML-Syntax in `projects.yml` (Einrückung!)
- Stelle sicher, dass alle Pflichtfelder ausgefüllt sind
- Schau in die GitHub Actions Logs

### Bilder werden nicht angezeigt

- Prüfe den Pfad (muss mit `/` beginnen für absolute Pfade)
- Stelle sicher, dass das Bild im Repo ist
- Bei externen URLs: Prüfe, ob die URL erreichbar ist

### Seite ist nicht erreichbar

- Prüfe ob GitHub Pages in den Settings aktiviert ist
- Warte 1-2 Minuten nach dem Push (Build-Zeit)
- Prüfe die Actions-Tab für Build-Errors

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

# 📁 Media Upload & Embed Guide

Komplette Anleitung zum Hochladen und Einbetten von Medien in deinem Portfolio.

---

## 📂 Dateistruktur

Erstelle folgende Ordner in deinem Repository:

```
My-table-of-contents-/
├── assets/
│   ├── media/
│   │   ├── pdfs/          # PDF-Dateien
│   │   ├── audio/         # MP3, WAV, OGG
│   │   ├── videos/        # MP4, WEBM
│   │   ├── documents/     # DOCX, XLSX, TXT
│   │   └── downloads/     # Andere Downloads
│   ├── images/            # Bilder (bereits vorhanden)
│   ├── css/
│   └── js/
```

---

## 📤 Schritt 1: Dateien hochladen

### Methode 1: Via GitHub Web Interface

1. Gehe zu deinem Repository auf GitHub
2. Navigiere zu `assets/media/pdfs/` (oder entsprechender Ordner)
3. Klicke auf **"Add file" → "Upload files"**
4. Drag & Drop deine Dateien
5. Commit mit Nachricht (z.B. "Add presentation PDF")

### Methode 2: Via Git Command Line

```bash
# 1. Dateien in den richtigen Ordner kopieren
cp ~/Downloads/meine-datei.pdf assets/media/pdfs/

# 2. Alle neuen Dateien hinzufügen
git add assets/media/

# 3. Commit
git commit -m "Add media files"

# 4. Push
git push
```

---

## 🎬 Schritt 2: Dateien einbetten

### 📄 PDF einbetten (Lesbar im Browser)

**Option 1: Einfaches Embed (empfohlen)**
```html
<div class="pdf-container">
    <embed
        src="{{ '/assets/media/pdfs/meine-datei.pdf' | relative_url }}"
        type="application/pdf"
        width="100%"
        height="600px"
    />
</div>
```

**Option 2: Mit Download-Button**
```html
<div class="media-card">
    <h3>📄 Meine Präsentation</h3>
    <embed
        src="{{ '/assets/media/pdfs/presentation.pdf' | relative_url }}"
        type="application/pdf"
        width="100%"
        height="500px"
    />
    <a href="{{ '/assets/media/pdfs/presentation.pdf' | relative_url }}"
       download
       class="btn btn-primary">
        <i class="fas fa-download"></i> PDF Herunterladen
    </a>
</div>
```

**Option 3: Google Docs Viewer (Fallback)**
```html
<iframe
    src="https://docs.google.com/viewer?url={{ site.url }}/assets/media/pdfs/file.pdf&embedded=true"
    width="100%"
    height="600px"
    frameborder="0">
</iframe>
```

---

### 🎵 MP3/Audio einbetten (Abspielbar)

**HTML5 Audio Player**
```html
<div class="audio-player">
    <h4>🎵 Mein Podcast</h4>
    <audio controls style="width: 100%;">
        <source src="{{ '/assets/media/audio/podcast.mp3' | relative_url }}" type="audio/mpeg">
        <source src="{{ '/assets/media/audio/podcast.ogg' | relative_url }}" type="audio/ogg">
        Dein Browser unterstützt kein Audio.
    </audio>
</div>
```

**Mit Custom Styling**
```html
<div class="media-card">
    <div class="media-header">
        <i class="fas fa-music"></i>
        <h3>Episode 1 - KI & Zukunft</h3>
    </div>
    <audio controls class="custom-audio">
        <source src="{{ '/assets/media/audio/episode1.mp3' | relative_url }}" type="audio/mpeg">
    </audio>
    <p>Dauer: 15 Minuten | Veröffentlicht: 01.01.2026</p>
</div>
```

---

### 🎥 MP4/Video einbetten (Abspielbar)

**HTML5 Video Player**
```html
<div class="video-container">
    <video controls width="100%">
        <source src="{{ '/assets/media/videos/demo.mp4' | relative_url }}" type="video/mp4">
        <source src="{{ '/assets/media/videos/demo.webm' | relative_url }}" type="video/webm">
        Dein Browser unterstützt kein Video.
    </video>
</div>
```

**Mit Poster (Vorschaubild)**
```html
<video
    controls
    width="100%"
    poster="{{ '/assets/images/video-thumbnail.jpg' | relative_url }}">
    <source src="{{ '/assets/media/videos/projekt-demo.mp4' | relative_url }}" type="video/mp4">
</video>
```

**Responsive Video (16:9)**
```html
<div class="video-responsive">
    <video controls>
        <source src="{{ '/assets/media/videos/presentation.mp4' | relative_url }}" type="video/mp4">
    </video>
</div>

<style>
.video-responsive {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
    height: 0;
    overflow: hidden;
}
.video-responsive video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
```

---

### 📦 Downloads (ZIP, DOCX, etc.)

**Download-Button**
```html
<a href="{{ '/assets/media/downloads/projekt.zip' | relative_url }}"
   download
   class="btn btn-primary">
    <i class="fas fa-download"></i> Projekt herunterladen (ZIP)
</a>
```

**Download-Card**
```html
<div class="download-card">
    <div class="download-icon">
        <i class="fas fa-file-archive"></i>
    </div>
    <div class="download-info">
        <h4>BEL-KI Source Code</h4>
        <p>Kompletter Quellcode mit Dokumentation</p>
        <span class="file-size">2.5 MB</span>
    </div>
    <a href="{{ '/assets/media/downloads/bel-ki.zip' | relative_url }}"
       download
       class="btn btn-secondary">
        <i class="fas fa-download"></i> Download
    </a>
</div>
```

---

## 🎨 CSS für Media Cards

Füge zu `assets/css/style.css` hinzu:

```css
/* Media Cards */
.media-card {
    background: var(--color-bg);
    border-radius: var(--radius-xl);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--spacing-6);
}

.media-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-4);
}

.media-header i {
    font-size: var(--text-2xl);
    color: var(--color-primary);
}

/* PDF Container */
.pdf-container {
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    margin: var(--spacing-6) 0;
}

/* Audio Player */
.custom-audio {
    width: 100%;
    margin: var(--spacing-4) 0;
    border-radius: var(--radius-md);
}

/* Video Container */
.video-container {
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    margin: var(--spacing-6) 0;
}

.video-container video {
    display: block;
    width: 100%;
    height: auto;
}

/* Download Card */
.download-card {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    background: var(--color-bg-secondary);
    padding: var(--spacing-5);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    transition: all var(--transition);
}

.download-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.download-icon {
    width: 60px;
    height: 60px;
    background: var(--color-primary-light);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-3xl);
    color: var(--color-primary);
}

.download-info {
    flex: 1;
}

.download-info h4 {
    margin-bottom: var(--spacing-1);
}

.file-size {
    font-size: var(--text-sm);
    color: var(--color-text-tertiary);
}
```

---

## 📋 Beispiel: Projekt-Seite mit allen Medien

Erstelle `projekt-demo.html`:

```html
---
layout: default
title: BEL-KI - Projekt Demo
---

<section class="project-detail">
    <div class="container">
        <h1>🤖 BEL-KI Projekt</h1>

        <!-- Video Demo -->
        <div class="media-card">
            <h2>📹 Video Demo</h2>
            <div class="video-container">
                <video controls poster="{{ '/assets/images/bel-ki-thumb.jpg' | relative_url }}">
                    <source src="{{ '/assets/media/videos/bel-ki-demo.mp4' | relative_url }}" type="video/mp4">
                </video>
            </div>
        </div>

        <!-- Dokumentation PDF -->
        <div class="media-card">
            <h2>📄 Dokumentation</h2>
            <embed
                src="{{ '/assets/media/pdfs/bel-ki-docs.pdf' | relative_url }}"
                type="application/pdf"
                width="100%"
                height="600px"
            />
            <a href="{{ '/assets/media/pdfs/bel-ki-docs.pdf' | relative_url }}"
               download
               class="btn btn-secondary">
                <i class="fas fa-download"></i> PDF Herunterladen
            </a>
        </div>

        <!-- Audio Erklärung -->
        <div class="media-card">
            <h2>🎵 Audio Erklärung</h2>
            <audio controls style="width: 100%;">
                <source src="{{ '/assets/media/audio/bel-ki-intro.mp3' | relative_url }}" type="audio/mpeg">
            </audio>
        </div>

        <!-- Download -->
        <div class="download-card">
            <div class="download-icon">
                <i class="fas fa-code"></i>
            </div>
            <div class="download-info">
                <h4>Source Code</h4>
                <p>Kompletter Python Code mit Readme</p>
                <span class="file-size">1.2 MB</span>
            </div>
            <a href="{{ '/assets/media/downloads/bel-ki-source.zip' | relative_url }}"
               download
               class="btn btn-primary">
                <i class="fas fa-download"></i> Download
            </a>
        </div>
    </div>
</section>
```

---

## 🔗 In projects.yml verlinken

Füge in `_data/projects.yml` hinzu:

```yaml
- name: "BEL-KI"
  description: "KI-Assistent mit Spracherkennung"
  image: "/assets/images/bel-ki.jpg"
  url: "/projekt-demo.html"  # Link zur Detail-Seite
  featured: true
  size: "large"
  tags:
    - "Python"
    - "AI"
    - "Speech Recognition"
  media:
    video: "/assets/media/videos/bel-ki-demo.mp4"
    pdf: "/assets/media/pdfs/bel-ki-docs.pdf"
    download: "/assets/media/downloads/bel-ki-source.zip"
```

---

## 🎯 Best Practices

### Dateigrößen
- **Bilder:** Max 500KB (komprimieren mit TinyPNG)
- **Videos:** Max 50MB (YouTube/Vimeo für größere Videos)
- **PDFs:** Max 10MB
- **Audio:** Max 10MB

### Dateiformate
- **Video:** MP4 (H.264) für beste Kompatibilität
- **Audio:** MP3 für beste Kompatibilität
- **PDF:** Optimiert für Web
- **Bilder:** WebP > JPG > PNG

### GitHub Limits
- Einzelne Datei: Max 100MB
- Repository: Max 1GB (empfohlen)
- Verwende Git LFS für große Dateien

---

## 🚀 Deployment

1. **Dateien hochladen:**
   ```bash
   git add assets/media/
   git commit -m "Add media files"
   git push
   ```

2. **Jekyll Build:**
   - GitHub Pages baut automatisch
   - Warte 1-2 Minuten

3. **Testen:**
   - Öffne deine Website
   - Teste alle Embeds
   - Prüfe Downloads

---

## 💡 Tipps

1. **YouTube statt MP4** für große Videos:
   ```html
   <iframe
       width="100%"
       height="400"
       src="https://www.youtube.com/embed/VIDEO_ID"
       frameborder="0"
       allowfullscreen>
   </iframe>
   ```

2. **Spotify für Podcasts:**
   ```html
   <iframe
       src="https://open.spotify.com/embed/episode/EPISODE_ID"
       width="100%"
       height="232"
       frameborder="0">
   </iframe>
   ```

3. **Google Drive für große Dateien:**
   ```html
   <a href="https://drive.google.com/file/d/FILE_ID/view"
      target="_blank"
      class="btn btn-primary">
       Datei auf Google Drive öffnen
   </a>
   ```

---

## 📞 Support

Bei Problemen:
1. Prüfe Browser-Konsole (F12)
2. Validiere Dateipfade
3. Teste verschiedene Browser
4. Prüfe GitHub Pages Build Status

**Viel Erfolg! 🎉**

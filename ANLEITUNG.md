# 🚀 GitHub Pages aktivieren - EINFACHE ANLEITUNG

Hey Belkis! Hier ist die **super einfache** Anleitung, um deine Portfolio-Seite online zu bringen.

## ✅ Schritt-für-Schritt (mit Screenshots-Beschreibung)

### 1️⃣ Gehe zu deinem GitHub Repository

Öffne in deinem Browser:
```
https://github.com/BEKO2210/My-table-of-contents-
```

### 2️⃣ Klicke auf "Settings" (oben rechts)

- In der Menüleiste deines Repositories findest du verschiedene Tabs
- Klicke ganz rechts auf **"Settings"** (Zahnrad-Symbol)

### 3️⃣ Klicke auf "Pages" (linke Sidebar)

- In der linken Sidebar findest du viele Optionen
- Scrolle runter bis du **"Pages"** siehst
- Klicke drauf

### 4️⃣ Wähle den Branch aus

Jetzt siehst du die GitHub Pages Einstellungen:

**Unter "Build and deployment":**
- **Source**: Lass "Deploy from a branch" ausgewählt
- **Branch**: Hier ist wichtig!
  - Klicke auf das Dropdown (steht wahrscheinlich "None")
  - Wähle **`claude/jekyll-portfolio-setup-Pid7B`** aus
  - Bei "Folder" wähle **`/ (root)`**
  - Klicke auf **"Save"**

### 5️⃣ Warte ca. 2-3 Minuten

GitHub baut jetzt deine Seite. Du siehst oben eine blaue Meldung:
```
Your site is ready to be published at https://BEKO2210.github.io/My-table-of-contents-/
```

Nach 2-3 Minuten wird sie grün:
```
Your site is live at https://BEKO2210.github.io/My-table-of-contents-/
```

### 6️⃣ Fertig! 🎉

Klicke auf den Link oder öffne:
```
https://BEKO2210.github.io/My-table-of-contents-/
```

## 📱 Was du jetzt siehst

Deine Portfolio-Seite mit:
- ✨ Modernem Design mit Gradient-Effekten
- 🚀 Hero-Section mit deinem Namen
- 📁 3 Beispiel-Projekte (K.Ai Modell, Songtexte App, Portfolio)
- 📊 Statistik-Section
- 💬 Kontakt-Bereich

## 🎯 Nächster Schritt: Eigene Projekte hinzufügen

### Auf GitHub direkt bearbeiten:

1. Gehe zu: `_data/projects.yml`
2. Klicke auf das **Stift-Symbol** (Edit)
3. Ändere die Beispiel-Projekte oder füge neue hinzu:

```yaml
- name: "Dein Projekt"
  description: "Deine Beschreibung"
  image: "https://via.placeholder.com/400x300/667eea/ffffff?text=Dein+Projekt"
  url: "https://github.com/BEKO2210/dein-projekt"
  tags: ["Tag1", "Tag2"]
  featured: true
```

4. Scrolle runter und klicke **"Commit changes"**
5. Warte 1-2 Minuten → Seite aktualisiert sich automatisch!

## ❓ Probleme?

### "Ich finde den Branch nicht"
- Der Branch heißt: `claude/jekyll-portfolio-setup-Pid7B`
- Er sollte im Dropdown sichtbar sein

### "Die Seite zeigt 404"
- Warte 2-3 Minuten nach dem Aktivieren
- Aktualisiere die Seite (F5)
- Prüfe ob die URL korrekt ist

### "GitHub Pages ist ausgegraut"
- Stelle sicher, dass das Repository **öffentlich** (public) ist
- Gehe zu Settings → General → Scroll runter zu "Danger Zone"
- Wenn es "Make public" gibt, klicke darauf

## 🎨 Wichtige Dateien

**Projekte bearbeiten:**
```
_data/projects.yml    ← Nur diese Datei bearbeiten!
```

**Bilder hochladen:**
```
assets/images/        ← Projekt-Bilder hier ablegen
```

**Name/Beschreibung:**
```
_config.yml           ← Deinen Namen hier ändern
```

## 🔗 Deine Links

Sobald die Seite live ist:

**Portfolio-URL:**
```
https://BEKO2210.github.io/My-table-of-contents-/
```

**Repository:**
```
https://github.com/BEKO2210/My-table-of-contents-
```

---

## 💡 TIPP: Direkt auf GitHub bearbeiten

Du musst **nicht** auf deinem Computer arbeiten!

1. Gehe zu `_data/projects.yml` auf GitHub
2. Klicke auf den **Stift** (Edit)
3. Ändere die Datei
4. Klicke **"Commit changes"**
5. **FERTIG!** → Nach 1-2 Minuten ist die Änderung live

So einfach ist das! 🎉

---

**Du schaffst das! Wenn du Probleme hast, melde dich einfach.**

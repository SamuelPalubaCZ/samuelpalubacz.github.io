# 🚀 Samuel Paluba Portfolio CMS

Komprehensivní systém správy obsahu pro osobní portfolio web s dynamickým propojením Markdown souborů a živým webem.

## 📋 Přehled funkcí

### ✅ Implementované funkce:
- **Dynamické načítání obsahu** z Markdown souborů
- **Admin rozhraní** pro správu obsahu v reálném čase
- **Live preview** změn při editaci
- **Selektivní viditelnost** pro kontakty a odkazy
- **Real-time editing** s okamžitými aktualizacemi
- **Expandable content** bez porušení layoutu
- **Apple-inspired design** s minimalistickou estetikou
- **Plně responsivní** design pro všechna zařízení
- **Smooth animace** a fade-in efekty

### 🎯 Strukturální změny:
- ❌ Odstraněny obrázky z resume sekce
- ❌ Eliminována "My Beliefs" sekce
- ✅ Zachován pouze personal obsah bez "Personal" headeru
- ✅ Čistý, minimalistický layout

## 🗂️ Struktura souborů

```
📁 Portfolio CMS/
├── 📄 index.html          # Hlavní HTML soubor
├── 📄 content.md          # Obsah webu ve formátu YAML/Markdown
├── 📄 cms.js              # CMS engine a parser
├── 📄 admin.js            # Admin rozhraní
└── 📄 README.md           # Tato dokumentace
```

## 🚀 Jak použít

### 1. Základní použití
```bash
# Otevřete index.html v prohlížeči
open index.html
```

### 2. Aktivace Admin režimu
**Možnosti aktivace:**
- **Klávesová zkratka:** `Ctrl + Shift + A`
- **URL parametr:** `?admin=true`
- **JavaScript konzole:** `window.adminPanel.show()`

### 3. Editace obsahu
1. Otevřete admin panel
2. Vyberte záložku pro editaci
3. Proveďte změny - zobrazí se okamžitě
4. Uložte změny tlačítkem "Save Changes"

## 📝 Správa obsahu

### 🏠 Hero Sekce
```yaml
hero_greeting: "👋 Hey there, I'm Samuel!"
hero_intro: "Váš intro text..."
cta_button: "📄 See My Resume"
```

### 📄 Resume Items
```yaml
resume_items:
  - id: "unique_id"
    title: "🏛️ Project Title"
    description: "Popis projektu..."
    status: "active|paused|ongoing"
    status_text: "Status zobrazení"
    link: "https://example.com"
    visible: true
```

### 📧 Kontakty a Social Media
```yaml
contact_methods:
  - id: "email"
    title: "📧 Email"
    description: "Professional inquiries"
    visible: true

social_links:
  - id: "github"
    platform: "GitHub"
    url: "https://github.com/username"
    visible: true
```

## 🎛️ Admin rozhraní

### 📋 Záložky
1. **📝 Content** - Hlavní obsah (hero, about)
2. **📄 Resume Items** - Správa projektů a rolí
3. **📧 Contact & Social** - Kontaktní informace
4. **⚙️ Settings** - Navigace a footer

### 🔧 Funkce
- **💾 Save Changes** - Uložení a export MD
- **📥 Export MD** - Export aktuálního stavu
- **➕ Add Item** - Přidání nových položek
- **👁️ Visibility Toggle** - Zapnutí/vypnutí viditelnosti
- **🔄 Live Preview** - Okamžitý náhled změn

## 💻 Technické detaily

### 🏗️ Architektura
```javascript
// CMS Engine
class PortfolioCMS {
    parseMarkdownContent()    // YAML parser
    renderContent()          // Dynamické vykreslování
    updateContent()          // Live updates
}

// Admin Panel
class AdminPanel {
    createAdminPanel()       // UI komponenty
    setupRealTimeEditing()   // Live editing
    generateMarkdown()       // Export funkce
}
```

### 📱 Responsivní design
- **Desktop:** Plný admin panel s live preview
- **Tablet:** Adaptivní layout
- **Mobile:** Optimalizované ovládání

### 🎨 Design systém
- **Font:** JetBrains Mono (monospace)
- **Barvy:** Apple-inspired šedé tóny
- **Animace:** Smooth fade-in efekty
- **Layout:** Maximální šířka s centrováním

## 🔄 Workflow editace

### 1. Otevření editoru
```javascript
// Klávesová zkratka
Ctrl + Shift + A

// Nebo programmaticky
window.adminPanel.show();
```

### 2. Real-time editace
- Změny se zobrazují okamžitě
- Live preview v pravém panelu
- Automatické ukládání stavu

### 3. Export změn
```javascript
// Generování Markdown
const markdown = adminPanel.generateMarkdown();

// Automatický download
adminPanel.downloadFile('content.md', markdown);
```

## 🛠️ Customizace

### Přidání nového typu obsahu
```javascript
// V cms.js přidat novou sekci
parseNewSectionType(section) {
    // Parser logic
}

renderNewSection() {
    // Rendering logic
}
```

### Rozšíření admin rozhraní
```javascript
// V admin.js přidat nový tab
createNewTab() {
    // UI komponenty
}

loadNewTabContent() {
    // Content loading
}
```

## 🎯 Případy použití

### 1. Správa portfolia
- Přidávání nových projektů
- Aktualizace statusů
- Skrývání/zobrazování položek

### 2. Kontaktní informace
- Přepínání viditelnosti kontaktů
- Aktualizace social media odkazů
- Změna popisků

### 3. Obsah webu
- Editace intro textu
- Úprava about sekce
- Customizace navigace

## 🔒 Bezpečnost

- Admin panel je pouze front-end
- Žádné citlivé operace
- Export/import přes browser
- Lokální zpracování dat

## 🚀 Deployment

### Statické hostování
```bash
# Upload souborů na server
- index.html
- content.md
- cms.js
- admin.js
```

### GitHub Pages
1. Nahrajte soubory do repository
2. Aktivujte GitHub Pages
3. Admin panel bude dostupný na `?admin=true`

## 📞 Support

Pro otázky a support:
- 🐛 Issues na GitHub
- 📧 Email kontakt
- 💬 Diskuse v repository

---

**🎉 Portfolio CMS je připraveno k použití!**

Aktivujte admin režim pomocí `Ctrl + Shift + A` a začněte editovat svůj obsah v reálném čase.
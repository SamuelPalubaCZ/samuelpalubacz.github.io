# Samuel Paluba Portfolio - Content Management

## 🔧 Site Configuration
```yaml
site_title: "Samuel Paluba - IT Freelancer & Crypto-Anarchist"
name: "👨‍💻 Samuel Paluba"
```

## 🏠 Hero Section
```yaml
hero_greeting: "👋 Hey there, I'm Samuel!"
hero_intro: "I'm a 16 y.o freelancer in the IT field, a libertarian/crypto-anarchist, and I'm currently working on a project called LibertyLoft. I also serve as a Local Coordinator for Students for Liberty."
cta_button: "📄 See My Resume"
cta_target: "#projects"
```

## 📄 Resume Section
```yaml
section_title: "📄 Resume"
```

### Resume Items
```yaml
resume_items:
  - id: "libertyloft"
    title: "🏛️ LibertyLoft"
    description: "A community center in Prague focused on libertarian principles and crypto-anarchist ideals. Building a space for free thinkers and decentralization advocates."
    type: "project"
    status: "active"
    status_text: "Visit Project"
    link: "https://LibertyLoft.cz"
    visible: true
    
  - id: "thinkhome"
    title: "💻 Thinkhome IT"
    description: "IT company project currently on hold. Focused on innovative tech solutions and decentralized services. Planning to resume development in the future."
    type: "project"
    status: "paused"
    status_text: "⏸️ Currently on Hold"
    link: ""
    visible: true
    
  - id: "sfl"
    title: "🗽 Students for Liberty"
    description: "Serving as Local Coordinator, organizing events and building community around libertarian principles. Connecting like-minded students and promoting freedom of thought."
    type: "role"
    status: "active"
    status_text: "✅ Active Role"
    link: ""
    visible: true
    
  - id: "photography"
    title: "📸 Photography Portfolio"
    description: "Personal hobby exploring visual storytelling through photography. Capturing moments and perspectives that align with my worldview and aesthetic preferences."
    type: "hobby"
    status: "ongoing"
    status_text: "🎨 Personal Hobby"
    link: ""
    visible: true
```

## 🧑‍🎓 About Section
```yaml
section_title: "🧑‍🎓 About Me"
show_personal_header: false
personal_content: |
  At 16, I'm deeply passionate about technology, individual freedom, and the potential of decentralized systems. My work spans IT development, community organizing, and exploring the intersection of technology and liberty.
  
  When I'm not coding or organizing events, you'll find me behind a camera, capturing the world through my libertarian lens, or diving deep into cryptocurrency and blockchain technologies.
```

## 📧 Contact Section
```yaml
section_title: "📧 Get In Touch"
```

### Contact Methods
```yaml
contact_methods:
  - id: "email"
    title: "📧 Email"
    description: "Professional inquiries"
    link: "mailto:samuel@example.com"
    visible: true
    
  - id: "signal"
    title: "🔐 Signal"
    description: "Secure messaging"
    link: "https://signal.me/#p/+1234567890"
    visible: true
    
  - id: "whatsapp"
    title: "💬 WhatsApp"
    description: "Quick communication"
    link: "https://wa.me/1234567890"
    visible: true
```

### Social Media
```yaml
social_links:
  - id: "github"
    platform: "GitHub"
    url: "#"
    visible: true
    
  - id: "linkedin"
    platform: "LinkedIn"
    url: "#"
    visible: true
    
  - id: "instagram"
    platform: "Instagram"
    url: "#"
    visible: true
    
  - id: "email"
    platform: "Email"
    url: "#"
    visible: true
```

## 🦶 Footer
```yaml
footer_text: "© 2025 Samuel Paluba. 🚀 Built with passion for freedom and technology."
```

## 🧭 Navigation
```yaml
navigation:
  - id: "home"
    title: "🏠 Home"
    target: "#home"
    visible: true
    
  - id: "resume"
    title: "📄 Resume"
    target: "#projects"
    visible: true
    
  - id: "about"
    title: "🧑‍🎓 About"
    target: "#about"
    visible: true
    
  - id: "contact"
    title: "📧 Contact"
    target: "#contact"
    visible: true
```

---

## 📝 Content Management Instructions

### How to Edit Content:
1. **Text Content**: Edit YAML values directly
2. **Visibility**: Set `visible: true/false` for any item
3. **Links**: Update URL fields with actual links
4. **Order**: Rearrange items in arrays to change display order
5. **Status**: Change status types (active, paused, ongoing, etc.)

### Supported Status Types:
- `active`: Green indicator with checkmark
- `paused`: Gray indicator with pause icon
- `ongoing`: Blue indicator with continuous icon
- `completed`: Green indicator with checkmark

### Adding New Resume Items:
```yaml
- id: "unique_id"
  title: "🆕 Project Title"
  description: "Project description here..."
  type: "project|role|hobby"
  status: "active|paused|ongoing|completed"
  status_text: "Display text for status"
  link: "https://example.com"
  visible: true
```

### Live Preview:
After editing this file, the changes will be automatically reflected on the website through the CMS system.
// Samuel Paluba Portfolio - Admin Interface
class AdminPanel {
    constructor(cms) {
        this.cms = cms;
        this.isVisible = false;
        this.currentTab = 'content';
        this.init();
    }

    init() {
        this.createAdminPanel();
        this.setupAdminEventListeners();
    }

    createAdminPanel() {
        const adminPanel = document.createElement('div');
        adminPanel.id = 'admin-panel';
        adminPanel.className = 'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[9999] hidden';
        
        adminPanel.innerHTML = `
            <div class="admin-container bg-white h-full flex flex-col">
                <!-- Admin Header -->
                <div class="admin-header bg-apple-gray-900 text-white p-4 flex justify-between items-center">
                    <h2 class="text-xl font-semibold">🛠️ Portfolio CMS Admin</h2>
                    <div class="flex items-center space-x-4">
                        <button id="save-changes" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors">
                            💾 Save Changes
                        </button>
                        <button id="export-content" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
                            📥 Export MD
                        </button>
                        <button id="close-admin" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">
                            ✕ Close Admin
                        </button>
                    </div>
                </div>

                <!-- Admin Tabs -->
                <div class="admin-tabs bg-apple-gray-100 border-b border-apple-gray-200">
                    <div class="flex">
                        <button data-tab="content" class="tab-btn px-6 py-3 font-medium transition-colors active">
                            📝 Content
                        </button>
                        <button data-tab="resume" class="tab-btn px-6 py-3 font-medium transition-colors">
                            📄 Resume Items
                        </button>
                        <button data-tab="contact" class="tab-btn px-6 py-3 font-medium transition-colors">
                            📧 Contact & Social
                        </button>
                        <button data-tab="settings" class="tab-btn px-6 py-3 font-medium transition-colors">
                            ⚙️ Settings
                        </button>
                    </div>
                </div>

                <!-- Admin Content -->
                <div class="admin-content flex-1 overflow-y-auto p-6">
                    <div id="content-tab" class="tab-content"></div>
                    <div id="resume-tab" class="tab-content hidden"></div>
                    <div id="contact-tab" class="tab-content hidden"></div>
                    <div id="settings-tab" class="tab-content hidden"></div>
                </div>
            </div>
        `;

        document.body.appendChild(adminPanel);
        this.adminPanel = adminPanel;
    }

    setupAdminEventListeners() {
        this.adminPanel.querySelector('#close-admin').addEventListener('click', () => this.hide());
        this.adminPanel.querySelector('#save-changes').addEventListener('click', () => this.saveChanges());
        this.adminPanel.querySelector('#export-content').addEventListener('click', () => this.exportContent());

        this.adminPanel.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
    }

    updateContent(section, key, value, index = -1) {
        if (index > -1) {
            if (!this.cms.content[section][key]) {
                this.cms.content[section][key] = [];
            }
            this.cms.content[section][key][index] = value;
        } else {
            if (!this.cms.content[section]) {
                this.cms.content[section] = {};
            }
            this.cms.content[section][key] = value;
        }
        this.cms.updateContent(this.cms.content);
    }

    createEditorField(item, index, fields, section, key) {
        const container = document.createElement('div');
        container.className = 'editor-item bg-white p-4 rounded-lg border border-apple-gray-200 mb-4';

        let fieldsHTML = '';
        fields.forEach(field => {
            if (field.type === 'checkbox') {
                fieldsHTML += `
                    <label class="flex items-center">
                        <input type="checkbox" ${item[field.id] ? 'checked' : ''} class="mr-2" data-field="${field.id}" data-index="${index}">
                        ${field.label}
                    </label>
                `;
            } else if (field.type === 'textarea') {
                fieldsHTML += `
                    <div class="mt-4">
                        <label class="block text-sm font-medium mb-1">${field.label}</label>
                        <textarea rows="3" class="w-full p-2 border rounded" data-field="${field.id}" data-index="${index}">${item[field.id] || ''}</textarea>
                    </div>
                `;
            } else {
                fieldsHTML += `
                    <div>
                        <label class="block text-sm font-medium mb-1">${field.label}</label>
                        <input type="${field.type}" value="${item[field.id] || ''}" class="w-full p-2 border rounded" data-field="${field.id}" data-index="${index}">
                    </div>
                `;
            }
        });

        container.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h4 class="font-semibold">${item.title || 'New Item'}</h4>
                <button class="text-red-600 hover:text-red-800" data-index="${index}">🗑️</button>
            </div>
            <div class="grid grid-cols-2 gap-4">${fieldsHTML}</div>
        `;

        container.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                const field = e.target.dataset.field;
                const index = parseInt(e.target.dataset.index);
                const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                item[field] = value;
                this.updateContent(section, key, this.cms.content[section][key]);
            });
        });

        container.querySelector('button').addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            this.cms.content[section][key].splice(index, 1);
            this.updateContent(section, key, this.cms.content[section][key]);
            this.loadTabContent(this.currentTab);
        });

        return container;
    }

    switchTab(tabName) {
        this.adminPanel.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        this.adminPanel.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        this.adminPanel.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
        this.adminPanel.querySelector(`#${tabName}-tab`).classList.remove('hidden');
        this.currentTab = tabName;
        this.loadTabContent(tabName);
    }

    loadTabContent(tabName) {
        const tabContainer = this.adminPanel.querySelector(`#${tabName}-tab`);
        tabContainer.innerHTML = ''; // Clear previous content

        switch (tabName) {
            case 'content':
                this.loadMainContent(tabContainer);
                break;
            case 'resume':
                this.loadResumeContent(tabContainer);
                break;
            case 'contact':
                this.loadContactContent(tabContainer);
                break;
            case 'settings':
                this.loadSettingsContent(tabContainer);
                break;
        }
    }

    loadMainContent(container) {
        container.innerHTML = `
            <h3 class="text-lg font-semibold mb-4">Main Content</h3>
            <div class="form-group mb-6">
                <label class="block text-sm font-medium mb-2">Site Title</label>
                <input type="text" id="site-title" class="w-full p-3 border border-apple-gray-300 rounded" value="${this.cms.content.site?.site_title || ''}">
            </div>
            <div class="form-group mb-6">
                <label class="block text-sm font-medium mb-2">Hero Greeting</label>
                <input type="text" id="hero-greeting-input" class="w-full p-3 border border-apple-gray-300 rounded" value="${this.cms.content.hero?.hero_greeting || ''}">
            </div>
            <div class="form-group mb-6">
                <label class="block text-sm font-medium mb-2">Hero Introduction</label>
                <textarea id="hero-intro-input" rows="4" class="w-full p-3 border border-apple-gray-300 rounded">${this.cms.content.hero?.hero_intro || ''}</textarea>
            </div>
            <div class="form-group mb-6">
                <label class="block text-sm font-medium mb-2">CTA Button Text</label>
                <input type="text" id="cta-button" class="w-full p-3 border border-apple-gray-300 rounded" value="${this.cms.content.hero?.cta_button || ''}">
            </div>
            <div class="form-group mb-6">
                <label class="block text-sm font-medium mb-2">About Content</label>
                <textarea id="about-content-input" rows="6" class="w-full p-3 border border-apple-gray-300 rounded">${this.cms.content.about?.personal_content || ''}</textarea>
            </div>
        `;
        container.querySelector('#site-title').addEventListener('input', (e) => this.updateContent('site', 'site_title', e.target.value));
        container.querySelector('#hero-greeting-input').addEventListener('input', (e) => this.updateContent('hero', 'hero_greeting', e.target.value));
        container.querySelector('#hero-intro-input').addEventListener('input', (e) => this.updateContent('hero', 'hero_intro', e.target.value));
        container.querySelector('#cta-button').addEventListener('input', (e) => this.updateContent('hero', 'cta_button', e.target.value));
        container.querySelector('#about-content-input').addEventListener('input', (e) => this.updateContent('about', 'personal_content', e.target.value));
    }

    loadResumeContent(container) {
        const listContainer = document.createElement('div');
        container.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Resume Items</h3>
                <button id="add-resume-item" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">➕ Add Item</button>
            </div>
        `;
        container.appendChild(listContainer);

        if (this.cms.content.resume?.resume_items) {
            this.cms.content.resume.resume_items.forEach((item, index) => {
                const fields = [
                    { id: 'title', label: 'Title', type: 'text' },
                    { id: 'status_text', label: 'Status Text', type: 'text' },
                    { id: 'description', label: 'Description', type: 'textarea' },
                    { id: 'link', label: 'Link (optional)', type: 'url' },
                    { id: 'visible', label: 'Visible', type: 'checkbox' },
                ];
                listContainer.appendChild(this.createEditorField(item, index, fields, 'resume', 'resume_items'));
            });
        }
        
        container.querySelector('#add-resume-item').addEventListener('click', () => {
            if (!this.cms.content.resume) this.cms.content.resume = { resume_items: [] };
            this.cms.content.resume.resume_items.push({
                id: `item_${Date.now()}`,
                title: 'New Item',
                description: '',
                status_text: 'New',
                link: '',
                visible: true
            });
            this.loadResumeContent(container);
        });
    }

    loadContactContent(container) {
        container.innerHTML = `
            <h3 class="text-lg font-semibold mb-4">Contact Methods</h3>
            <div id="contact-methods-list"></div>
            <h3 class="text-lg font-semibold mb-4 mt-8">Social Media Links</h3>
            <div id="social-links-list"></div>
        `;
        const methodsContainer = container.querySelector('#contact-methods-list');
        const socialContainer = container.querySelector('#social-links-list');

        if (this.cms.content.contact?.contact_methods) {
            this.cms.content.contact.contact_methods.forEach((item, index) => {
                const fields = [
                    { id: 'title', label: 'Title', type: 'text' },
                    { id: 'description', label: 'Description', type: 'text' },
                    { id: 'link', label: 'Link', type: 'url' },
                    { id: 'visible', label: 'Visible', type: 'checkbox' },
                ];
                methodsContainer.appendChild(this.createEditorField(item, index, fields, 'contact', 'contact_methods'));
            });
        }

        if (this.cms.content.contact?.social_links) {
            this.cms.content.contact.social_links.forEach((item, index) => {
                const fields = [
                    { id: 'platform', label: 'Platform', type: 'text' },
                    { id: 'url', label: 'URL', type: 'url' },
                    { id: 'visible', label: 'Visible', type: 'checkbox' },
                ];
                socialContainer.appendChild(this.createEditorField(item, index, fields, 'contact', 'social_links'));
            });
        }
    }

    loadSettingsContent(container) {
        container.innerHTML = `
            <h3 class="text-lg font-semibold mb-4">Navigation Settings</h3>
            <div id="navigation-list"></div>
            <h3 class="text-lg font-semibold mb-4 mt-8">Footer</h3>
            <div class="form-group">
                <label class="block text-sm font-medium mb-2">Footer Text</label>
                <input type="text" id="footer-text-input" class="w-full p-3 border border-apple-gray-300 rounded" value="${this.cms.content.footer?.footer_text || ''}">
            </div>
        `;
        const navContainer = container.querySelector('#navigation-list');
        if (this.cms.content.navigation) {
            this.cms.content.navigation.forEach((item, index) => {
                const fields = [
                    { id: 'title', label: 'Title', type: 'text' },
                    { id: 'target', label: 'Target', type: 'text' },
                    { id: 'visible', label: 'Visible', type: 'checkbox' },
                ];
                navContainer.appendChild(this.createEditorField(item, index, fields, 'navigation', null));
            });
        }
        container.querySelector('#footer-text-input').addEventListener('input', (e) => this.updateContent('footer', 'footer_text', e.target.value));
    }

    saveChanges() {
        const markdown = this.generateMarkdown();
        this.downloadFile('content.md', markdown);
        alert('✅ Changes saved! Download the updated content.md file.');
    }

    generateMarkdown() {
        const { site, hero, resume, about, contact, footer, navigation } = this.cms.content;
        let md = '# Samuel Paluba Portfolio - Content Management\n\n';

        if (site) {
            md += '## 🔧 Site Configuration\n```yaml\n';
            md += jsyaml.dump(site);
            md += '```\n\n';
        }

        if (hero) {
            md += '## 🏠 Hero Section\n```yaml\n';
            md += jsyaml.dump(hero);
            md += '```\n\n';
        }

        if (resume) {
            md += '## 📄 Resume Section\n```yaml\n';
            md += jsyaml.dump(resume);
            md += '```\n\n';
        }

        if (about) {
            md += '## 🧑‍🎓 About Section\n```yaml\n';
            md += jsyaml.dump(about);
            md += '```\n\n';
        }

        if (contact) {
            md += '## 📧 Contact Section\n```yaml\n';
            md += jsyaml.dump(contact);
            md += '```\n\n';
        }

        if (footer) {
            md += '## 🦶 Footer\n```yaml\n';
            md += jsyaml.dump(footer);
            md += '```\n\n';
        }

        if (navigation) {
            md += '## 🧭 Navigation\n```yaml\n';
            md += jsyaml.dump({ navigation: navigation });
            md += '```\n\n';
        }

        return md;
    }

    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportContent() {
        const markdown = this.generateMarkdown();
        this.downloadFile('exported-content.md', markdown);
    }

    show() {
        this.isVisible = true;
        this.adminPanel.classList.remove('hidden');
        this.loadTabContent(this.currentTab);
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.isVisible = false;
        this.adminPanel.classList.add('hidden');
        document.body.style.overflow = '';
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
}

// Initialize admin panel when CMS is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.portfolioCMS) {
            window.adminPanel = new AdminPanel(window.portfolioCMS);
            
            // Override CMS admin panel creation
            window.portfolioCMS.createAdminPanel = function() {
                window.adminPanel.show();
            };
        }
    }, 1000);
});
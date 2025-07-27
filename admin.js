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
                <div class="admin-content flex-1 overflow-hidden">
                    <div class="h-full flex">
                        <!-- Edit Panel -->
                        <div class="edit-panel w-1/2 p-6 overflow-y-auto border-r border-apple-gray-200">
                            <div id="content-tab" class="tab-content">
                                <h3 class="text-lg font-semibold mb-4">Main Content</h3>
                                
                                <div class="form-group mb-6">
                                    <label class="block text-sm font-medium mb-2">Site Title</label>
                                    <input type="text" id="site-title" class="w-full p-3 border border-apple-gray-300 rounded">
                                </div>

                                <div class="form-group mb-6">
                                    <label class="block text-sm font-medium mb-2">Hero Greeting</label>
                                    <input type="text" id="hero-greeting-input" class="w-full p-3 border border-apple-gray-300 rounded">
                                </div>

                                <div class="form-group mb-6">
                                    <label class="block text-sm font-medium mb-2">Hero Introduction</label>
                                    <textarea id="hero-intro-input" rows="4" class="w-full p-3 border border-apple-gray-300 rounded"></textarea>
                                </div>

                                <div class="form-group mb-6">
                                    <label class="block text-sm font-medium mb-2">CTA Button Text</label>
                                    <input type="text" id="cta-button" class="w-full p-3 border border-apple-gray-300 rounded">
                                </div>

                                <div class="form-group mb-6">
                                    <label class="block text-sm font-medium mb-2">About Content</label>
                                    <textarea id="about-content-input" rows="6" class="w-full p-3 border border-apple-gray-300 rounded"></textarea>
                                </div>
                            </div>

                            <div id="resume-tab" class="tab-content hidden">
                                <div class="flex justify-between items-center mb-4">
                                    <h3 class="text-lg font-semibold">Resume Items</h3>
                                    <button id="add-resume-item" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                        ➕ Add Item
                                    </button>
                                </div>
                                <div id="resume-items-list"></div>
                            </div>

                            <div id="contact-tab" class="tab-content hidden">
                                <h3 class="text-lg font-semibold mb-4">Contact Methods</h3>
                                <div id="contact-methods-list"></div>
                                
                                <h3 class="text-lg font-semibold mb-4 mt-8">Social Media Links</h3>
                                <div id="social-links-list"></div>
                            </div>

                            <div id="settings-tab" class="tab-content hidden">
                                <h3 class="text-lg font-semibold mb-4">Navigation Settings</h3>
                                <div id="navigation-list"></div>
                                
                                <h3 class="text-lg font-semibold mb-4 mt-8">Footer</h3>
                                <div class="form-group">
                                    <label class="block text-sm font-medium mb-2">Footer Text</label>
                                    <input type="text" id="footer-text-input" class="w-full p-3 border border-apple-gray-300 rounded">
                                </div>
                            </div>
                        </div>

                        <!-- Live Preview Panel -->
                        <div class="preview-panel w-1/2 bg-apple-gray-50">
                            <div class="p-4 bg-white border-b border-apple-gray-200">
                                <h3 class="font-semibold">Live Preview</h3>
                                <p class="text-sm text-apple-gray-600">Changes appear instantly</p>
                            </div>
                            <div class="preview-content p-4 h-full overflow-y-auto">
                                <iframe id="preview-iframe" src="index.html" class="w-full h-full border-0 rounded"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(adminPanel);
        this.adminPanel = adminPanel;
    }

    setupAdminEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Close admin
        document.getElementById('close-admin').addEventListener('click', () => {
            this.hide();
        });

        // Save changes
        document.getElementById('save-changes').addEventListener('click', () => {
            this.saveChanges();
        });

        // Export content
        document.getElementById('export-content').addEventListener('click', () => {
            this.exportContent();
        });

        // Add resume item
        document.getElementById('add-resume-item').addEventListener('click', () => {
            this.addResumeItem();
        });

        // Real-time updates
        this.setupRealTimeEditing();
    }

    setupRealTimeEditing() {
        // Hero section
        const heroGreetingInput = document.getElementById('hero-greeting-input');
        const heroIntroInput = document.getElementById('hero-intro-input');
        const ctaButtonInput = document.getElementById('cta-button');
        const aboutContentInput = document.getElementById('about-content-input');
        const footerTextInput = document.getElementById('footer-text-input');

        if (heroGreetingInput) {
            heroGreetingInput.addEventListener('input', (e) => {
                this.updateContent('hero', 'hero_greeting', e.target.value);
            });
        }

        if (heroIntroInput) {
            heroIntroInput.addEventListener('input', (e) => {
                this.updateContent('hero', 'hero_intro', e.target.value);
            });
        }

        if (ctaButtonInput) {
            ctaButtonInput.addEventListener('input', (e) => {
                this.updateContent('hero', 'cta_button', e.target.value);
            });
        }

        if (aboutContentInput) {
            aboutContentInput.addEventListener('input', (e) => {
                this.updateContent('about', 'personal_content', e.target.value);
            });
        }

        if (footerTextInput) {
            footerTextInput.addEventListener('input', (e) => {
                this.updateContent('footer', 'footer_text', e.target.value);
            });
        }
    }

    updateContent(section, key, value) {
        if (!this.cms.content[section]) {
            this.cms.content[section] = {};
        }
        this.cms.content[section][key] = value;
        this.cms.renderContent();
        this.refreshPreview();
    }

    refreshPreview() {
        const iframe = document.getElementById('preview-iframe');
        if (iframe) {
            iframe.src = iframe.src; // Force reload
        }
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`${tabName}-tab`).classList.remove('hidden');

        this.currentTab = tabName;
        this.loadTabContent(tabName);
    }

    loadTabContent(tabName) {
        switch (tabName) {
            case 'content':
                this.loadContentTab();
                break;
            case 'resume':
                this.loadResumeTab();
                break;
            case 'contact':
                this.loadContactTab();
                break;
            case 'settings':
                this.loadSettingsTab();
                break;
        }
    }

    loadContentTab() {
        if (this.cms.content.site) {
            document.getElementById('site-title').value = this.cms.content.site.site_title || '';
        }
        if (this.cms.content.hero) {
            document.getElementById('hero-greeting-input').value = this.cms.content.hero.hero_greeting || '';
            document.getElementById('hero-intro-input').value = this.cms.content.hero.hero_intro || '';
            document.getElementById('cta-button').value = this.cms.content.hero.cta_button || '';
        }
        if (this.cms.content.about) {
            document.getElementById('about-content-input').value = this.cms.content.about.personal_content || '';
        }
    }

    loadResumeTab() {
        const container = document.getElementById('resume-items-list');
        container.innerHTML = '';

        if (this.cms.content.resume && this.cms.content.resume.items) {
            this.cms.content.resume.items.forEach((item, index) => {
                container.appendChild(this.createResumeItemEditor(item, index));
            });
        }
    }

    createResumeItemEditor(item, index) {
        const div = document.createElement('div');
        div.className = 'resume-item-editor bg-white p-4 rounded-lg border border-apple-gray-200 mb-4';
        
        div.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h4 class="font-semibold">Item ${index + 1}</h4>
                <div class="flex space-x-2">
                    <label class="flex items-center">
                        <input type="checkbox" ${item.visible ? 'checked' : ''} class="mr-2" data-field="visible" data-index="${index}">
                        Visible
                    </label>
                    <button class="text-red-600 hover:text-red-800" onclick="this.parentElement.parentElement.parentElement.remove()">
                        🗑️
                    </button>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Title</label>
                    <input type="text" value="${item.title || ''}" class="w-full p-2 border rounded" data-field="title" data-index="${index}">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Status Text</label>
                    <input type="text" value="${item.status_text || ''}" class="w-full p-2 border rounded" data-field="status_text" data-index="${index}">
                </div>
            </div>
            
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1">Description</label>
                <textarea rows="3" class="w-full p-2 border rounded" data-field="description" data-index="${index}">${item.description || ''}</textarea>
            </div>
            
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1">Link (optional)</label>
                <input type="url" value="${item.link || ''}" class="w-full p-2 border rounded" data-field="link" data-index="${index}">
            </div>
        `;

        // Add event listeners for real-time updates
        div.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => {
                const field = e.target.dataset.field;
                const index = parseInt(e.target.dataset.index);
                const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                
                if (this.cms.content.resume && this.cms.content.resume.items[index]) {
                    this.cms.content.resume.items[index][field] = value;
                    this.cms.renderContent();
                }
            });
        });

        return div;
    }

    addResumeItem() {
        if (!this.cms.content.resume) {
            this.cms.content.resume = { items: [] };
        }
        if (!this.cms.content.resume.items) {
            this.cms.content.resume.items = [];
        }

        const newItem = {
            id: `item_${Date.now()}`,
            title: "🆕 New Item",
            description: "Description for new item...",
            status_text: "New",
            link: "",
            visible: true
        };

        this.cms.content.resume.items.push(newItem);
        this.loadResumeTab();
        this.cms.renderContent();
    }

    loadContactTab() {
        // Implementation for contact methods and social links editing
        const methodsContainer = document.getElementById('contact-methods-list');
        const socialContainer = document.getElementById('social-links-list');
        
        // Contact methods
        if (this.cms.content.contact && this.cms.content.contact.methods) {
            methodsContainer.innerHTML = this.cms.content.contact.methods
                .map((method, index) => this.createContactMethodEditor(method, index))
                .join('');
        }
        
        // Social links
        if (this.cms.content.contact && this.cms.content.contact.social) {
            socialContainer.innerHTML = this.cms.content.contact.social
                .map((social, index) => this.createSocialLinkEditor(social, index))
                .join('');
        }
    }

    createContactMethodEditor(method, index) {
        return `
            <div class="contact-method-editor bg-white p-4 rounded-lg border border-apple-gray-200 mb-4">
                <div class="flex justify-between items-center mb-4">
                    <h5 class="font-medium">${method.title}</h5>
                    <label class="flex items-center">
                        <input type="checkbox" ${method.visible ? 'checked' : ''} class="mr-2" onchange="updateContactMethod(${index}, 'visible', this.checked)">
                        Visible
                    </label>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Title</label>
                        <input type="text" value="${method.title || ''}" class="w-full p-2 border rounded" onchange="updateContactMethod(${index}, 'title', this.value)">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Description</label>
                        <input type="text" value="${method.description || ''}" class="w-full p-2 border rounded" onchange="updateContactMethod(${index}, 'description', this.value)">
                    </div>
                </div>
            </div>
        `;
    }

    createSocialLinkEditor(social, index) {
        return `
            <div class="social-link-editor bg-white p-4 rounded-lg border border-apple-gray-200 mb-4">
                <div class="flex justify-between items-center mb-4">
                    <h5 class="font-medium">${social.platform}</h5>
                    <label class="flex items-center">
                        <input type="checkbox" ${social.visible ? 'checked' : ''} class="mr-2" onchange="updateSocialLink(${index}, 'visible', this.checked)">
                        Visible
                    </label>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Platform</label>
                        <input type="text" value="${social.platform || ''}" class="w-full p-2 border rounded" onchange="updateSocialLink(${index}, 'platform', this.value)">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">URL</label>
                        <input type="url" value="${social.url || ''}" class="w-full p-2 border rounded" onchange="updateSocialLink(${index}, 'url', this.value)">
                    </div>
                </div>
            </div>
        `;
    }

    loadSettingsTab() {
        // Navigation settings
        const navContainer = document.getElementById('navigation-list');
        if (this.cms.content.navigation) {
            navContainer.innerHTML = this.cms.content.navigation
                .map((item, index) => this.createNavigationEditor(item, index))
                .join('');
        }

        // Footer
        if (this.cms.content.footer) {
            document.getElementById('footer-text-input').value = this.cms.content.footer.footer_text || '';
        }
    }

    createNavigationEditor(item, index) {
        return `
            <div class="nav-item-editor bg-white p-4 rounded-lg border border-apple-gray-200 mb-4">
                <div class="flex justify-between items-center mb-4">
                    <h5 class="font-medium">${item.title}</h5>
                    <label class="flex items-center">
                        <input type="checkbox" ${item.visible ? 'checked' : ''} class="mr-2">
                        Visible
                    </label>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Title</label>
                        <input type="text" value="${item.title || ''}" class="w-full p-2 border rounded">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Target</label>
                        <input type="text" value="${item.target || ''}" class="w-full p-2 border rounded">
                    </div>
                </div>
            </div>
        `;
    }

    saveChanges() {
        // Generate updated markdown content
        const markdown = this.generateMarkdown();
        
        // In a real implementation, this would save to the server
        console.log('Saving changes...');
        this.downloadFile('content.md', markdown);
        
        alert('✅ Changes saved! Download the updated content.md file.');
    }

    generateMarkdown() {
        // Convert current content back to markdown format
        let md = '# Samuel Paluba Portfolio - Content Management\n\n';
        
        // Add sections based on current content
        if (this.cms.content.site) {
            md += '## 🔧 Site Configuration\n```yaml\n';
            md += `site_title: "${this.cms.content.site.site_title}"\n`;
            md += `name: "${this.cms.content.site.name}"\n`;
            md += '```\n\n';
        }

        if (this.cms.content.hero) {
            md += '## 🏠 Hero Section\n```yaml\n';
            md += `hero_greeting: "${this.cms.content.hero.hero_greeting}"\n`;
            md += `hero_intro: "${this.cms.content.hero.hero_intro}"\n`;
            md += `cta_button: "${this.cms.content.hero.cta_button}"\n`;
            md += '```\n\n';
        }

        // Add more sections...
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

// CSS Styles for Admin Panel
const adminStyles = `
<style>
    .admin-container {
        font-family: 'JetBrains Mono', monospace;
    }
    
    .tab-btn.active {
        background-color: white;
        border-bottom: 2px solid #1f2937;
    }
    
    .tab-btn:not(.active) {
        background-color: #f3f4f6;
        color: #6b7280;
    }
    
    .tab-btn:not(.active):hover {
        background-color: #e5e7eb;
        color: #374151;
    }
    
    .form-group label {
        color: #374151;
        font-weight: 500;
    }
    
    .form-group input,
    .form-group textarea {
        border: 1px solid #d1d5db;
        font-family: 'JetBrains Mono', monospace;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #1f2937;
        box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.1);
    }
    
    .resume-item-editor,
    .contact-method-editor,
    .social-link-editor,
    .nav-item-editor {
        transition: all 0.3s ease;
    }
    
    .resume-item-editor:hover,
    .contact-method-editor:hover,
    .social-link-editor:hover,
    .nav-item-editor:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
</style>
`;

// Inject admin styles
document.head.insertAdjacentHTML('beforeend', adminStyles);

// Global functions for admin panel
window.updateContactMethod = function(index, field, value) {
    if (window.portfolioCMS && window.portfolioCMS.content.contact && window.portfolioCMS.content.contact.methods[index]) {
        window.portfolioCMS.content.contact.methods[index][field] = value;
        window.portfolioCMS.renderContent();
    }
};

window.updateSocialLink = function(index, field, value) {
    if (window.portfolioCMS && window.portfolioCMS.content.contact && window.portfolioCMS.content.contact.social[index]) {
        window.portfolioCMS.content.contact.social[index][field] = value;
        window.portfolioCMS.renderContent();
    }
};

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
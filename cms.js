// Samuel Paluba Portfolio - Content Management System
class PortfolioCMS {
    constructor() {
        this.content = {};
        this.isAdminMode = false;
        this.init();
    }

    async init() {
        await this.loadContent();
        this.renderContent();
        this.setupEventListeners();
        this.checkAdminMode();
    }

    async loadContent() {
        try {
            const response = await fetch('content.md');
            const markdown = await response.text();
            this.content = this.parseMarkdownContent(markdown);
        } catch (error) {
            console.warn('Could not load content.md, using fallback content');
            this.content = this.getFallbackContent();
        }
    }

    parseMarkdownContent(markdown) {
        const content = {};
        const sections = markdown.split('## ');

        for (const section of sections) {
            if (!section.trim()) continue;

            const lines = section.split('\n');
            const sectionTitle = lines[0].replace(/🔧|🏠|📄|🧑‍🎓|📧|🦶|🧭/g, '').trim();
            const yamlContent = this.extractYamlFromSection(section);
            
            switch (sectionTitle) {
                case 'Site Configuration':
                    content.site = yamlContent;
                    break;
                case 'Hero Section':
                    content.hero = yamlContent;
                    break;
                case 'Resume Section':
                    content.resume = yamlContent;
                    break;
                case 'About Section':
                    content.about = yamlContent;
                    break;
                case 'Contact Section':
                    content.contact = yamlContent;
                    break;
                case 'Footer':
                    content.footer = yamlContent;
                    break;
                case 'Navigation':
                    content.navigation = yamlContent.navigation;
                    break;
            }
        }
        return content;
    }

    extractYamlFromSection(section) {
        const yamlBlocks = section.match(/```yaml\n([\s\S]*?)\n```/g);
        if (!yamlBlocks) return {};

        let result = {};
        for (const block of yamlBlocks) {
            const yamlContent = block.replace(/```yaml\n|\n```/g, '');
            try {
                const parsed = jsyaml.load(yamlContent);
                result = { ...result, ...parsed };
            } catch (e) {
                console.error('Error parsing YAML:', e);
            }
        }
        return result;
    }

    getFallbackContent() {
        return {
            site: {
                site_title: "Samuel Paluba - IT Freelancer & Crypto-Anarchist",
                name: "👨‍💻 Samuel Paluba"
            },
            hero: {
                hero_greeting: "👋 Hey there, I'm Samuel!",
                hero_intro: "I'm a 16 y.o freelancer in the IT field, a libertarian/crypto-anarchist, and I'm currently working on a project called LibertyLoft. I also serve as a Local Coordinator for Students for Liberty.",
                cta_button: "📄 See My Resume"
            },
            resume: {
                section_title: "📄 Resume",
                resume_items: [
                    {
                        id: "libertyloft",
                        title: "🏛️ LibertyLoft",
                        description: "A community center in Prague focused on libertarian principles and crypto-anarchist ideals.",
                        link: "https://LibertyLoft.cz",
                        status_text: "Visit Project",
                        visible: true
                    }
                ]
            },
            contact: {
                section_title: "📧 Get In Touch",
                contact_methods: [],
                social_links: []
            }
        };
    }

    renderContent() {
        this.renderSiteTitle();
        this.renderNavigation();
        this.renderHero();
        this.renderResume();
        this.renderAbout();
        this.renderContact();
        this.renderFooter();
    }

    renderSiteTitle() {
        if (this.content.site?.site_title) {
            document.title = this.content.site.site_title;
        }
        if (this.content.site?.name) {
            const nameElements = document.querySelectorAll('.site-name');
            nameElements.forEach(el => {
                el.textContent = this.content.site.name;
            });
        }
    }

    renderNavigation() {
        if (!this.content.navigation) return;
        
        const desktopNav = document.querySelector('#desktop-nav');
        const mobileNav = document.querySelector('#mobile-nav');
        
        if (desktopNav && mobileNav) {
            const navHTML = this.content.navigation
                .filter(item => item.visible)
                .map(item => `<a href="${item.target}" class="hover:text-apple-gray-600 transition-colors">${item.title}</a>`)
                .join('');
            
            desktopNav.innerHTML = navHTML;
            mobileNav.innerHTML = navHTML;

            // Re-add event listeners for smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offset = 80; // Account for fixed header
                        const targetPosition = target.offsetTop - offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                    // Close mobile menu if open
                    document.getElementById('mobile-menu').classList.add('hidden');
                });
            });
        }
    }

    renderHero() {
        if (!this.content.hero) return;
        
        const greetingEl = document.querySelector('#hero-greeting');
        const introEl = document.querySelector('#hero-intro');
        const ctaEl = document.querySelector('#hero-cta');
        
        if (greetingEl && this.content.hero.hero_greeting) {
            greetingEl.innerHTML = this.content.hero.hero_greeting;
        }
        if (introEl && this.content.hero.hero_intro) {
            introEl.textContent = this.content.hero.hero_intro;
        }
        if (ctaEl && this.content.hero.cta_button) {
            ctaEl.textContent = this.content.hero.cta_button;
        }
    }

    renderResume() {
        if (!this.content.resume) return;
        
        const titleEl = document.querySelector('#resume-title');
        const containerEl = document.querySelector('#resume-container');
        
        if (titleEl && this.content.resume.section_title) {
            titleEl.textContent = this.content.resume.section_title;
        }
        
        if (containerEl && this.content.resume.resume_items) {
            const itemsHTML = this.content.resume.resume_items
                .filter(item => item.visible)
                .map(item => this.createResumeItemHTML(item))
                .join('');
            
            containerEl.innerHTML = itemsHTML;
        }
    }

    createResumeItemHTML(item) {
        const hasLink = item.link && item.link.trim() !== '';
        const linkHTML = hasLink 
            ? `<a href="${item.link}" target="_blank" class="inline-flex items-center text-apple-gray-900 hover:text-apple-gray-600 transition-colors">
                ${item.status_text}
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
               </a>`
            : `<span class="inline-flex items-center text-apple-gray-500">${item.status_text}</span>`;

        return `
            <div class="project-card bg-white rounded-xl p-8 shadow-sm border border-apple-gray-200 fade-in">
                <h3 class="text-xl font-semibold mb-4">${item.title}</h3>
                <p class="text-apple-gray-600 mb-4">${item.description}</p>
                ${linkHTML}
            </div>
        `;
    }

    renderAbout() {
        if (!this.content.about) return;
        
        const titleEl = document.querySelector('#about-title');
        const contentEl = document.querySelector('#about-content');
        
        if (titleEl && this.content.about.section_title) {
            titleEl.textContent = this.content.about.section_title;
        }
        
        if (contentEl && this.content.about.personal_content) {
            const paragraphs = this.content.about.personal_content.split('\n\n');
            const contentHTML = paragraphs
                .map(p => `<p class="text-apple-gray-600 mb-6 leading-relaxed text-lg">${p.trim()}</p>`)
                .join('');
            contentEl.innerHTML = contentHTML;
        }
    }

    renderContact() {
        if (!this.content.contact) return;
        
        const titleEl = document.querySelector('#contact-title');
        const methodsEl = document.querySelector('#contact-methods');
        const socialEl = document.querySelector('#social-links');
        
        if (titleEl && this.content.contact.section_title) {
            titleEl.textContent = this.content.contact.section_title;
        }
        
        if (methodsEl && this.content.contact.contact_methods) {
            const methodsHTML = this.content.contact.contact_methods
                .filter(method => method.visible)
                .map(method => this.createContactMethodHTML(method))
                .join('');
            methodsEl.innerHTML = methodsHTML;
        }
        
        if (socialEl && this.content.contact.social_links) {
            const socialHTML = this.content.contact.social_links
                .filter(social => social.visible)
                .map(social => this.createSocialLinkHTML(social))
                .join('');
            socialEl.innerHTML = socialHTML;
        }
    }

    createContactMethodHTML(method) {
        const hasLink = method.link && method.link.trim() !== '';
        const element = hasLink ? 'a' : 'div';
        const linkAttr = hasLink ? `href="${method.link}" target="_blank"` : '';
        const hoverClass = hasLink ? 'hover:shadow-md transition-shadow cursor-pointer' : '';
        
        return `
            <${element} ${linkAttr} class="bg-white rounded-xl p-6 shadow-sm border border-apple-gray-200 fade-in ${hoverClass}">
                <h3 class="font-semibold mb-2">${method.title}</h3>
                <p class="text-apple-gray-600">${method.description}</p>
            </${element}>
        `;
    }

    createSocialLinkHTML(social) {
        return `
            <a href="${social.url}" class="social-icon p-3 bg-white rounded-full shadow-sm border border-apple-gray-200 hover:shadow-md" title="${social.platform}">
                ${this.getSocialIcon(social.id)}
            </a>
        `;
    }

    getSocialIcon(platform) {
        const icons = {
            github: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599-.262.793-.85.793-1.85v-3.212c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801 1.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
            linkedin: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
            instagram: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
            email: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        };
        return icons[platform] || icons.email;
    }

    renderFooter() {
        if (!this.content.footer) return;
        
        const footerEl = document.querySelector('#footer-text');
        if (footerEl && this.content.footer.footer_text) {
            footerEl.textContent = this.content.footer.footer_text;
        }
    }

    setupEventListeners() {
        // Listen for content changes
        document.addEventListener('contentUpdated', (e) => {
            this.content = e.detail;
            this.renderContent();
        });

        // Admin mode toggle
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                this.toggleAdminMode();
            }
        });
    }

    checkAdminMode() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('admin') === 'true') {
            this.enableAdminMode();
        }
    }

    toggleAdminMode() {
        this.isAdminMode = !this.isAdminMode;
        if (this.isAdminMode) {
            this.enableAdminMode();
        } else {
            this.disableAdminMode();
        }
    }

    enableAdminMode() {
        this.isAdminMode = true;
        document.body.classList.add('admin-mode');
        this.createAdminPanel();
    }

    disableAdminMode() {
        this.isAdminMode = false;
        document.body.classList.remove('admin-mode');
        const adminPanel = document.querySelector('#admin-panel');
        if (adminPanel) {
            adminPanel.remove();
        }
    }

    createAdminPanel() {
        // Admin panel will be created in the admin interface implementation
        console.log('Admin mode enabled. Admin panel will be implemented next.');
    }

    // Method to update content and refresh display
    updateContent(newContent) {
        this.content = newContent;
        this.renderContent();
        
        // Trigger animations for new elements
        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
    }
}

// Initialize CMS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioCMS = new PortfolioCMS();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioCMS;
}
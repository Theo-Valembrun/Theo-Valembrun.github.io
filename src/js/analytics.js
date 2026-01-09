/**
 * Analytics Module
 * Handles Google Analytics initialization with consent management
 */

export class AnalyticsManager {
  constructor() {
    this.config = null;
    this.initialized = false;
    this.init();
  }

  async init() {
    try {
      // Load analytics config
      const configModule = await import('/analytics-config.js');
      this.config = configModule.default;
      
      // Check for consent
      if (this.hasConsent()) {
        this.loadAnalytics();
      }
      
      // Listen for consent events
      window.addEventListener('analytics-consent-granted', () => {
        this.loadAnalytics();
      });
    } catch (error) {
      console.warn('Analytics config not found or failed to load:', error);
    }
  }

  hasConsent() {
    return localStorage.getItem('analytics-consent') === 'granted';
  }

  loadAnalytics() {
    if (this.initialized || !this.config?.gaId) {
      return;
    }

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', this.config.gaId, {
      anonymize_ip: this.config.anonymizeIp || true,
      cookie_flags: 'SameSite=None;Secure'
    });

    this.initialized = true;
    this.setupEventTracking();
  }

  setupEventTracking() {
    if (typeof gtag === 'undefined') {
      return;
    }

    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const section = e.target.getAttribute('href')?.substring(1);
        if (section) {
          this.trackEvent('navigation_click', {
            section_name: section,
            link_text: e.target.textContent
          });
        }
      });
    });

    // Track contact interactions
    document.querySelectorAll('.btn[href*="mailto"], .btn[href*="tel"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const contactType = e.target.href.includes('mailto') ? 'email' : 
                           e.target.href.includes('tel') ? 'phone' : 'contact';
        this.trackEvent('contact_interaction', {
          contact_method: contactType
        });
      });
    });

    // Track social media clicks
    document.querySelectorAll('.social-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = e.currentTarget.getAttribute('href') || '';
        const platform = href.includes('linkedin') ? 'linkedin' : 
                        href.includes('github') ? 'github' : 'social';
        this.trackEvent('social_click', {
          platform: platform
        });
      });
    });
  }

  trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        ...parameters,
        timestamp: new Date().toISOString()
      });
    }
  }
}

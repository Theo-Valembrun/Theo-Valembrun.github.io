// Analytics Loader with Consent Management
export class AnalyticsManager {
  constructor() {
    this.isLoaded = false;
    this.config = null;
    this.initialize();
  }

  async initialize() {
    // Listen for consent granted event
    window.addEventListener('analytics-consent-granted', () => {
      this.loadAnalytics();
    });

    // Check if consent was previously granted
    const consent = localStorage.getItem('analytics-consent');
    if (consent === 'granted') {
      await this.loadAnalytics();
    }
  }

  async loadAnalytics() {
    if (this.isLoaded) {
      return; // Already loaded
    }

    try {
      // Load analytics config by injecting script tag
      await this.loadConfigScript();
      
      // Config should now be available as global ANALYTICS_CONFIG
      this.config = window.ANALYTICS_CONFIG;

      if (!this.config) {
        console.warn('Analytics: Configuration not found');
        return;
      }

      // Check privacy settings
      if (this.config.privacy && this.config.privacy.respect_dnt) {
        if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
          console.log('Analytics: Do Not Track is enabled, respecting user preference');
          return;
        }
      }

      if (!this.config.gaId) {
        console.warn('Analytics: No GA ID configured');
        return;
      }

      // Load Google Analytics
      this.loadGoogleAnalytics();
      this.isLoaded = true;
      
    } catch (error) {
      console.error('Analytics: Failed to load', error);
    }
  }

  loadConfigScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/analytics-config.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load analytics config'));
      document.head.appendChild(script);
    });
  }

  loadGoogleAnalytics() {
    // Create script tag for gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gaId}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', this.config.gaId, {
      anonymize_ip: this.config.privacy?.anonymize_ip ?? true
    });
  }

  // Track custom events
  trackEvent(eventName, eventParams = {}) {
    if (!this.isLoaded || !window.gtag) {
      return;
    }

    window.gtag('event', eventName, eventParams);
  }

  // Grant consent programmatically
  static grantConsent() {
    localStorage.setItem('analytics-consent', 'granted');
    window.dispatchEvent(new Event('analytics-consent-granted'));
  }

  // Revoke consent
  static revokeConsent() {
    localStorage.removeItem('analytics-consent');
    // Note: This won't unload already-loaded analytics
    console.log('Analytics: Consent revoked for future sessions');
  }
}

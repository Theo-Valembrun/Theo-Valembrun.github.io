// Analytics Module - Consent-gated Google Analytics loader
'use strict';

export class AnalyticsManager {
    constructor() {
        this.config = null;
        this.init();
    }

    async init() {
        // Check for consent before loading analytics
        if (this.hasConsent()) {
            await this.loadAnalytics();
        }

        // Listen for consent grant event
        window.addEventListener('analytics-consent-granted', () => {
            this.loadAnalytics();
        });
    }

    hasConsent() {
        return localStorage.getItem('analytics-consent') === 'granted';
    }

    async loadAnalytics() {
        try {
            // Load analytics config from public directory as JSON
            const response = await fetch('/analytics-config.js');
            const text = await response.text();
            
            // Remove comments and parse as JSON
            const jsonText = text.replace(/\/\/.*/g, '').trim();
            this.config = JSON.parse(jsonText);

            if (!this.config.gaId) {
                console.warn('Analytics: No GA ID configured');
                return;
            }

            // Load Google Analytics script
            this.loadGoogleAnalytics();
            this.initializeTracking();
        } catch (error) {
            console.error('Analytics: Failed to load configuration', error);
        }
    }

    loadGoogleAnalytics() {
        // Check if already loaded
        if (window.gtag) {
            return;
        }

        // Create and append GA script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gaId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());

        // Configure with privacy settings
        const configOptions = {};
        if (this.config.privacy?.anonymize_ip) {
            configOptions.anonymize_ip = true;
        }

        window.gtag('config', this.config.gaId, configOptions);
    }

    initializeTracking() {
        // Track page view
        this.trackPageView();

        // Track custom events
        this.trackNavigationClicks();
        this.trackSocialClicks();
        this.trackScrollDepth();
    }

    trackPageView() {
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    trackEvent(eventName, eventParams = {}) {
        if (window.gtag && this.hasConsent()) {
            window.gtag('event', eventName, eventParams);
        }
    }

    trackNavigationClicks() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const section = e.target.getAttribute('href')?.replace('#', '');
                this.trackEvent('navigation_click', {
                    section: section
                });
            });
        });
    }

    trackSocialClicks() {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = e.target.closest('a').getAttribute('aria-label');
                this.trackEvent('social_click', {
                    platform: platform
                });
            });
        });
    }

    trackScrollDepth() {
        const scrollDepths = [25, 50, 75, 90];
        const trackedDepths = new Set();

        const checkScrollDepth = () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            scrollDepths.forEach(depth => {
                if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                    trackedDepths.add(depth);
                    this.trackEvent('scroll_depth', {
                        scroll_depth: depth
                    });
                }
            });
        };

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    checkScrollDepth();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

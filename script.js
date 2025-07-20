// Modern Portfolio JavaScript - Highly Optimized & Performance-Focused

'use strict';

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTheme();
        this.initializeNavigation();
        this.initializeAnimations();
        this.initializeIntersectionObserver();
        this.initializeContactForm();
        this.initializePerformanceOptimizations();
        
        // Remove loading screen once everything is ready
        this.removeLoadingScreen();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }

        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => this.toggleNavigation(navToggle, navMenu));
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, navMenu, navToggle));
        });

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', this.scrollToTop);
        }

        // Scroll events (throttled)
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Resize events (debounced)
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
    }

    // Theme Management
    initializeTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }

        // Announce theme change for accessibility
        this.announceToScreenReader(`Switched to ${theme} theme`);
    }

    // Navigation Management
    initializeNavigation() {
        this.updateActiveNavLink();
    }

    toggleNavigation(navToggle, navMenu) {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            this.closeNavigation(navToggle, navMenu);
        } else {
            this.openNavigation(navToggle, navMenu);
        }
    }

    openNavigation(navToggle, navMenu) {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstNavLink = navMenu.querySelector('.nav-link');
        if (firstNavLink) firstNavLink.focus();
    }

    closeNavigation(navToggle, navMenu) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    handleNavClick(e, navMenu, navToggle) {
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu
                this.closeNavigation(navToggle, navMenu);
                
                // Smooth scroll to target
                this.smoothScrollTo(targetElement);
                
                // Update active nav link
                this.setActiveNavLink(e.target);
            }
        }
    }

    smoothScrollTo(element) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // Animation Management
    initializeAnimations() {
        // Initialize progress bars
        this.initializeProgressBars();
        
        // Add stagger animation delays
        this.addStaggerAnimations();
    }

    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
                // Animate progress bar when it comes into view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                bar.style.width = `${progress}%`;
                            }, 200);
                            observer.unobserve(entry.target);
                        }
                    });
                });
                observer.observe(bar);
            }
        });
    }

    addStaggerAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    // Intersection Observer for Performance
    initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateElement(element) {
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('animate-fadeInUp');
        }, parseInt(delay));
    }

    // Contact Form Management
    initializeContactForm() {
        // Initialize character counter
        this.initializeCharacterCounter();
        
        // Real-time validation
        const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        // Form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    initializeCharacterCounter() {
        const messageField = document.getElementById('message');
        const charCountElement = document.getElementById('char-count');
        
        if (messageField && charCountElement) {
            messageField.addEventListener('input', () => {
                const currentLength = messageField.value.length;
                charCountElement.textContent = currentLength;
                
                // Color coding based on character count
                if (currentLength > 900) {
                    charCountElement.style.color = '#ef4444';
                } else if (currentLength > 800) {
                    charCountElement.style.color = '#f59e0b';
                } else {
                    charCountElement.style.color = '#6b7280';
                }
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Validation rules
        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                } else if (value.length > 50) {
                    errorMessage = 'Name must be less than 50 characters';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'company':
                if (value.length > 100) {
                    errorMessage = 'Company name must be less than 100 characters';
                    isValid = false;
                }
                break;

            case 'subject':
                if (!value) {
                    errorMessage = 'Please select a subject';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                } else if (value.length > 1000) {
                    errorMessage = 'Message must be less than 1000 characters';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        field.style.borderColor = '#ef4444';
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        field.style.borderColor = '';
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('.form-submit');
        const statusElement = document.getElementById('form-status');
        
        // Validate all fields
        const formInputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        formInputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showFormStatus('Please fix the errors above', 'error');
            return;
        }
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(new FormData(form));
            
            // Success
            this.showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Analytics tracking (if implemented)
            this.trackFormSubmission();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus('Something went wrong. Please try again later.', 'error');
        } finally {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }

    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // 90% success rate for demo
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    showFormStatus(message, type) {
        const statusElement = document.getElementById('form-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `form-status ${type}`;
            statusElement.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }

    // Scroll Event Handlers
    handleScroll() {
        this.updateActiveNavLink();
        this.updateBackToTopButton();
        this.updateNavbarAppearance();
    }

    updateBackToTopButton() {
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    updateNavbarAppearance() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'var(--bg-overlay)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'var(--bg-overlay)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Resize Handler
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navToggle) {
                this.closeNavigation(navToggle, navMenu);
            }
        }
    }

    // Keyboard Navigation
    handleKeyboardNavigation(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navToggle && navMenu.classList.contains('active')) {
                this.closeNavigation(navToggle, navMenu);
                navToggle.focus();
            }
        }
        
        // Alt + T for theme toggle
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            this.toggleTheme();
        }
    }

    // Performance Optimizations
    initializePerformanceOptimizations() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Initialize Web Vitals tracking
        this.initializeWebVitals();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    preloadCriticalResources() {
        // Preload hero image if it exists
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage && heroImage.dataset.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = heroImage.dataset.src;
            document.head.appendChild(link);
        }
    }

    initializeWebVitals() {
        // Monitor Core Web Vitals (LCP, FID, CLS)
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            }).observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift
            new PerformanceObserver((list) => {
                let clsValue = 0;
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('CLS:', clsValue);
            }).observe({ entryTypes: ['layout-shift'] });
        }
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    trackFormSubmission() {
        // Analytics tracking placeholder
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'contact',
                event_label: 'portfolio_contact_form'
            });
        }
    }

    removeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1000);
        }
    }
}

// Enhanced Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could send to error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send to error tracking service
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioApp();
    });
} else {
    new PortfolioApp();
}

// Google Analytics Enhanced Tracking
class AnalyticsTracker {
    constructor() {
        this.init();
    }

    init() {
        if (typeof gtag !== 'undefined') {
            this.setupEventTracking();
        }
    }

    setupEventTracking() {
        // Track navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const section = e.target.getAttribute('href').substring(1);
                this.trackEvent('navigation_click', {
                    section_name: section,
                    link_text: e.target.textContent
                });
            });
        });

        // Track contact button clicks
        document.querySelectorAll('.contact-link, .btn[href*="mailto"], .btn[href*="tel"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const contactType = e.target.href.includes('mailto') ? 'email' : 
                                  e.target.href.includes('tel') ? 'phone' : 'contact';
                this.trackEvent('contact_interaction', {
                    contact_method: contactType,
                    button_text: e.target.textContent
                });
            });
        });

        // Track social media clicks
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = e.target.href.includes('linkedin') ? 'linkedin' : 
                               e.target.href.includes('github') ? 'github' : 'social';
                this.trackEvent('social_click', {
                    platform: platform,
                    outbound: true
                });
            });
        });

        // Track project interactions
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectTitle = card.querySelector('h3')?.textContent || 'Unknown Project';
                this.trackEvent('project_view', {
                    project_name: projectTitle
                });
            });
        });

        // Track skill card interactions
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const skillName = card.querySelector('h3')?.textContent || 'Unknown Skill';
                this.trackEvent('skill_hover', {
                    skill_name: skillName
                });
            });
        });

        // Track theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.trackEvent('theme_toggle', {
                    from_theme: currentTheme,
                    to_theme: newTheme
                });
            });
        }

        // Track scroll depth
        this.trackScrollDepth();

        // Track time on page
        this.trackTimeOnPage();
    }

    trackEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...parameters,
                timestamp: new Date().toISOString()
            });
        }
    }

    trackScrollDepth() {
        const scrollDepths = [25, 50, 75, 90];
        const trackedDepths = new Set();

        window.addEventListener('scroll', this.throttle(() => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            scrollDepths.forEach(depth => {
                if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                    trackedDepths.add(depth);
                    this.trackEvent('scroll_depth', {
                        scroll_depth: depth,
                        page_height: document.documentElement.scrollHeight
                    });
                }
            });
        }, 500));
    }

    trackTimeOnPage() {
        const startTime = Date.now();
        
        // Track time intervals
        const intervals = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
        const trackedIntervals = new Set();

        const trackInterval = () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            
            intervals.forEach(interval => {
                if (timeOnPage >= interval && !trackedIntervals.has(interval)) {
                    trackedIntervals.add(interval);
                    this.trackEvent('time_on_page', {
                        time_threshold: interval,
                        total_time: timeOnPage
                    });
                }
            });
        };

        setInterval(trackInterval, 10000); // Check every 10 seconds

        // Track when user leaves
        window.addEventListener('beforeunload', () => {
            const totalTime = Math.round((Date.now() - startTime) / 1000);
            this.trackEvent('page_exit', {
                total_time_on_page: totalTime
            });
        });
    }

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

// Initialize Analytics Tracking
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AnalyticsTracker();
    });
} else {
    new AnalyticsTracker();
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, AnalyticsTracker };
}

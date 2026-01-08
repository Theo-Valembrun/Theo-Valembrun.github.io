// Core Portfolio App Module
'use strict';

export class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeNavigation();
        this.initializePerformanceOptimizations();
        this.removeLoadingScreen();
    }

    setupEventListeners() {
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

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
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
        const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
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
        // Close mobile menu on desktop view
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (window.innerWidth > 768 && navMenu?.classList.contains('active')) {
            this.closeNavigation(navToggle, navMenu);
        }
    }

    // Keyboard Navigation
    handleKeyboardNavigation(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu?.classList.contains('active')) {
                this.closeNavigation(navToggle, navMenu);
                navToggle?.focus();
            }
        }
    }

    // Performance Optimizations
    initializePerformanceOptimizations() {
        // Passive event listeners for better scroll performance
        if (typeof window.addEventListener === 'function') {
            const passiveSupported = this.detectPassiveSupport();
            if (passiveSupported) {
                window.addEventListener('scroll', () => {}, { passive: true });
                window.addEventListener('touchstart', () => {}, { passive: true });
            }
        }
    }

    detectPassiveSupport() {
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (err) {
            passiveSupported = false;
        }
        return passiveSupported;
    }

    removeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 500);
        }
    }

    // Utility Functions
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

    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }
}

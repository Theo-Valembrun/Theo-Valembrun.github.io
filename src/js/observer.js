// Intersection Observer Module for animations and lazy loading
'use strict';

export class ObserverManager {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Skip animations if user prefers reduced motion
            this.initializeWithoutAnimations();
        } else {
            this.initializeProgressBars();
            this.addStaggerAnimations();
            this.initializeIntersectionObserver();
        }
    }

    initializeWithoutAnimations() {
        // Show all elements without animation
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
        
        // Set progress bars to full width immediately
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
                bar.style.width = `${progress}%`;
            }
        });
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
        animatedElements.forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

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
}

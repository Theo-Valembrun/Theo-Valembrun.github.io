/**
 * Intersection Observer Module
 * Handles scroll-based animations with reduced-motion support
 */

export class ObserverManager {
  constructor() {
    this.observer = null;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    if (this.prefersReducedMotion) {
      this.initializeWithoutAnimations();
    } else {
      this.initializeWithAnimations();
    }
    
    // Initialize progress bars
    this.initializeProgressBars();
  }

  initializeWithAnimations() {
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

    // Prepare elements for animation
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((element) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      this.observer.observe(element);
    });
  }

  initializeWithoutAnimations() {
    // Show all elements immediately without animations
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((element) => {
      element.style.opacity = '1';
      element.style.transform = 'none';
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

  initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    if (this.prefersReducedMotion) {
      // Set progress immediately without animation
      progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        if (progress) {
          bar.style.width = `${progress}%`;
        }
      });
    } else {
      // Animate progress bars when they come into view
      progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        if (progress) {
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
  }
}

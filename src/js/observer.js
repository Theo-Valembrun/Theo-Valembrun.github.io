// Intersection Observer Module with reduced-motion support
export class AnimationObserver {
  constructor() {
    this.observer = null;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.initialize();
  }

  initialize() {
    if (this.prefersReducedMotion) {
      this.initializeWithoutAnimations();
    } else {
      this.initializeWithAnimations();
    }
  }

  initializeWithoutAnimations() {
    // For users who prefer reduced motion, show all content immediately
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
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

    // Prepare and observe all animated elements
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      this.observer.observe(element);
    });

    // Initialize progress bars
    this.initializeProgressBars();
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
    const progressBars = document.querySelectorAll('.progress-bar[data-progress]');
    
    progressBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      if (progress) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (this.prefersReducedMotion) {
                bar.style.width = `${progress}%`;
              } else {
                setTimeout(() => {
                  bar.style.width = `${progress}%`;
                }, 200);
              }
              observer.unobserve(entry.target);
            }
          });
        });
        observer.observe(bar);
      }
    });
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

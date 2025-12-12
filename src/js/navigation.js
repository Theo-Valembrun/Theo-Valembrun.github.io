// Navigation Management Module
export class NavigationManager {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.backToTop = document.getElementById('back-to-top');
    
    this.initialize();
  }

  initialize() {
    this.setupEventListeners();
    this.updateActiveNavLink();
  }

  setupEventListeners() {
    // Navigation toggle for mobile
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => this.toggleNavigation());
    }

    // Navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // Back to top button
    if (this.backToTop) {
      this.backToTop.addEventListener('click', () => this.scrollToTop());
    }

    // Scroll events (throttled)
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
  }

  toggleNavigation() {
    const isActive = this.navMenu.classList.contains('active');
    
    this.navMenu.classList.toggle('active');
    this.navToggle.classList.toggle('active');
    
    // Update aria-expanded
    this.navToggle.setAttribute('aria-expanded', !isActive);
    
    // Prevent body scroll when menu is open on mobile
    if (!isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  handleNavClick(e) {
    const targetId = e.currentTarget.getAttribute('href');
    
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        if (this.navMenu.classList.contains('active')) {
          this.toggleNavigation();
        }
        
        // Smooth scroll to section
        const navHeight = this.navbar?.offsetHeight || 70;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active state
        this.updateActiveNavLink();
      }
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  handleScroll() {
    // Navbar background on scroll
    if (this.navbar) {
      if (window.scrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    }

    // Show/hide back to top button
    if (this.backToTop) {
      if (window.scrollY > 300) {
        this.backToTop.classList.add('visible');
      } else {
        this.backToTop.classList.remove('visible');
      }
    }

    // Update active navigation link
    this.updateActiveNavLink();
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = this.navbar?.offsetHeight || 70;
    const scrollPosition = window.scrollY + navHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  handleKeyboardNavigation(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
      this.toggleNavigation();
    }
  }

  // Utility: Throttle function
  throttle(func, wait) {
    let timeout = null;
    let previous = 0;
    
    return function(...args) {
      const now = Date.now();
      const remaining = wait - (now - previous);
      
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(this, args);
      } else if (!timeout) {
        timeout = setTimeout(() => {
          previous = Date.now();
          timeout = null;
          func.apply(this, args);
        }, remaining);
      }
    };
  }
}

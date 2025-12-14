// Main Application Entry Point
import { ThemeManager } from './js/theme.js';
import { NavigationManager } from './js/navigation.js';
import { AnimationObserver } from './js/observer.js';
import { AnalyticsManager } from './js/analytics.js';
import './styles/style.css';

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  initializeApp() {
    // Initialize all modules
    this.themeManager = new ThemeManager();
    this.navigationManager = new NavigationManager();
    this.animationObserver = new AnimationObserver();
    this.analyticsManager = new AnalyticsManager();

    // Remove loading screen
    this.removeLoadingScreen();

    // Initialize any additional features
    this.initializeExternalLinks();
  }

  removeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 500);
    }
  }

  initializeExternalLinks() {
    // Ensure all external links have proper security attributes
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
      if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }
}

// Initialize the application
new PortfolioApp();

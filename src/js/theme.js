/**
 * Theme Management Module
 * Handles light/dark theme toggling with localStorage persistence
 */

export class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.init();
  }

  init() {
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    this.setTheme(savedTheme, false);
    
    // Set up event listener
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme, true);
  }

  setTheme(theme, announce = false) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    
    // Update toggle icon
    if (this.themeToggle) {
      const icon = this.themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }

    // Announce to screen readers if requested
    if (announce) {
      this.announceToScreenReader(`Switched to ${theme} theme`);
    }
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
}

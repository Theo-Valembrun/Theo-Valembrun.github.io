// Main Entry Point
'use strict';

import './styles/style.css';
import { PortfolioApp } from './js/app.js';
import { ThemeManager } from './js/theme.js';
import { ObserverManager } from './js/observer.js';
import { AnalyticsManager } from './js/analytics.js';

// Load main content from partial
async function loadMainContent() {
    try {
        const response = await fetch('/partials/main.html');
        const html = await response.text();
        const mainElement = document.getElementById('main-content');
        if (mainElement) {
            mainElement.innerHTML = html;
        }
    } catch (error) {
        console.error('Failed to load main content:', error);
    }
}

// Initialize the application
async function init() {
    // Load main content first
    await loadMainContent();
    
    // Initialize all modules
    new PortfolioApp();
    new ThemeManager();
    new ObserverManager();
    new AnalyticsManager();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

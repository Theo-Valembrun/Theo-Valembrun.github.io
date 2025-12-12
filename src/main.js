// Main Entry Point
'use strict';

import './styles/style.css';
import { PortfolioApp } from './js/app.js';
import { ThemeManager } from './js/theme.js';
import { ObserverManager } from './js/observer.js';
import { AnalyticsManager } from './js/analytics.js';

// Load main content from partial
async function loadMainContent(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch('/partials/main.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const mainElement = document.getElementById('main-content');
            if (mainElement) {
                mainElement.innerHTML = html;
            }
            return; // Success
        } catch (error) {
            console.error(`Failed to load main content (attempt ${i + 1}/${retries}):`, error);
            if (i === retries - 1) {
                // Last attempt failed, show error message
                const mainElement = document.getElementById('main-content');
                if (mainElement) {
                    mainElement.innerHTML = '<div style="text-align: center; padding: 2rem;"><h2>Failed to load content</h2><p>Please refresh the page.</p></div>';
                }
            } else {
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
            }
        }
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

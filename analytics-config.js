// Google Analytics Configuration
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID

const ANALYTICS_CONFIG = {
    // Your GA4 Measurement ID (get this from Google Analytics)
    measurementId: 'G-N8YF5MV8NJ',
    
    // Custom events configuration
    events: {
        // Navigation tracking
        navigation_click: 'Track section navigation',
        
        // Contact interactions
        contact_interaction: 'Track contact method usage',
        
        // Social media clicks
        social_click: 'Track social media engagement',
        
        // Project portfolio engagement
        project_view: 'Track project interest',
        
        // Skills section interaction
        skill_hover: 'Track skill interest',
        
        // Theme preference
        theme_toggle: 'Track theme preferences',
        
        // Engagement metrics
        scroll_depth: 'Track content engagement',
        time_on_page: 'Track user engagement time',
        page_exit: 'Track session completion'
    },
    
    // Enhanced ecommerce (for future use)
    enhanced_ecommerce: false,
    
    // Privacy settings
    privacy: {
        anonymize_ip: true,
        respect_dnt: true, // Do Not Track
        cookie_consent: false // Set to true if you implement cookie consent
    }
};

// Instructions for setup:
// 1. Go to https://analytics.google.com/
// 2. Create a new property for your website
// 3. Get your Measurement ID (format: G-XXXXXXXXXX)
// 4. Replace 'G-XXXXXXXXXX' in index.html with your actual ID
// 5. Replace 'G-XXXXXXXXXX' in this config with your actual ID

export default ANALYTICS_CONFIG;

// Google Analytics Configuration
// This configuration is loaded conditionally based on user consent

export default {
  // Your GA4 Measurement ID - empty by default, should be set via consent mechanism
  gaId: 'G-N8YF5MV8NJ',
  
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
    cookie_consent: true // Require consent before loading
  }
};

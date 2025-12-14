# Theo Valembrun - Professional IT Portfolio Website v3.0 (Vite Migration)

This repository hosts the professional portfolio and resume website showcasing my experience, skills, and certifications as an IT Specialist, Network Engineer, System Administrator, and Cybersecurity Professional. Version 3.0 introduces a modern Vite-based build system for improved performance and developer experience.

## 🚀 Features

### Core Functionality
* **Modern Single-Page Application:** Seamless navigation between sections (Home, About, Skills, Projects, Experience, Certifications, Contact) with smooth scrolling animations and interactive elements.

* **Responsive Mobile-First Design:** Fully optimized for all devices with progressive enhancement, ensuring perfect viewing experience from mobile phones to 4K desktop displays.

* **Dark/Light Mode Toggle:** Advanced theme switching with user preference persistence and system preference detection for optimal user experience.

* **Interactive Contact System:** Direct email and phone integration with professional contact cards, removing the need for complex form backends while maintaining functionality.

* **Analytics & Compliance:** Professional Google Analytics 4 tracking with Cookiebot consent management for GDPR compliance and comprehensive user behavior insights.

### Enhanced User Experience
* **Performance Optimized:** Fast loading times with preloaded critical resources, optimized images, and efficient CSS/JS delivery.

* **Professional Animations:** Smooth fade-in animations, hover effects, and micro-interactions powered by AOS (Animate On Scroll) library.

* **Accessibility First:** ARIA labels, keyboard navigation support, screen reader compatibility, and semantic HTML structure.

* **SEO Optimized:** Comprehensive meta tags, structured data, and optimized content for search engine visibility.

### Content Showcase
* **Real Project Portfolio:** Featuring actual implementations including Network Monitoring & Troubleshooting and Multi-Branch Network Implementation projects.

* **Progressive Career Timeline:** Interactive timeline showcasing career progression from Customer Care to B2B/ICT Executive roles.

* **Skills Visualization:** Dynamic progress bars and categorized skill displays with proficiency indicators.

* **Live Certifications Tracker:** Current certifications and in-progress studies without pressure of completion dates.

## 🛠️ Technologies Used

### Frontend Stack
* **HTML5:** Semantic markup with accessibility features and modern web standards
* **CSS3:** Advanced styling with CSS Custom Properties, Grid, Flexbox, and responsive design
* **JavaScript ES6+:** Modern JavaScript with ES modules and performance optimizations
* **Vite:** Lightning-fast build tool for modern web development
* **PostCSS:** Modern CSS processing with autoprefixer

### Libraries & Frameworks
* **Font Awesome 6.4.0:** Professional iconography
* **Google Fonts (Inter):** Modern typography with variable font weights
* **CSS Grid & Flexbox:** Advanced layout systems

### Analytics & Tracking
* **Google Analytics 4:** Consent-based visitor tracking and behavior analysis
* **Cookiebot:** EU GDPR compliant cookie consent management
* **Enhanced Events:** Comprehensive user interaction monitoring
* **Privacy-First:** Respects Do Not Track and user preferences, requires explicit consent

### Performance & Optimization
* **Vite Build System:** Fast development server and optimized production builds
* **PostCSS:** Automatic vendor prefixing for browser compatibility
* **Resource Preloading:** Critical CSS and font preloading
* **Mobile-First Approach:** Progressive enhancement for optimal mobile performance
* **Fluid Typography:** Responsive font sizing using CSS clamp()
* **Reduced Motion Support:** Respects user accessibility preferences

## 🚀 Development

### Prerequisites
* Node.js 20.x or higher
* npm or yarn

### Local Development
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Theo-Valembrun/Theo-Valembrun.github.io.git
   cd Theo-Valembrun.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```
   
   The built files will be in the `dist/` directory.

5. **Preview production build:**
   ```bash
   npm run preview
   ```

### Available Scripts
* `npm run dev` - Start development server with hot module replacement
* `npm run build` - Build for production
* `npm run preview` - Preview production build locally
* `npm run deploy:gh-pages` - Deploy to GitHub Pages (manual deployment)

### Project Structure
```
.
├── src/
│   ├── index.html          # Main HTML entry point
│   ├── main.js             # JavaScript entry point
│   ├── js/                 # Modularized JavaScript
│   │   ├── theme.js        # Theme management
│   │   ├── navigation.js   # Navigation logic
│   │   ├── observer.js     # Intersection Observer with reduced-motion support
│   │   └── analytics.js    # Analytics loader with consent management
│   ├── styles/
│   │   └── style.css       # Main stylesheet with PostCSS
│   └── partials/           # HTML partials
│       ├── header.html     # Navigation header
│       ├── main.html       # Main content sections
│       └── footer.html     # Footer
├── public/                 # Static assets (copied to dist/)
│   ├── CNAME              # Custom domain configuration
│   ├── analytics-config.js # Analytics configuration
│   ├── assets/            # Images and media
│   ├── pdf/               # PDF documents
│   └── dori/              # Additional resources
├── vite.config.js         # Vite configuration
├── postcss.config.cjs     # PostCSS configuration
└── package.json           # Dependencies and scripts
```

## 🔒 Analytics & Privacy

This site uses Google Analytics 4 with a privacy-first approach:

* **Consent Required:** Analytics only loads when user grants consent
* **localStorage Check:** Checks for `analytics-consent === 'granted'`
* **Event-Driven:** Listens for `analytics-consent-granted` event
* **Do Not Track:** Respects browser DNT settings
* **IP Anonymization:** Enabled by default

To grant analytics consent programmatically:
```javascript
import { AnalyticsManager } from './js/analytics.js';
AnalyticsManager.grantConsent();
```

## 🌐 Deployment

### Automatic Deployment (GitHub Actions)
The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

The workflow:
1. Checks out the code
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Builds the project with `npm run build`
5. Deploys the `dist/` folder to the `gh-pages` branch

### Manual Deployment
```bash
npm run build
npm run deploy:gh-pages
```

## 📱 Browser Compatibility

* ✅ Chrome 90+
* ✅ Firefox 88+
* ✅ Safari 14+
* ✅ Edge 90+
* ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Philosophy

This portfolio embraces:

* **Minimalist Professional Aesthetic:** Clean lines, ample whitespace, and focused content presentation
* **User-Centric Design:** Intuitive navigation and clear information hierarchy
* **Modern Web Standards:** Progressive enhancement and accessibility-first approach
* **Performance-First:** Optimized for speed without sacrificing visual appeal
* **Privacy-Conscious:** Analytics only with user consent

## 🔄 Version History

### Version 3.0 (Vite Migration - December 2024)
* **Modern Build System:** Migrated to Vite for lightning-fast development and optimized builds
* **Modular JavaScript:** Refactored into ES modules (theme, navigation, observer, analytics)
* **Enhanced Accessibility:** 
  - Added comprehensive `prefers-reduced-motion` support
  - Improved focus states for keyboard navigation
  - Screen reader announcements for dynamic content
* **Fluid Typography:** Responsive font sizing using CSS `clamp()`
* **PostCSS Integration:** Automatic vendor prefixing for broader browser compatibility
* **Consent-Based Analytics:** Analytics only loads when user explicitly grants consent
* **Automated Deployment:** GitHub Actions workflow for CI/CD to GitHub Pages
* **Removed Dead Code:** Eliminated unused contact form submission logic
* **Security Enhancements:** All external links include `rel="noopener noreferrer"`
* **Project Restructure:** 
  - Source code in `src/` directory
  - Static assets in `public/` directory
  - Build output to `dist/` directory

### Version 2.1 (July 2025)
* **Professional Analytics:** Google Analytics 4 integration with comprehensive event tracking
* **GDPR Compliance:** Cookiebot consent management for European visitors
* **Enhanced Tracking:** User behavior analysis including navigation patterns, contact interactions, and engagement metrics
* **Privacy-First:** Respects user preferences and Do Not Track signals
* **Real-Time Insights:** Professional visitor analytics for portfolio optimization

### Version 2.0 Improvements from Version 1.0
* **Complete Redesign:** Modern card-based layout with improved visual hierarchy
* **Enhanced Functionality:** Removed non-functional contact form in favor of direct contact methods
* **Better Performance:** Optimized loading times and smoother animations
* **Improved Accessibility:** Better screen reader support and keyboard navigation
* **Real Content:** Replaced placeholder content with actual project implementations
* **Streamlined Navigation:** More intuitive user flow and section organization

### Technical Enhancements
* **Modern CSS Architecture:** CSS Custom Properties for theming and maintainability
* **JavaScript Optimization:** ES6+ modules with better error handling and performance
* **Mobile Experience:** Enhanced mobile-first responsive design
* **Code Quality:** Cleaner, more maintainable codebase with better documentation

## 🤖 AI Development Disclosure

This portfolio website v2.0 was developed with significant assistance from **GitHub Copilot AI**, which helped with:

* **Code Architecture:** Modern HTML5, CSS3, and JavaScript structure
* **Responsive Design:** Mobile-first approach and cross-device compatibility
* **Performance Optimization:** Resource loading and animation performance
* **Accessibility Implementation:** ARIA labels and semantic markup
* **Content Organization:** Professional presentation of technical experience
* **Debug and Refinement:** Code optimization and bug resolution

My role involved:
* Providing technical requirements and design vision
* Supplying authentic project content and professional experience
* Reviewing and customizing all AI-generated code
* Testing across devices and browsers
* Fine-tuning user experience and functionality

## 📞 Contact & Connect

* **Email:** theo.valembrun@ieee.org
* **Phone:** +509 35 41 95 54
* **LinkedIn:** [linkedin.com/in/theovalembrun](https://linkedin.com/in/theovalembrun/)
* **GitHub:** [github.com/Theo-Valembrun](https://github.com/Theo-Valembrun)
* **Location:** Port-au-Prince, Haiti (Available for remote work)

## 🔧 Current Focus

* **CCNA Certification:** Network Associate certification in progress
* **Microsoft Azure:** AZ-104 Administrator Associate preparation
* **CompTIA Security+:** Cybersecurity certification pursuit
* **ITIL 4 Foundation:** IT Service Management framework study

## 📄 License

This project is open-sourced under the MIT License. Feel free to use this code as inspiration for your own portfolio, but please provide appropriate attribution.

---

**Built with ❤️ by Theo Valembrun | © 2025 | Designed & Developed with modern web standards**

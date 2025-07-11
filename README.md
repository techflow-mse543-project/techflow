# TechFlow - Workflow Automation Platform

A modern, responsive website for a workflow automation platform, designed for moderated user studies with comprehensive Google Analytics integration.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Multiple interactive components for user testing
- **Google Analytics**: Comprehensive tracking for user studies
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance Optimized**: Fast loading with optimized assets

## 📁 Project Structure

```
MSE543-project/
├── index.html              # Homepage
├── features.html           # Features page with interactive demo
├── pricing.html            # Pricing page with billing toggle
├── about.html              # About page (to be created)
├── contact.html            # Contact page (to be created)
├── styles/
│   ├── main.css           # Main stylesheet
│   └── components.css     # Component-specific styles
├── js/
│   ├── main.js            # Core functionality
│   ├── analytics.js       # Google Analytics integration
│   ├── features.js        # Features page interactions
│   └── pricing.js         # Pricing page interactions
├── assets/                # Images and other assets
└── README.md              # This file
```

## 🛠️ Setup Instructions

### 1. Google Analytics Configuration

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Replace `GA_MEASUREMENT_ID` in the following files:
   - `index.html` (line 10)
   - `features.html` (line 10)
   - `pricing.html` (line 10)
   - `js/analytics.js` (line 6)

### 2. Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. For better development experience, use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

### 3. Deployment to GitHub Pages

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

Your site will be available at `https://yourusername.github.io/repository-name`

## 📊 User Study Features

### Analytics Tracking

The website includes comprehensive tracking for user studies:

- **Page Views**: Automatic tracking of all page visits
- **User Interactions**: Clicks, form submissions, button interactions
- **Navigation**: Menu usage, page transitions
- **Engagement**: Scroll depth, time on page, session duration
- **Performance**: Page load times, Core Web Vitals
- **Custom Events**: Feature interactions, demo usage, pricing selections

### Interactive Elements for Testing

- **Navigation**: Mobile menu, smooth scrolling
- **Features Page**: Category tabs, interactive demo workflow builder
- **Pricing Page**: Billing toggle, FAQ accordion, comparison table
- **Forms**: Contact forms with validation
- **Animations**: Hover effects, transitions, loading states

### Data Export

User study data can be exported using the `exportUserStudyData()` function, which creates a JSON file with:
- Session information
- All user interactions
- Page views and timing
- Device and browser information

## 🎨 Customization

### Colors and Branding

Update the CSS custom properties in `styles/main.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #f59e0b;    /* Accent color */
    --accent-color: #10b981;       /* Success/CTA color */
    /* ... other variables */
}
```

### Content Updates

- **Company Information**: Update text content in HTML files
- **Pricing**: Modify prices and features in `pricing.html`
- **Features**: Update feature descriptions in `features.html`

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences
- Skip links for navigation

## 🔧 Performance Optimizations

- Optimized images and assets
- Minified CSS and JavaScript
- Efficient animations using CSS transforms
- Lazy loading for better performance
- Responsive images

## 📈 Analytics Events

The website tracks the following events for user studies:

### Navigation Events
- `page_view`
- `navigation_clicked`
- `mobile_menu_toggled`

### Feature Interactions
- `feature_category_switched`
- `feature_item_clicked`
- `demo_step_clicked`
- `demo_trigger_selected`
- `demo_action_added`

### Pricing Interactions
- `pricing_card_clicked`
- `pricing_button_clicked`
- `billing_toggle_changed`
- `faq_toggled`

### Form Interactions
- `contact_form_submitted`
- `newsletter_signup`

### Engagement Events
- `scroll_depth_reached`
- `element_visible`
- `session_duration`

## 🚀 Quick Start for User Studies

1. **Setup Analytics**: Configure Google Analytics as described above
2. **Test Interactions**: Verify all interactive elements work correctly
3. **Export Data**: Use browser console to export user study data:
   ```javascript
   exportUserStudyData()
   ```
4. **Monitor Real-time**: Check Google Analytics real-time reports during studies

## 📞 Support

For questions about the website or user study setup, please refer to the documentation or contact the development team.

## 📄 License

This project is created for educational and research purposes. Feel free to modify and use for your user studies.

---

**Note**: Remember to replace `GA_MEASUREMENT_ID` with your actual Google Analytics Measurement ID before deploying or using for user studies. 
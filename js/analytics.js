// Google Analytics and Custom Event Tracking
// Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics Measurement ID

// Global analytics configuration
const ANALYTICS_CONFIG = {
    // Google Analytics Measurement ID - Replace with your actual ID
    GA_MEASUREMENT_ID: 'GA_MEASUREMENT_ID',
    
    // Custom event categories for user studies
    EVENT_CATEGORIES: {
        NAVIGATION: 'navigation',
        INTERACTION: 'interaction',
        CONVERSION: 'conversion',
        ENGAGEMENT: 'engagement',
        PERFORMANCE: 'performance',
        ACCESSIBILITY: 'accessibility'
    },
    
    // User study specific tracking
    USER_STUDY: {
        SESSION_ID: generateSessionId(),
        START_TIME: Date.now(),
        INTERACTIONS: [],
        PAGE_VIEWS: [],
        FORM_SUBMISSIONS: [],
        CLICK_EVENTS: []
    }
};

// Generate unique session ID for user studies
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Initialize Google Analytics
function initGoogleAnalytics() {
    if (typeof gtag !== 'undefined') {
        // Configure Google Analytics
        gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
                'custom_parameter_1': 'session_id',
                'custom_parameter_2': 'user_study_data'
            }
        });
        
        // Set custom parameters
        gtag('set', 'session_id', ANALYTICS_CONFIG.USER_STUDY.SESSION_ID);
        
        console.log('Google Analytics initialized with session ID:', ANALYTICS_CONFIG.USER_STUDY.SESSION_ID);
    } else {
        console.warn('Google Analytics not loaded. Make sure to include the gtag script.');
    }
}

// Main tracking function
function trackEvent(eventName, parameters = {}) {
    const eventData = {
        event_name: eventName,
        timestamp: Date.now(),
        session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        ...parameters
    };
    
    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: getEventCategory(eventName),
            event_label: parameters.event_label || eventName,
            value: parameters.value || 1,
            custom_parameter_1: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID,
            custom_parameter_2: JSON.stringify(eventData)
        });
    }
    
    // Store for user study analysis
    ANALYTICS_CONFIG.USER_STUDY.INTERACTIONS.push(eventData);
    
    // Log for debugging
    console.log('Event tracked:', eventName, eventData);
    
    return eventData;
}

// Get event category based on event name
function getEventCategory(eventName) {
    if (eventName.includes('click') || eventName.includes('button')) {
        return ANALYTICS_CONFIG.EVENT_CATEGORIES.INTERACTION;
    } else if (eventName.includes('form') || eventName.includes('signup') || eventName.includes('login')) {
        return ANALYTICS_CONFIG.EVENT_CATEGORIES.CONVERSION;
    } else if (eventName.includes('nav') || eventName.includes('menu')) {
        return ANALYTICS_CONFIG.EVENT_CATEGORIES.NAVIGATION;
    } else if (eventName.includes('scroll') || eventName.includes('visible')) {
        return ANALYTICS_CONFIG.EVENT_CATEGORIES.ENGAGEMENT;
    } else if (eventName.includes('load') || eventName.includes('performance')) {
        return ANALYTICS_CONFIG.EVENT_CATEGORIES.PERFORMANCE;
    } else {
        return ANALYTICS_CONFIG.EVENT_CATEGORIES.INTERACTION;
    }
}

// Page view tracking
function trackPageView(pageTitle = null, pageUrl = null) {
    const pageData = {
        page_title: pageTitle || document.title,
        page_url: pageUrl || window.location.href,
        referrer: document.referrer,
        timestamp: Date.now(),
        session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID
    };
    
    // Send to Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
            page_title: pageData.page_title,
            page_location: pageData.page_url,
            custom_parameter_1: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID
        });
    }
    
    // Store for user study analysis
    ANALYTICS_CONFIG.USER_STUDY.PAGE_VIEWS.push(pageData);
    
    console.log('Page view tracked:', pageData);
    
    return pageData;
}

// User interaction tracking
function trackUserInteraction(element, interactionType, additionalData = {}) {
    const interactionData = {
        element_type: element.tagName.toLowerCase(),
        element_id: element.id || null,
        element_class: element.className || null,
        element_text: element.textContent?.trim().substring(0, 50) || null,
        interaction_type: interactionType,
        timestamp: Date.now(),
        session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID,
        ...additionalData
    };
    
    // Track as custom event
    trackEvent(`user_interaction_${interactionType}`, interactionData);
    
    return interactionData;
}

// Form tracking
function trackFormInteraction(formElement, action, formData = {}) {
    const formTrackingData = {
        form_id: formElement.id || null,
        form_action: action,
        form_fields: Object.keys(formData),
        fields_filled: Object.values(formData).filter(value => value && value.trim() !== '').length,
        timestamp: Date.now(),
        session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID
    };
    
    // Track form event
    trackEvent(`form_${action}`, formTrackingData);
    
    // Store for user study analysis
    ANALYTICS_CONFIG.USER_STUDY.FORM_SUBMISSIONS.push(formTrackingData);
    
    return formTrackingData;
}

// Scroll depth tracking
function trackScrollDepth() {
    let maxScrollDepth = 0;
    let scrollEvents = [];
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);
        
        // Track significant scroll milestones
        const milestones = [25, 50, 75, 90, 100];
        milestones.forEach(milestone => {
            if (scrollPercentage >= milestone && maxScrollDepth < milestone) {
                maxScrollDepth = milestone;
                trackEvent('scroll_depth_reached', {
                    depth_percentage: milestone,
                    scroll_position: scrollTop,
                    page_height: scrollHeight
                });
            }
        });
        
        // Store scroll event for analysis
        scrollEvents.push({
            scroll_percentage: scrollPercentage,
            timestamp: Date.now(),
            session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID
        });
    });
    
    // Track final scroll depth on page unload
    window.addEventListener('beforeunload', function() {
        trackEvent('page_exit', {
            max_scroll_depth: maxScrollDepth,
            total_scroll_events: scrollEvents.length,
            time_on_page: Date.now() - ANALYTICS_CONFIG.USER_STUDY.START_TIME
        });
    });
}

// Time on page tracking
function trackTimeOnPage() {
    let startTime = Date.now();
    let isActive = true;
    
    // Track when user becomes inactive
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            isActive = false;
            const timeOnPage = Date.now() - startTime;
            trackEvent('page_inactive', {
                time_on_page_ms: timeOnPage,
                session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID
            });
        } else {
            isActive = true;
            startTime = Date.now();
            trackEvent('page_active', {
                session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID
            });
        }
    });
    
    // Track total time on page when leaving
    window.addEventListener('beforeunload', function() {
        const totalTimeOnPage = Date.now() - startTime;
        trackEvent('page_exit_total_time', {
            total_time_ms: totalTimeOnPage,
            session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID
        });
    });
}

// Error tracking
function trackError(error, context = {}) {
    const errorData = {
        error_message: error.message || error,
        error_stack: error.stack || null,
        error_type: error.name || 'Unknown',
        context: context,
        timestamp: Date.now(),
        session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID
    };
    
    trackEvent('error_occurred', errorData);
    
    return errorData;
}

// Performance tracking
function trackPerformance() {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            trackEvent('lcp_measured', {
                lcp_value: lastEntry.startTime,
                lcp_element: lastEntry.element?.tagName || 'unknown'
            });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                trackEvent('fid_measured', {
                    fid_value: entry.processingStart - entry.startTime,
                    fid_element: entry.name || 'unknown'
                });
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            trackEvent('cls_measured', {
                cls_value: clsValue
            });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
    
    // Track page load performance
    window.addEventListener('load', function() {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            trackEvent('page_load_performance', {
                dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                load_complete: navigation.loadEventEnd - navigation.loadEventStart,
                total_load_time: navigation.loadEventEnd - navigation.navigationStart
            });
        }
    });
}

// User study specific tracking functions
function trackUserStudyEvent(eventType, data = {}) {
    const studyData = {
        event_type: eventType,
        timestamp: Date.now(),
        session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID,
        page_url: window.location.href,
        ...data
    };
    
    // Track as custom event
    trackEvent(`user_study_${eventType}`, studyData);
    
    return studyData;
}

// Export user study data
function exportUserStudyData() {
    const exportData = {
        session_id: ANALYTICS_CONFIG.USER_STUDY.SESSION_ID,
        start_time: ANALYTICS_CONFIG.USER_STUDY.START_TIME,
        end_time: Date.now(),
        total_duration: Date.now() - ANALYTICS_CONFIG.USER_STUDY.START_TIME,
        interactions: ANALYTICS_CONFIG.USER_STUDY.INTERACTIONS,
        page_views: ANALYTICS_CONFIG.USER_STUDY.PAGE_VIEWS,
        form_submissions: ANALYTICS_CONFIG.USER_STUDY.FORM_SUBMISSIONS,
        click_events: ANALYTICS_CONFIG.USER_STUDY.CLICK_EVENTS,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
    };
    
    // Create downloadable file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `user_study_data_${ANALYTICS_CONFIG.USER_STUDY.SESSION_ID}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    return exportData;
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google Analytics
    initGoogleAnalytics();
    
    // Track initial page view
    trackPageView();
    
    // Initialize tracking features
    trackScrollDepth();
    trackTimeOnPage();
    trackPerformance();
    
    // Set up global error tracking
    window.addEventListener('error', function(event) {
        trackError(event.error || event.message, {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    });
    
    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        trackError(event.reason, {
            type: 'unhandled_promise_rejection'
        });
    });
    
    console.log('Analytics initialized for user study session:', ANALYTICS_CONFIG.USER_STUDY.SESSION_ID);
});

// Make functions available globally for onclick handlers
window.trackEvent = trackEvent;
window.trackPageView = trackPageView;
window.trackUserInteraction = trackUserInteraction;
window.trackFormInteraction = trackFormInteraction;
window.trackUserStudyEvent = trackUserStudyEvent;
window.exportUserStudyData = exportUserStudyData; 
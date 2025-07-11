// Contact page specific functionality

// Form field tracking
function trackFormField(fieldName, value) {
    trackEvent('contact_form_field_changed', {
        field_name: fieldName,
        has_value: !!value,
        value_length: value ? value.length : 0
    });
}

// Contact form submission handler
function handleContactSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Track form submission
    trackEvent('contact_form_submitted', {
        form_type: 'contact',
        inquiry_type: data.inquiryType,
        has_company: !!data.company,
        has_newsletter: data.newsletter === 'on',
        message_length: data.message.length
    });
    
    // Validate form
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        event.target.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Track successful submission
        trackEvent('contact_form_success', {
            inquiry_type: data.inquiryType
        });
        
    }, 2000);
}

// Form validation
function validateContactForm(data) {
    const errors = [];
    
    // Required fields
    if (!data.firstName || data.firstName.trim() === '') {
        errors.push('First name is required');
    }
    
    if (!data.lastName || data.lastName.trim() === '') {
        errors.push('Last name is required');
    }
    
    if (!data.email || data.email.trim() === '') {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.inquiryType || data.inquiryType === '') {
        errors.push('Please select an inquiry type');
    }
    
    if (!data.message || data.message.trim() === '') {
        errors.push('Message is required');
    } else if (data.message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showNotification(errors.join(', '), 'error');
        trackEvent('contact_form_validation_error', {
            errors: errors
        });
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Contact method interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track contact method clicks
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.querySelector('h3').textContent.toLowerCase();
            trackEvent('contact_method_clicked', {
                method_type: methodType
            });
        });
    });
    
    // Track form field interactions
    const formFields = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            trackEvent('contact_form_field_focused', {
                field_name: this.name,
                field_type: this.type
            });
        });
        
        field.addEventListener('blur', function() {
            trackEvent('contact_form_field_blurred', {
                field_name: this.name,
                field_type: this.type,
                has_value: !!this.value
            });
        });
    });
    
    // Track checkbox interactions
    const newsletterCheckbox = document.querySelector('input[name="newsletter"]');
    if (newsletterCheckbox) {
        newsletterCheckbox.addEventListener('change', function() {
            trackEvent('newsletter_subscription_toggled', {
                subscribed: this.checked
            });
        });
    }
    
    // Track form validation errors
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('invalid', function(e) {
            e.preventDefault();
            trackEvent('contact_form_invalid', {
                field_name: e.target.name,
                field_type: e.target.type
            });
        });
    }
});

// Add CSS for contact page components
const contactStyles = `
    /* Contact Section */
    .contact-section {
        padding: var(--spacing-3xl) 0;
    }
    
    .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-3xl);
        align-items: start;
    }
    
    .contact-form-container h2 {
        margin-bottom: var(--spacing-xl);
        color: var(--text-primary);
    }
    
    /* Contact Form */
    .contact-form {
        background: white;
        padding: var(--spacing-2xl);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-lg);
    }
    
    .form-group {
        margin-bottom: var(--spacing-lg);
    }
    
    .form-label {
        display: block;
        margin-bottom: var(--spacing-sm);
        font-weight: 500;
        color: var(--text-primary);
    }
    
    .form-input,
    .form-textarea,
    .form-select {
        width: 100%;
        padding: var(--spacing-md);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        font-size: var(--font-size-base);
        transition: border-color var(--transition-fast);
        font-family: inherit;
    }
    
    .form-input:focus,
    .form-textarea:focus,
    .form-select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    .form-textarea {
        min-height: 120px;
        resize: vertical;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-md);
    }
    
    /* Checkbox Styling */
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        cursor: pointer;
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
    }
    
    .checkbox-label input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: var(--primary-color);
    }
    
    /* Contact Information */
    .contact-info {
        background: var(--background-secondary);
        padding: var(--spacing-2xl);
        border-radius: var(--radius-xl);
        height: fit-content;
    }
    
    .contact-info h2 {
        margin-bottom: var(--spacing-xl);
        color: var(--text-primary);
    }
    
    .contact-method {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-md);
        padding: var(--spacing-lg);
        background: white;
        border-radius: var(--radius-lg);
        margin-bottom: var(--spacing-md);
        cursor: pointer;
        transition: all var(--transition-fast);
        border: 1px solid var(--border-light);
    }
    
    .contact-method:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
        border-color: var(--primary-light);
    }
    
    .contact-icon {
        font-size: var(--font-size-2xl);
        flex-shrink: 0;
    }
    
    .contact-details h3 {
        margin: 0 0 var(--spacing-xs) 0;
        font-size: var(--font-size-lg);
        color: var(--text-primary);
    }
    
    .contact-details p {
        margin: 0;
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
        line-height: 1.5;
    }
    
    .contact-details p:first-of-type {
        font-weight: 500;
        color: var(--text-primary);
    }
    
    .office-info {
        margin-top: var(--spacing-xl);
        padding-top: var(--spacing-lg);
        border-top: 1px solid var(--border-light);
    }
    
    .office-info h3 {
        margin-bottom: var(--spacing-sm);
        color: var(--text-primary);
    }
    
    .office-info p {
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    /* Form Validation Styles */
    .form-input:invalid,
    .form-textarea:invalid,
    .form-select:invalid {
        border-color: #ef4444;
    }
    
    .form-input:invalid:focus,
    .form-textarea:invalid:focus,
    .form-select:invalid:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    /* Loading State */
    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .contact-form {
            padding: var(--spacing-lg);
        }
        
        .contact-info {
            padding: var(--spacing-lg);
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = contactStyles;
document.head.appendChild(styleSheet);

// Make functions available globally
window.trackFormField = trackFormField;
window.handleContactSubmit = handleContactSubmit; 
// Pricing page specific functionality

// Billing toggle functionality
function toggleBilling() {
    const toggle = document.getElementById('billing-toggle');
    const isAnnual = toggle.checked;
    
    // Track billing preference change
    trackEvent('billing_preference_changed', {
        billing_type: isAnnual ? 'annual' : 'monthly'
    });
    
    // Update all price amounts
    const priceAmounts = document.querySelectorAll('.price-amount');
    priceAmounts.forEach(amount => {
        const monthlyPrice = amount.dataset.monthly;
        const annualPrice = amount.dataset.annual;
        
        if (isAnnual) {
            amount.textContent = annualPrice;
        } else {
            amount.textContent = monthlyPrice;
        }
    });
    
    // Update billing period text
    const billingPeriods = document.querySelectorAll('.pricing-period');
    billingPeriods.forEach(period => {
        if (isAnnual) {
            period.textContent = '/month, billed annually';
        } else {
            period.textContent = '/month';
        }
    });
    
    // Animate the change
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    });
}

// FAQ toggle functionality
function toggleFAQ(faqItem) {
    const isOpen = faqItem.classList.contains('open');
    
    // Track FAQ interaction
    const question = faqItem.querySelector('h3').textContent;
    trackEvent('faq_toggled', {
        question: question,
        action: isOpen ? 'close' : 'open'
    });
    
    // Close all other FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('open');
            const toggle = item.querySelector('.faq-toggle');
            toggle.textContent = '+';
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('open');
    const toggle = faqItem.querySelector('.faq-toggle');
    toggle.textContent = faqItem.classList.contains('open') ? '−' : '+';
}

// Pricing card interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't track if clicking on button (button has its own tracking)
            if (e.target.tagName === 'BUTTON') return;
            
            const planName = this.querySelector('.pricing-name').textContent;
            trackEvent('pricing_card_clicked', {
                plan_name: planName,
                is_featured: this.classList.contains('featured')
            });
        });
    });
    
    // Track pricing button interactions
    const pricingButtons = document.querySelectorAll('.pricing-card button');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            
            const planName = this.closest('.pricing-card').querySelector('.pricing-name').textContent;
            const buttonText = this.textContent.trim();
            
            trackEvent('pricing_button_clicked', {
                plan_name: planName,
                button_text: buttonText,
                is_featured: this.closest('.pricing-card').classList.contains('featured')
            });
        });
    });
    
    // Track billing toggle interactions
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            trackEvent('billing_toggle_changed', {
                billing_type: this.checked ? 'annual' : 'monthly'
            });
        });
    }
    
    // Track FAQ interactions
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const question = this.querySelector('h3').textContent;
            const isOpen = this.classList.contains('open');
            
            trackEvent('faq_interaction', {
                question: question,
                action: isOpen ? 'close' : 'open'
            });
        });
    });
    
    // Track comparison table interactions
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        comparisonTable.addEventListener('click', function(e) {
            if (e.target.tagName === 'TD' || e.target.tagName === 'TH') {
                const row = e.target.closest('tr');
                const feature = row.querySelector('td:first-child')?.textContent || 'Unknown';
                const plan = e.target.textContent || 'Unknown';
                
                trackEvent('comparison_table_clicked', {
                    feature: feature,
                    plan: plan
                });
            }
        });
    }
});

// Add CSS for pricing page components
const pricingStyles = `
    /* Billing Toggle */
    .billing-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-md);
        margin-top: var(--spacing-xl);
    }
    
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }
    
    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--border-color);
        transition: var(--transition-fast);
        border-radius: 34px;
    }
    
    .toggle-slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: var(--transition-fast);
        border-radius: 50%;
    }
    
    input:checked + .toggle-slider {
        background-color: var(--primary-color);
    }
    
    input:checked + .toggle-slider:before {
        transform: translateX(26px);
    }
    
    .discount-badge {
        background: var(--accent-color);
        color: white;
        padding: 2px 8px;
        border-radius: var(--radius-sm);
        font-size: var(--font-size-xs);
        font-weight: 600;
        margin-left: var(--spacing-xs);
    }
    
    /* Feature Comparison Table */
    .comparison-table {
        overflow-x: auto;
        margin-top: var(--spacing-xl);
    }
    
    .comparison-table table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-md);
    }
    
    .comparison-table th,
    .comparison-table td {
        padding: var(--spacing-md);
        text-align: left;
        border-bottom: 1px solid var(--border-light);
    }
    
    .comparison-table th {
        background: var(--background-secondary);
        font-weight: 600;
        color: var(--text-primary);
    }
    
    .comparison-table tr:hover {
        background: var(--background-secondary);
    }
    
    /* FAQ Section */
    .faq-section {
        padding: var(--spacing-3xl) 0;
        background: var(--background-secondary);
    }
    
    .faq-grid {
        display: grid;
        gap: var(--spacing-lg);
        margin-top: var(--spacing-2xl);
    }
    
    .faq-item {
        background: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        overflow: hidden;
        cursor: pointer;
        transition: all var(--transition-fast);
    }
    
    .faq-item:hover {
        box-shadow: var(--shadow-md);
    }
    
    .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-lg);
        background: white;
    }
    
    .faq-question h3 {
        margin: 0;
        font-size: var(--font-size-lg);
        color: var(--text-primary);
    }
    
    .faq-toggle {
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--primary-color);
        transition: transform var(--transition-fast);
    }
    
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height var(--transition-normal);
        background: var(--background-secondary);
    }
    
    .faq-item.open .faq-answer {
        max-height: 200px;
    }
    
    .faq-item.open .faq-toggle {
        transform: rotate(45deg);
    }
    
    .faq-answer p {
        padding: 0 var(--spacing-lg) var(--spacing-lg);
        margin: 0;
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .billing-toggle {
            flex-direction: column;
            gap: var(--spacing-sm);
        }
        
        .comparison-table {
            font-size: var(--font-size-sm);
        }
        
        .comparison-table th,
        .comparison-table td {
            padding: var(--spacing-sm);
        }
        
        .faq-question h3 {
            font-size: var(--font-size-base);
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = pricingStyles;
document.head.appendChild(styleSheet);

// Make functions available globally
window.toggleBilling = toggleBilling;
window.toggleFAQ = toggleFAQ; 
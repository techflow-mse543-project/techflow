// About page specific functionality

// Animated counter for mission stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isNumber = finalValue.includes('K') || finalValue.includes('M') || finalValue.includes('+');
        
        if (isNumber) {
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            const suffix = finalValue.replace(/[\d]/g, '');
            
            let currentValue = 0;
            const increment = numericValue / 50; // Animate over 50 steps
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(counter);
                }
                
                stat.textContent = Math.floor(currentValue) + suffix;
            }, 30);
        }
    });
}

// Timeline interaction
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Add animation delay
        item.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Team member interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    animateStats();
    initTimeline();
    
    // Track team member interactions
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberName = this.querySelector('.member-name').textContent;
            const memberRole = this.querySelector('.member-role').textContent;
            
            trackEvent('about_team_member_interaction', {
                member_name: memberName,
                member_role: memberRole
            });
        });
    });
    
    // Track value card interactions
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('click', function() {
            const valueName = this.querySelector('h3').textContent;
            
            trackEvent('about_value_card_interaction', {
                value_name: valueName
            });
        });
    });
    
    // Track stat item interactions
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('click', function() {
            const statLabel = this.querySelector('.stat-label').textContent;
            const statNumber = this.querySelector('.stat-number').textContent;
            
            trackEvent('about_stat_interaction', {
                stat_label: statLabel,
                stat_number: statNumber
            });
        });
    });
    
    // Track timeline interactions
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const year = this.querySelector('.timeline-marker').textContent;
            const title = this.querySelector('h4').textContent;
            
            trackEvent('about_timeline_interaction', {
                year: year,
                title: title
            });
        });
    });
});

// Add CSS for About page components
const aboutStyles = `
    /* Mission Section */
    .mission-section {
        padding: var(--spacing-3xl) 0;
        background: var(--background-secondary);
    }
    
    .mission-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-3xl);
        align-items: center;
    }
    
    .mission-content h2 {
        margin-bottom: var(--spacing-lg);
        color: var(--text-primary);
    }
    
    .mission-content p {
        margin-bottom: var(--spacing-lg);
        color: var(--text-secondary);
        line-height: 1.7;
    }
    
    .mission-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-lg);
        margin-top: var(--spacing-xl);
    }
    
    .stat-item {
        text-align: center;
        padding: var(--spacing-lg);
        background: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: all var(--transition-fast);
    }
    
    .stat-item:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
    }
    
    .stat-number {
        display: block;
        font-size: var(--font-size-3xl);
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: var(--spacing-xs);
    }
    
    .stat-label {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        font-weight: 500;
    }
    
    .mission-visual {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .mission-image {
        width: 100%;
        max-width: 400px;
    }
    
    .image-placeholder {
        background: white;
        border-radius: var(--radius-xl);
        padding: var(--spacing-3xl);
        text-align: center;
        box-shadow: var(--shadow-lg);
        border: 2px dashed var(--border-color);
    }
    
    .placeholder-icon {
        font-size: var(--font-size-6xl);
        display: block;
        margin-bottom: var(--spacing-md);
    }
    
    .placeholder-text {
        font-size: var(--font-size-lg);
        color: var(--text-secondary);
        font-weight: 500;
    }
    
    /* Values Section */
    .values-section {
        padding: var(--spacing-3xl) 0;
    }
    
    .section-subtitle {
        text-align: center;
        color: var(--text-secondary);
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-3xl);
    }
    
    .values-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--spacing-xl);
    }
    
    .value-card {
        background: white;
        padding: var(--spacing-xl);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
        text-align: center;
        cursor: pointer;
        transition: all var(--transition-normal);
        border: 1px solid var(--border-light);
    }
    
    .value-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
        border-color: var(--primary-light);
    }
    
    .value-icon {
        font-size: var(--font-size-4xl);
        margin-bottom: var(--spacing-md);
    }
    
    .value-card h3 {
        margin-bottom: var(--spacing-md);
        color: var(--text-primary);
    }
    
    .value-card p {
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    /* Team Section */
    .team-section {
        padding: var(--spacing-3xl) 0;
        background: var(--background-secondary);
    }
    
    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--spacing-xl);
        margin-top: var(--spacing-2xl);
    }
    
    .team-member {
        background: white;
        padding: var(--spacing-xl);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
        text-align: center;
        cursor: pointer;
        transition: all var(--transition-normal);
        border: 1px solid var(--border-light);
    }
    
    .team-member:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
        border-color: var(--primary-light);
    }
    
    .member-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--primary-light);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--spacing-md);
        font-size: var(--font-size-3xl);
        color: var(--primary-color);
    }
    
    .member-name {
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--spacing-xs);
        color: var(--text-primary);
    }
    
    .member-role {
        color: var(--primary-color);
        font-size: var(--font-size-sm);
        font-weight: 500;
        margin-bottom: var(--spacing-md);
    }
    
    .member-bio {
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
        line-height: 1.6;
    }
    
    /* Story Section */
    .story-section {
        padding: var(--spacing-3xl) 0;
    }
    
    .story-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-3xl);
        align-items: start;
    }
    
    .story-content h2 {
        margin-bottom: var(--spacing-lg);
        color: var(--text-primary);
    }
    
    .story-content p {
        margin-bottom: var(--spacing-lg);
        color: var(--text-secondary);
        line-height: 1.7;
    }
    
    /* Timeline */
    .timeline {
        position: relative;
        padding-left: var(--spacing-xl);
    }
    
    .timeline::before {
        content: '';
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--primary-color);
    }
    
    .timeline-item {
        position: relative;
        margin-bottom: var(--spacing-xl);
        cursor: pointer;
        transition: all var(--transition-fast);
        animation: slideInLeft 0.6s ease-out forwards;
        opacity: 0;
    }
    
    .timeline-item:hover {
        transform: translateX(10px);
    }
    
    .timeline-marker {
        position: absolute;
        left: -30px;
        top: 0;
        width: 40px;
        height: 40px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: var(--font-size-sm);
        z-index: 1;
    }
    
    .timeline-content {
        background: white;
        padding: var(--spacing-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--border-light);
    }
    
    .timeline-content h4 {
        margin: 0 0 var(--spacing-sm) 0;
        color: var(--text-primary);
        font-size: var(--font-size-lg);
    }
    
    .timeline-content p {
        margin: 0;
        color: var(--text-secondary);
        font-size: var(--font-size-sm);
        line-height: 1.5;
    }
    
    /* Animations */
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .mission-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
        }
        
        .mission-stats {
            grid-template-columns: 1fr;
        }
        
        .story-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
        }
        
        .timeline {
            padding-left: var(--spacing-lg);
        }
        
        .timeline-marker {
            left: -20px;
            width: 30px;
            height: 30px;
            font-size: var(--font-size-xs);
        }
        
        .team-grid {
            grid-template-columns: 1fr;
        }
        
        .values-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = aboutStyles;
document.head.appendChild(styleSheet); 
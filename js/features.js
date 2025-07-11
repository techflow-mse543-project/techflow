// Features page specific functionality

// Category switching functionality
function switchCategory(category) {
    // Track category switch
    trackEvent('feature_category_switched', {
        category: category,
        previous_category: getCurrentCategory()
    });
    
    // Update tab states
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
    
    // Update feature sections
    const sections = document.querySelectorAll('.feature-section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === `${category}-section`) {
            section.classList.add('active');
        }
    });
    
    // Animate the transition
    const activeSection = document.getElementById(`${category}-section`);
    if (activeSection) {
        activeSection.style.opacity = '0';
        activeSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            activeSection.style.transition = 'all 0.3s ease';
            activeSection.style.opacity = '1';
            activeSection.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Get current active category
function getCurrentCategory() {
    const activeTab = document.querySelector('.category-tab.active');
    return activeTab ? activeTab.dataset.category : 'automation';
}

// Demo step switching
function switchDemoStep(stepNumber) {
    // Track demo step interaction
    trackEvent('demo_step_clicked', {
        step_number: stepNumber,
        step_name: getStepName(stepNumber)
    });
    
    // Update step states
    const steps = document.querySelectorAll('.demo-step');
    steps.forEach((step, index) => {
        step.classList.remove('active');
        if (index === stepNumber - 1) {
            step.classList.add('active');
        }
    });
    
    // Update demo workspace based on step
    updateDemoWorkspace(stepNumber);
}

// Get step name by number
function getStepName(stepNumber) {
    const stepNames = {
        1: 'Choose Trigger',
        2: 'Add Actions',
        3: 'Set Conditions',
        4: 'Test & Deploy'
    };
    return stepNames[stepNumber] || 'Unknown Step';
}

// Update demo workspace based on current step
function updateDemoWorkspace(stepNumber) {
    const canvas = document.querySelector('.demo-canvas');
    if (!canvas) return;
    
    // Clear existing content
    canvas.innerHTML = '';
    
    switch (stepNumber) {
        case 1:
            // Show trigger selection
            showTriggerSelection(canvas);
            break;
        case 2:
            // Show action building
            showActionBuilding(canvas);
            break;
        case 3:
            // Show condition setting
            showConditionSetting(canvas);
            break;
        case 4:
            // Show testing interface
            showTestingInterface(canvas);
            break;
    }
}

// Show trigger selection interface
function showTriggerSelection(canvas) {
    canvas.innerHTML = `
        <h3 style="margin-bottom: var(--spacing-lg); color: var(--text-primary);">Choose Your Trigger</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--spacing-md); width: 100%;">
            <div class="demo-node trigger-option" onclick="selectTrigger('email')">
                <div class="node-icon">📧</div>
                <div class="node-text">New Email</div>
            </div>
            <div class="demo-node trigger-option" onclick="selectTrigger('form')">
                <div class="node-icon">📝</div>
                <div class="node-text">Form Submission</div>
            </div>
            <div class="demo-node trigger-option" onclick="selectTrigger('schedule')">
                <div class="node-icon">⏰</div>
                <div class="node-text">Scheduled</div>
            </div>
            <div class="demo-node trigger-option" onclick="selectTrigger('webhook')">
                <div class="node-icon">🔗</div>
                <div class="node-text">Webhook</div>
            </div>
        </div>
    `;
}

// Show action building interface
function showActionBuilding(canvas) {
    canvas.innerHTML = `
        <h3 style="margin-bottom: var(--spacing-lg); color: var(--text-primary);">Build Your Workflow</h3>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg); width: 100%;">
            <div class="demo-node trigger-node" style="align-self: center;">
                <div class="node-icon">📧</div>
                <div class="node-text">New Email</div>
            </div>
            <div class="demo-connection" style="align-self: center;"></div>
            <div class="demo-node action-node" style="align-self: center;" onclick="addAction()">
                <div class="node-icon">➕</div>
                <div class="node-text">Add Action</div>
            </div>
        </div>
        <div style="margin-top: var(--spacing-lg); text-align: center;">
            <button class="btn btn-outline" onclick="showActionLibrary()">Browse Actions</button>
        </div>
    `;
}

// Show condition setting interface
function showConditionSetting(canvas) {
    canvas.innerHTML = `
        <h3 style="margin-bottom: var(--spacing-lg); color: var(--text-primary);">Set Conditions</h3>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg); width: 100%;">
            <div class="demo-node trigger-node" style="align-self: center;">
                <div class="node-icon">📧</div>
                <div class="node-text">New Email</div>
            </div>
            <div class="demo-connection" style="align-self: center;"></div>
            <div class="demo-node condition-node" style="align-self: center; border-color: var(--secondary-color);" onclick="addCondition()">
                <div class="node-icon">❓</div>
                <div class="node-text">Add Condition</div>
            </div>
            <div class="demo-connection" style="align-self: center;"></div>
            <div class="demo-node action-node" style="align-self: center;">
                <div class="node-icon">📝</div>
                <div class="node-text">Create Task</div>
            </div>
        </div>
    `;
}

// Show testing interface
function showTestingInterface(canvas) {
    canvas.innerHTML = `
        <h3 style="margin-bottom: var(--spacing-lg); color: var(--text-primary);">Test Your Workflow</h3>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg); width: 100%;">
            <div class="demo-node trigger-node" style="align-self: center;">
                <div class="node-icon">📧</div>
                <div class="node-text">New Email</div>
            </div>
            <div class="demo-connection" style="align-self: center;"></div>
            <div class="demo-node action-node" style="align-self: center;">
                <div class="node-icon">📝</div>
                <div class="node-text">Create Task</div>
            </div>
            <div class="demo-connection" style="align-self: center;"></div>
            <div class="demo-node notification-node" style="align-self: center;">
                <div class="node-icon">🔔</div>
                <div class="node-text">Send Notification</div>
            </div>
        </div>
        <div style="margin-top: var(--spacing-lg); text-align: center;">
            <button class="btn btn-primary" onclick="testWorkflow()">Test Workflow</button>
            <button class="btn btn-outline" onclick="deployWorkflow()">Deploy</button>
        </div>
    `;
}

// Trigger selection handler
function selectTrigger(triggerType) {
    trackEvent('demo_trigger_selected', {
        trigger_type: triggerType
    });
    
    // Show success message
    showNotification(`Selected ${triggerType} trigger!`, 'success');
    
    // Update the trigger node
    const triggerNode = document.querySelector('.trigger-node');
    if (triggerNode) {
        const icon = triggerNode.querySelector('.node-icon');
        const text = triggerNode.querySelector('.node-text');
        
        const triggerIcons = {
            email: '📧',
            form: '📝',
            schedule: '⏰',
            webhook: '🔗'
        };
        
        const triggerTexts = {
            email: 'New Email',
            form: 'Form Submission',
            schedule: 'Scheduled',
            webhook: 'Webhook'
        };
        
        icon.textContent = triggerIcons[triggerType];
        text.textContent = triggerTexts[triggerType];
    }
}

// Add action handler
function addAction() {
    trackEvent('demo_action_added');
    showNotification('Action added to workflow!', 'success');
}

// Add condition handler
function addCondition() {
    trackEvent('demo_condition_added');
    showNotification('Condition added to workflow!', 'success');
}

// Show action library
function showActionLibrary() {
    trackEvent('demo_action_library_opened');
    
    // Create modal with action library
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: var(--spacing-2xl); border-radius: var(--radius-xl); max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <h3 style="margin-bottom: var(--spacing-lg);">Action Library</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md);">
                <div class="action-item" onclick="selectAction('create_task')">
                    <div style="font-size: 2rem; margin-bottom: var(--spacing-sm);">📝</div>
                    <div style="font-weight: 600;">Create Task</div>
                </div>
                <div class="action-item" onclick="selectAction('send_email')">
                    <div style="font-size: 2rem; margin-bottom: var(--spacing-sm);">📧</div>
                    <div style="font-weight: 600;">Send Email</div>
                </div>
                <div class="action-item" onclick="selectAction('slack_notification')">
                    <div style="font-size: 2rem; margin-bottom: var(--spacing-sm);">💬</div>
                    <div style="font-weight: 600;">Slack Notification</div>
                </div>
                <div class="action-item" onclick="selectAction('update_spreadsheet')">
                    <div style="font-size: 2rem; margin-bottom: var(--spacing-sm);">📊</div>
                    <div style="font-weight: 600;">Update Spreadsheet</div>
                </div>
            </div>
            <button class="btn btn-secondary" onclick="closeModal()" style="margin-top: var(--spacing-lg);">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles for action items
    const style = document.createElement('style');
    style.textContent = `
        .action-item {
            padding: var(--spacing-lg);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            text-align: center;
            cursor: pointer;
            transition: all var(--transition-fast);
        }
        .action-item:hover {
            border-color: var(--primary-color);
            background: var(--background-secondary);
        }
    `;
    document.head.appendChild(style);
}

// Select action from library
function selectAction(actionType) {
    trackEvent('demo_action_selected', {
        action_type: actionType
    });
    
    showNotification(`Selected ${actionType} action!`, 'success');
    closeModal();
}

// Close modal
function closeModal() {
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
}

// Test workflow
function testWorkflow() {
    trackEvent('demo_workflow_tested');
    
    // Simulate workflow testing
    showNotification('Testing workflow...', 'info');
    
    setTimeout(() => {
        showNotification('Workflow test completed successfully!', 'success');
    }, 2000);
}

// Deploy workflow
function deployWorkflow() {
    trackEvent('demo_workflow_deployed');
    
    // Simulate deployment
    showNotification('Deploying workflow...', 'info');
    
    setTimeout(() => {
        showNotification('Workflow deployed successfully!', 'success');
    }, 3000);
}

// Feature item interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track feature item interactions
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            const featureName = this.querySelector('h3').textContent;
            trackEvent('feature_item_clicked', {
                feature_name: featureName
            });
        });
    });
    
    // Track demo node interactions
    const demoNodes = document.querySelectorAll('.demo-node');
    demoNodes.forEach(node => {
        node.addEventListener('click', function() {
            const nodeText = this.querySelector('.node-text').textContent;
            trackEvent('demo_node_clicked', {
                node_text: nodeText,
                node_type: this.className.includes('trigger') ? 'trigger' : 
                          this.className.includes('action') ? 'action' : 'notification'
            });
        });
    });
    
    // Track category tab interactions
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            trackEvent('category_tab_clicked', {
                category: category
            });
        });
    });
    
    // Track demo step interactions
    const demoSteps = document.querySelectorAll('.demo-step');
    demoSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            trackEvent('demo_step_clicked', {
                step_number: index + 1,
                step_name: this.querySelector('.step-text').textContent
            });
        });
    });
});

// Keyboard navigation for demo
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const currentStep = document.querySelector('.demo-step.active');
        const nextStep = currentStep?.nextElementSibling;
        if (nextStep && nextStep.classList.contains('demo-step')) {
            const stepNumber = Array.from(document.querySelectorAll('.demo-step')).indexOf(nextStep) + 1;
            switchDemoStep(stepNumber);
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const currentStep = document.querySelector('.demo-step.active');
        const prevStep = currentStep?.previousElementSibling;
        if (prevStep && prevStep.classList.contains('demo-step')) {
            const stepNumber = Array.from(document.querySelectorAll('.demo-step')).indexOf(prevStep) + 1;
            switchDemoStep(stepNumber);
        }
    }
});

// Make functions available globally
window.switchCategory = switchCategory;
window.switchDemoStep = switchDemoStep;
window.selectTrigger = selectTrigger;
window.addAction = addAction;
window.addCondition = addCondition;
window.showActionLibrary = showActionLibrary;
window.selectAction = selectAction;
window.closeModal = closeModal;
window.testWorkflow = testWorkflow;
window.deployWorkflow = deployWorkflow; 
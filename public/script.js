// DOM Elements
const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');
const generateBtn = document.getElementById('generateBtn');
const passwordLength = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Checkboxes
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set initial password length display
    lengthValue.textContent = passwordLength.value;
    
    // Generate initial password
    generatePassword();
    
    // Add event listeners
    setupEventListeners();
    
    // Add hover animations to feature items
    addHoverAnimations();
});

// Setup all event listeners
function setupEventListeners() {
    // Password length slider
    passwordLength.addEventListener('input', function() {
        lengthValue.textContent = this.value;
        generatePassword();
    });
    
    // Checkbox changes
    [uppercase, lowercase, numbers, symbols].forEach(checkbox => {
        checkbox.addEventListener('change', generatePassword);
    });
    
    // Generate button
    generateBtn.addEventListener('click', function() {
        this.classList.add('loading');
        generatePassword();
        
        // Remove loading state after animation
        setTimeout(() => {
            this.classList.remove('loading');
        }, 1000);
    });
    
    // Copy button
    copyBtn.addEventListener('click', copyToClipboard);
    
    // Password output click to select all
    passwordOutput.addEventListener('click', function() {
        this.select();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to generate
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            generatePassword();
        }
        
        // Ctrl/Cmd + C to copy
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            if (document.activeElement === passwordOutput) {
                e.preventDefault();
                copyToClipboard();
            }
        }
    });
}

// Generate password function
async function generatePassword() {
    try {
        // Show loading state
        generateBtn.classList.add('loading');
        
        // Get current settings
        const length = passwordLength.value;
        const includeUppercase = uppercase.checked;
        const includeLowercase = lowercase.checked;
        const includeNumbers = numbers.checked;
        const includeSymbols = symbols.checked;
        
        // Build query string
        const params = new URLSearchParams({
            length: length,
            uppercase: includeUppercase,
            lowercase: includeLowercase,
            numbers: includeNumbers,
            symbols: includeSymbols
        });
        
        // Make API call
        const response = await fetch(`/api/generate-password?${params}`);
        const data = await response.json();
        
        // Update password display with animation
        animatePasswordDisplay(data.password);
        
        // Update strength meter
        updateStrengthMeter(data.password);
        
    } catch (error) {
        console.error('Error generating password:', error);
        showNotification('Error generating password. Please try again.', 'error');
    } finally {
        // Remove loading state
        setTimeout(() => {
            generateBtn.classList.remove('loading');
        }, 500);
    }
}

// Animate password display
function animatePasswordDisplay(password) {
    passwordOutput.style.opacity = '0';
    passwordOutput.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        passwordOutput.value = password;
        passwordOutput.style.opacity = '1';
        passwordOutput.style.transform = 'translateY(0)';
        
        // Add a subtle glow effect
        passwordOutput.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
        setTimeout(() => {
            passwordOutput.style.boxShadow = '';
        }, 1000);
    }, 200);
}

// Update strength meter
function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    
    // Remove existing classes
    strengthFill.className = 'strength-fill';
    
    // Add new class and update text
    setTimeout(() => {
        strengthFill.classList.add(strength.level);
        strengthText.textContent = `Strength: ${strength.level.charAt(0).toUpperCase() + strength.level.slice(1)}`;
    }, 100);
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Determine strength level
    if (score <= 2) return { level: 'weak', score };
    if (score <= 4) return { level: 'fair', score };
    if (score <= 6) return { level: 'good', score };
    return { level: 'strong', score };
}

// Copy to clipboard function
async function copyToClipboard() {
    const password = passwordOutput.value;
    
    if (!password) {
        showNotification('No password to copy!', 'error');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(password);
        showNotification('Password copied to clipboard!', 'success');
        
        // Add visual feedback to copy button
        copyBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            copyBtn.style.transform = '';
        }, 150);
        
    } catch (error) {
        // Fallback for older browsers
        passwordOutput.select();
        document.execCommand('copy');
        showNotification('Password copied to clipboard!', 'success');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    
    // Update notification style based on type
    notification.className = `notification ${type}`;
    if (type === 'error') {
        notification.style.background = '#ff4757';
        notification.style.boxShadow = '0 8px 20px rgba(255, 71, 87, 0.3)';
    } else {
        notification.style.background = '#2ed573';
        notification.style.boxShadow = '0 8px 20px rgba(46, 213, 115, 0.3)';
    }
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Add hover animations to feature items
function addHoverAnimations() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        // Add staggered animation delay
        item.style.animationDelay = `${0.4 + (index * 0.1)}s`;
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    addRippleEffect(generateBtn);
    addRippleEffect(copyBtn);
    
    // Add floating animation to the title icon
    const titleIcon = document.querySelector('.title i');
    if (titleIcon) {
        titleIcon.style.animation = 'pulse 2s infinite, float 3s ease-in-out infinite';
    }
});

// Ripple effect function
function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add some Easter eggs
let clickCount = 0;
const title = document.querySelector('.title');
title.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        showNotification('🎉 You found the secret! Developer mode activated!', 'success');
        document.body.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)';
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 3000);
        clickCount = 0;
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Space bar to generate new password
    if (e.code === 'Space' && e.target !== passwordOutput) {
        e.preventDefault();
        generatePassword();
    }
    
    // Escape to clear password
    if (e.code === 'Escape') {
        passwordOutput.value = '';
        passwordOutput.focus();
    }
});

// Add some fun particle effects on generate
function addParticleEffect() {
    const particles = 10;
    const colors = ['#667eea', '#764ba2', '#ffd700', '#2ed573'];
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endY = startY - Math.random() * 300;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}

// Connect particle effect to generate button
generateBtn.addEventListener('click', addParticleEffect); 
// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Terminal typing effect
function typeWriter() {
    const terminalBody = document.querySelector('.terminal-body');
    const lines = [
        {prompt: "$", text: "whoami", delay: 500},
        {output: "cyber_security_learner", delay: 500},
        {prompt: "$", text: "cat skills.txt", delay: 500},
        {output: "Penetration Testing | Server Management", delay: 100},
        {output: "Linux Administration | Network Security", delay: 100},
        {prompt: "$", text: "", cursor: true, delay: 1000}
    ];
    
    let currentLine = 0;
    let currentChar = 0;
    
    function typeLine() {
        if (currentLine >= lines.length) {
            // Restart animation after delay
            setTimeout(() => {
                clearTerminal();
                currentLine = 0;
                currentChar = 0;
                setTimeout(typeLine, 1000);
            }, 5000);
            return;
        }
        
        const line = lines[currentLine];
        
        if (line.prompt) {
            // Create new line with prompt
            const lineElement = document.createElement('div');
            lineElement.className = 'terminal-line';
            lineElement.innerHTML = `<span class="prompt">${line.prompt}</span> <span class="command"></span>`;
            terminalBody.appendChild(lineElement);
            
            const commandElement = lineElement.querySelector('.command');
            typeText(commandElement, line.text, () => {
                currentLine++;
                currentChar = 0;
                setTimeout(typeLine, line.delay);
            });
        } else if (line.output) {
            // Create output line
            const lineElement = document.createElement('div');
            lineElement.className = 'terminal-line';
            lineElement.innerHTML = `<span class="output"></span>`;
            terminalBody.appendChild(lineElement);
            
            const outputElement = lineElement.querySelector('.output');
            typeText(outputElement, line.output, () => {
                currentLine++;
                currentChar = 0;
                setTimeout(typeLine, line.delay);
            });
        } else if (line.cursor) {
            // Add cursor line
            const lineElement = document.createElement('div');
            lineElement.className = 'terminal-line';
            lineElement.innerHTML = `<span class="prompt">$</span> <span class="cursor">█</span>`;
            terminalBody.appendChild(lineElement);
            currentLine++;
            setTimeout(typeLine, line.delay);
        }
    }
    
    function typeText(element, text, callback) {
        let index = 0;
        const typingSpeed = 50; // ms per character
        
        function typeChar() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, typingSpeed);
            } else {
                if (callback) callback();
            }
        }
        
        typeChar();
    }
    
    function clearTerminal() {
        // Remove all but the first few lines (optional)
        const lines = document.querySelectorAll('.terminal-line');
        for (let i = 0; i < lines.length; i++) {
            lines[i].remove();
        }
    }
    
    // Start typing animation
    setTimeout(typeLine, 1000);
}

// Modal handling
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOkBtn = document.getElementById('modalOkBtn');
const modalCopyBtn = document.getElementById('modalCopyBtn');
const modalFrom = document.getElementById('modalFrom');
const modalSubject = document.getElementById('modalSubject');
const closeErrorModal = document.getElementById('closeErrorModal');
const errorOkBtn = document.getElementById('errorOkBtn');
const errorMessage = document.getElementById('errorMessage');

function showSuccessModal(name, subject) {
    modalFrom.textContent = name;
    modalSubject.textContent = subject;
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showErrorModal(message) {
    errorMessage.textContent = message;
    errorModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideModals() {
    successModal.classList.remove('active');
    errorModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeModalBtn.addEventListener('click', hideModals);
modalOkBtn.addEventListener('click', hideModals);
closeErrorModal.addEventListener('click', hideModals);
errorOkBtn.addEventListener('click', hideModals);

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) hideModals();
});

errorModal.addEventListener('click', (e) => {
    if (e.target === errorModal) hideModals();
});

// Copy PGP key to clipboard
modalCopyBtn.addEventListener('click', () => {
    const pgpKey = '0x1A2B3C4D5E6F7890';
    navigator.clipboard.writeText(pgpKey).then(() => {
        // Show temporary feedback
        const originalText = modalCopyBtn.innerHTML;
        modalCopyBtn.innerHTML = '<i class="fas fa-check"></i> COPIED';
        modalCopyBtn.classList.add('btn-primary');
        modalCopyBtn.classList.remove('btn-secondary');
        
        setTimeout(() => {
            modalCopyBtn.innerHTML = originalText;
            modalCopyBtn.classList.remove('btn-primary');
            modalCopyBtn.classList.add('btn-secondary');
        }, 2000);
    });
});

// Download PGP key link
document.getElementById('downloadPGP').addEventListener('click', (e) => {
    e.preventDefault();
    const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP v2.0.8

mQINBF2e9tYBEAC7pX7X...
...
-----END PGP PUBLIC KEY BLOCK-----`;
    
    const blob = new Blob([pgpKey], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cyberguard-public-key.asc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Form Validation
function validateForm(formData) {
    const errors = {};
    
    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Subject validation
    if (!formData.subject) {
        errors.subject = 'Please select a subject';
    }
    
    // Message validation
    if (!formData.message || formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }
    
    // Agreement validation
    if (!formData.agreement) {
        errors.agreement = 'You must agree to the privacy policy';
    }
    
    return errors;
}

function showFormErrors(errors) {
    // Clear all previous errors
    document.querySelectorAll('.form-error').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
    
    document.querySelectorAll('.form-control').forEach(el => {
        el.classList.remove('error', 'success');
    });
    
    // Show new errors
    Object.keys(errors).forEach(field => {
        const errorEl = document.getElementById(`${field}Error`);
        const inputEl = document.querySelector(`[name="${field}"]`);
        
        if (errorEl && inputEl) {
            errorEl.textContent = errors[field];
            errorEl.classList.add('show');
            inputEl.classList.add('error');
            
            // Scroll to first error
            if (Object.keys(errors)[0] === field) {
                inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                inputEl.focus();
            }
        }
    });
    
    return Object.keys(errors).length === 0;
}

// Character counter for message textarea
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');
const charCounter = document.querySelector('.char-counter');

if (messageTextarea && charCount && charCounter) {
    messageTextarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        if (length > 1900) {
            charCounter.classList.add('error');
            charCounter.classList.remove('warning');
        } else if (length > 1500) {
            charCounter.classList.add('warning');
            charCounter.classList.remove('error');
        } else {
            charCounter.classList.remove('warning', 'error');
        }
    });
}

// Form submission dengan Formspree
document.getElementById('securityContactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim(),
        agreement: document.getElementById('agreement').checked
    };
    
    // Validate form
    const errors = validateForm(formData);
    if (!showFormErrors(errors)) {
        return;
    }
    
    // Set up Formspree data
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    // Update hidden fields
    document.getElementById('senderEmail').value = formData.email;
    document.querySelector('input[name="_replyto"]').value = formData.email;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-lock"></i> ENCRYPTING...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Send to Formspree
        const response = await fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success modal
            showSuccessModal(formData.name, formData.subject);
            
            // Reset form
            this.reset();
            charCount.textContent = '0';
            charCounter.classList.remove('warning', 'error');
            
            // Show success status
            const statusEl = document.getElementById('formStatus');
            statusEl.textContent = 'Message sent successfully!';
            statusEl.className = 'form-status success';
            
            // Auto-hide status after 5 seconds
            setTimeout(() => {
                statusEl.className = 'form-status';
            }, 5000);
            
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send message');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error modal with specific message
        let errorMsg = 'Network error detected. Please check your connection and try again.';
        
        if (error.message.includes('Failed to fetch')) {
            errorMsg = 'Network connection failed. Please check your internet connection.';
        } else if (error.message.includes('spam')) {
            errorMsg = 'Message flagged as spam. Please try again with different content.';
        } else if (error.message.includes('rate limit')) {
            errorMsg = 'Too many attempts. Please try again in a few minutes.';
        }
        
        showErrorModal(errorMsg);
        
        // Show error status
        const statusEl = document.getElementById('formStatus');
        statusEl.textContent = `Error: ${error.message}`;
        statusEl.className = 'form-status error';
        
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Privacy policy link (simulation)
document.getElementById('privacyLink').addEventListener('click', function(e) {
    e.preventDefault();
    showErrorModal('Privacy policy document is available upon request. Contact for details.');
});

// Real-time form validation
const formInputs = document.querySelectorAll('#securityContactForm input, #securityContactForm select, #securityContactForm textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        const fieldName = this.name;
        const value = this.type === 'checkbox' ? this.checked : this.value.trim();
        
        // Simple validation on blur
        if (fieldName === 'name' && value && value.length < 2) {
            showFormErrors({ name: 'Name must be at least 2 characters' });
        } else if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFormErrors({ email: 'Please enter a valid email address' });
            } else {
                // Clear error for this field
                const errorEl = document.getElementById(`${fieldName}Error`);
                if (errorEl) errorEl.classList.remove('show');
                this.classList.remove('error');
                this.classList.add('success');
            }
        }
    });
    
    // Remove error on input
    input.addEventListener('input', function() {
        const fieldName = this.name;
        const errorEl = document.getElementById(`${fieldName}Error`);
        if (errorEl) errorEl.classList.remove('show');
        this.classList.remove('error');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Stop observing after animation is triggered
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Preload background images untuk performa lebih baik
function preloadBackgroundImages() {
    const imageUrls = [
        'images/linux-terminal.jpg',
        'images/security-dashboard.jpg', 
        'images/server-room.jpg',
        'images/bug-bounty.jpg',
        'images/profile.jpg',
        'images/logo.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Observe all elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Preload images
    preloadBackgroundImages();
    
    // Elements to animate
    const animatedElements = [
        ...document.querySelectorAll('.expertise-card'),
        ...document.querySelectorAll('.achievement-card'),
        ...document.querySelectorAll('.report-card'),
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.contact-card'),
        ...document.querySelectorAll('.tools-section'),
        ...document.querySelectorAll('.reports-section'),
        ...document.querySelectorAll('.contact-form'),
        ...document.querySelectorAll('.feature')
    ];
    
    // Start observing each element
    animatedElements.forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });
    
    // Add staggered animation delays for expertise cards
    document.querySelectorAll('.expertise-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delays for achievement cards
    document.querySelectorAll('.achievement-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delays for timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Add staggered animation delays for contact cards
    document.querySelectorAll('.contact-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delays for feature cards
    document.querySelectorAll('.feature').forEach((feature, index) => {
        feature.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Lazy loading untuk gambar
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback untuk browser yang tidak support IntersectionObserver
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }
    
    // Update year in footer
    const year = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        copyrightElement.innerHTML = `&copy; ${year} CyberGuard Security. All rights reserved.`;
    }
    
    // Start terminal animation
    typeWriter();
});
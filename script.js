// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .problem-item, .stakeholder-card, .benefit-item, .step, .cta-step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    const requiredFields = ['name', 'email', 'company', 'organization'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = this.querySelector(`[name="${field}"], input[placeholder*="${field}"], select`);
        if (input && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
        } else if (input) {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    if (!isValid) {
        alert('Mohon lengkapi semua field yang diperlukan.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailInput = this.querySelector('input[type="email"]');
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#ef4444';
        alert('Mohon masukkan email yang valid.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Terima kasih! Permintaan demo Anda telah dikirim. Tim kami akan menghubungi Anda dalam 24 jam.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('%') ? '%' : element.textContent.includes('x') ? 'x' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('%') ? '%' : element.textContent.includes('x') ? 'x' : '');
        }
    }
    
    updateCounter();
}

// Trigger counter animations when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number, .metric-value');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (number && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    stat.textContent = '0' + text.replace(/\d+/g, '');
                    animateCounter(stat, number);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsContainers = document.querySelectorAll('.hero-stats, .cta-metrics');
    statsContainers.forEach(container => {
        statsObserver.observe(container);
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add mobile menu button if screen is small
function checkMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const existingButton = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 768 && !existingButton) {
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #2196F3;
            cursor: pointer;
        `;
        mobileBtn.addEventListener('click', toggleMobileMenu);
        navContainer.appendChild(mobileBtn);
    } else if (window.innerWidth > 768 && existingButton) {
        existingButton.remove();
    }
}

window.addEventListener('resize', checkMobileMenu);
document.addEventListener('DOMContentLoaded', checkMobileMenu);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize ROI Chart
document.addEventListener('DOMContentLoaded', function() {
    const roiChartCanvas = document.getElementById('roiChart');
    
    if (roiChartCanvas) {
        const ctx = roiChartCanvas.getContext('2d');
        
        // Data for the ROI chart
        const data = {
            labels: ['Bulan 3', 'Bulan 6', 'Bulan 9', 'Bulan 12'],
            datasets: [{
                label: 'ROI (%)',
                data: [50, 120, 210, 350],
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                borderColor: '#2196F3',
                borderWidth: 2,
                pointBackgroundColor: '#2196F3',
                pointRadius: 5,
                tension: 0.4
            }]
        };
        
        // Chart configuration
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'ROI: ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        };
        
        // Create the chart
        new Chart(ctx, config);
    }
});


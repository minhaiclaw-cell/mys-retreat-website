/**
 * MYS Retreat - Main JavaScript
 * Multi-page website functionality
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initSeasonBanner();
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initNewsletterForm();
    initHeaderScroll();
    initFAQ();
    initBookingForm();
    initPopup();
});

/**
 * 2026 Season Banner
 */
function initSeasonBanner() {
    const banner = document.getElementById('seasonBanner');
    const closeBtn = document.getElementById('closeBanner');
    const header = document.getElementById('dmHeader');
    
    if (!banner) return;
    
    // Check if user has closed banner before
    const bannerClosed = sessionStorage.getItem('bannerClosed');
    
    if (!bannerClosed) {
        // Show banner after a short delay
        setTimeout(() => {
            banner.classList.add('show');
            if (header) header.classList.add('with-banner');
        }, 1000);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            banner.classList.remove('show');
            if (header) header.classList.remove('with-banner');
            sessionStorage.setItem('bannerClosed', 'true');
        });
    }
}

/**
 * Navigation functionality
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && mainNav) {
        // Mobile menu toggle
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Header scroll behavior
 */
function initHeaderScroll() {
    const header = document.getElementById('dmHeader');
    const logo = document.querySelector('.logo-img');
    let lastScroll = 0;
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 100) {
            header.style.padding = '12px 40px';
            if (logo) logo.style.height = '45px';
        } else {
            header.style.padding = '20px 40px';
            if (logo) logo.style.height = '60px';
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth header transition
    header.style.transition = 'transform 0.4s ease, padding 0.4s ease';
    if (logo) logo.style.transition = 'height 0.4s ease';
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.stay-card, .activity-card, .feature-image, .stat, .reveal'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.getElementById('dmHeader')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Newsletter form handling
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Simulate submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            
            setTimeout(() => {
                showNotification('Thank you for subscribing! You\'ll be the first to hear about exclusive offers.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    
    // Accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Category filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter FAQ items
            const faqCategories = document.querySelectorAll('.faq-category-section');
            faqCategories.forEach(cat => {
                if (category === 'all' || cat.dataset.category === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Booking Form
 */
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    
    if (form) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        const checkinInput = form.querySelector('input[name="checkin"]');
        const checkoutInput = form.querySelector('input[name="checkout"]');
        
        if (checkinInput) checkinInput.min = today;
        if (checkoutInput) checkoutInput.min = today;
        
        // Update checkout min when checkin changes
        if (checkinInput) {
            checkinInput.addEventListener('change', () => {
                if (checkoutInput) {
                    checkoutInput.min = checkinInput.value;
                    if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
                        const nextDay = new Date(new Date(checkinInput.value).getTime() + 86400000);
                        checkoutInput.value = nextDay.toISOString().split('T')[0];
                    }
                }
            });
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Request...';
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Thank you! Your booking request has been received. We\'ll contact you within 24 hours to confirm.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }
}

/**
 * Hero Popup for 2026 Season
 */
function initPopup() {
    const popup = document.getElementById('heroPopup');
    const closeBtn = document.getElementById('closePopup');
    
    if (!popup) return;
    
    // Check if popup was already shown
    const popupShown = sessionStorage.getItem('heroPopupShown');
    
    if (!popupShown) {
        setTimeout(() => {
            popup.classList.add('active');
            sessionStorage.setItem('heroPopupShown', 'true');
        }, 2000);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });
    }
    
    // Close on overlay click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        background: ${type === 'success' ? '#687e75' : '#32363c'};
        color: #fff;
        padding: 20px 24px;
        border-radius: 2px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        line-height: 1.5;
    `;
    
    // Add close button styles
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 20px;
        padding: 0 0 0 16px;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s;
    `;
    
    closeBtn.addEventListener('mouseover', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseout', () => closeBtn.style.opacity = '0.7');
    
    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button handler
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Parallax effect for hero section
 */
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-section');
    const heroImg = document.querySelector('.hero-img');
    
    if (hero && heroImg) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.4;
        
        if (scrolled < hero.offsetHeight) {
            heroImg.style.transform = `translateY(${rate}px) scale(1.1)`;
        }
    }
});

/**
 * Image lazy loading enhancement
 */
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// MAIN PORTFOLIO SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ======================
    // VARIABLES & ELEMENTS
    // ======================
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const backToTopBtn = document.querySelector('.back-to-top');
    const contactForm = document.getElementById('contact-form');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const currentYearElement = document.getElementById('current-year');
    const scrollDownBtn = document.querySelector('.scroll-down-btn');
    const avatarFrame = document.querySelector('.avatar-frame');
    
    // Yenfa Certificates Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const yenfaItems = document.querySelectorAll('.yenfa-item');

    // ======================
    // INITIAL SETUP
    // ======================
    function initializePage() {
        // Set current year in footer
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
        
        // Animate hero section elements
        animateHeroElements();
        
        // Create dynamic particles
        createDynamicParticles();
        
        // Initialize skill bars
        animateSkillBars();
        
        // Initialize Yenfa filter
        initYenfaFilter();
        
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        // Show welcome notification after delay
        setTimeout(() => {
            showNotification('👋 Welcome to my Data Science Portfolio! Explore my skills and projects.', 'info');
        }, 1000);
        
        // Start typing effect
        typeWriterEffect();
    }

    // ======================
    // SCROLL HANDLING
    // ======================
    let ticking = false;
    
    function handleScroll() {
        // Navbar scroll effect
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
        
        // Animate elements on scroll
        animateSkillBars();
        animateStatsCounter();
        
        // Parallax effect for hero section
        updateParallax();
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ======================
    // NAVIGATION
    // ======================
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll down button
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#about-details');
            if (target) {
                const headerHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ======================
    // CONTACT FORM
    // ======================
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // In production, replace with actual API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showNotification('Message sent successfully! I will get back to you soon!', 'success');
                contactForm.reset();
                
            } catch (error) {
                showNotification('Error sending message. Please try again.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ======================
    // ANIMATIONS & EFFECTS
    // ======================
    function animateHeroElements() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroStats = document.querySelector('.hero-stats');
        
        if (heroTitle) heroTitle.style.animation = 'fadeInUp 1s ease-out 0.2s both';
        if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 1s ease-out 0.4s both';
        if (heroStats) heroStats.style.animation = 'fadeInUp 1s ease-out 0.6s both';
    }

    function createDynamicParticles() {
        const particlesContainer = document.querySelector('.tech-particles');
        if (!particlesContainer) return;
        
        particlesContainer.innerHTML = '';
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 15 + Math.random() * 15;
            
            particle.style.cssText = `
                --i: ${i + 1};
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                opacity: ${Math.random() * 0.3 + 0.1};
            `;
            
            const colors = ['#FFD700', '#33C481', '#5A9BD4', '#FF6B35'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    }

    function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();

        if (rect.top < window.innerHeight && !bar.classList.contains('animated')) {

            const width = bar.getAttribute('aria-valuenow') + "%";

            bar.style.width = width;
            bar.classList.add('animated');
        }
    });
}
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${rate}px`;
        }
    }

    function typeWriterEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;
        
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        
        setTimeout(type, 1000);
    }

    // ======================
    // FLOATING ICONS
    // ======================
    let iconMovementInterval = null;
    
    floatingIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.zIndex = '1002';
            icon.style.animationPlayState = 'paused';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.zIndex = '1001';
            icon.style.animationPlayState = 'running';
        });
        
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const skillName = icon.querySelector('.icon-tooltip')?.textContent || 'Skill';
            
            showNotification(`🎯 ${skillName}! This is one of my core skills. Check the Skills section for details.`, 'info');
        });
    });
    
    function startIconMovement() {
        if (iconMovementInterval) return;
        
        iconMovementInterval = setInterval(() => {
            floatingIcons.forEach(icon => {
                if (Math.random() > 0.6) {
                    const baseTransform = icon.classList.contains('icon-powerbi') ? 'translateY(-50%)' : '';
                    const randomX = (Math.random() * 15 - 7.5).toFixed(1);
                    const randomY = (Math.random() * 15 - 7.5).toFixed(1);
                    const randomRotation = (Math.random() * 10 - 5).toFixed(1);
                    
                    icon.style.transition = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    icon.style.transform = `${baseTransform} translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg) scale(1.05)`;
                    
                    setTimeout(() => {
                        icon.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        if (icon.classList.contains('icon-powerbi')) {
                            icon.style.transform = 'translateY(-50%)';
                        } else {
                            icon.style.transform = '';
                        }
                    }, 1200);
                }
            });
        }, 2000);
    }
    
    function stopIconMovement() {
        if (iconMovementInterval) {
            clearInterval(iconMovementInterval);
            iconMovementInterval = null;
            
            floatingIcons.forEach(icon => {
                icon.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                if (icon.classList.contains('icon-powerbi')) {
                    icon.style.transform = 'translateY(-50%)';
                } else {
                    icon.style.transform = '';
                }
            });
        }
    }

    if (avatarFrame) {
        avatarFrame.addEventListener('mouseenter', startIconMovement);
        avatarFrame.addEventListener('mouseleave', stopIconMovement);
    }

    // ======================
    // NOTIFICATION SYSTEM
    // ======================
    function showNotification(message, type = 'info') {
        document.querySelectorAll('.notification').forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="${icons[type] || icons.info}"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            addNotificationStyles();
        }
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            closeNotification(notification);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                closeNotification(notification);
            }
        }, 5000);
    }
    
    function addNotificationStyles() {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(26, 26, 46, 0.95);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 10000;
                animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                border-left: 4px solid;
                max-width: 350px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
            }
            .notification.success { border-left-color: #4CAF50; }
            .notification.error { border-left-color: #f44336; }
            .notification.info { border-left-color: #2196F3; }
            .notification i { 
                font-size: 22px;
                min-width: 24px;
            }
            .notification.success i { color: #4CAF50; }
            .notification.error i { color: #f44336; }
            .notification.info i { color: #2196F3; }
            .notification span {
                flex: 1;
                line-height: 1.4;
                font-size: 0.95rem;
            }
            .notification-close {
                background: rgba(255,255,255,0.1);
                border: none;
                color: white;
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
                font-size: 14px;
            }
            .notification-close:hover {
                background: rgba(255,255,255,0.2);
                transform: rotate(90deg);
            }
            @keyframes slideIn {
                from { 
                    transform: translateX(100%); 
                    opacity: 0; 
                }
                to { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
            }
            @keyframes slideOut {
                from { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
                to { 
                    transform: translateX(100%); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    function closeNotification(notification) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }

    // ======================
    // INTERACTIVE ELEMENTS
    // ======================
    // Skill items interaction
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', () => {
            const skillName = item.querySelector('h3').textContent;
            const progress = item.querySelector('.skill-progress')?.style.width || 'Advanced';
            
            showNotification(`💪 ${skillName} - ${progress} proficiency!`, 'info');
        });
    });

    // About cards interaction
    document.querySelectorAll('.about-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Project items interaction
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.item-overlay');
            const title = item.querySelector('h2');
            
            if (overlay && title) {
                overlay.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.item-overlay');
            const title = item.querySelector('h2');
            
            if (overlay && title) {
                overlay.style.opacity = '0';
                title.style.transform = 'translateY(20px)';
            }
        });
        
        item.addEventListener('click', () => {
            const title = item.querySelector('h2').textContent;
            const description = item.querySelector('p')?.textContent || '';
            showNotification(`🚀 ${title} - ${description}`, 'info');
        });
    });

    // Certificate items interaction
    document.querySelectorAll('.certificates .item').forEach(item => {
        item.addEventListener('click', function() {
            const certificateTitle = this.querySelector('h2').textContent;
            const issuer = this.querySelector('p').textContent;
            
            showNotification(`📜 ${certificateTitle} - ${issuer}`, 'info');
        });
    });

    // Soft skills interaction
    document.querySelectorAll('.soft-skills .skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-header i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.transition = 'transform 0.6s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-header i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Web skills interaction
    document.querySelectorAll('.web-skills .skill-item').forEach(item => {
        item.addEventListener('click', () => {
            const skillName = item.querySelector('h3').textContent;
            
            showNotification(`🌐 ${skillName} - Essential for modern web development`, 'info');
        });
    });

    // ======================
    // COUNTER ANIMATIONS
    // ======================
    function animateStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsContainer = document.querySelector('.hero-stats');
        
        if (!statsContainer) return;
        
        const rect = statsContainer.getBoundingClientRect();
        const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight + 100);
        
        if (isVisible) {
            statNumbers.forEach(statNumber => {
                if (!statNumber.classList.contains('animated')) {
                    const targetValue = parseInt(statNumber.textContent.replace('+', ''));
                    const duration = 2000;
                    const increment = targetValue / (duration / 16);
                    let currentValue = 0;
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            statNumber.textContent = targetValue + '+';
                            clearInterval(timer);
                            statNumber.classList.add('animated');
                        } else {
                            statNumber.textContent = Math.floor(currentValue) + '+';
                        }
                    }, 16);
                }
            });
        }
    }

    // ======================
    // YENFA CERTIFICATES FILTER
    // ======================
    function initYenfaFilter() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter items
                yenfaItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }

    // ======================
    // INTERSECTION OBSERVERS
    // ======================
    const softSkillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                    }, 100);
                });
                softSkillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const sectionsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { 
        root: null,
        rootMargin: '50px',
        threshold: 0.1 
    });

    // Observe elements
    const softSkillsSection = document.querySelector('.soft-skills');
    if (softSkillsSection) {
        softSkillsObserver.observe(softSkillsSection);
    }
    
    document.querySelectorAll('section').forEach(section => {
        sectionsObserver.observe(section);
    });

    // ======================
    // IMAGE LOADING
    // ======================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
            });
        }
    });

    // ======================
    // KEYBOARD NAVIGATION
    // ======================
    document.addEventListener('keydown', (e) => {
        // Escape to close mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        // Home key to scroll to top
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // End key to scroll to bottom
        if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });

    // ======================
    // PAGE VISIBILITY
    // ======================
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && avatarFrame && iconMovementInterval) {
            stopIconMovement();
            startIconMovement();
        }
    });

    // ======================
    // INITIALIZE EVERYTHING
    // ======================
    initializePage();
});

// تأثير ظهور البطاقات عند التمرير (Scroll Reveal)
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.2 // سيبدأ التأثير عندما يظهر 20% من السيكشن
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // إضافة كلاس الـ animation للبطاقات بالترتيب
                const cards = entry.target.querySelectorAll('.timeline-block');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateX(0)";
                    }, index * 300); // تأخير 300 مللي ثانية بين كل بطاقة
                });
            }
        });
    }, observerOptions);

    // تفعيل الـ Observer على سيكشن الرحلة المهنية
    const journeySection = document.querySelector('.career-journey');
    if (journeySection) {
        observer.observe(journeySection);
    }
});
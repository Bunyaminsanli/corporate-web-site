// Main JavaScript for Corporate Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .text-center, .grid > div');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // WhatsApp Order Form handling
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        // Real-time form validation
        const formInputs = orderForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('form-error')) {
                    validateField(this);
                }
            });
        });
        
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Validate all required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showNotification('Lütfen tüm zorunlu alanları doğru şekilde doldurun!', 'error');
                return;
            }
            
            // Get form values
            const name = formData.get('name');
            const phone = formData.get('phone');
            const address = formData.get('address');
            const tubeType = formData.get('tubeType');
            const quantity = formData.get('quantity');
            const notes = formData.get('notes');
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> WhatsApp Açılıyor...';
            submitBtn.disabled = true;
            
            // Create WhatsApp message
            const message = createWhatsAppMessage({
                name: name,
                phone: phone,
                address: address,
                tubeType: tubeType,
                quantity: quantity,
                notes: notes
            });
            
            // Open WhatsApp with pre-filled message
            const whatsappUrl = `https://wa.me/905538352754?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form after a short delay
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showNotification('WhatsApp açıldı! Mesajınızı gönderdikten sonra size dönüş yapacağız.', 'success');
            }, 1000);
        });
    }
    
    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        // Remove existing error/success classes
        field.classList.remove('form-error', 'form-success');
        
        // Check if field is empty when required
        if (isRequired && !value) {
            field.classList.add('form-error');
            return false;
        }
        
        // Phone number validation
        if (field.name === 'phone' && value) {
            const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                field.classList.add('form-error');
                return false;
            }
        }
        
        // If field is valid and has value, add success class
        if (value) {
            field.classList.add('form-success');
        }
        
        return true;
    }
    
    // Create WhatsApp message function
    function createWhatsAppMessage(orderData) {
        const currentDate = new Date().toLocaleDateString('tr-TR');
        const currentTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        
        let message = `*GÜVENTÜP - YENİ SİPARİŞ*\n\n`;
        message += `*Tarih:* ${currentDate} ${currentTime}\n\n`;
        message += `*Müşteri Bilgileri:*\n`;
        message += `• Ad Soyad: ${orderData.name}\n`;
        message += `• Telefon: ${orderData.phone}\n`;
        message += `• Adres: ${orderData.address}\n\n`;
        message += `*Sipariş Detayları:*\n`;
        message += `• Tüp Çeşidi: ${orderData.tubeType}\n`;
        message += `• Adet: ${orderData.quantity}\n`;
        
        if (orderData.notes && orderData.notes.trim()) {
            message += `• Ek Notlar: ${orderData.notes}\n\n`;
        } else {
            message += `\n`;
        }
        
        message += `*Teslimat Bilgileri:*\n`;
        message += `• Hızlı teslimat talep edildi\n`;
        message += `• 7/24 hizmet kapsamında\n\n`;
        message += `Bu sipariş web sitesi üzerinden alınmıştır.\n`;
        message += `Müşteri ile iletişime geçilmesi rica olunur.`;
        
        return message;
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Remove on click
        notification.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // Stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when about section is visible
    const aboutSection = document.querySelector('#hakkimizda');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        aboutObserver.observe(aboutSection);
    }
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone call (you can add analytics here)
            console.log('Phone number clicked:', this.getAttribute('href'));
        });
    });
    
    // Lazy loading for images (if any)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Add active state to navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600');
            link.classList.add('text-gray-700');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-700');
                link.classList.add('text-blue-600');
            }
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Scroll-based animations and effects
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Initialize tooltips (if needed)
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'absolute bg-gray-900 text-white px-2 py-1 rounded text-sm z-50';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.top = this.offsetTop - 30 + 'px';
                tooltip.style.left = this.offsetLeft + 'px';
                document.body.appendChild(tooltip);
                
                this.addEventListener('mouseleave', function() {
                    tooltip.remove();
                });
            });
        });
    }
    
    // Initialize tooltips
    initTooltips();
    
    // Map functionality
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // Add click to zoom effect
        mapContainer.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Add loading animation for map
        const mapIframe = mapContainer.querySelector('iframe');
        if (mapIframe) {
            mapIframe.addEventListener('load', function() {
                mapContainer.classList.add('map-loaded');
            });
        }
    }
    
    // Map button click tracking
    const mapButton = document.querySelector('.map-button a');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            // Track map button click (you can add analytics here)
            console.log('Map button clicked - opening Google Maps');
        });
    }
    
    // WhatsApp button click tracking and functionality
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track WhatsApp button click (you can add analytics here)
            console.log('WhatsApp button clicked - opening WhatsApp chat');
            
            // If it's the footer WhatsApp button, open with a default message
            if (this.closest('footer')) {
                e.preventDefault();
                const defaultMessage = "Merhaba! Ev tüpü hizmetiniz hakkında bilgi almak istiyorum.";
                const whatsappUrl = `https://wa.me/905538352754?text=${encodeURIComponent(defaultMessage)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    });
    
    // Product order button functionality
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the product name from data attribute
            const productName = this.getAttribute('data-product');
            
            // Scroll to quick order section
            const quickOrderSection = document.querySelector('#hizli-siparis');
            if (quickOrderSection) {
                const offsetTop = quickOrderSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Set the product in the form after a short delay to ensure smooth scroll completes
                setTimeout(() => {
                    const tubeTypeSelect = document.querySelector('select[name="tubeType"]');
                    if (tubeTypeSelect) {
                        // Find the option that matches the product name
                        const options = tubeTypeSelect.querySelectorAll('option');
                        options.forEach(option => {
                            if (option.value === productName) {
                                tubeTypeSelect.value = productName;
                                // Add visual feedback
                                tubeTypeSelect.classList.add('form-success');
                                setTimeout(() => {
                                    tubeTypeSelect.classList.remove('form-success');
                                }, 2000);
                            }
                        });
                    }
                }, 800); // Wait for scroll to complete
            }
        });
    });
    
    // Console welcome message
    console.log('%c🚀 GüvenTüp Web Sitesi', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log('%cModern ve responsive kurumsal web sitesi', 'color: #6b7280; font-size: 14px;');
    console.log('%c🗺️ Harita özelliği eklendi!', 'color: #10b981; font-size: 14px;');
    console.log('%c📱 WhatsApp sipariş sistemi eklendi!', 'color: #25d366; font-size: 14px;');
    
}); 
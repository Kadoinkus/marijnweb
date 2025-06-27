// Enhanced JavaScript for Marijn Rinck website
document.addEventListener('DOMContentLoaded', function() {
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  
  function updateNavbar() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  }
  
  window.addEventListener('scroll', updateNavbar);
  
  // Mobile menu functionality
  const toggle = document.getElementById('toggle');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.checked = false;
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const navContainer = document.querySelector('.navbar');
    const isClickInsideNav = navContainer.contains(e.target);
    
    if (!isClickInsideNav && toggle.checked) {
      toggle.checked = false;
    }
  });
  
  // Scroll animations using Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
  
  // Smooth scrolling for anchor links
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
  
  // Enhanced button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Card hover effects with stagger animation
  const cards = document.querySelectorAll('.card, .package');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Form validation and enhancement
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Add focus/blur effects
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        
        // Simple validation
        if (this.hasAttribute('required') && !this.value.trim()) {
          this.style.borderColor = '#e53e3e';
        } else {
          this.style.borderColor = '';
        }
      });
      
      // Real-time validation for email
      if (input.type === 'email') {
        input.addEventListener('input', function() {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#e53e3e';
          } else {
            this.style.borderColor = '';
          }
        });
      }
    });
    
    // Form submission handling
    contactForm.addEventListener('submit', function(e) {
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e53e3e';
          isValid = false;
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        // Scroll to first invalid field
        const firstInvalid = this.querySelector('[style*="border-color: rgb(229, 62, 62)"]');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
      }
    });
  }
  
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }
  
  // Loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });
    
    // Set initial styles
    img.style.opacity = '0';
    img.style.transform = 'scale(1.05)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Typing effect for hero title (optional enhancement)
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && heroTitle.textContent) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid #d69e2e';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          heroTitle.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }
  
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
  const debouncedNavbarUpdate = debounce(updateNavbar, 10);
  window.removeEventListener('scroll', updateNavbar);
  window.addEventListener('scroll', debouncedNavbarUpdate);
  
  // Add loading class to body when page is fully loaded
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger animations for elements in viewport
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  });
  
  // Keyboard navigation improvements
  document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && toggle.checked) {
      toggle.checked = false;
    }
    
    // Skip to main content with Tab key
    if (e.key === 'Tab' && e.target === document.body) {
      const mainContent = document.querySelector('main, .hero, .section');
      if (mainContent) {
        mainContent.focus();
      }
    }
  });
  
  // Add focus styles for better accessibility
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
  focusableElements.forEach(el => {
    el.addEventListener('focus', function() {
      this.style.outline = '2px solid #d69e2e';
      this.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });
  
  // Drag & Slide functionality for testimonials
  const testimonialsGrid = document.querySelector('.testimonials-grid');
  if (testimonialsGrid) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let hasMoved = false;
    
    testimonialsGrid.addEventListener('mousedown', (e) => {
      // Only start drag on empty areas, not on text or interactive elements
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
          e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      
      isDown = true;
      hasMoved = false;
      startX = e.pageX - testimonialsGrid.offsetLeft;
      scrollLeft = testimonialsGrid.scrollLeft;
      testimonialsGrid.style.userSelect = 'none';
    });
    
    testimonialsGrid.addEventListener('mouseleave', () => {
      isDown = false;
      hasMoved = false;
      testimonialsGrid.classList.remove('active');
      testimonialsGrid.style.cursor = 'grab';
      testimonialsGrid.style.userSelect = '';
    });
    
    testimonialsGrid.addEventListener('mouseup', () => {
      isDown = false;
      testimonialsGrid.classList.remove('active');
      testimonialsGrid.style.cursor = 'grab';
      testimonialsGrid.style.userSelect = '';
      
      // Reset hasMoved after a short delay to allow text selection
      setTimeout(() => {
        hasMoved = false;
      }, 100);
    });
    
    testimonialsGrid.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      
      const x = e.pageX - testimonialsGrid.offsetLeft;
      const walk = Math.abs(x - startX);
      
      // Only start dragging if mouse has moved more than 5px
      if (walk > 5) {
        if (!hasMoved) {
          hasMoved = true;
          testimonialsGrid.classList.add('active');
          testimonialsGrid.style.cursor = 'grabbing';
        }
        
        e.preventDefault();
        const scrollWalk = (x - startX) * 2;
        testimonialsGrid.scrollLeft = scrollLeft - scrollWalk;
      }
    });
    
    // Prevent text selection during drag
    testimonialsGrid.addEventListener('selectstart', (e) => {
      if (hasMoved) {
        e.preventDefault();
      }
    });
    
    // Touch events for mobile
    let touchStartX;
    let touchScrollLeft;
    let touchHasMoved = false;
    
    testimonialsGrid.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX - testimonialsGrid.offsetLeft;
      touchScrollLeft = testimonialsGrid.scrollLeft;
      touchHasMoved = false;
    });
    
    testimonialsGrid.addEventListener('touchmove', (e) => {
      if (!touchStartX) return;
      
      const x = e.touches[0].pageX - testimonialsGrid.offsetLeft;
      const walk = Math.abs(x - touchStartX);
      
      // Only prevent default if we're actually scrolling
      if (walk > 5) {
        touchHasMoved = true;
        e.preventDefault();
        const scrollWalk = (x - touchStartX) * 2;
        testimonialsGrid.scrollLeft = touchScrollLeft - scrollWalk;
      }
    });
    
    testimonialsGrid.addEventListener('touchend', () => {
      touchHasMoved = false;
    });
    
    // Set initial cursor style
    testimonialsGrid.style.cursor = 'grab';
  }
});

// Add CSS for additional animations
const additionalStyles = `
  .loaded .fade-in {
    animation: fadeInUp 0.8s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .card, .package {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }
  
  .btn {
    transition: all 0.3s ease;
  }
  
  .contact-form .focused label {
    color: #d69e2e;
    transform: translateY(-2px);
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

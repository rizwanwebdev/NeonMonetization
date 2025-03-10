// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
      hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        
        // Create mobile menu if it doesn't exist
        if (!document.querySelector('.mobile-menu')) {
          const mobileMenu = document.createElement('div');
          mobileMenu.className = 'mobile-menu';
          
          // Clone nav links
          const navLinksClone = navLinks.cloneNode(true);
          mobileMenu.appendChild(navLinksClone);
          
          // Add auth buttons
          const authButtons = document.querySelector('.auth-buttons').cloneNode(true);
          mobileMenu.appendChild(authButtons);
          
          // Add to body
          document.body.appendChild(mobileMenu);
        }
        
        // Toggle mobile menu
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
          mobileMenu.classList.toggle('active');
        }
      });
    }
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Animate stats counter when in viewport
    const animateValue = (obj, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };
    
    // Intersection Observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'), 10);
          animateValue(counter, 0, target, 2000);
          observer.unobserve(counter);
        }
      });
    }, observerOptions);
    
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
    
    // Animate chart bars when they come into view
    const chartObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.bar');
          bars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.height = bar.style.height || bar.getAttribute('style').match(/height:\s*(\d+)%/)[1] + '%';
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const charts = document.querySelectorAll('.chart');
    charts.forEach(chart => {
      chartObserver.observe(chart);
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Add mobile menu styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .mobile-menu {
        position: fixed;
        top: 4rem;
        left: 0;
        width: 100%;
        background-color: white;
        padding: 1.5rem;
        box-shadow: var(--shadow);
        transform: translateY(-100%);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        z-index: 99;
      }
      
      .mobile-menu.active {
        transform: translateY(0);
        opacity: 1;
      }
      
      .mobile-menu .nav-links {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      
      .mobile-menu .auth-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .hamburger.active span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      
      .hamburger.active span:nth-child(2) {
        opacity: 0;
      }
      
      .hamburger.active span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    `;
    document.head.appendChild(style);

    const details = document.querySelectorAll("details");
      
      details.forEach(detail => {
          detail.addEventListener("click", function() {
              details.forEach(otherDetail => {
                  if (otherDetail !== this) {
                      otherDetail.removeAttribute("open");
                  }
              });
          });
      });
  });
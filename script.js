// Responsive navigation menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close the mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Typing effect
var TxtType = function(el, toRotate, period) {
this.toRotate = toRotate;
this.el = el;
this.loopNum = 0;
this.period = parseInt(period, 10) || 2000;
this.txt = '';
this.tick();
this.isDeleting = false;
};

TxtType.prototype.tick = function() {
var i = this.loopNum % this.toRotate.length;
var fullTxt = this.toRotate[i];

if (this.isDeleting) {
this.txt = fullTxt.substring(0, this.txt.length - 1);
} else {
this.txt = fullTxt.substring(0, this.txt.length + 1);
}

this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

var that = this;
var delta = 200 - Math.random() * 100;

if (this.isDeleting) { delta /= 2; }

if (!this.isDeleting && this.txt === fullTxt) {
delta = this.period;
this.isDeleting = true;
} else if (this.isDeleting && this.txt === '') {
this.isDeleting = false;
this.loopNum++;
delta = 500;
}

setTimeout(function() {
that.tick();
}, delta);
};

window.onload = function() {
var elements = document.getElementsByClassName('typewrite');
for (var i=0; i<elements.length; i++) {
var toRotate = elements[i].getAttribute('data-type');
var period = elements[i].getAttribute('data-period');
if (toRotate) {
new TxtType(elements[i], JSON.parse(toRotate), period);
}
}
// INJECT CSS
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
document.body.appendChild(css);
};

// Animate skill bars on scroll
window.addEventListener('DOMContentLoaded', () => {
    const skillSection = document.getElementById('experience');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Initially hide skill bars
    skillBars.forEach(bar => {
        const originalWidth = bar.style.width || window.getComputedStyle(bar).width;
        bar.dataset.width = originalWidth;
        bar.style.width = '0';
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to animate skill bars
    function animateSkills() {
        if (isInViewport(skillSection)) {
            skillBars.forEach(bar => {
                // Get the class-based width
                if (bar.classList.contains('progress-beginner')) {
                    bar.style.width = '25%';
                } else if (bar.classList.contains('progress-intermediate')) {
                    bar.style.width = '50%';
                } else if (bar.classList.contains('progress-advanced')) {
                    bar.style.width = '75%';
                } else if (bar.classList.contains('progress-expert')) {
                    bar.style.width = '100%';
                }
            });
            window.removeEventListener('scroll', animateSkills);
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', animateSkills);
    // Check initially
    animateSkills();
});


// Timeline animation on scrolling
document.addEventListener('DOMContentLoaded', () => {
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
    }
});
}, { threshold: 0.2 });

timelineItems.forEach(item => {
item.style.opacity = 0;
item.style.transform = 'translateY(20px)';
item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
observer.observe(item);
});
});

// Portfolio item click events
const portfolioItems = document.querySelectorAll('.portfolio-item');
const modal = document.getElementById('portfolioModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close-modal');

const portfolioData = [
    {
        id: 1,
        title: "Do you know about NYUAD's hidden gems?",
        description: "The website serves as an interactive guide to highlight lesser-known spaces, resources, and experiences at NYUAD. The platform is designed for students, faculty, and visitors, and  aims to improve campus engagement and encourage community connection. ",
        link: "https://shakanova-a.github.io/Assignment-1/"
    },
    {
        id: 2,
        title: "Bee Yourself",
        description: "The website aims to promote self-acceptance and celebrate individuality. It provides a platform where users through the comic can engage and understand the importance of staying true to yourself. By sharing personal experiences, offering advice, and showcasing diverse voices, the site encourages visitors to embrace their unique traits, talents, and perspectives. Team members: Aizhan Karpykova, Adeliya Aitpayeva, Mukhlisa Mamatova.",
        link: "https://adelkinhere.github.io/Assignment---Comics/"
    },
    {
        id: 3,
        title: "Not Alone",
        description: "This website was originally created to give the audience a spooky, horror-like experience with an unexpected twist. But that spooky moment also represents something deeper. In the website, a girl hears a strange noise in her house and feels afraid. Instead of hiding, she steps into the quiet, dark hallway to find out what’s going on. In the end, she discovers it was just her playful cat. What seemed scary at first turned out to be completely harmless. The things that frighten people are often just parts of themselves they have not fully come to understand. Team members: Sanjana Nambiar, Saamia Shafqat, Aizhan Karpykova.",
        link: "https://saamia1.github.io/sound-project/"
    },
    {
        id: 4,
        title: "Prom?",
        description: "This project explores the experience of navigating romantic expectations in a university setting. It examines the pressure to find a partner, particularly in the face of social events like prom, and reflects on the emotional landscape that accompanies this pursuit. Using humor and relatable scenarios, the narrative highlights themes such as vulnerability and the tension between self-improvement and authenticity. Team members: Adeliya Aitpayeva, Ali Noor, Linus Jiang.",
        link: "https://adelkinhere.github.io/Assignment_Video/"
    }
];

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const projectId = parseInt(item.getAttribute('data-id'));
        const project = portfolioData.find(p => p.id === projectId);
        
        if (project) {
            modalTitle.textContent = project.title;
            modalContent.innerHTML = `
               
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" style="display:inline-block; margin-top:20px; padding:10px 20px; background-color:#0066cc; color:white; text-decoration:none; border-radius:4px;">View Project</a>
            `;
            modal.style.display = 'flex';
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Custom cursor functionality
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const particlesContainer = document.querySelector('.particles-container');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    // Update cursor positions
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay to follower for smooth effect
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
    
    // Create particles on mouse move
    createParticle(e.clientX, e.clientY);
});

// Particle creation function
function createParticle(x, y) {
    // Limit the particle creation to control performance
    if (Math.random() > 0.5) return;
    
    // Create a new particle element
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Set initial position at cursor
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // Randomize particle properties for variety
    const size = Math.floor(Math.random() * 8) + 3;
    const hue = Math.floor(Math.random() * 360);
    const opacity = Math.random() * 0.8 + 0.2;
    
    // Apply random styles
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, ${opacity})`;
    
    // Add to container
    particlesContainer.appendChild(particle);
    
    // Animate the particle
    animateParticle(particle);
}

// Particle animation function
function animateParticle(particle) {
    // Random direction and distance
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const startTime = Date.now();
    const duration = Math.random() * 1000 + 500; // 0.5 to 1.5 seconds
    
    // Starting position
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    
    // Calculate end position
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;
    
    // Animation frame function
    function frame() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
            // Animation complete, remove particle
            particlesContainer.removeChild(particle);
            return;
        }
        
        // Calculate current position with easing
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        const currentX = startX + (endX - startX) * easeProgress;
        const currentY = startY + (endY - startY) * easeProgress;
        
        // Apply position
        particle.style.left = currentX + 'px';
        particle.style.top = currentY + 'px';
        
        // Fade out as it moves
        particle.style.opacity = 1 - easeProgress;
        
        // Continue animation
        requestAnimationFrame(frame);
    }
    
    // Start animation
    requestAnimationFrame(frame);
}

// Handle cursor visibility when leaving/entering the window
document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
    cursorFollower.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
});
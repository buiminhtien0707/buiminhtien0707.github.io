/ Interactive Particle Background
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.setup();
    }

    setup() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';

        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`
            });
        }

        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

// Interactive Skill Progress
class SkillInteraction {
    constructor() {
        this.skillCards = document.querySelectorAll('.activity-card');
        this.setupInteractions();
    }

    setupInteractions() {
        this.skillCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            });

            card.addEventListener('mouseleave', (e) => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = 'none';
            });
        });
    }
}

// Easter Egg Console Message
function addConsoleEasterEgg() {
    console.log(`
    %c Hey there, curious developer! 👋
    %c Welcome to Tien's awesome portfolio! 
    %c Looks like you're checking out the source code. 
    %c Want to collaborate or say hi? Reach out! 🚀
    `, 
    'color: purple; font-weight: bold; font-size: 20px;',
    'color: blue; font-weight: bold;',
    'color: green;',
    'color: orange;'
    );
}

// Random Quote Generator for Contact Section
class QuoteGenerator {
    constructor() {
        this.quotes = [
            "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "Believe you can and you're halfway there. - Theodore Roosevelt",
            "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
        ];
        this.quoteElement = document.createElement('div');
        this.quoteElement.classList.add('random-quote');
        this.setupQuote();
    }

    setupQuote() {
        const contactSection = document.getElementById('contact');
        this.quoteElement.textContent = this.getRandomQuote();
        this.quoteElement.style.cssText = `
            text-align: center;
            margin-top: 20px;
            font-style: italic;
            color: #666;
        `;
        contactSection.appendChild(this.quoteElement);

        // Change quote every 10 seconds
        setInterval(() => {
            this.quoteElement.textContent = this.getRandomQuote();
        }, 10000);
    }

    getRandomQuote() {
        return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing effect for hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content p');
    
    function typeEffect(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    }

    typeEffect(heroTitle, heroTitle.textContent);
    setTimeout(() => {
        typeEffect(heroSubtitle, heroSubtitle.textContent, 30);
    }, 1000);
});

// Skill progress animation
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.activity-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    skillCards.forEach(card => {
        observer.observe(card);
    });
});

// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌓 Toggle Dark Mode';
    darkModeToggle.classList.add('dark-mode-toggle');
    document.querySelector('.navbar').appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create canvas for particle background
    const particleCanvas = document.createElement('canvas');
    particleCanvas.id = 'particle-background';
    document.body.insertBefore(particleCanvas, document.body.firstChild);

    // Initialize features
    new ParticleBackground('particle-background');
    new SkillInteraction();
    new QuoteGenerator();
    addConsoleEasterEgg();
});

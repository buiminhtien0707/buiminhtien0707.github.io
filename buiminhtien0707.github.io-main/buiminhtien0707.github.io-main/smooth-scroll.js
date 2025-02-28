document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const smoothReveal = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger the reveal based on section's index
                const delay = Array.from(sections).indexOf(entry.target) * 200;
                
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(smoothReveal, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

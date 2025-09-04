// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.fa-bars');
    const nav = document.querySelector('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close mobile menu when clicking on a nav item
    const navItems = document.querySelectorAll('nav li');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Animate progress bars when skills section is in view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Project item click handlers
    const projectItems = document.querySelectorAll('.projectItem');
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const detail = this.querySelector('.projectDetail');
            if (detail) {
                detail.style.display = detail.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // ======================
    // ✅ EmailJS Integration
    // ======================
    if (typeof emailjs !== 'undefined') {
        // Replace with your EmailJS Public Key
        emailjs.init("YOUR_PUBLIC_KEY");
    }

    const contactForm = document.getElementById('contact-form');
    const messageStatus = document.getElementById('message-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const templateParams = {
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Show loading message
            messageStatus.innerHTML = '<p style="color: #667eea;">Sending message...</p>';

            // 🔹 Replace with your actual EmailJS Service ID & Template ID
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
                .then(() => {
                    messageStatus.innerHTML = '<p style="color: #28a745;">Message sent successfully! I\'ll get back to you soon.</p>';
                    contactForm.reset();
                    setTimeout(() => { messageStatus.innerHTML = ''; }, 5000);
                })
                .catch(() => {
                    messageStatus.innerHTML = '<p style="color: red;">Oops! Something went wrong. Try again later.</p>';
                });
        });
    }
});

// Popup functions
function togglePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
        
        if (popupId === 'popupAnimated' && popup.style.display === 'flex') {
            animateText();
        }
    }
}

function animateText() {
    const container = document.getElementById('animatedTextContainer');
    if (!container) return;

    const text = `Hi, I'm Godwin Stanes G, a motivated B.E. Electronics and Communication Engineering student with a deep curiosity for data science, machine learning, and data analysis. Currently pursuing my degree at Tagore Engineering College, Vandalur (2023-2027) with a CGPA of 7.8/10.

I have gained familiarity with Python, SQL, and machine learning frameworks such as PyTorch, and I am continuously working to strengthen these skills through practical applications. My technical expertise includes Python programming with libraries like NumPy and Pandas, along with experience in PyTorch for deep learning projects.

Through my internships at LEO Technology and Nextgen Technology, I've gained hands-on experience in backend development using Django and frontend design using WordPress. I've successfully built projects including a Handwritten Digit Recognition Web App using CNN models and PyTorch, demonstrating my ability to integrate machine learning with web applications.

I hold certifications in Deep Learning from NVIDIA (2024), Python from Udemy (2025), and Introduction to Cyber Security from Infosys Springboard (2024). These credentials reflect my commitment to continuous learning and staying current with emerging technologies.

With a strong problem-solving mindset and analytical abilities, I am eager to further develop my technical expertise and apply my skills to contribute to innovative, data-driven solutions that align with the vision of AI-enabled business transformation. I'm particularly interested in exploring generative AI, prompt engineering, large language models, and anomaly detection.

Beyond technology, I enjoy PC building, playing keyboard at church and marriage events, exploring new technologies, and PC gaming. I'm fluent in Tamil and English, and I'm always eager to collaborate on innovative projects and explore new challenges in the data science field.

Let's connect and create something amazing together!`;

    container.innerHTML = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            container.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 20);
        }
    }

    typeWriter();
}

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.color = '#333';
            
            const navItems = header.querySelectorAll('nav li');
            navItems.forEach(item => item.style.color = '#333');

            const hamburger = header.querySelector('.fa-bars');
            if (hamburger) hamburger.style.color = '#333';

            const logo = header.querySelector('h1');
            if (logo) logo.style.color = '#333';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.color = 'white';
            
            const navItems = header.querySelectorAll('nav li');
            navItems.forEach(item => item.style.color = 'white');

            const hamburger = header.querySelector('.fa-bars');
            if (hamburger) hamburger.style.color = 'white';

            const logo = header.querySelector('h1');
            if (logo) logo.style.color = 'white';
        }
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Intersection observer for animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.skillItem, .projectItem');
    animateElements.forEach(el => {
        animationObserver.observe(el);
    });
});

function animateText() {
    const spans = document.querySelectorAll('.text-container');
    let delay = 0;
    spans.forEach((span) => {
        setTimeout(() => {
            span.style.width = span.textContent.length + 'ch';
        }, delay);
        delay += 2500;
        setTimeout(() => {
            span.style.width = '0ch';
        }, delay + 0);
    });
    setTimeout(animateText, delay + 0);
}
animateText();

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".fa-bars");
    const menuList = document.querySelector(".header nav");

    menu.addEventListener("click", () => {
        menuList.classList.toggle("showmenu");
        menu.setAttribute("aria-expanded", menuList.classList.contains("showmenu"));
    });

    document.addEventListener('click', (event) => {
        if (!menuList.contains(event.target) && !menu.contains(event.target) && menuList.classList.contains('showmenu')) {
            menuList.classList.remove('showmenu');
            menu.setAttribute('aria-expanded', 'false');
        }
    });
});


let animationIndex = 0;
let animationInterval;
let animationSkipped = false;

function togglePopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup.style.display === "block") {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
        if (popupId === "popupAnimated") {
            startTextAnimation();
        }
    }
}

function startTextAnimation() {
    animationIndex = 0;
    const fullText = `Hi, I'm Mohan, a passionate Web Developer, Data Analyst, and Python Programmer with a strong foundation in computer science. I graduated with a B.Sc. in Computer Science from SRM University (2024) and am continuously enhancing my technical expertise to stay ahead in the ever-evolving tech landscape.<br><br>My skill set spans across web development, data analytics, and design. I have a strong command over HTML, CSS, and JavaScript, enabling me to build structured, responsive, and interactive web applications. I am also proficient in React.js, which allows me to create dynamic user interfaces. Version control is a crucial part of my workflow, and I have extensive experience with Git and GitHub for efficient collaboration and code management.<br><br>In the field of data analytics, I work with Python, particularly using Pandas for data manipulation and analysis. I have a solid understanding of SQL for querying and managing relational databases, along with experience in MongoDB for handling NoSQL databases. Additionally, I use Power BI and Excel for data visualization, reporting, and business intelligence.<br><br>Beyond development and analytics, I also have experience in graphic design and presentation tools like Photoshop, Canva, Figma, and PowerPoint, allowing me to create visually compelling designs and reports.<br><br>Currently, I am deepening my expertise in data analytics and web development to bridge the gap between technology and business solutions. My goal is to apply my skills to real-world projects, build scalable applications, and drive impactful insights through data. I am always eager to collaborate on innovative ideas and explore new challenges in the tech industry.<br><br>Let’s connect and create something amazing together!`;
    const container = document.getElementById("animatedTextContainer");
    if (!container) return;
    container.innerHTML = "";

    const chunks = [];
    let currentChunk = "";
    for (let i = 0; i < fullText.length; i++) {
        if (fullText.substring(i, i + 4) === '<br>') {
            if (currentChunk) {
                chunks.push(currentChunk);
                currentChunk = "";
            }
            chunks.push('<br>');
            i += 3; // Skip the <br> tag
        } else {
            currentChunk += fullText[i];
        }
    }
    if (currentChunk) {
        chunks.push(currentChunk);
    }

    let chunkIndex = 0;
    let charIndex = 0;

    function animateChunk() {
        if (chunkIndex < chunks.length) {
            const chunk = chunks[chunkIndex];
            if (chunk === '<br>') {
                container.appendChild(document.createElement('br'));
                chunkIndex++;
                charIndex = 0;
                requestAnimationFrame(animateChunk);
            } else {
                if (charIndex < chunk.length) {
                    const char = chunk[charIndex];
                    const span = document.createElement("span");
                    span.classList.add("animated-char");
                    span.textContent = char;
                    container.appendChild(span);
                    setTimeout(() => {
                        span.style.opacity = 1;
                    }, 10);
                    charIndex++;
                    requestAnimationFrame(animateChunk);
                } else {
                    chunkIndex++;
                    charIndex = 0;
                    requestAnimationFrame(animateChunk);
                }
            }
        }
    }

    requestAnimationFrame(animateChunk);
}


document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("5sJ3Uv8yDrTrzhr9A");

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const submitButton = document.querySelector(".sendMail");
        const messageStatus = document.getElementById("message-status");
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        const formData = {
            first_name: this.first_name.value,
            last_name: this.last_name.value,
            email: this.email.value,
            subject: this.subject.value,
            message: this.message.value,
            to_email: "mohancheenu04@gmail.com",
        };

        emailjs.send("service_1xps2dv", "template_8c78rk1", formData)
            .then(response => {
                console.log("Message sent!", response);
                submitButton.textContent = "Send Message";
                submitButton.disabled = false;
                document.getElementById("contact-form").reset();
                messageStatus.textContent = "Message sent successfully!, Check Your Mail for Confirmation";
                messageStatus.style.color = "white";
                messageStatus.style.backgroundColor = "green";
                messageStatus.style.padding = "5px 10px";
                messageStatus.style.borderRadius = "5px";
                messageStatus.style.display = "inline-block";

                setTimeout(() => {
                    messageStatus.textContent = "";
                    messageStatus.style.backgroundColor = "";
                    messageStatus.style.padding = "";
                    messageStatus.style.borderRadius = "";
                    messageStatus.style.display = "";
                }, 5000);

                // Removed the code that sends the automated reply
            })
            .catch(error => {
                console.error("Error sending message:", error);
                submitButton.textContent = "Send Message";
                submitButton.disabled = false;
                messageStatus.textContent = "Failed to send message.";
                messageStatus.style.color = "white";
                messageStatus.style.backgroundColor = "red";
                messageStatus.style.padding = "5px 10px";
                messageStatus.style.borderRadius = "5px";
                messageStatus.style.display = "inline-block";

                setTimeout(() => {
                    messageStatus.textContent = "";
                    messageStatus.style.backgroundColor = "";
                    messageStatus.style.padding = "";
                    messageStatus.style.borderRadius = "";
                    messageStatus.style.display = "";
                }, 5000);
            });
    });
});





function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
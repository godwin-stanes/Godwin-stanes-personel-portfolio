document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    setupContactForm();
    setupScrollLinks();
    setupAnimatedText();
  });
  
  function setupMobileMenu() {
    const menu = document.querySelector(".fa-bars");
    const menuList = document.querySelector(".header nav");
  
    if (!menu || !menuList) return;
  
    menu.addEventListener("click", () => {
      menuList.classList.toggle("showmenu");
      menu.setAttribute("aria-expanded", menuList.classList.contains("showmenu"));
    });
  
    document.addEventListener("click", (event) => {
      if (!menuList.contains(event.target) && !menu.contains(event.target) && menuList.classList.contains("showmenu")) {
        menuList.classList.remove("showmenu");
        menu.setAttribute("aria-expanded", "false");
      }
    });
  }
  
  function setupContactForm() {
    emailjs.init("5sJ3Uv8yDrTrzhr9A");
  
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;
  
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const submitButton = contactForm.querySelector(".sendMail");
      const messageStatus = document.getElementById("message-status");
  
      if (!submitButton || !messageStatus) return;
  
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;
  
      const formData = {
        first_name: contactForm.first_name.value,
        last_name: contactForm.last_name.value,
        email: contactForm.email.value,
        subject: contactForm.subject.value,
        message: contactForm.message.value,
        to_email: "mohancheenu04@gmail.com",
      };
  
      emailjs
        .send("service_1xps2dv", "template_8c78rk1", formData)
        .then(() => {
          handleMessageSent(submitButton, messageStatus, contactForm);
        })
        .catch(() => {
          handleMessageError(submitButton, messageStatus);
        });
    });
  }
  
  function handleMessageSent(submitButton, messageStatus, contactForm) {
    submitButton.textContent = "Send Message";
    submitButton.disabled = false;
    contactForm.reset();
    showMessageStatus(messageStatus, "Message sent successfully!, Check Your Mail for Confirmation", "green");
    setTimeout(() => clearMessageStatus(messageStatus), 5000);
  }
  
  function handleMessageError(submitButton, messageStatus) {
    submitButton.textContent = "Send Message";
    submitButton.disabled = false;
    showMessageStatus(messageStatus, "Failed to send message.", "red");
    setTimeout(() => clearMessageStatus(messageStatus), 5000);
  }
  
  function showMessageStatus(element, message, color) {
    element.textContent = message;
    element.style.color = "white";
    element.style.backgroundColor = color;
    element.style.padding = "5px 10px";
    element.style.borderRadius = "5px";
    element.style.display = "inline-block";
  }
  
  function clearMessageStatus(element) {
    element.textContent = "";
    element.style.backgroundColor = "";
    element.style.padding = "";
    element.style.borderRadius = "";
    element.style.display = "";
  }
  
  function setupScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        scrollToSection(this.getAttribute("href").substring(1));
      });
    });
  }
  
  function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
  
  function setupAnimatedText() {
    const textContainers = document.querySelectorAll(".text-container");
    if (!textContainers.length) return;
  
    function animateText() {
      let delay = 0;
      textContainers.forEach((span) => {
        setTimeout(() => (span.style.width = span.textContent.length + "ch"), delay);
        delay += 2500;
        setTimeout(() => (span.style.width = "0ch"), delay);
      });
      setTimeout(animateText, delay);
    }
    animateText();
  
    const animatedPopup = document.getElementById("popupAnimated");
    const animatedTextContainer = document.getElementById("animatedTextContainer");
  
    window.togglePopup = (popupId) => {
      const popup = document.getElementById(popupId);
      if (!popup) return;
  
      popup.style.display = popup.style.display === "block" ? "none" : "block";
  
      if (popupId === "popupAnimated" && popup.style.display === "block" && animatedTextContainer) {
        startTextAnimation(animatedTextContainer);
      }
    };
  }
  
  function startTextAnimation(container) {
    const fullText = `Hi, I'm Mohan, a passionate Web Developer, Data Analyst, and Python Programmer with a strong foundation in computer science. I graduated with a B.Sc. in Computer Science from SRM University (2024) and am continuously enhancing my technical expertise to stay ahead in the ever-evolving tech landscape.<br><br>My skill set spans across web development, data analytics, and design. I have a strong command over HTML, CSS, and JavaScript, enabling me to build structured, responsive, and interactive web applications. I am also proficient in React.js, which allows me to create dynamic user interfaces. Version control is a crucial part of my workflow, and I have extensive experience with Git and GitHub for efficient collaboration and code management.<br><br>In the field of data analytics, I work with Python, particularly using Pandas for data manipulation and analysis. I have a solid understanding of SQL for querying and managing relational databases, along with experience in MongoDB for handling NoSQL databases. Additionally, I use Power BI and Excel for data visualization, reporting, and business intelligence.<br><br>Beyond development and analytics, I also have experience in graphic design and presentation tools like Photoshop, Canva, Figma, and PowerPoint, allowing me to create visually compelling designs and reports.<br><br>Currently, I am deepening my expertise in data analytics and web development to bridge the gap between technology and business solutions. My goal is to apply my skills to real-world projects, build scalable applications, and drive impactful insights through data. I am always eager to collaborate on innovative ideas and explore new challenges in the tech industry.<br><br>Let’s connect and create something amazing together!`;
  
    container.innerHTML = "";
    const chunks = fullText.split(/(<br>)/);
    let chunkIndex = 0, charIndex = 0;
  
    function animateChunk() {
      if (chunkIndex >= chunks.length) return;
  
      const chunk = chunks[chunkIndex];
      if (chunk === "<br>") {
        container.appendChild(document.createElement("br"));
        chunkIndex++;
        requestAnimationFrame(animateChunk);
      } else if (charIndex < chunk.length) {
        const span = document.createElement("span");
        span.classList.add("animated-char");
        span.textContent = chunk[charIndex];
        container.appendChild(span);
        setTimeout(() => (span.style.opacity = 1), 10);
        charIndex++;
        requestAnimationFrame(animateChunk);
      } else {
        chunkIndex++;
        charIndex = 0;
        requestAnimationFrame(animateChunk);
      }
    }
    requestAnimationFrame(animateChunk);
  }


  document.querySelectorAll('.wrapper .button').forEach(button => {
    button.addEventListener('click', function(event) {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) {
        event.preventDefault();
        const isExpanded = this.getAttribute('data-expanded') === 'true';
        if (isExpanded) {
          window.location.href = this.href;
        } else {
          this.classList.add('expanded');
          this.setAttribute('data-expanded', 'true');
        }
      }
    });
    button.addEventListener('mouseleave', function(){
      this.classList.remove('expanded');
      this.setAttribute('data-expanded', 'false');
    });
    button.addEventListener('touchstart', function(event) {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) {
        event.preventDefault();
        const isExpanded = this.getAttribute('data-expanded') === 'true';
        if (isExpanded) {
          window.location.href = this.href;
        } else {
          this.classList.add('expanded');
          this.setAttribute('data-expanded', 'true');
        }
      }
    });
      window.addEventListener('resize', function(){
          document.querySelectorAll('.wrapper .button').forEach(button=>{
              if(!window.matchMedia('(max-width: 768px)').matches){
                  button.classList.remove('expanded');
                  button.setAttribute('data-expanded', 'false');
              }
          });
      })
  });

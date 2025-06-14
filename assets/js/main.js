document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", (e) => {
      navMenu.classList.toggle("show-menu");
      navToggle.classList.toggle('animate-toggle');
      e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("show-menu") &&
        !navMenu.contains(e.target) &&
        e.target !== navToggle
      ) {
        navMenu.classList.remove("show-menu");
        navToggle.classList.remove('animate-toggle');
      }
    });
  }

  const styleSwitcher = document.getElementById('style-switcher');
  const switcherToggle = document.getElementById('switcher-toggle'); 
  const switcherClose = document.getElementById('switcher-close');

  if (switcherToggle) {
    switcherToggle.addEventListener('click', () => {
      styleSwitcher.classList.add('show-switcher');
    });
  }

  if (switcherClose) {
    switcherClose.addEventListener('click', () => {
      styleSwitcher.classList.remove('show-switcher');
    });
  }

  const colors = document.querySelectorAll('.style-switcher-color');

  // Set background color of each color button based on data-hue attribute
  colors.forEach((color) => {
    const hue = color.getAttribute('data-hue');
    if (hue) {
      color.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    }

    color.addEventListener('click', () => {
      colors.forEach((c) => c.classList.remove('active-color'));
      color.classList.add('active-color');
      document.documentElement.style.setProperty('--hue', hue);
    });
  });

  let currentTheme = 'light';
  document.body.className = currentTheme;

  document.querySelectorAll('input[name="body-theme"]').forEach((input) => {
    input.addEventListener('change', () => {
      currentTheme = input.value;
      document.body.className = currentTheme;
    });
  });
});

const accordionItems = document.querySelectorAll(".resume-item");

accordionItems.forEach((item) => {
  const header = item.querySelector('.resume-header'); 
  const content = item.querySelector('.resume-content');
  const icon = item.querySelector('.resume-icon i');

  header.addEventListener('click', () => {
    const isOpen = item.classList.toggle('accordion-open');

    content.style.height = isOpen ? content.scrollHeight + 'px' : '0';
    icon.className = isOpen ? 'ri-subtract-line' : 'ri-add-line';

    accordionItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains('accordion-open')) {
        otherItem.querySelector('.resume-content').style.height = '0';
        otherItem.querySelector('.resume-icon i').className = 'ri-add-line';
        otherItem.classList.remove('accordion-open');
      }
    });
  });
});


const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactSubject = document.getElementById('contact-subject');
const contactMessage = document.getElementById('contact-message');
const message = document.getElementById('message');

const sendEmail = (e) => {
  e.preventDefault();

  if (
    contactName.value === '' ||
    contactEmail.value === '' ||
    contactSubject.value === '' ||
    contactMessage.value === ''
  ) {
    message.classList.remove('color-first');
    message.classList.add('color-red');
    message.textContent = 'Write all the input fields';
    setTimeout(() => {
      message.textContent = '';
    }, 3000);
    return;
  }

  emailjs.sendForm('service_9ywvz2h', 'template_g6x1l3p', '#contact-form', 'Z4owR3nI7UkyjmGMe')
    .then(() => {
      message.classList.remove('color-red');
      message.classList.add('color-first');
      message.textContent = 'Message sent successfully!';
      contactForm.reset(); // Reset form fields
      setTimeout(() => {
        message.textContent = '';
      }, 5000);
    })
    .catch((error) => {
      alert('OOPS! Something went wrong...', error);
    });
};

contactForm.addEventListener('submit', sendEmail);


const scrollHeader=() => {
  const header=document.getElementById('header');
  this.scrollY>=20 ? header.classList.add('bg-header') : header.classList.remove('bg-header');
}
window.addEventListener('scroll',scrollHeader);

const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  navToggle.classList.remove('animate-toggle');
  navMenu.classList.remove('show-menu');
}

navLink.forEach((n) => n.addEventListener('click',linkAction));

const sections = document.querySelectorAll('section[id]');
const scrollActive= () => {
  const scrollY= window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
    sectionTop=current.offsetTop,
    sectionId=current.getAttribute('id'),
    sectionsClass=document.querySelectorAll('.nav-menu a[href*= ' +sectionId+ ']')

    if(scrollY>sectionTop && scrollY<= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    }else {
      sectionsClass.classList.remove('active-link');
    }
  })
}
window.addEventListener('scroll',scrollActive)
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  // Animate Links
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  // Hamburger Animation
  hamburger.classList.toggle("toggle");
});

document.addEventListener("DOMContentLoaded", function () {
  var options = {
    strings: ["Web Developer", "Full Stack Developer"],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1000,
    loop: true,
  };
  var typed = new Typed(".home-content h3 span", options);
});

let slideIndex = 1;
let slideInterval = setInterval(() => plusSlides(1), 3000); // Change slide every 3 seconds

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


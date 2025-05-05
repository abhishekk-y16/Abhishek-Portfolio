// Typing animation for hero section
document.addEventListener("DOMContentLoaded", () => {
  const typedText = document.getElementById("typed-text");
  const fullText = "Hi, I am Abhishek Kumar Yadav"; // The full text to type out
  let index = 0;

  function type() {
    if (index < fullText.length) {
      typedText.textContent += fullText.charAt(index);
      index++;
      setTimeout(type, 50); // Adjust typing speed here (in ms)
    }
  }

  type();
});


// Reveal elements on scroll
const revealElements = document.querySelectorAll(".reveal");

function handleScroll() {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScroll);
handleScroll();

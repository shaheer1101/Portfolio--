document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // prevent page reload

  const name = this.querySelector('input[type="text"]').value.trim();
  const email = this.querySelector('input[type="email"]').value.trim();
  const message = this.querySelector('textarea').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email.');
    return;
  }

  // If all okay, show success and reset form
  alert('Thank you for your message! I will get back to you soon.');
  this.reset();
});

// Typing Effect
document.addEventListener("DOMContentLoaded", function() {
  const typingElement = document.querySelector(".typing");
  const skills = ["WordPress Designer", "Graphics Designing", "UI/UX Designer", "Logo & Branding", "Web Development"];
  let skillIndex = 0;
  let charIndex = 0;

  function typeSkill() {
    if (charIndex < skills[skillIndex].length) {
      typingElement.textContent += skills[skillIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeSkill, 150);
    } else {
      setTimeout(deleteSkill, 1000);
    }
  }

  function deleteSkill() {
    if (charIndex > 0) {
      typingElement.textContent = skills[skillIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(deleteSkill, 100);
    } else {
      skillIndex = (skillIndex + 1) % skills.length;
      setTimeout(typeSkill, 500);
    }
  }

  typeSkill();
});
window.addEventListener('load', () => {
  const circles = document.querySelectorAll('.circle-container .progress');
  const values = [100, 100, 100]; // percentages

  circles.forEach((circle, index) => {
    const offset = 440 - (440 * values[index]) / 100;
    setTimeout(() => {
      circle.style.strokeDashoffset = offset;
    }, index * 500); // stagger animation
  });
});

const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${ -rotateX }deg) rotateY(${ rotateY }deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

document.querySelectorAll('.project-card').forEach(card => {
  const pages = card.querySelectorAll('.flip-page');
  const nextBtn = card.querySelector('.next');
  const prevBtn = card.querySelector('.prev');
  let current = 0;

  // Initial setup
  pages.forEach((p, i) => { if (i !== 0) p.classList.add('next'); });

  function showPage(index) {
    pages.forEach((p, i) => {
      p.classList.remove('active', 'next');
      if (i === index) p.classList.add('active');
      else p.classList.add('next');
    });
    current = index;
  }

  nextBtn.addEventListener('click', () => {
    showPage((current + 1) % pages.length);
  });

  prevBtn.addEventListener('click', () => {
    showPage((current - 1 + pages.length) % pages.length);
  });

  // Swipe functionality
  let startX = 0;
  let endX = 0;

  const flipBook = card.querySelector('.flip-book');

  flipBook.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  flipBook.addEventListener('touchmove', e => {
    endX = e.touches[0].clientX;
  });

  flipBook.addEventListener('touchend', e => {
    const diff = endX - startX;
    if (diff > 50) showPage((current - 1 + pages.length) % pages.length); // swipe right
    else if (diff < -50) showPage((current + 1) % pages.length); // swipe left
  });

  // Optional: Mouse drag support
  let isDragging = false;
  let dragStartX = 0;

  flipBook.addEventListener('mousedown', e => {
    isDragging = true;
    dragStartX = e.clientX;
  });

  flipBook.addEventListener('mousemove', e => {
    if (!isDragging) return;
    endX = e.clientX;
  });

  flipBook.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    const diff = endX - dragStartX;
    if (diff > 50) showPage((current - 1 + pages.length) % pages.length);
    else if (diff < -50) showPage((current + 1) % pages.length);
  });

  flipBook.addEventListener('mouseleave', () => { isDragging = false; });
});
          

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
// Contact Form

// Custom Web3Forms Submission with Professional Popup
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Disable button while sending
  const button = form.querySelector("button");
  button.disabled = true;
  button.innerText = "Sending...";

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData
    });

    if (response.ok) {
      showCustomPopup("✅ Message Sent Successfully!", "Thank you for reaching out! I’ll get back to you soon.");
      form.reset();
    } else {
      showCustomPopup("⚠️ Error!", "Something went wrong. Please try again.");
    }
  } catch (error) {
    showCustomPopup("❌ Failed!", "Network issue. Please check your connection.");
  }

  button.disabled = false;
  button.innerText = "Send Message";
});

function showCustomPopup(title, message) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.8)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";
  overlay.style.backdropFilter = "blur(5px)";

  const popup = document.createElement("div");
  popup.style.background = "linear-gradient(145deg, #111, #222)";
  popup.style.border = "2px solid #ffb300";
  popup.style.borderRadius = "20px";
  popup.style.padding = "30px 40px";
  popup.style.color = "#fff";
  popup.style.textAlign = "center";
  popup.style.boxShadow = "0 0 30px rgba(255,193,7,0.4)";
  popup.style.animation = "popupShow 0.4s ease";
  popup.style.maxWidth = "350px";

  const titleEl = document.createElement("h3");
  titleEl.innerText = title;
  titleEl.style.marginBottom = "10px";
  titleEl.style.fontSize = "1.4rem";
  titleEl.style.color = "#ffb300";

  const msgEl = document.createElement("p");
  msgEl.innerText = message;
  msgEl.style.marginBottom = "20px";
  msgEl.style.fontSize = "1rem";

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "Close";
  closeBtn.style.background = "linear-gradient(90deg, #ffb300, #ff7a00)";
  closeBtn.style.border = "none";
  closeBtn.style.padding = "10px 25px";
  closeBtn.style.borderRadius = "8px";
  closeBtn.style.color = "#000";
  closeBtn.style.fontWeight = "600";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.transition = "0.3s";

  closeBtn.onmouseover = () => (closeBtn.style.transform = "scale(1.05)");
  closeBtn.onmouseout = () => (closeBtn.style.transform = "scale(1)");
  closeBtn.onclick = () => overlay.remove();

  popup.append(titleEl, msgEl, closeBtn);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

// Animation CSS (add once at bottom of your style.css)
const style = document.createElement("style");
style.innerHTML = `
@keyframes popupShow {
  from {opacity: 0; transform: scale(0.8);}
  to {opacity: 1; transform: scale(1);}
}`;
document.head.appendChild(style);
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
          

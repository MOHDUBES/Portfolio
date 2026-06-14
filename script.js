// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  updateActiveNav();
});

// ===========================
// MOBILE HAMBURGER
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksList.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translateY(7px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===========================
// ACTIVE NAV LINK
// ===========================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}


// ===========================
// SCROLL ANIMATIONS
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

// Add fade-in to section headers and main content blocks
document.querySelectorAll('.section-header, .about-grid, .edu-grid, .contact-grid, .skill-category').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success-msg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById('contact-submit-btn');
  submitBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
    <span>Sending...</span>
  `;
  submitBtn.disabled = true;

  // Send form data to FormSubmit API
  fetch("https://formsubmit.co/ajax/mohdubes8860@gmail.com", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      Name: document.getElementById('contact-name-input').value,
      Email: document.getElementById('contact-email-input').value,
      Subject: document.getElementById('contact-subject-input').value,
      Message: document.getElementById('contact-message-input').value,
      _subject: "New Portfolio Message: " + document.getElementById('contact-subject-input').value
    })
  })
  .then(response => response.json())
  .then(data => {
    contactForm.reset();
    successMsg.style.display = 'block';
    submitBtn.innerHTML = `
      <span>Send Message</span>
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    `;
    submitBtn.disabled = false;
    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
  })
  .catch(error => {
    console.error(error);
    alert("Oops! There was a problem sending your message.");
    submitBtn.innerHTML = `
      <span>Send Message</span>
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    `;
    submitBtn.disabled = false;
  });
});

// ===========================
// SKILL CHIP HOVER GLOW
// ===========================
document.querySelectorAll('.skill-chip').forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    chip.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.15)';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.boxShadow = '';
  });
});

// ===========================
// CURSOR PARTICLE EFFECT (subtle)
// ===========================
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9999';
canvas.style.opacity = '0.5';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
  if (Math.random() < 0.3) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 - 1,
      life: 1,
      decay: Math.random() * 0.02 + 0.01,
      color: Math.random() < 0.5 ? '0, 212, 255' : '139, 92, 246'
    });
  }
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;
    p.life -= p.decay;
    p.size *= 0.97;
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ===========================
// SMOOTH REVEAL ON LOAD
// ===========================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ===========================
// FETCH GITHUB REPOSITORIES
// ===========================
async function fetchGithubRepos() {
  const grid = document.getElementById('github-repos-grid');
  const countEl = document.getElementById('repo-count');
  const username = 'MOHDUBES';

  // Repos already featured above, so we don't duplicate them
  const featuredRepos = [
    'CodeAlpha_E-commerce-Store',
    'EcoTrack-Carbon-Footprint-Awareness',
    'Project-Indian-traditional-medicine-web',
    'VoiceBox---Smart-Bill-Scanner-Payment-App',
    'Video-Downloader-Notes',
    'Veritas-ai-detect-main',
    'UnityAid-AI',
    'ElectroBot-AI',
    'Leaders-of-Modern-India',
    'Transportation-Cost',
    'VenueSync'
  ];

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    if (!response.ok) throw new Error('Failed to fetch repositories');

    let repos = await response.json();
    if (countEl) countEl.textContent = repos.length;

    // Filter out featured and fork repos (optional, currently keeping all except featured)
    repos = repos.filter(repo => !featuredRepos.includes(repo.name));

    grid.innerHTML = '';

    repos.forEach((repo, i) => {
      // Create card
      const card = document.createElement('a');
      card.href = repo.html_url;
      card.target = '_blank';
      card.className = 'repo-card fade-in';
      card.style.transitionDelay = `${(i % 10) * 0.05}s`;

      const langColor = getLanguageColor(repo.language);

      card.innerHTML = `
        <div class="repo-header">
          <svg class="repo-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
        <h4 class="repo-title">${repo.name.replace(/-/g, ' ')}</h4>
        <p class="repo-desc">${repo.description || 'No description provided'}</p>
        <div class="repo-footer">
          <div class="repo-language">
            <span class="repo-lang-color" style="background: ${langColor}"></span>
            <span>${repo.language || 'Markdown'}</span>
          </div>
          <div class="repo-stars">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            ${repo.stargazers_count}
          </div>
        </div>
      `;

      grid.appendChild(card);
      observer.observe(card);
    });

  } catch (error) {
    console.error('Error fetching repos:', error);
    grid.innerHTML = `<div style="text-align: center; color: var(--text-muted); grid-column: 1 / -1; padding: 40px;">Failed to load repositories. Please try again later.</div>`;
  }
}

function getLanguageColor(lang) {
  const colors = {
    'JavaScript': '#f1e05a',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Python': '#3572A5',
    'C++': '#f34b7d',
    'C': '#555555'
  };
  return colors[lang] || '#8b5cf6';
}

fetchGithubRepos();

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
}

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();


const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxTriggers = Array.from(document.querySelectorAll('.lightbox-trigger'));
const lightboxClose = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-nav.prev');
const nextBtn = document.querySelector('.lightbox-nav.next');
let currentLightboxIndex = 0;

function openLightbox(index) {
  if (!lightbox || !lightboxTriggers.length) return;
  currentLightboxIndex = index;
  const trigger = lightboxTriggers[currentLightboxIndex];
  lightboxImage.src = trigger.getAttribute('href');
  lightboxImage.alt = trigger.querySelector('img')?.alt || 'Gallery image';
  lightboxCaption.textContent = trigger.dataset.caption || '';
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}

function stepLightbox(step) {
  if (!lightboxTriggers.length) return;
  currentLightboxIndex = (currentLightboxIndex + step + lightboxTriggers.length) % lightboxTriggers.length;
  openLightbox(currentLightboxIndex);
}

lightboxTriggers.forEach((trigger, index) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openLightbox(index);
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
prevBtn?.addEventListener('click', () => stepLightbox(-1));
nextBtn?.addEventListener('click', () => stepLightbox(1));
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox || !lightbox.classList.contains('active')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') stepLightbox(-1);
  if (event.key === 'ArrowRight') stepLightbox(1);
});

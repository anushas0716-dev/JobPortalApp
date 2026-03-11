// static/js/main.js

// Staggered card animation delays
document.querySelectorAll('[style*="animation-delay"]').forEach(el => {
  // already set via inline style from Jinja, nothing extra needed
});

// Auto-dismiss flash messages after 4 s
document.querySelectorAll('.flash').forEach(el => {
  setTimeout(() => {
    el.style.transition = 'opacity .4s';
    el.style.opacity    = '0';
    setTimeout(() => el.remove(), 400);
  }, 4000);
});

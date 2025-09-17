// Example: Log a message to the console
console.log('Welcome to the Wells Fargo Project Proposal site!');

// Try adding your own JavaScript below to interact with the page!

// Feel free to experiment with different JavaScript code snippets here!

// Smooth scroll for anchor links (for browsers that don't support scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Show an alert when "Request Full Proposal" is clicked
document.querySelectorAll('a[aria-label="Request Full Proposal"]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Thank you for your interest! The full proposal will be sent to your email soon.');
  });
});

// Highlight the "Explore Proposal" button when the overview section is in view
const exploreBtn = document.querySelector('a[href="#overview"]');
const overviewSection = document.getElementById('overview');
if (exploreBtn && overviewSection) {
  window.addEventListener('scroll', () => {
    const rect = overviewSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      exploreBtn.classList.add('btn-warning');
    } else {
      exploreBtn.classList.remove('btn-warning');
    }
  });
}

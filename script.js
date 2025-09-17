// Wells Fargo Project Proposal site JS

console.log('Welcome to the Wells Fargo Project Proposal site!');

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


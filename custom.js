// Fade-in effect for sections on scroll
document.addEventListener('DOMContentLoaded', function() {
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = "0.1s";
        entry.target.classList.add('animated');
        entry.target.style.opacity = 1;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => {
    el.style.opacity = 0;
    observer.observe(el);
  });
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Modal form submit (simulate sending)
document.addEventListener('DOMContentLoaded', function() {
  const modalForm = document.querySelector('#proposalModal form');
  if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      modalForm.querySelector('button[type="submit"]').disabled = true;
      modalForm.querySelector('button[type="submit"]').textContent = "Sending...";
      setTimeout(() => {
        modalForm.querySelector('button[type="submit"]').textContent = "Send Proposal";
        modalForm.querySelector('button[type="submit"]').disabled = false;
        bootstrap.Modal.getInstance(document.getElementById('proposalModal')).hide();
        alert('Thank you! The full proposal will be sent to your email soon.');
      }, 1200);
    });
  }
});

// Bootstrap Scrollspy activation
document.addEventListener('DOMContentLoaded', function() {
  const dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));
  dataSpyList.forEach(function (dataSpyEl) {
    bootstrap.ScrollSpy.getInstance(dataSpyEl) || new bootstrap.ScrollSpy(dataSpyEl);
  });
});

// Carousel controls (example for horizontal scroll)
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.wf-carousel-track');
  if (carousel) {
    document.querySelectorAll('.wf-carousel-arrow').forEach(btn => {
      btn.addEventListener('click', function() {
        const dir = this.classList.contains('right') ? 1 : -1;
        carousel.scrollBy({ left: dir * 200, behavior: 'smooth' });
      });
    });
  }
});

// Modal ARIA live feedback
document.addEventListener('DOMContentLoaded', function() {
  const modalForm = document.querySelector('#proposalModal form');
  const liveRegion = document.getElementById('modal-live-region');
  if (modalForm && liveRegion) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      modalForm.querySelector('button[type="submit"]').disabled = true;
      modalForm.querySelector('button[type="submit"]').textContent = "Sending...";
      setTimeout(() => {
        modalForm.querySelector('button[type="submit"]').textContent = "Send Proposal";
        modalForm.querySelector('button[type="submit"]').disabled = false;
        bootstrap.Modal.getInstance(document.getElementById('proposalModal')).hide();
        liveRegion.textContent = 'Thank you! The full proposal will be sent to your email soon.';
        setTimeout(() => { liveRegion.textContent = ''; }, 4000);
      }, 1200);
    });
  }
});

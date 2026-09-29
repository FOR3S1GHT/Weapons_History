// LENIS SMOOTH SCROLL
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', (e) => {
  const navbar = document.getElementById('navbar');
  if (e.scroll > 50) {
    navbar.style.borderBottomColor = 'rgba(217, 119, 6, 0.2)';
  } else {
    navbar.style.borderBottomColor = '';
  }
});

// MOBILE MENU
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('hidden', !menuOpen);
  mobileMenu.classList.toggle('flex', menuOpen);
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
  });
});

// ANIME.JS HERO ANIMATION
anime.timeline({ delay: 300 })
  .add({
    targets: '.hero-title span',
    opacity: [0, 1],
    translateY: [60, 0],
    rotateX: [-40, 0],
    duration: 1200,
    easing: 'easeOutExpo',
    delay: anime.stagger(200),
  })
  .add({
    targets: '#hero .animate-in',
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 800,
    easing: 'easeOutExpo',
    delay: anime.stagger(150),
  }, '-=600');

// SCROLL-TRIGGERED ANIMATIONS
const animateElements = document.querySelectorAll('section:not(#hero) .animate-in');
const progressBars = document.querySelectorAll('.progress-bar-fill');

const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      anime({
        targets: entry.target,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        easing: 'easeOutExpo',
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// Progress bars animation
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target,
        scaleX: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 200,
      });
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// PARALLAX ON SCROLL
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll('.parallax-layer').forEach(layer => {
    const speed = parseFloat(layer.getAttribute('data-speed'));
    layer.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// CHART.JS CHARTS
const chartDefaults = {
  color: 'rgba(255,255,255,0.6)',
  borderColor: 'rgba(255,255,255,0.1)',
  font: { family: 'Inter' },
};
Chart.defaults.color = chartDefaults.color;
Chart.defaults.borderColor = chartDefaults.borderColor;
Chart.defaults.font.family = chartDefaults.font.family;

// Range Chart
new Chart(document.getElementById('rangeChart'), {
  type: 'bar',
  data: {
    labels: ['Bronze Sword', 'Iron Sword', 'Longsword', 'Musket', 'Rifle', 'Assault Rifle'],
    datasets: [{
      label: 'Effective Range (m)',
      data: [1, 2, 3, 100, 500, 450],
      backgroundColor: [
        'rgba(217, 119, 6, 0.9)',
        'rgba(217, 119, 6, 0.8)',
        'rgba(217, 119, 6, 0.7)',
        'rgba(217, 119, 6, 0.5)',
        'rgba(217, 119, 6, 0.4)',
        'rgba(217, 119, 6, 0.3)',
      ],
      borderColor: 'rgba(217, 119, 6, 1)',
      borderWidth: 1,
      borderRadius: 6,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, text: 'Meters', color: 'rgba(255,255,255,0.5)' } },
      x: { grid: { display: false } }
    }
  }
});

// Fire Rate Chart
new Chart(document.getElementById('fireRateChart'), {
  type: 'bar',
  data: {
    labels: ['Sword Strike', 'Musket (muzzleloader)', 'Colt SAA', 'Bolt-Action', 'AK-47', 'M4'],
    datasets: [{
      label: 'Rounds/Strikes per Minute',
      data: [30, 3, 12, 15, 600, 900],
      backgroundColor: 'rgba(217, 119, 6, 0.7)',
      borderColor: 'rgba(217, 119, 6, 1)',
      borderWidth: 1,
      borderRadius: 6,
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { grid: { display: false } }
    }
  }
});

// Timeline Chart
new Chart(document.getElementById('timelineChart'), {
  type: 'line',
  data: {
    labels: ['3300 BC', '1200 BC', '500 BC', '0 AD', '850 AD', '1400 AD', '1600', '1700', '1850', '1950'],
    datasets: [
      {
        label: 'Sword Technology',
        data: [1, 3, 5, 7, 8, 9, 9, 9, 8, 6],
        borderColor: 'rgba(217, 119, 6, 1)',
        backgroundColor: 'rgba(217, 119, 6, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(217, 119, 6, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: 'Firearm Technology',
        data: [0, 0, 0, 0, 1, 2, 4, 6, 8, 10],
        borderColor: 'rgba(255, 255, 255, 0.6)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(255, 255, 255, 0.6)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { padding: 20, usePointStyle: true, pointStyleWidth: 10 }
      }
    },
    scales: {
      y: { beginAtZero: true, max: 11, grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, text: 'Tech Level', color: 'rgba(255,255,255,0.5)' } },
      x: { grid: { display: false } }
    }
  }
});

// Dominance Chart
new Chart(document.getElementById('dominanceChart'), {
  type: 'radar',
  data: {
    labels: ['Cutting Power', 'Thrusting', 'Range', 'Reload Speed', 'Durability', 'Portability'],
    datasets: [
      {
        label: 'Medieval Longsword',
        data: [9, 7, 1, 10, 9, 7],
        borderColor: 'rgba(217, 119, 6, 1)',
        backgroundColor: 'rgba(217, 119, 6, 0.2)',
        pointBackgroundColor: 'rgba(217, 119, 6, 1)',
      },
      {
        label: 'Flintlock Musket',
        data: [0, 0, 7, 1, 6, 5],
        borderColor: 'rgba(255, 255, 255, 0.6)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        pointBackgroundColor: 'rgba(255, 255, 255, 0.6)',
      },
      {
        label: 'Modern Assault Rifle',
        data: [0, 0, 9, 10, 7, 8],
        borderColor: 'rgba(255, 200, 0, 0.7)',
        backgroundColor: 'rgba(255, 200, 0, 0.05)',
        pointBackgroundColor: 'rgba(255, 200, 0, 0.7)',
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        grid: { color: 'rgba(255,255,255,0.1)' },
        angleLines: { color: 'rgba(255,255,255,0.1)' },
        pointLabels: { color: 'rgba(255,255,255,0.7)', font: { size: 12 } },
        ticks: { display: false },
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 20, usePointStyle: true, pointStyleWidth: 10 }
      }
    }
  }
});

document.querySelectorAll('.card-hover').forEach(card => {
  card.addEventListener('mouseenter', () => {
    anime({ targets: card, scale: 1.02, duration: 300, easing: 'easeOutQuad' });
  });
  card.addEventListener('mouseleave', () => {
    anime({ targets: card, scale: 1, duration: 300, easing: 'easeOutQuad' });
  });
});

document.querySelectorAll('#navbar a, footer a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    anime({ targets: link, color: '#ffffff', duration: 200, easing: 'easeOutQuad' });
  });
  link.addEventListener('mouseleave', () => {
    anime({ targets: link, color: 'hsl(240, 5%, 64.9%)', duration: 200, easing: 'easeOutQuad' });
  });
});

const dividerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target,
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo',
      });
      dividerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section-divider').forEach(d => dividerObserver.observe(d));

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  if (img.complete) { img.classList.add('loaded'); }
  else { img.addEventListener('load', () => img.classList.add('loaded')); }
});
document.querySelectorAll('img[loading="eager"]').forEach(img => {
  if (img.complete) { img.classList.add('loaded'); }
  else { img.addEventListener('load', () => img.classList.add('loaded')); }
});

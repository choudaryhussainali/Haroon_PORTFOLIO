// 1. SCROLL REVEAL ENGINE
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. CONTACT FORM SIMULATION (AJAX FORMSPREE)
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;
    const form = e.target;
    const data = new FormData(form);

    btn.innerHTML = 'Sending...';

    try {
        const response = await fetch("https://formspree.io/f/maqqwzgj", {
            method: "POST",
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
            btn.style.backgroundColor = '#4CAF50';
            form.reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = 'var(--accent-black)';
            }, 3000);
        } else {
            btn.innerHTML = 'Error. Try again.';
            btn.style.backgroundColor = 'red';
        }
    } catch (error) {
        btn.innerHTML = 'Error. Try again.';
        btn.style.backgroundColor = 'red';
    }
});

// 3. DARK MODE TOGGLE LOGIC
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
const body = document.body;

// Check local storage for saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Switch Icon
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});
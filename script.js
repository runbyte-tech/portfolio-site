document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Mobile Menu
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // ========================================
    // Smooth Scrolling
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // Navbar Scroll Shadow
    // ========================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 80) {
            navbar.style.boxShadow = '0 1px 12px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // Animated Log Feed
    // ========================================
    const logFeedBody = document.getElementById('logFeedBody');

    const logEvents = [
        { action: 'user.login', type: 'login', desc: 'jane@acme.com authenticated via SSO' },
        { action: 'doc.updated', type: 'update', desc: 'Invoice #1042 modified by john@acme.com' },
        { action: 'role.changed', type: 'setting', desc: 'Admin access granted to mike@acme.com' },
        { action: 'file.exported', type: 'export', desc: 'Q4 report downloaded by sarah@acme.com' },
        { action: 'api.called', type: 'create', desc: 'POST /api/v1/invoices from 192.168.1.1' },
        { action: 'plan.upgraded', type: 'setting', desc: 'Billing plan changed to Enterprise' },
        { action: 'user.invited', type: 'create', desc: 'alex@acme.com invited by jane@acme.com' },
        { action: 'doc.deleted', type: 'delete', desc: 'Draft proposal removed by john@acme.com' },
        { action: 'user.logout', type: 'login', desc: 'mike@acme.com session ended' },
        { action: 'key.rotated', type: 'setting', desc: 'API key rotated for production env' },
        { action: 'export.csv', type: 'export', desc: 'User activity report generated' },
        { action: 'webhook.sent', type: 'create', desc: 'Event dispatched to slack-integration' },
        { action: 'perm.revoked', type: 'delete', desc: 'Write access removed for intern@acme.com' },
        { action: 'mfa.enabled', type: 'setting', desc: 'Two-factor auth enabled by cto@acme.com' },
    ];

    const MAX_VISIBLE = 8;
    let currentIndex = 0;

    function getTimeString() {
        const now = new Date();
        return now.toTimeString().slice(0, 8);
    }

    function createLogEntry(event) {
        const entry = document.createElement('div');
        entry.classList.add('log-entry');
        entry.innerHTML =
            '<span class="log-time">' + getTimeString() + '</span>' +
            '<span class="log-action ' + event.type + '">' + event.action + '</span>' +
            '<span class="log-desc">' + event.desc + '</span>';
        return entry;
    }

    function addLogEntry() {
        const event = logEvents[currentIndex % logEvents.length];
        const entry = createLogEntry(event);

        logFeedBody.appendChild(entry);

        // Remove oldest entries when exceeding max
        const entries = logFeedBody.querySelectorAll('.log-entry');
        if (entries.length > MAX_VISIBLE) {
            const oldest = entries[0];
            oldest.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            oldest.style.opacity = '0';
            oldest.style.transform = 'translateX(-12px)';
            setTimeout(() => oldest.remove(), 300);
        }

        currentIndex++;
    }

    // Initial batch with stagger
    for (let i = 0; i < 6; i++) {
        setTimeout(() => addLogEntry(), i * 250);
    }

    // Continue adding entries on interval
    setInterval(addLogEntry, 2600);
});

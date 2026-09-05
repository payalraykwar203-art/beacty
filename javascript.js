/**
 * Chanchal Beauty Parlour - JavaScript Functions
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Menu Toggle
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 2. Active Navigation link on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 120; // offset header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. Interactive Gallery Filter
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                // Animate hide/show using CSS transitions
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // matches transition time
                }
            });
        });
    });

    // ==========================================
    // 4. Testimonials Slider (Carousel)
    // ==========================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        const showSlide = (n) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };

        const prevSlide = () => {
            showSlide(currentSlide - 1);
        };

        // Event Listeners for Controls
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Event Listeners for Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
        });

        // Automatic Slide Transitions
        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 6000);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        // Initialize slider
        startInterval();
    }

    // ==========================================
    // 5. Booking Form Submission Handlers
    // ==========================================
    const bookingForm = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');

    if (bookingForm && successMessage) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Fetch values (could be sent to a backend API)
            const bookingData = {
                name: document.getElementById('fullName').value,
                phone: document.getElementById('phoneNum').value,
                service: document.getElementById('serviceType').value,
                date: document.getElementById('appointmentDate').value,
                time: document.getElementById('appointmentTime').value,
                notes: document.getElementById('specialNotes').value,
                timestamp: new Date().toISOString()
            };

            // Save booking simulation in local storage
            let currentBookings = JSON.parse(localStorage.getItem('appointments')) || [];
            currentBookings.push(bookingData);
            localStorage.setItem('appointments', JSON.stringify(currentBookings));

            // Visual submission state
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Requesting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show Success Transition
                bookingForm.style.opacity = '0';
                setTimeout(() => {
                    bookingForm.style.display = 'none';
                    successMessage.classList.add('active');
                }, 300);
            }, 1500);
        });
    }

    // ==========================================
    // 6. Newsletter Subscription Handler
    // ==========================================
    const newsletterSubmitBtn = document.getElementById('newsletterSubmitBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');

    if (newsletterSubmitBtn && newsletterEmail) {
        newsletterSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterEmail.value;

            if (email && email.includes('@')) {
                alert(`Thank you for subscribing to our newsletter! We will send updates and offers to ${email}.`);
                newsletterEmail.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Set minimum date selector on form to today
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

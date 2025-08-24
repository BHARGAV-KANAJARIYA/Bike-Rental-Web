/**
 * Modern Bike Rental Website JavaScript
 * Enhanced with animations and interactive features
 */

(function($) {
    "use strict";

    // Page Loading Animation
    $(window).on('load', function() {
        setTimeout(function() {
            $('.page-loader').addClass('fade-out');
            setTimeout(function() {
                $('.page-loader').remove();
            }, 500);
        }, 1000);
    });

    // Add page loader to body if it doesn't exist
    if (!$('.page-loader').length) {
        $('body').prepend(`
            <div class="page-loader">
                <div class="loader-spinner"></div>
            </div>
        `);
    }

    // Navbar Scroll Effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Enhanced Smooth Scrolling for Navigation Links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('href');
        var target = $(targetId);

        if (target.length) {
            // Update active nav link
            $('.navbar-nav .nav-link').removeClass('active');
            $(this).addClass('active');

            // Smooth scroll to target
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000, 'swing');
        }
    });

    // Update active nav link on scroll
    $(window).scroll(function() {
        var scrollPos = $(window).scrollTop() + 150;

        $('.navbar-nav .nav-link').each(function() {
            var targetId = $(this).attr('href');
            if (targetId.startsWith('#')) {
                var target = $(targetId);
                if (target.length && target.offset().top <= scrollPos && target.offset().top + target.outerHeight() > scrollPos) {
                    $('.navbar-nav .nav-link').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
    });

    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize scroll animations when DOM is ready
    $(document).ready(function() {
        initScrollAnimations();
    });

    // Password Toggle Functionality
    $(".toggle-password").click(function() {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    // Enhanced Form Validation with Animations
    function validateFormField(field, isValid) {
        const $field = $(field);
        const $group = $field.closest('.form-group');

        $group.removeClass('has-error has-success');

        if (isValid) {
            $group.addClass('has-success');
            $field.removeClass('is-invalid').addClass('is-valid');
        } else {
            $group.addClass('has-error');
            $field.removeClass('is-valid').addClass('is-invalid');
            $field.addClass('shake');
            setTimeout(() => $field.removeClass('shake'), 500);
        }
    }

    // Card Hover Effects
    $('.card').hover(
        function() {
            $(this).addClass('shadow-hover');
        },
        function() {
            $(this).removeClass('shadow-hover');
        }
    );

    // Parallax Effect for Hero Section
    $(window).scroll(function() {
        var scrolled = $(this).scrollTop();
        var parallax = $('.parallax');
        var speed = 0.5;

        parallax.each(function() {
            var yPos = -(scrolled * speed);
            $(this).css('transform', 'translateY(' + yPos + 'px)');
        });
    });

    // Animated Counter
    function animateCounter() {
        $('.counter').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-count');

            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger counter animation when in view
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    });

    $('.counter').each(function() {
        counterObserver.observe(this);
    });

    // Mobile Menu Animation
    $('.navbar-toggler').click(function() {
        $(this).toggleClass('active');
    });

    // Add floating animation to specific elements
    $('.float-animation').each(function(index) {
        $(this).css('animation-delay', (index * 0.2) + 's');
    });

    // Stagger animation for cards
    $('.card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
        $(this).addClass('fade-in');
    });

    // Enhanced carousel with custom controls
    $('.carousel').on('slide.bs.carousel', function(e) {
        const $nextCaption = $(e.relatedTarget).find('.carousel-caption');
        $nextCaption.children().each(function(index) {
            $(this).css('animation-delay', (index * 0.3) + 's');
        });
    });

    // Add ripple effect to buttons
    $('.btn').on('click', function(e) {
        const $button = $(this);
        const $ripple = $('<span class="ripple"></span>');

        $button.append($ripple);

        const btnOffset = $button.offset();
        const xPos = e.pageX - btnOffset.left;
        const yPos = e.pageY - btnOffset.top;

        $ripple.css({
            top: yPos,
            left: xPos
        }).addClass('animate');

        setTimeout(() => $ripple.remove(), 600);
    });

    // Back to top button functionality
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });

    $('#backToTop').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    // Enhanced Bike filter functionality
    $('[data-filter]').click(function() {
        const filter = $(this).data('filter');

        // Update active button
        $('[data-filter]').removeClass('active');
        $(this).addClass('active');

        // Filter bikes with animation
        $('.bike-card').fadeOut(300, function() {
            if (filter === 'all') {
                $('.bike-card').fadeIn(300);
            } else {
                $(`.bike-card[data-category="${filter}"]`).fadeIn(300);
            }
        });
    });

    // View More/Less Bikes functionality
    $('#viewMoreBtn').click(function() {
        $('.additional-bikes').fadeIn(500);
        $(this).fadeOut(300);
        $('#viewLessBtn').fadeIn(300);

        // Trigger scroll animations for new bikes
        setTimeout(() => {
            $('.additional-bikes').addClass('visible');
        }, 100);
    });

    $('#viewLessBtn').click(function() {
        $('.additional-bikes').fadeOut(500);
        $(this).fadeOut(300);
        $('#viewMoreBtn').fadeIn(300);

        // Scroll back to bikes section
        $('html, body').animate({
            scrollTop: $('#bikes').offset().top - 100
        }, 800);
    });

    // Newsletter form submission
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();

        if (email) {
            // Simulate API call
            $(this).find('button').html('<i class="fas fa-spinner fa-spin"></i>');

            setTimeout(() => {
                $(this).find('button').html('<i class="fas fa-check"></i>');
                $(this).find('input').val('').attr('placeholder', 'Thank you for subscribing!');

                setTimeout(() => {
                    $(this).find('button').html('<i class="fas fa-paper-plane"></i>');
                    $(this).find('input').attr('placeholder', 'Enter your email');
                }, 2000);
            }, 1000);
        }
    });

    // Contact form submission
    $('#contact form').on('submit', function(e) {
        e.preventDefault();

        const $form = $(this);
        const $submitBtn = $form.find('button[type="submit"]');

        // Validate form
        let isValid = true;
        $form.find('input[required], textarea[required], select[required]').each(function() {
            if (!$(this).val().trim()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid').addClass('is-valid');
            }
        });

        if (isValid) {
            // Show loading state
            $submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
            $submitBtn.prop('disabled', true);

            // Simulate API call
            setTimeout(() => {
                $submitBtn.html('<i class="fas fa-check me-2"></i>Message Sent!');
                $form[0].reset();
                $form.find('.is-valid').removeClass('is-valid');

                // Show success notification
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

                setTimeout(() => {
                    $submitBtn.html('<i class="fas fa-paper-plane me-2"></i>Send Message');
                    $submitBtn.prop('disabled', false);
                }, 3000);
            }, 2000);
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });

    // Global notification function
    window.showNotification = function(message, type) {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';

        const notification = `
            <div class="alert ${alertClass} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3"
                 style="z-index: 9999; min-width: 300px;" role="alert">
                <i class="${icon} me-2"></i>${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        $('body').append(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
            $('.alert').alert('close');
        }, 4000);
    };

    // Enhanced Rent Now button functionality
    $(document).on('click', '.rent-btn', function(e) {
        e.preventDefault();

        const $button = $(this);
        const $card = $button.closest('.card');
        const bikeName = $card.find('.card-title').text();
        const price = $card.find('.price-badge').text();
        const rating = $card.find('.rating small').text();

        // Add loading state
        const originalText = $button.html();
        $button.html('<i class="fas fa-spinner fa-spin me-2"></i>Processing...');
        $button.prop('disabled', true);

        // Simulate booking process
        setTimeout(() => {
            // Show success notification with more details
            showNotification(`🎉 Excellent choice! ${bikeName} reserved for ${price}. Check your email for booking confirmation.`, 'success');

            // Update button to show booked state
            $button.html('<i class="fas fa-check me-2"></i>Reserved!');
            $button.removeClass('btn-primary').addClass('btn-success');

            // Update availability badge
            $card.find('.badge').removeClass('bg-success').addClass('bg-warning text-dark').text('Reserved');

            // Reset button after 5 seconds (for demo purposes)
            setTimeout(() => {
                $button.html(originalText);
                $button.removeClass('btn-success').addClass('btn-primary');
                $button.prop('disabled', false);
                $card.find('.badge').removeClass('bg-warning text-dark').addClass('bg-success').text('Available');
            }, 5000);

        }, 2000);
    });

    // Add hover effect to bike cards
    $(document).on('mouseenter', '.bike-card', function() {
        $(this).find('.card').addClass('shadow-lg');
        $(this).find('.card-img-top').css('transform', 'scale(1.05)');
    });

    $(document).on('mouseleave', '.bike-card', function() {
        $(this).find('.card').removeClass('shadow-lg');
        $(this).find('.card-img-top').css('transform', 'scale(1)');
    });

})(jQuery);

// Add CSS for additional animations
const additionalCSS = `
    .shake {
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        pointer-events: none;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
    }

    .ripple.animate {
        animation: ripple 0.6s linear;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .has-error .form-control {
        border-color: var(--danger-color);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .has-success .form-control {
        border-color: var(--success-color);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
